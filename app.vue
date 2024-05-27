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
    enter-active-class="transition-opacity duration-500 ease-out"
    leave-active-class="transition-opacity duration-500 ease-out"
    enter-from-class="op-0"
    leave-to-class="op-0"
  >
    <div
      v-if="!loaded" fixed inset-0 z-99999 flex="~ items-center justify-center"
      class="bg-[size:16px_16px] bg-slate-50 text-gray-950 dark:bg-black dark:text-gray-50"
    >
      loading...
    </div>
  </Transition>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
