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
</script>

<template>
  <div relative px="sm:8" flex="~ 1 justify-center">
    <div px="sm:8" pointer-events-none absolute inset-0 flex="~ justify-center">
      <div max-w-6xl w-full flex px="lg:8">
        <div w-full class="bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
      </div>
    </div>
    <div
      flex="~ 1 col items-center"
      px="lg:8" relative max-w-6xl w-full
    >
      <LayoutNavBar />
      <main relative mt-16 w-full px="8 sm:12">
        <slot />
      </main>
      <div mt-auto aria-hidden="true" />
      <LayoutFooter />
    </div>
  </div>
  <LayoutFAB />
</template>
