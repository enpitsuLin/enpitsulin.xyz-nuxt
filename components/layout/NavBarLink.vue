<script setup lang="ts">
import { type RouteLocationRaw, RouterLink } from '#vue-router'

defineProps<{
  href: RouteLocationRaw
}>()
</script>

<template>
  <RouterLink :to="href" custom>
    <template #default="{ isExactActive, navigate, href }">
      <a
        flex="~ items-center justify-center"
        class="transition hover:text-gray-950" w-full cursor-pointer p-3
        :class="isExactActive ? 'dark:hover:text-gray-600' : 'dark:hover:text-gray-300'"
        :href="href"
        @click="navigate"
      >
        <slot />
        <span v-if="isExactActive" class="navbar-link" absolute inset-0 rounded-full bg-white z="-1" />
      </a>
    </template>
  </RouterLink>
</template>

<style>
.navbar-link {
  view-transition-name: navbar-link;
}

::view-transition-new(navbar-link) {
  height: 100%;
}

::view-transition-old(navbar-link) {
  height: 100%;
}
</style>
