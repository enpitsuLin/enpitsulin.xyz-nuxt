import type { MarkdownParsedContent } from '@nuxt/content/dist/runtime/types'

export interface XLogMarkdownParsedContent extends MarkdownParsedContent {
  slug: string
  uri: string
  create_time: string
  update_time: string
  publish_time: string
  tags: string[]
  readingTime: {
    text: string
    time: number
    words: number
    minutes: number
  }
}
