<script setup lang="ts">
import { ProseGithubCard, ProseInput } from '#components'
import { toc } from '~/composables/content'

const route = useRoute('blog-slug')

const { data } = await useAsyncData(
  'home',
  () => queryContent(route.params.slug).findOne(),
)

watch(data, (val) => {
  if (val)
    toc.value = val.body?.toc?.links ?? null
}, { immediate: true })

if (!data.value)
  throw createError('Not Found')
const components = {
  'input': ProseInput,
  'prose-github-card': ProseGithubCard,
}
</script>

<template>
  <div flex="~ col items-center">
    <div text-14px class="container">
      <ContentRenderer :value="data!">
        <template #empty>
          <p>No content found.</p>
        </template>
        <ContentRendererMarkdown tag="article" text="1.1em" class="prose" :value="data!" :components="components" />
      </ContentRenderer>
    </div>
  </div>
</template>
