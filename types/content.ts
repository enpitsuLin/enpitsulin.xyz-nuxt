import type { MarkdownParsedContent } from '@nuxt/content/dist/runtime/types'

export interface XLogMarkdownParsedContent extends MarkdownParsedContent {
  slug: string
  uri: string
  createTime: string
  updateTime: string
  publishTime: string
  tags: string[]
  readingTime: {
    text: string
    time: number
    words: number
    minutes: number
  }
}
