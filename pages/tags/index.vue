<script setup lang="ts">
import type { XLogMarkdownParsedContent } from '~/types/content'

useHead({
  title: '标签',
})

const { data } = useAsyncData(
  'tags-index',
  async () => {
    const tags = await queryContent<XLogMarkdownParsedContent>({
      where: [
        {
          tags: {
            $exists: true,
          },
        },
      ],
    })
      .only(['tags'])
      .find()
      .then((posts) => {
        return posts.map(p => p.tags).flat()
      })
    const tagCountMap = tags.reduce((acc, curTag) => {
      if (curTag in acc)
        acc[curTag]++
      else acc[curTag] = 1
      return acc
    }, {} as Record<string, number>)
    return Object.entries(tagCountMap)
  },
)
</script>

<template>
  <div flex="~ wrap gap-2">
    <ArticleTag
      v-for="([tag, count]) in data" :key="tag" :tag
      flex="inline items-center gap-1"
    >
      {{ count }}
    </ArticleTag>
  </div>
</template>
