<script setup lang="ts">
const { y } = useWindowScroll()
const isClient = import.meta.client
</script>

<template>
  <section flex="~ col" min-h="[calc(100vh-7rem)]" class="mb-10 max-w-50rem text-center sm:mb-0">
    <div flex="~ items-center justify-center">
      <div relative>
        <div class="view-transition-avatar">
          <img
            alt="developer-image" width="250" height="250" decoding="async"
            class="h-28 w-28 border-[0.35rem] border-white rounded-full object-cover shadow-xl"
            src="https://avatars.githubusercontent.com/enpitsuLin"
          >
        </div>
        <span
          absolute bottom-0 right-0 cursor-default text-4xl
          class="transition-transform view-transition-avatar-wave-hand hover:animate-name-wave-hand hover:animate-duration-1000 hover:animate-iteration-infinite"
        >
          👋
        </span>
      </div>
    </div>
    <div
      class="mt-auto hidden pb-6 pt-8 transition-opacity duration-500 sm:flex sm:justify-center"
      :class="isClient && y > 20 ? 'op-0' : 'op-100'"
    >
      <span class="animate-bounce text-gray-500">
        <i inline-block class="i-mingcute:right-line rotate-90" />
      </span>
    </div>
  </section>
</template>

<style>
@keyframes wave-hand {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(30deg) scale(1.1);
  }
  100% {
    transform: rotate(0deg);
  }
}

::view-transition-group(avatar) {
  animation-duration: 300ms;
}

::view-transition-group(avatar-wave-hand) {
  animation-duration: 1ms;
}
</style>
