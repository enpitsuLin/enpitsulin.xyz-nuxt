<script setup lang="ts">
import { NuxtLink } from '#components'

withDefaults(
  defineProps<{
    as?: string | Component
    tag: string
  } >(),
  {
    as: NuxtLink as any,
  },
)
</script>

<template>
  <component
    :is="as"
    p="x-2 y-1" rounded-md text-sm
    bg="zinc-100 active:zinc-200 hover:zinc-200 dark:zinc-700/50 dark:active:zinc-700/50 dark:hover:zinc-700"
    class="text-zinc-900 outline-offset-2 transition active:text-zinc-900/60 dark:text-zinc-400 active:transition-none dark:active:text-zinc-100/70 dark:hover:text-zinc-100"
    v-bind="$attrs"
  >
    {{ tag }}
  </component>
</template>
