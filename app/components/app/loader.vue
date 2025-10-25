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
      v-if="!loaded"
      fixed inset-0 z-999
      grid="~ place-items-center"
      class="bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px] bg-slate-50 text-gray-950 dark:bg-[radial-gradient(#e5e7eb20_1px,transparent_1px)] dark:bg-black dark:text-gray-50"
    >
      <div class="app-loader">
        <div class="app-loader__fin" />
        <div class="app-loader__fin" />
        <div class="app-loader__fin" />
      </div>
    </div>
  </Transition>
</template>

<style>
.app-loader {
  width: 6rem;
  aspect-ratio: 2 / 1.5;
  background: canvas;
  border: 1px solid canvasText;
  position: relative;
  transform-style: preserve-3d;
  rotate: x 125deg;
  animation: app-loader-spin 1s infinite;
  --webkit-animation: app-loader-spin 1s infinite;
  border-radius: 12px;
}

@keyframes app-loader-spin {
  to {
    --webkit-transform: rotate3d(0, 1, 0, 360deg);
    transform: rotate3d(0, 1, 0, 360deg);
  }
}

.app-loader__fin {
  position: absolute;
  inset: -1px;
  background: canvas;
  border: 1px solid canvasText;
  transform: rotateY(calc(45deg + var(--i, 0) * 45deg));
  border-radius: 12px;
}

.app-loader::after,
.app-loader__fin::after {
  content: '';
  position: absolute;
  box-shadow: inset 0 0 20px 5px canvasText;
  opacity: 0.25;
  inset: -1px;
  border: 1px solid canvasText;
  border-radius: 12px;
}
.app-loader__fin:nth-of-type(1) {
  --i: 0;
}
.app-loader__fin:nth-of-type(2) {
  --i: 1;
}
.app-loader__fin:nth-of-type(3) {
  --i: 2;
}
</style>
