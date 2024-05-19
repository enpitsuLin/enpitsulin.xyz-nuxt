const GITHUB_HOST = 'github.com'

function isGithubRepoUrl(url: URL) {
  return (
    url.hostname === GITHUB_HOST
    && url.pathname.startsWith('/')
    && url.pathname.split('/').length === 3
  )
}

function isGistUrl(url: URL) {
  return url.hostname === 'gist.github.com'
}

export enum LinkType {
  GithubRepo,
  Gist,
  None,
}

export function useParseHref(href: MaybeRef<string>) {
  const url = computed(() => {
    return new URL(toValue(href), import.meta.url)
  })

  return {
    type: computed(() => {
      if (isGistUrl(url.value))
        return LinkType.Gist

      if (isGithubRepoUrl(url.value))
        return LinkType.GithubRepo
      return LinkType.None
    }),
    url,
  }
}
