<script setup lang="ts">
const colorMode = useColorMode()

function onClick() {
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <button
    type="button"
    flex="~ items-center justify-center" of-hidden
    class="size-8 bg-opacity-80 transition-all active:scale-105 hover:scale-115"
    @click="onClick"
  >
    <span class="sr-only">change dark mode</span>
    <ClientOnly>
      <i v-if="colorMode.preference === 'dark'" inline-block class="i-mingcute:moon-line" />
      <i v-else-if="colorMode.preference === 'light'" inline-block class="i-mingcute:sun-line" />
      <i v-else inline-block class="i-mingcute:computer-line" />
      <template #fallback>
        <i inline-block class="i-mingcute:computer-line" />
      </template>
    </ClientOnly>
  </button>
</template>
