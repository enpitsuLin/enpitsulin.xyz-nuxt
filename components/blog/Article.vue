<script setup lang="ts">
import { formatDate } from '@vueuse/core'
import type { XLogMarkdownParsedContent } from '~/types/content'

interface Props {
  article: Pick<XLogMarkdownParsedContent, 'slug' | 'title' | 'createTime' | 'publishTime' | 'updateTime' | 'description' | 'tags' | 'summary'>
}
const { article } = defineProps<Props>()
</script>

<template>
  <article class="md:grid md:grid-cols-4 md:items-baseline">
    <div class="group relative flex flex-col items-start md:col-span-3">
      <h2 class="text-base text-zinc-800 font-semibold tracking-tight dark:text-zinc-100">
        <div class="absolute z-0 scale-95 bg-zinc-50 opacity-0 transition -inset-x-4 -inset-y-6 group-hover:scale-100 sm:rounded-2xl dark:bg-zinc-800/50 group-hover:opacity-100 sm:-inset-x-6" />
        <NuxtLink :to="{ name: 'blog-slug', params: { slug: article.slug } }">
          <span class="absolute z-20 -inset-x-4 -inset-y-6 sm:rounded-2xl sm:-inset-x-6" />
          <span class="relative z-10">{{ article.title ?? "Untitled Post" }}</span>
        </NuxtLink>
      </h2>
      <time class="relative z-10 order-first mb-3 flex items-center pl-3.5 text-sm text-zinc-500 md:hidden dark:text-zinc-500" :datetime="article.publishTime">
        <span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
          <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        </span>
        {{ formatDate(new Date(article.publishTime), 'MMM DD YYYY', { locales: 'zh-Hans' }) }}
      </time>
      <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {{ article.summary || article.description }}
      </p>
      <div aria-hidden="true" class="relative z-10 mt-4 flex items-center text-sm text-accent font-medium">
        Read article
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1 h-4 w-4 stroke-current">
          <path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>
    <div relative z-10 order-first class="hidden md:flex" flex="col items-start">
      <time class="mb-3 mt-1 text-sm text-zinc-500 dark:text-zinc-500" :datetime="article.publishTime">
        {{ formatDate(new Date(article.publishTime), 'MMM DD YYYY', { locales: 'zh-Hans' }) }}
      </time>
      <div flex="~ gap-1 wrap" pr-10>
        <Tag v-for="tag in article.tags" :key="tag" :tag text-xs />
      </div>
    </div>
  </article>
</template>
