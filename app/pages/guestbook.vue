<script setup lang="ts">
useHead({
  title: '留言',
})
</script>

<template>
  <LayoutPageContainer
    title="留言墙"
    description="在这里，你可以留下什么想说的证明你来过这里的足迹，随便说些什么吧🤗。"
  >
    <div w-full>
      <ArticleComments :note-id="71" />
    </div>
  </LayoutPageContainer>
</template>
