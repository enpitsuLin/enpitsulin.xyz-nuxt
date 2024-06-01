<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div flex="~ col items-center" pt-10>
    <header pb="10 md:20">
      <h2
        pb-10 font-bold text="4xl md:6xl" capitalize
        class="animate-duration-800 animate-ease-$spring-easing animate-in fade-in-0 slide-in-from-left-16"
      >
        {{ title }}
      </h2>
      <p class="animate-duration-800 animate-delay-100 animate-ease-$spring-easing animate-in fade-in-0 slide-in-from-left-16">
        {{ description }}
      </p>
      <slot name="header" />
    </header>
    <slot />
  </div>
</template>
