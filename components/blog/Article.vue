<script setup lang="ts">
import { formatDate } from '@vueuse/core'
import type { XLogMarkdownParsedContent } from '~/types/content'

interface Props {
  article: Pick<XLogMarkdownParsedContent, 'slug' | 'title' | 'createAt' | 'publishAt' | 'updateAt' | 'description' | 'tags' | 'summary'>
}
const { article } = defineProps<Props>()
</script>

<template>
  <article grid="md:~ md:cols-4 md:items-baseline">
    <div
      relative
      flex="~ col items-start"
      class="group md:col-span-3"
    >
      <ArticleCardTitle :title="article.title" :slug="article.slug" />
      <ArticleCardTime :date="article.publishAt" class="md:hidden" />
      <p relative z-10 mt-2 text-sm text="zinc-600 dark:zinc-400">
        {{ article.summary || article.description }}
      </p>
      <div
        aria-hidden="true"
        relative z-10 mt-4 flex items-center text-sm text-accent font-medium
      >
        立即阅读
        <i inline-block class="i-mingcute:right-small-line ml-1 size-4" />
      </div>
    </div>
    <div relative z-10 order-first class="hidden md:flex" flex="col items-start">
      <time
        mb-3 mt-1 text-sm
        class="text-zinc-500 dark:text-zinc-500"
        :datetime="article.publishAt"
      >
        {{ formatDate(new Date(article.publishAt), 'MMM DD YYYY', { locales: 'zh-Hans' }) }}
      </time>
      <div flex="~ gap-1 wrap" pr-10>
        <ArticleTag v-for="tag in article.tags" :key="tag" :tag text-xs />
      </div>
    </div>
  </article>
</template>
