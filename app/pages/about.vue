<script setup lang="ts">
useHead({
  title: '关于我',
})
const { data } = await useAsyncData(
  'about',
  async () => queryContent('page', 'about').findOne(),
)
</script>

<template>
  <LayoutPageContainer title="关于我">
    <template #header>
      <ContentRenderer v-if="data" :value="data">
        <ContentRendererMarkdown
          :value="data"
          w-full text-14px
          tag="article"
          class="animate-delay-100 prose animate-in fade-in slide-in-from-left-16 max-w-unset! animate-duration-800! animate-ease-$spring-easing!"
        />
      </ContentRenderer>
    </template>
  </LayoutPageContainer>
</template>
