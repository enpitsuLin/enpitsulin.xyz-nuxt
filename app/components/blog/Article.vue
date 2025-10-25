<script setup lang="ts">
import type { PostsCollectionItem } from '@nuxt/content'
import { formatDate } from '@vueuse/core'
import { vAnimationOnce } from '~/directives/v-animation-once'

interface Props {
  article: PostsCollectionItem
}
const { article } = defineProps<Props>()

const slug = computed(() => {
  return article.path.replace('/posts/', '')
})
</script>

<template>
  <article
    v-animation-once
    grid="md:~ md:cols-4 md:items-baseline"
    class="ease-$spring-easing animate-in zoom-in-70 [animation-fill-mode:both]! [animation-range:entry_0%,exit_100%]! [animation-timeline:view(y)]!"
  >
    <div
      relative
      flex="~ col items-start"
      class="group md:col-span-3"
    >
      <ArticleCardTitle :title="article.title" :slug="slug" />
      <ArticleCardTime :date="article.publishAt" class="md:hidden" />
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
