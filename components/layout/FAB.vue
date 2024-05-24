<script setup lang="ts">
const colorMode = useColorMode()

function onClick() {
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'
}

const { y } = useWindowScroll()
</script>

<template>
  <div
    fixed bottom-5 right-3 p-1
    flex="~ col items-center justify-between gap-y-2"
    border="~ border rounded-lg"
    class="shadow-2xl backdrop-blur-0.5rem transition-all sm:bottom-[3rem] sm:right-[3rem] dark:border-slate-700"
  >
    <button
      type="button"
      flex="~ items-center justify-center" of-hidden
      class="size-8 bg-opacity-80 transition-all active:scale-105 hover:scale-115"
      @click="onClick"
    >
      <span class="sr-only">change dark mode</span>
      <i v-if="colorMode.preference === 'dark'" inline-block class="i-mingcute:moon-line" />
      <i v-else-if="colorMode.preference === 'light'" inline-block class="i-mingcute:sun-line" />
      <i v-else inline-block class="i-mingcute:computer-line" />
    </button>
    <Transition
      enter-active-class="transition-property-[height,opacity] duration-300 ease-in-out"
      leave-active-class="transition-property-[height,opacity] duration-300 ease-in-out"
      enter-from-class="h-0 op-0"
      leave-to-class="h-0 op-0"
    >
      <button
        v-if="y > 100"
        type="button"
        flex="~ items-center justify-center" of-hidden
        class="size-8 bg-opacity-80 transition-all active:scale-105 hover:scale-115"
      >
        <i inline-block class="i-mingcute:up-line" />
      </button>
    </Transition>
  </div>
</template>
