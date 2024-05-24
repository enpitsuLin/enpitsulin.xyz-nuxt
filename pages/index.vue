<script setup lang="ts">
const { data } = await useAsyncData('index', () => queryContent().sort({ date: -1 }).find())
</script>

<template>
  <div h-200vh>
    <HomeIntro />
  </div>
</template>
