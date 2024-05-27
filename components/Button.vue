<script setup lang="ts">
import { ark } from '@ark-ui/vue'

defineProps<ButtonProps>()

const Root = ark.button

interface ButtonProps {
  asChild: boolean
}
</script>

<template>
  <Root
    :as-child="asChild"
    flex="inline items-center justify-center gap-2"
    bg="zinc-100 active:zinc-200 hover:zinc-200 dark:zinc-800/50 dark:active:zinc-800/50 dark:hover:zinc-800"
    rounded-md text-sm font-medium p="x-3 y-2"
    class="text-zinc-900 outline-offset-2 transition active:text-zinc-900/60 dark:text-zinc-400 active:transition-none dark:active:text-zinc-100/70 dark:hover:text-zinc-100"
  >
    <slot />
  </Root>
</template>
