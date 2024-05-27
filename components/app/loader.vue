<script setup lang="ts">
const nuxtApp = useNuxtApp()
const loaded = ref(false)

nuxtApp.hook('page:loading:end', () => {
  loaded.value = true
})
</script>

<template>
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
</template>
