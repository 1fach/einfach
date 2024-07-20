import type { AutomergeUrl } from '@automerge/automerge-repo/slim'
import type { ChangeFn, ChangeOptions, Doc } from '@automerge/automerge/slim/next'

export const useAutomergeDocument = <T>(
  id: string,
): [
  ComputedRef<Doc<T> | undefined>,
  (changeFn: ChangeFn<T>, options?: ChangeOptions<T> | undefined) => void,
] => {
  const [repo, _] = useAutomergeRepo()
  if (!repo.value) {
    throw new Error('Repo not initialized')
  }

  const docHandle = repo.value.find<T>(id as AutomergeUrl)
  const doc = useState<Doc<T>>('doc-state-' + id, () => shallowRef(docHandle.docSync() as Doc<T>))
  const refreshDoc = () => doc.value = docHandle.docSync() as Doc<T>

  const cleanUp = () => {
    if (docHandle) {
      docHandle.removeListener('change', refreshDoc)
      docHandle.removeListener('delete', refreshDoc)
    }
  }

  onMounted(() => {
    if (docHandle) {
      docHandle.on('change', refreshDoc)
      docHandle.on('delete', refreshDoc)
    }
  })
  onUnmounted(() => cleanUp())

  const changeDoc = (changeFn: ChangeFn<T>, options?: ChangeOptions<T> | undefined) => {
    if (docHandle) {
      docHandle.change(changeFn, options)
    }
  }

  return [computed(() => doc.value), changeDoc] as const
}
