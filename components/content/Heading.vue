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
      select-noe ml-2 cursor-pointer op="0 group-hover:100"
      class="transition-opacity duration-200 group-hover:opacity-100"
      role="button"
      tabindex="0"
      aria-hidden="true"
      :href="`#${id}`"
    >
      <i class="i-mingcute:hashtag-line" />
    </a>
  </component>
</template>
