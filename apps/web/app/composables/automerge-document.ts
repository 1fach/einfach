import type { AnyDocumentId, DocHandleChangePayload } from '@automerge/automerge-repo/slim'
import type { ChangeFn, ChangeOptions, Doc } from '@automerge/automerge/slim/next'

export const useAutomergeDocument = <T> (
  id: AnyDocumentId,
): [
  ComputedRef<Doc<T> | undefined>,
  (changeFn: ChangeFn<T>, options?: ChangeOptions<T> | undefined) => void,
] => {
  const store = useAutomergeStore<T>()
  store.setDocHandleAndDoc(id)

  const onChange = (h: DocHandleChangePayload<T>) => store.setDocHandleAndDoc(h.handle.url)
  const onDelete = () => store.setDocHandleAndDoc()
  const cleanUp = () => {
    if (!store.docHandle) return
    store.docHandle.removeListener('change', onChange)
    store.docHandle.removeListener('delete', onDelete)
  }

  onMounted(() => {
    if (!store.docHandle) return

    store.docHandle.on('change', onChange)
    store.docHandle.on('delete', onDelete)
  })
  onUnmounted(() => cleanUp())

  const changeDoc = (changeFn: ChangeFn<T>, options?: ChangeOptions<T> | undefined) => {
    if (!store.docHandle) return
    store.docHandle.change(changeFn, options)
  }

  return [computed(() => store.doc as Doc<T>), changeDoc] as const
}
