<script setup lang="ts">
import { appDescription, appName } from '~/constants'
import '~/styles/base.css'

useHead({
  titleTemplate(title) {
    if (title)
      return `${title} - ${appName}`
    return `${appName} - ${appDescription}`
  },
  bodyAttrs: {
    class: 'text-gray-950 dark:text-gray-50 bg-slate-50 dark:bg-black bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px] dark:bg-[radial-gradient(#e5e7eb20_1px,transparent_1px)]',
  },
})

const nuxtApp = useNuxtApp()
const loaded = ref(false)
nuxtApp.hook('page:finish', () => {
  loaded.value = true
})
</script>

<template>
  <NuxtLoadingIndicator />
  <Transition
    leave-active-class="transition-opacity duration-800"
    leave-to-class="op-0"
  >
    <div
      v-if="!loaded" fixed inset-0 z-99999 flex="~ items-center justify-center"
      class="bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px] bg-slate-50 text-gray-950 dark:bg-[radial-gradient(#e5e7eb20_1px,transparent_1px)] dark:bg-black dark:text-gray-50"
    >
      <div flex="~ items-center justify-center" class="app-loader space-x-2 dark:invert">
        <span class="sr-only">Loading...</span>
        <div class="h-8 w-8 animate-bounce animate-delay-300 rounded-full bg-black" />
        <div class="h-8 w-8 animate-bounce animate-delay-150 rounded-full bg-black" />
        <div class="h-8 w-8 animate-bounce rounded-full bg-black" />
      </div>
    </div>
  </Transition>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
