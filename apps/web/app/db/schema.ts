import { column, defineTable, type InferDatabase } from 'kysely-sqlite-builder/schema'

const testTable = defineTable({
  columns: {
    id: column.increments(),
    name: column.string(),
    blobtest: column.blob(),
  },
  primary: 'id',
  timeTrigger: { create: true, update: true },
})

export const dbTables = {
  test: testTable,
}

export type DatabaseSchema = InferDatabase<typeof dbTables>
