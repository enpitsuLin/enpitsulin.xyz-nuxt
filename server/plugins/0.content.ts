import type { MarkdownNode, ParsedContent } from '@nuxt/content/dist/runtime/types'
import { SKIP, visit } from 'unist-util-visit'

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
        (node, _index, parent) => {
          if (!node.props)
            return
          if (isGithubRepoUrl(node.props.href) && parent?.children.length === 1)
            node.tag = 'prose-github-card'
        },
      )

      visit(
        file.body!,
        (node): node is MarkdownNode => {
          return 'tag' in node && node.tag === 'p'
            && 'children' in node && Array.isArray(node.children)
            && node.children.length === 1
            && node.children.at(0).type === 'element'
            && node.children.at(0).tag === 'prose-github-card'
        },
        (node, index, parent) => {
          if (!parent || typeof index === 'undefined' || !node.children)
            return false

          parent.children.splice(index, 1, ...node.children)
          return [SKIP, index]
        },
      )
    }
  })
})
