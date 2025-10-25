import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import process, { cwd } from 'node:process'
import { defineCollection, defineCollectionSource, defineContentConfig, z } from '@nuxt/content'
import { createIndexer } from 'crossbell'
import { parseFrontMatter, stringifyFrontMatter } from 'remark-mdc'

const indexer = createIndexer()

const LIMIT = 100
const SOURCE = 'xlog'
const CHARACTER_ID = 54_315

function makeCacheFiles(cache: Map<string, string>) {
  // After all data is collected, process files in batch
  const cacheDir = join(cwd(), '.data')
  if (!existsSync(cacheDir)) {
    mkdirSync(cacheDir, { recursive: true })
  }

  // Process all cached files at once
  for (const [filename, content] of cache.entries()) {
    writeFileSync(join(cacheDir, filename), content, 'utf-8')
  }

  console.log(`Cache files saved to: ${cacheDir}`)
  console.log(`Total files cached: ${cache.size}`)
}

function buildSourceFromXLogNotes(
  type: 'post' | 'portfolio' | 'page',
  fileType: 'markdown' | 'json',
) {
  const options = {
    characterId: CHARACTER_ID,
    baseURL: 'https://ipfs.crossbell.io/ipfs',
  }

  const cache = new Map<string, string>()
  return defineCollectionSource({
    async prepare() {
      let cursor: string | null = null

      // First, collect all data into cache
      do {
        const notes = await indexer.note.getMany({
          characterId: options.characterId,
          includeNestedNotes: false,
          limit: LIMIT,
          sources: SOURCE,
          tags: type,
        })
        cursor = notes.cursor
        for (const note of notes.list) {
          if (fileType === 'markdown') {
            const attributes = note.metadata?.content?.attributes ?? []
            const slug = attributes.find(item => item.trait_type === 'xlog_slug')?.value?.toString() ?? `note-${note.noteId}`
            const summary = note.metadata?.content && 'summary' in note.metadata?.content ? /** @type {string} */(note.metadata?.content.summary) : ''
            const body = note.metadata?.content?.content ?? ''

            const tags = (note.metadata?.content?.tags ?? []).filter(tag => tag !== type)
            const { content, data } = parseFrontMatter(body)

            const markdownText = stringifyFrontMatter(
              {
                ...data,
                uri: note.uri,
                createAt: note?.createdAt ?? '',
                updateAt: note?.updatedAt ?? '',
                publishAt: note.metadata?.content?.date_published ?? '',
                title: note.metadata?.content?.title ?? '',
                tags,
                slug: slug ?? '',
                summary,
              },
              content,
            )

            // Store in cache only
            cache.set(`${slug}.md`, markdownText)
          }
          else {
            const attachments = note.metadata?.content?.attachments ?? []
            const cover = attachments.find(item => item.name === 'cover')?.address
            const title = note.metadata?.content?.title
            const summary = note.metadata?.content && 'summary' in note.metadata?.content ? note.metadata?.content?.summary : ''
            const external_urls = note.metadata?.content?.external_urls?.at(0)

            const jsonContent = JSON.stringify({ id: note.noteId, cover, summary, title, href: external_urls }, null, 2)

            // Store in cache only
            cache.set(`${note.noteId}.json`, jsonContent)
          }
        }
      } while (cursor)

      if (process.env.NODE_ENV === 'development') {
        makeCacheFiles(cache)
      }
    },
    getKeys: async () => {
      return Array.from(cache.keys())
    },
    getItem: async (path: string) => {
      if (!cache.has(path)) {
        throw new Error(`Error: Not found`)
      }
      return cache.get(path)!
    },
  })
}

const posts = defineCollection({
  type: 'page',
  source: buildSourceFromXLogNotes('post', 'markdown'),
  schema: z.object({
    uri: z.string(),
    updateAt: z.string(),
    publishAt: z.string(),
    slug: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    meta: z.object({
      readingTime: z.object({
        text: z.string(),
        minutes: z.number(),
        time: z.number(),
        words: z.number(),
      }),
    }),
  }),
})

const pages = defineCollection({
  type: 'page',
  source: buildSourceFromXLogNotes('page', 'markdown'),
})

const portfolios = defineCollection({
  type: 'data',
  source: buildSourceFromXLogNotes('portfolio', 'json'),
  schema: z.object({
    cover: z.string(),
    title: z.string(),
    summary: z.string(),
    href: z.string(),
  }),
})

export default defineContentConfig({
  collections: {
    pages,
    posts,
    portfolios,
  },
})
