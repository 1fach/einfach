import { Factory, SQLITE_OPEN_READONLY, SQLITE_ROW } from 'wa-sqlite'

import SQLiteAsyncESMFactory from 'wa-sqlite/dist/wa-sqlite-async.mjs'
import { IDBBatchAtomicVFS } from './idb/IDBBatchAtomicVFS'

import type { InitOptions, SQLiteDB } from './types'

/* @ts-expect-error wasm type err */
import wasmUrl from '@/assets/wa-sqlite-async.wasm?url'

/**
 * load db
 * @param options init options
 */
export async function initSQLite(fileName: string, readonly?: boolean): Promise<SQLiteDB> {
  const { path, sqliteModule, vfs } = await useIdbStorage(fileName)
  const sqlite = Factory(sqliteModule)

  sqlite.vfs_register(vfs, true)
  const db = await sqlite.open_v2(
    path,
    readonly ? SQLITE_OPEN_READONLY : undefined,
  )
  return {
    path,
    vfs,
    db,
    sqlite,
    async close() {
      await sqlite.close(db)
    },
    changes() {
      return sqlite.changes(db)
    },
    async lastInsertRowId() {
      return await new Promise<number>(resolve => sqlite.exec(
        db,
        'SELECT last_insert_rowid()',
        ([id]) => resolve(id as number),
      ))
    },
    async run(sql: string, parameters?: SQLiteCompatibleType[]) {
      const str = sqlite.str_new(db, sql)
      try {
        const prepared = await sqlite.prepare_v2(db, sqlite.str_value(str))

        if (!prepared) {
          return []
        }

        const stmt = prepared.stmt
        try {
          parameters?.length && sqlite.bind_collection(stmt, parameters)

          const rows: Record<string, SQLiteCompatibleType>[] = []
          const cols = sqlite.column_names(stmt)

          while ((await sqlite.step(stmt)) === SQLITE_ROW) {
            const row = sqlite.row(stmt)
            rows.push(Object.fromEntries(cols.map((key, i) => [key, row[i]])))
          }
          return rows
        }
        finally {
          await sqlite.finalize(stmt)
        }
      }
      finally {
        sqlite.str_finish(str)
      }
    },
  }
}

/**
 * storage data in IndexedDB,
 * use IDBBatchAtomicVFS with `wa-sqlite-async.wasm` (larger than sync version), better compatibility
 * @param fileName db file name
 * @param options options
 */
export async function useIdbStorage(
  fileName: string,
): Promise<InitOptions> {
  const idbName = 'idb-sqlite-vfs'
  const sqliteModule = await SQLiteAsyncESMFactory({ locateFile: () => wasmUrl })
  const vfs = new IDBBatchAtomicVFS(idbName, { durability: 'relaxed', purge: 'deferred',
    purgeAtLeast: 16 })
  return {
    path: fileName.endsWith('.db') ? fileName : `${fileName}.db`,
    sqliteModule,
    vfs,
  }
}
