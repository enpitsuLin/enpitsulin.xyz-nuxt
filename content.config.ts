import { defineCollection, defineCollectionSource, defineContentConfig, z } from '@nuxt/content'
import { createStorage } from 'unstorage'

import { xLogStorageDriver } from './storage/xlog-driver'

const CHARACTER_ID = 54315

const storage = createStorage<string>({
  driver: xLogStorageDriver({
    characterId: CHARACTER_ID,
    baseURL: 'https://ipfs.crossbell.io/ipfs/',
    ttl: 60 * 60,
  }),
})

function xLogPostsSource(type: 'post' | 'portfolio' | 'page') {
  return defineCollectionSource({
    getKeys: async () => {
      const keys = await storage.getKeys()
      return keys.filter(key => key.startsWith(`${type}:`)).map(key => key.replace(`${type}:`, ''))
    },
    getItem: async (key: string) => {
      const content = await storage.getItem(`${type}:${key}`)
      if (type === 'portfolio') {
        return JSON.stringify(content)
      }
      return content!
    },
  })
}

const posts = defineCollection({
  type: 'page',
  source: xLogPostsSource('post'),
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
  source: xLogPostsSource('page'),
})

const portfolios = defineCollection({
  type: 'data',
  source: xLogPostsSource('portfolio'),
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
