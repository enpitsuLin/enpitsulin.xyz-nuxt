import type { MarkdownParsedContent, ParsedContent } from '@nuxt/content/dist/runtime/types'

export interface XLogPostParsedContent extends MarkdownParsedContent {
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

export interface XLogPortfolioParsedContent extends ParsedContent {
  id: number
  cover: string
  summary: string
  title: string
  href: string
}
