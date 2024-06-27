<script setup lang="ts">
import { useSchema } from 'kysely-sqlite-builder/schema'
import { db } from '@/db/client'
import { dbTables } from '@/db/schema'

async function testDB() {
  const result = await db.syncDB(useSchema(dbTables))
  if (!result.ready) {
    throw result.error
  }
  console.log(await db.execute(`PRAGMA table_info('test')`))

  for (let i = 0; i < 10; i++) {
    await db.transaction(async () => {
      await db.transaction(async () => {
        if (i > 8) {
          console.log('test rollback')
          throw new Error('test rollback')
        }
        await db
          .insertInto('test')
          .values({
            name: `test at ${Date.now()}`,
            blobtest: Uint8Array.from([2, 3, 4, 5, 6, 7, 8]),
          })
          .execute()
      })
    })
  }
  return await db
    .selectFrom('test')
    .selectAll()
    .execute()
    .then(async (data) => {
      await db.destroy()
      console.log(data)
      return data
    })
}

function testWaSqliteWorker() {
  console.log('start wa-sqlite-worker test')
  testDB()
    .then(async (data) => {
      data?.forEach(e => console.log('[wa-sqlite-worker]', e))
    })
}
</script>

<template>
  <button @click="testWaSqliteWorker()">
    test wa-sqlite in Worker (Better Compability)
  </button>
</template>
