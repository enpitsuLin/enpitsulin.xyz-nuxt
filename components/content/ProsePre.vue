<script lang="ts" setup>
defineProps<{
  code: string
  language?: string
  filename?: string
  highlights?: number[]
  meta?: string
}>()
</script>

<template>
  <div class="group" relative my-6 of-hidden rounded-sm>
    <div
      v-if="!filename && language"
      aria-hidden="true" uppercase
      class="pointer-events-none absolute bottom-3 right-3 z-10 text-xs opacity-30"
    >
      {{ language }}
    </div>
    <div
      v-if="filename && language"
      bg="#d4d4d8/20"
      flex="~ items-center justify-between"
      class="z-10 w-full rounded-t-xl px-5 py-2 text-sm"
    >
      <span class="shrink-0 grow truncate">{{ filename }}</span>
      <span uppercase class="pointer-events-none shrink-0 grow-0" aria-hidden="true">{{ language }}</span>
    </div>
    <div relative bg="#d4d4d8/5">
      <ProseCodeCopyButton :source="code" />
      <div relative of-hidden>
        <pre px-4><slot /></pre>
      </div>
    </div>
  </div>
</template>
