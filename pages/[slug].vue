<script setup lang="ts">
import { ProseGithubCard, ProseInput } from '#components'

const route = useRoute('slug')
const { data } = await useAsyncData('home', () => queryContent(route.params.slug).findOne())
if (!data.value)
  throw createError('Not Found')
const components = {
  'input': ProseInput,
  'prose-github-card': ProseGithubCard,
}
</script>

<template>
  <div>
    <article class="text-14px prose w-full!">
      <ContentRenderer :value="data!">
        <template #empty>
          <p>No content found.</p>
        </template>
        <ContentRendererMarkdown :value="data!" :components="components" />
      </ContentRenderer>
    </article>
  </div>
</template>
