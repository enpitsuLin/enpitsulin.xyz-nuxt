<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div flex="~ col items-center" pt-10>
    <header pb="10 md:20">
      <h2 pb-10 font-bold text="4xl md:6xl" capitalize>
        {{ title }}
      </h2>
      <p>
        {{ description }}
      </p>
    </header>
    <slot />
  </div>
</template>
