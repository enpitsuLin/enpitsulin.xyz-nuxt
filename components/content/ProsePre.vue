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
      v-if="filename && language"
      bg-accent:20
      flex="~ items-center justify-between"
      class="z-10 w-full rounded-t-xl px-5 py-2 text-sm"
    >
      <span class="shrink-0 grow truncate">{{ filename }}</span>
      <span class="pointer-events-none shrink-0 grow-0" aria-hidden="true">{{ language }}</span>
    </div>
    <div
      v-if="language && !filename"
      aria-hidden="true"
      class="pointer-events-none absolute bottom-3 right-3 z-10 text-sm opacity-60"
    >
      {{ language }}
    </div>
    <div relative bg-accent:5 px-4 py-5>
      <button
        bg-accent:80
        flex="~ items-center justify-center"
        op="0 group-hover:100"
        border="~ accent/5 rounded-md"
        class="absolute right-2 top-2 z-[1] p-1.5 text-xs text-white backdrop-blur duration-200 transition-property-[opacity,transform] hover:scale-110"
        tabindex="0"
      >
        <i class="i-mingcute:copy-2-fill size-4" />
      </button>
      <div relative of-hidden>
        <pre><slot /></pre>
      </div>
    </div>
  </div>
</template>
