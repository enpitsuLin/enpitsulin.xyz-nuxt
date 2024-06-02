<script setup lang="ts">
import type { XLogMarkdownParsedContent } from '~/types/content'

const route = useRoute('blog-tags-tag')
const tag = route.params.tag

const { data } = await useAsyncData(
  'blog-tags-tag',
  () => queryContent<XLogMarkdownParsedContent>()
    .where({ _type: 'markdown', _source: 'xlog' })
    .where({
      tags: {
        $contains: tag,
      },
    })
    .find(),
)
</script>

<template>
  <LayoutPageContainer :title="tag">
    <div pl="md:6" border="md:l border">
      <ul flex="~ col gap-16">
        <li v-for="article in data" :key="article._id">
          <BlogArticle :article="article" />
        </li>
      </ul>
    </div>
  </LayoutPageContainer>
</template>
