import type { MarkdownParsedContent } from '@nuxt/content/dist/runtime/types'

export interface XLogMarkdownParsedContent extends MarkdownParsedContent {
  slug: string
  uri: string
  createAt: string
  updateAt: string
  publishAt: string
  tags: string[]
  summary: string
  readingTime: {
    text: string
    time: number
    words: number
    minutes: number
  }
}
