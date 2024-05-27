<script setup lang="ts">
import type { XLogMarkdownParsedContent } from '~/types/content'

const { data } = await useAsyncData(
  'recent-posts',
  () => queryContent<XLogMarkdownParsedContent>()
    .where({ _type: 'markdown', _source: 'xlog' })
    .sort({ publishAt: -1 })
    .only(['title', 'draft', 'publishAt', 'description', 'slug', 'tags', 'readingAt', '_id', 'summary'])
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
    最新文章
    <Button as-child>
      <NuxtLink
        role="button"
        href="/blog"
      >
        <span text-sm>查看全部</span>
      </NuxtLink>
    </Button>
  </h1>
  <div grid="~ cols-1 md:cols-2 gap-16">
    <HomeRecentArticle
      v-for="article in data"
      :key="article._id"
      :article="article"
    />
  </div>
</template>
