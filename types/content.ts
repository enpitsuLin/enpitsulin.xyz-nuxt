import type { MarkdownParsedContent } from '@nuxt/content/dist/runtime/types'

export interface MarkdownContent extends MarkdownParsedContent {
  tags: string[]
  date: string
  image?: string
  slug: string
  draft?: boolean
  readingTime: {
    text: string
    time: number
    words: number
    minutes: number
  }
}
