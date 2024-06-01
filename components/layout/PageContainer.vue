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
        class="animate-in fade-in slide-in-from-left-16 animate-duration-800! animate-ease-$spring-easing!"
      >
        {{ title }}
      </h2>
      <p class="animate-delay-100 animate-in fade-in slide-in-from-left-16 animate-duration-800! animate-ease-$spring-easing!">
        {{ description }}
      </p>
      <slot name="header" />
    </header>
    <slot />
  </div>
</template>
