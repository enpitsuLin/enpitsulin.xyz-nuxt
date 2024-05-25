<script setup lang="ts">
import type { RouteLocationRaw } from '#vue-router'

defineProps<{
  href: RouteLocationRaw
}>()
</script>

<template>
  <NuxtLink
    flex="~ items-center justify-center"
    h-full w-full cursor-pointer p-3
    active-class=" active"
    :href="href"
    class="navbar-link relative transition-color hover:text-gray-9 dark:hover:text-gray-6"
  >
    <slot />
  </NuxtLink>
</template>

<style>
.navbar-link.active {
  --at-apply: bg-white rounded-full;
  view-transition-name: navbar-link;
}

::view-transition-group(navbar-link) {
  mix-blend-mode: normal;
  background-clip: text;
  background-image: linear-gradient(0deg, white, white);
}
::view-transition-new(navbar-link),
::view-transition-old(navbar-link) {
  height: 100%;
}
</style>
