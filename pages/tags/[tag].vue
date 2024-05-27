<script setup lang="ts">
const route = useRoute('tags-tag')
const tag = route.params.tag
</script>

<template>
  <LayoutPageContainer
    :title="tag"
    description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum magni eius, recusandae aliquid maxime corporis earum et? Obcaecati necessitatibus adipisci totam perferendis reprehenderit qui. Suscipit perferendis at alias in minima!"
  >
    <h1>
      tags/:tag -- {{ tag }}
    </h1>
  </LayoutPageContainer>
</template>
