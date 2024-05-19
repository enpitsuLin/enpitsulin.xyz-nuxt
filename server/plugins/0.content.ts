import type { MarkdownNode, ParsedContent } from '@nuxt/content/dist/runtime/types'
import { visit } from 'unist-util-visit'

declare module 'nitropack' {
  export interface NitroRuntimeHooks {
    'content:file:beforeParse': (file: ParsedContent) => void
    'content:file:afterParse': (file: ParsedContent) => void
  }
}
const GITHUB_HOST_REG = /https:\/\/github.com\/\S+\/\S+/
function isGithubRepoUrl(url: string) {
  return url.match(GITHUB_HOST_REG)
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('content:file:afterParse', (file) => {
    if (file._id.endsWith('.md')) {
      visit(
        file.body!,
        (node): node is MarkdownNode => 'tag' in node && node.tag === 'a',
        (node) => {
          if (!node.props)
            return
          if (isGithubRepoUrl(node.props.href))
            node.tag = 'prose-github-card'
        },
      )
    }
  })
})
