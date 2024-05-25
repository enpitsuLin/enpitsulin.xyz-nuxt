<script setup lang="ts">
import { appName } from '~/constants'
import '~/styles/base.css'

useHead({
  title: appName,
  titleTemplate(title) {
    return `${title} - ${appName}`
  },
  bodyAttrs: {
    class: ' text-gray-950 dark:text-gray-50 bg-slate-50 dark:bg-black bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px] dark:bg-[radial-gradient(#e5e7eb20_1px,transparent_1px)]',
  },
})
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>
