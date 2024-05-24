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
        w-full cursor-pointer p-3
        :href="href"
        @click="navigate"
      >
        <span v-if="isExactActive" class="navbar-link" absolute inset-0 rounded-full bg-white z="-1" />

        <span
          class="relative transition-color hover:text-gray-9 dark:hover:text-gray-6"
        >

          <slot />
        </span>
      </a>
    </template>
  </RouterLink>
</template>

<style>
.navbar-link {
  view-transition-name: navbar-link;
}

::view-transition-group(navbar-link) {
  animation-duration: 0.25s;
  mix-blend-mode: exclusion;
}
::view-transition-new(navbar-link),
::view-transition-old(navbar-link) {
  height: 100%;
}
</style>
