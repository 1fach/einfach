/* eslint-disable @typescript-eslint/no-explicit-any */
import type { QueryResult } from 'kysely'
import type { SQLiteDB } from '@/db/types'
import { initSQLite } from '@/db/sqlite'

let db: SQLiteDB

async function init(fileName: string, _url: string, _useOPFS: boolean) {
  db = await initSQLite(fileName)
}

async function exec(isSelect: boolean, sql: string, parameters?: readonly unknown[]): Promise<QueryResult<any>> {
  const rows = await db.run(sql, parameters as any[])
  return isSelect || rows.length
    ? { rows }
    : {
        rows,
        insertId: BigInt(await db.lastInsertRowId()),
        numAffectedRows: BigInt(db.changes()),
      }
}

onmessage = async ({ data }: MessageEvent<MainMsg>) => {
  const ret: WorkerMsg = [
    data[0],
    null,
    null,
  ]
  try {
    switch (data[0]) {
      case 0:
        await init(data[1], data[2], data[3])
        break
      case 1:
        ret[1] = await exec(data[1], data[2], data[3])
        break
      case 2:
        await db.close()
        break
    }
  }
  catch (error) {
    ret[2] = error
  }
  postMessage(ret)
}

type RunMsg = [
  type: 1,
  isSelect: boolean,
  sql: string,
  parameters?: readonly unknown[],
]

type InitMsg = [
  type: 0,
  url: string,
  fileName: string,
  useOPFS: boolean,
]

type CloseMsg = [2]

export type MainMsg = InitMsg | RunMsg | CloseMsg

export type WorkerMsg = {
  [K in keyof Events]: [
    type: K,
    data: Events[K],
    err: unknown,
  ]
}[keyof Events]
type Events = {
  0: null
  1: QueryResult<any> | null
  2: null
}
