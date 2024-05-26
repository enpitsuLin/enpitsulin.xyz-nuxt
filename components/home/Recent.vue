<script setup lang="ts">
import type { MarkdownContent } from '~/types/content'

const { data } = await useAsyncData(
  'recent-posts',
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
    .only(['title', 'draft', 'date', 'description', 'slug', 'tags', 'readingTime', '_id'])
    .limit(4)
    .find(),
)
</script>

<template>
  <h1
    flex="~ items-center justify-between"
    class="text-3xl text-zinc-700 font-bold tracking-tight sm:text-4xl dark:text-zinc-100"
    pb-12
  >
    Recent Posts
    <Button as-child>
      <NuxtLink
        role="button"
        href="/blog"
      >
        <span text-sm>View all</span>
      </NuxtLink>
    </Button>
  </h1>
  <div grid="~ cols-1 md:cols-2 gap-16">
    <HomeRecentArticle
      v-for="article in data"
      :key="article._id"
      :article
    />
  </div>
</template>
