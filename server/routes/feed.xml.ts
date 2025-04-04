import { queryCollection } from '#imports'
import RSS from 'rss'
import { description, siteUrl, title } from '~/constants'

export default defineEventHandler(async (event) => {
  try {
    const posts = await queryCollection(event, 'posts')
      .all()

    const feed = new RSS({
      title,
      description,
      site_url: siteUrl,
      feed_url: new URL(`/feed.xml`, siteUrl).toString(),
      language: 'zh-Hans',
    })

    posts.forEach((post) => {
      feed.item({
        title: post.title ?? 'Untitled Post',
        description: post.description,
        url: new URL(`/blog/${post.slug}`, siteUrl).toString(),
        date: new Date(post.publishAt),
      })
    })

    setHeader(event, 'Content-Type', 'text/xml')
    return feed.xml()
  }
  catch (e) {
    return e
  }
})
