<script setup lang="ts">
const route = useRoute('blog-tags-tag')
const tag = route.params.tag

const { data } = await useAsyncData(
  `blog-tags:${tag}`,
  () => queryCollection('posts')
    .where('draft', '=', false)
    .where('tags', 'LIKE', `%${tag}%`)
    .all(),
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
