import type { ShallowRef } from 'vue'
import type { AnyDocumentId, DocHandle, Repo } from '@automerge/automerge-repo/slim'

interface State<T> {
  repo: ShallowRef<Repo | null>
  docHandle: ShallowRef<DocHandle<T> | null>
  doc: ShallowRef<T | null>
}

const store = <T> () => defineStore('offline-db', {
  state: (): State<T> => ({
    repo: shallowRef(null),
    docHandle: shallowRef(null),
    doc: shallowRef(null),
  }),
  actions: {
    setDocHandleAndDoc(id?: AnyDocumentId) {
      if (this.repo == null) {
        throw new Error('Repo not initialized')
      }

      const handle = id ? this.repo.find<T>(id) : null
      if (handle == null) {
        this.docHandle = null
        this.doc = null
      }
      else {
        this.docHandle = handle
        this.doc = handle.docSync() as T
      }
    },
  },
})

export const useAutomergeStore = <T> () => store<T>()()
