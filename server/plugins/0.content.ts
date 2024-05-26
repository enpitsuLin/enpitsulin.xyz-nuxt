import { parseLinkNode, unwrapElement } from '../utils/content'
import type { XLogMarkdownParsedContent } from '~/types/content'

declare module 'nitropack' {
  export interface NitroRuntimeHooks {
    'content:file:beforeParse': (file: XLogMarkdownParsedContent) => void
    'content:file:afterParse': (file: XLogMarkdownParsedContent) => void
  }
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('content:file:afterParse', (file) => {
    if (file._id.endsWith('.md')) {
      parseLinkNode(file.body!)
      unwrapElement(file.body!)
    }
  })
})
