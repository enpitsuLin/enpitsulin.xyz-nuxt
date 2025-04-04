<script setup lang="ts">
const route = useRoute('blog-tags-tag')
const tag = route.params.tag

const { data } = await useAsyncData(
  `blog-tags:${tag}`,
  () => queryCollection('posts')
    .all()
    .then(posts => posts.filter(post => post.tags.includes(tag))),
)
</script>

<template>
  <LayoutPageContainer
    :title="`标签: ${tag}`"
    :description="`共 ${data?.length ?? 0} 个结果`"
  >
    <div w-full pl="md:6" border="md:l border">
      <ul flex="~ col gap-16">
        <li v-for="article in data" :key="article.id">
          <BlogArticle :article="article" />
        </li>
      </ul>
    </div>
  </LayoutPageContainer>
</template>
