import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import { parseLinkNode, unwrapElement } from '../utils/content'

declare module 'nitropack' {
  export interface NitroRuntimeHooks {
    'content:file:beforeParse': (file: ParsedContent) => void
    'content:file:afterParse': (file: ParsedContent) => void
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
