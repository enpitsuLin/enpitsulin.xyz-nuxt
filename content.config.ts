import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const posts = defineCollection({
  type: 'page',
  source: 'posts/**.md',
  schema: z.object({
    title: z.string(),
    lang: z.enum(['en']).optional(),
    publishAt: z.date(),
    updateAt: z.date().optional(),
    tags: z.array(z.string()),
    excerpt: z.object({
      type: z.string(),
      children: z.any(),
    }),
    meta: z.object({
      readingTime: z.object({
        text: z.string(),
        minutes: z.number(),
        time: z.number(),
        words: z.number(),
      }),
    }),
    draft: z.boolean().default(false).optional(),
  }),
})

const pages = defineCollection({
  type: 'page',
  source: 'pages/**.md',
})

const portfolios = defineCollection({
  type: 'data',
  source: 'projects/**.json',
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
