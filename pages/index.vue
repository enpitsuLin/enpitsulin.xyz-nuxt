<script setup lang="ts">
const { data } = await useAsyncData('index', () => queryContent().sort({ date: -1 }).find())
</script>

<template>
  <div>
    <ul>
      <li v-for="item in data" :key="item._id">
        <ContentRendererMarkdown
          tag="article"
          excerpt
          :value="item"
          border="~ rounded"
          p-4
        />
      </li>
    </ul>
  </div>
</template>
