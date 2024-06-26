import type { MarkdownParsedContent, ParsedContent } from '@nuxt/content/dist/runtime/types'

export interface NotePostParsedContent extends MarkdownParsedContent {
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

export interface NotePortfolioParsedContent extends ParsedContent {
  id: number
  cover: string
  summary: string
  title: string
  href: string
}
