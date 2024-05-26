<script setup lang="ts">
import { formatDate } from '@vueuse/core'

interface Props {
  title?: string
  date: string
  description?: string
  slug: string
}
defineProps<Props>()
</script>

<template>
  <article
    flex="~ col items-start"
    relative
    class="group"
  >
    <h2 class="text-base text-zinc-800 font-semibold tracking-tight dark:text-zinc-100">
      <div class="absolute z-0 scale-95 bg-zinc-50 opacity-0 transition -inset-x-4 -inset-y-6 group-hover:scale-100 sm:rounded-2xl dark:bg-zinc-800/50 group-hover:opacity-100 sm:-inset-x-6" />
      <NuxtLink :to="{ name: 'blog-slug', params: { slug } }">
        <span class="absolute z-20 -inset-x-4 -inset-y-6 sm:rounded-2xl sm:-inset-x-6" />
        <span class="relative z-10">{{ title ?? "Untitle Post" }}</span>
      </NuxtLink>
    </h2>
    <time class="relative z-10 order-first mb-3 flex items-center pl-3.5 text-sm text-zinc-500 dark:text-zinc-500" :datetime="date">
      <span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
        <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
      </span>
      {{ formatDate(new Date(date), 'MMM DD YYYY', { locales: 'en-US' }) }}
    </time>
    <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
      {{ description }}
    </p>
    <div aria-hidden="true" class="relative z-10 mt-4 flex items-center text-sm text-accent font-medium">
      Read article
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1 h-4 w-4 stroke-current">
        <path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
  </article>
</template>
