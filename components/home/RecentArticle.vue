<script setup lang="ts">
import type { XLogMarkdownParsedContent } from '~/types/content'

interface Props {
  article: Pick<XLogMarkdownParsedContent, 'slug' | 'title' | 'publishAt' | 'description' | 'summary'>
}
defineProps<Props>()
</script>

<template>
  <article
    flex="~ col items-start"
    relative
    class="group"
  >
    <ArticleCardTitle :title="article.title" :slug="article.slug" />
    <ArticleCardTime :date="article.publishAt" />
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
  </article>
</template>
