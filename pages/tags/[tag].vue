<script setup lang="ts">
const route = useRoute('tags-tag')
const tag = route.params.tag
</script>

<template>
  <h1>tags/:tag -- {{ tag }}</h1>
</template>
