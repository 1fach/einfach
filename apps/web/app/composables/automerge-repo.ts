import type { Repo } from '@automerge/automerge-repo'

export const useAutomergeRepo = () => {
  const globalRepo = useState<Repo | null>('automerge-repo', () => shallowRef(null))
  const setRepo = (repo: Repo) => {
    globalRepo.value = repo
  }
  return [computed(() => globalRepo.value), setRepo] as const
}
