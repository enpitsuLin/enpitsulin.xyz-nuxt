<script setup lang="ts">
const props = defineProps<{ id?: string, level: number }>()
const tag = `h${props.level}`
</script>

<template>
  <component :is="tag" :id="id" class="group flex items-center">
    <span>
      <slot />
    </span>
    <a
      flex="inline"
      op="0 group-hover:100 focus:100"
      class="transition-opacity duration-200"
      role="button"
      tabindex="0"
      aria-hidden="true"
      ml-2 select-none text-accent
      :href="`#${id}`"
    >
      <i class="i-mingcute:hashtag-line" size-1em />
    </a>
  </component>
</template>
