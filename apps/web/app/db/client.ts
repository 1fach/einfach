import {
  WaSqliteWorkerDialect,
} from 'kysely-wasqlite-worker'
import { SqliteBuilder } from 'kysely-sqlite-builder'
import type { DatabaseSchema } from './schema'

import Worker from '@/assets/worker?worker'

const dialect = new WaSqliteWorkerDialect({
  fileName: 'einfach.db',
  worker: new Worker(),
  preferOPFS: false,
})

export const db = new SqliteBuilder<DatabaseSchema>({
  dialect,
  logger: console,
  onQuery: true,
})
