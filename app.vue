<script setup lang="ts">
import { defaultOgImage, description, siteUrl, title } from '~/constants'
import '~/styles/base.css'

useHead({
  titleTemplate(t) {
    if (t !== title)
      return `${t} - ${title}`
    return `${t} - ${description}`
  },
  bodyAttrs: {
    class: 'text-gray-950 dark:text-gray-50 bg-slate-50 dark:bg-black bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px] dark:bg-[radial-gradient(#e5e7eb20_1px,transparent_1px)]',
  },
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  ],
})

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage: defaultOgImage,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <AppLoader />
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
