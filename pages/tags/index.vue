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
  <div flex="~ col items-center" pt-10>
    <header pb="10 md:20">
      <h2 pb-10 font-bold text="4xl md:6xl">
        所有标签
      </h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui nihil voluptatum ex tempore, voluptatem tenetur, unde eligendi harum neque facilis nulla labore voluptate reprehenderit. Totam, sed mollitia. Aliquid, similique nam?
      </p>
    </header>
    <div flex="~ wrap gap-2" w-full>
      <ArticleTag
        v-for="([tag, count]) in data" :key="tag" :tag
        flex="inline items-center gap-1"
      >
        {{ count }}
      </ArticleTag>
    </div>
  </div>
</template>
