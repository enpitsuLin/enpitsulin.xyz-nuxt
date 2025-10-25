<script setup lang="ts">
const { data } = await useAsyncData(
  'about',
  async () => queryCollection('pages').path('/pages/about').first(),
)
</script>

<template>
  <LayoutPageContainer title="关于我">
    <template #header>
      <ContentRenderer
        v-if="data" w-full
        text-14px
        tag="article"
        class="animate-delay-100 prose animate-in fade-in slide-in-from-left-16 max-w-unset! animate-duration-800! animate-ease-$spring-easing! dark:prose-invert" :value="data"
      />
    </template>
  </LayoutPageContainer>
</template>
