<script setup lang="ts">
import type { XLogMarkdownParsedContent } from '~/types/content'

useHead({
  title: '标签',
})

definePageMeta({
  title: '全部标签',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero neque recusandae atque earum a ut impedit dolor est temporibus animi repudiandae, similique fugit quisquam facilis autem, veniam doloribus hic reiciendis?',
})

const { data } = useAsyncData(
  'tags-index',
  async () => {
    const tags = await queryContent<XLogMarkdownParsedContent>()
      .where({
        _type: 'markdown',
        _source: 'xlog',
        tags: {
          $exists: true,
        },
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
  <LayoutPageContainer>
    <div flex="~ wrap gap-2" w-full>
      <ArticleTag
        v-for="([tag, count]) in data" :key="tag" :tag="tag"
        flex="inline items-center gap-1"
      >
        {{ count }}
      </ArticleTag>
    </div>
  </LayoutPageContainer>
</template>
