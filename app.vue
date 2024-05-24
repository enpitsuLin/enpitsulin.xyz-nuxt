<script setup lang="ts">
import { appName } from '~/constants'
import '~/styles/base.css'

useHead({
  title: appName,
  bodyAttrs: {
    class: 'bg-gray-50 text-gray-950 relative dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90',
  },
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html,
body {
  height: 100%;
}

body {
  scroll-behavior: smooth;
  overflow-y: scroll;
}

#__nuxt {
  position: relative;
}
</style>
