<script setup lang="ts">
import type { PostsCollectionItem } from '@nuxt/content'

interface Props {
  article: Pick<PostsCollectionItem, 'path' | 'id' | 'title' | 'publishAt' | 'excerpt' | 'description'>
}
defineProps<Props>()
</script>

<template>
  <article
    flex="~ col items-start"
    relative
    class="group"
  >
    <ArticleCardTitle :title="article.title" :slug="article.path.replace('/posts/', '')" />
    <ArticleCardTime :date="article.publishAt" />
    <ContentRenderer
      v-if="article.excerpt"
      :value="article.excerpt"
      relative z-10 mt-2 text-sm
      text="zinc-600 dark:zinc-400"
      class="[&>p]:py-2"
    />
    <div v-else relative z-10 mt-2 text-sm text="zinc-600 dark:zinc-400">
      <p>{{ article.description }}</p>
    </div>
    <div
      aria-hidden="true"
      relative z-10 mt-4 flex items-center text-sm text-accent font-medium
    >
      立即阅读
      <i inline-block class="i-mingcute:right-small-line ml-1 size-4" />
    </div>
  </article>
</template>
