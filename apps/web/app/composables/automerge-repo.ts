import type { Repo } from '@automerge/automerge-repo'

export const useAutomergeRepo = () => {
  const store = useAutomergeStore()
  const setRepo = (repo: Repo) => {
    store.repo = repo
  }
  return [computed(() => store.repo), setRepo] as const
}
