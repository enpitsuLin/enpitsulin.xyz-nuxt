<script setup lang="ts">
import type { NotePostParsedContent } from '~/types/content'

const route = useRoute('blog-tags-tag')
const tag = route.params.tag

const { data } = await useAsyncData(
  'blog-tags-tag',
  () => queryContent<NotePostParsedContent>('post')
    .where({
      tags: {
        $contains: tag,
      },
    })
    .find(),
)
</script>

<template>
  <LayoutPageContainer
    :title="`标签: ${tag}`"
    :description="`共 ${data?.length} 个结果`"
  >
    <div pl="md:6" border="md:l border">
      <ul flex="~ col gap-16">
        <li v-for="article in data" :key="article._id">
          <BlogArticle :article="article" />
        </li>
      </ul>
    </div>
  </LayoutPageContainer>
</template>
