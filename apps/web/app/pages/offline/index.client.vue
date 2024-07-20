<script lang="ts" setup>
import { Repo } from '@automerge/automerge-repo'
import { IndexedDBStorageAdapter } from '@automerge/automerge-repo-storage-indexeddb'
import { BroadcastChannelNetworkAdapter } from '@automerge/automerge-repo-network-broadcastchannel'

type Task = {
  task: {
    title: string
    done: boolean
  }
}

const [repo, setRepo] = useAutomergeRepo()
setRepo(new Repo({
  storage: new IndexedDBStorageAdapter('einfach', 'docs'),
  network: [new BroadcastChannelNetworkAdapter()],
}))

if (repo.value == null) {
  throw new Error('Repo not initialized')
}

const listhandle = repo.value.create<Task>({
  task: {
    title: 'Learn Automerge',
    done: false,
  },
})
const [doc, changeDoc] = useAutomergeDocument<Task>(listhandle.url)

const generateRandomString = (length: number) =>
  Array.from({ length }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 62))).join('')

const done = () => changeDoc(doc => doc.task.title = generateRandomString(10))
</script>

<template>
  <div v-if="doc">
    <h1>
      {{ doc.task.title }}
    </h1>
    <button @click="done">
      {{ doc.task.done ? 'Undo' : 'Done' }}
    </button>
  </div>
</template>
