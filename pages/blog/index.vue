<script setup lang="ts">
import type { MarkdownContent } from '~/types/content'

useHead({
  title: '文章',
})

const { data } = await useAsyncData(
  'blog-index',
  () => queryContent<MarkdownContent>()
    .where({
      $or: [
        {
          draft: {
            $exists: false,
          },
        },
        {
          draft: {
            $ne: true,
          },
        },
      ],
    })
    .sort({ date: -1 })
    .find(),
)
</script>

<template>
  <div>
    <ul flex="~ col gap-12">
      <li v-for="article in data" :key="article._id">
        <ArticleCard v-bind="article" />
      </li>
    </ul>
  </div>
</template>
