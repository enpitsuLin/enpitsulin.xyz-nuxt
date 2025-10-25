<script setup lang="ts">
useHead({
  title: '留言',
})

const { data } = await useAsyncData(
  'guestbook',
  async () => queryCollection('pages').path('/pages/guestbook').first(),
)
</script>

<template>
  <LayoutPageContainer
    title="留言墙"
  >
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
