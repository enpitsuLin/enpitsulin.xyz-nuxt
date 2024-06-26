import RSS from 'rss'
import { serverQueryContent } from '#content/server'
import { description, siteUrl, title } from '~/constants'

export default defineEventHandler(async (event) => {
  try {
    const posts = await serverQueryContent(event).where({ _type: 'markdown', _source: 'xlog' }).sort({ publishAt: -1 }).find()

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
        description: post.summary ?? post.description,
        url: new URL(`/blog/${post.slug}`, siteUrl).toString(),
        date: post.publishAt,
      })
    })

    setHeader(event, 'Content-Type', 'text/xml')
    return feed.xml()
  }
  catch (e) {
    return e
  }
})
