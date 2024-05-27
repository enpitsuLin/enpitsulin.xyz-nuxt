<script setup lang="ts">
import type { RouteLocationRaw } from '#vue-router'

defineProps<{
  href: RouteLocationRaw
}>()
</script>

<template>
  <NuxtLink
    flex="~ items-center justify-center"
    h-full w-full cursor-pointer px-3
    active-class="bg-white dark:bg-zinc-200 rounded-full view-transition-navbar-link"
    :href="href"
    class="navbar-link relative transition-color hover:text-zinc-9 dark:hover:text-zinc-6"
  >
    <slot />
  </NuxtLink>
</template>

<style>
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
