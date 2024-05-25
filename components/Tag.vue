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
    p="x-2 y-1" rounded-md bg-accent:20 text-sm
    v-bind="$attrs"
  >
    {{ tag }}
  </component>
</template>
