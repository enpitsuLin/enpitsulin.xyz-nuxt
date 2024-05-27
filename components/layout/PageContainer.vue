<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div v-if="route.meta.title && route.meta.description" flex="~ col items-center" pt-10>
    <header pb="10 md:20">
      <h2 pb-10 font-bold text="4xl md:6xl">
        {{ route.meta.title }}
      </h2>
      <p>
        {{ route.meta.description }}
      </p>
    </header>
    <slot />
  </div>
</template>
