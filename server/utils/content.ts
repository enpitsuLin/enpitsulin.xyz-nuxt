import type { MarkdownNode, MarkdownRoot } from '@nuxt/content'
import { SKIP, visit } from 'unist-util-visit'

const GITHUB_HOST_REG = /https:\/\/github.com\/\S+\/\S+/
function isGithubRepoUrl(url: string) {
  return typeof url === 'string' && url.match(GITHUB_HOST_REG)
}

export function parseLinkNode(node: MarkdownNode | MarkdownRoot) {
  visit(
    node,
    (node): node is MarkdownNode => 'tag' in node && node.tag === 'a',
    (node, _index, parent) => {
      if (!node.props)
        return
      if (isGithubRepoUrl(node.props.href) && parent?.children.length === 1)
        node.tag = 'prose-github-card'
    },
  )
}

export function unwrapElement(node: MarkdownNode | MarkdownRoot) {
  visit(
    node,
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
      return [SKIP, index] as const
    },
  )
}
