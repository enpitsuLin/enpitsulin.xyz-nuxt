<script setup lang="ts">
import { joinURL, withLeadingSlash, withTrailingSlash } from 'ufo'
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps<{
  src: string
  alt?: string
  width?: string | number
  height?: string | number
}>()

const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
    const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL))
    if (_base !== '/' && !props.src.startsWith(_base))
      return joinURL(_base, props.src)
  }
  return props.src
})
</script>

<template>
  <figure>
    <img
      :src="refinedSrc"
      :alt="alt"
      :width="width"
      :height="height"
    >
    <figcaption v-if="alt" mt-1 flex="~ col items-center justify-center">
      <hr op-80 class="my-3 h-[0.5px] w-[80px] border-0 bg-black/30 dark:bg-white/30">
      <span>{{ alt }}</span>
    </figcaption>
  </figure>
</template>
