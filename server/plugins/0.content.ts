import { parseLinkNode, unwrapElement } from '../utils/content'
import type { XLogPostParsedContent } from '~/types/content'

declare module 'nitropack' {
  export interface NitroRuntimeHooks {
    'content:file:beforeParse': (file: XLogPostParsedContent) => void
    'content:file:afterParse': (file: XLogPostParsedContent) => void
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
