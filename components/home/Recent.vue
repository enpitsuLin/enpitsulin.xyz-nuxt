<script setup lang="ts">
import { formatDate } from '@vueuse/core'

const { data } = await useAsyncData(
  'recent-posts',
  () => queryContent()
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
    <article
      v-for="item in data"
      :key="item._id"
      flex="~ col items-start" relative
      class="group"
    >
      <h2 class="text-base text-zinc-800 font-semibold tracking-tight dark:text-zinc-100">
        <div class="absolute z-0 scale-95 bg-zinc-50 opacity-0 transition -inset-x-4 -inset-y-6 group-hover:scale-100 sm:rounded-2xl dark:bg-zinc-800/50 group-hover:opacity-100 sm:-inset-x-6" />
        <NuxtLink :to="{ name: 'blog-slug', params: { slug: item.slug } }">
          <span class="absolute z-20 -inset-x-4 -inset-y-6 sm:rounded-2xl sm:-inset-x-6" />
          <span class="relative z-10">{{ item.title }}</span>
        </NuxtLink>
      </h2>
      <time class="relative z-10 order-first mb-3 flex items-center pl-3.5 text-sm text-zinc-500 dark:text-zinc-500" datetime="2024-03-09">
        <span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
          <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        </span>
        {{ formatDate(new Date(item.date), 'MMM DD YYYY', { locales: 'en-US' }) }}
      </time>
      <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {{ item.description }}
      </p>
      <div aria-hidden="true" class="relative z-10 mt-4 flex items-center text-sm text-accent font-medium">
        Read article
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1 h-4 w-4 stroke-current">
          <path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </article>
  </div>
</template>
