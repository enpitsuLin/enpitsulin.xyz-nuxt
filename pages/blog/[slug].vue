<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/types'
import { ProseGithubCard, ProseInput } from '#components'
import { toc } from '~/composables/content'

const route = useRoute('blog-slug')

const { data } = await useAsyncData(
  'slug',
  () => queryContent(route.params.slug).findOne(),
)

const {
  data: surroundData,
} = useAsyncData('surround', () => queryContent().findSurround({ slug: route.params.slug }))

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
  <div w-full>
    <div text-14px flex="~ justify-between">
      <ContentRenderer :value="data!">
        <template #empty>
          <p>No content found.</p>
        </template>
        <ContentRendererMarkdown
          tag="article"
          pr-7.5
          text="1.1em" class="max-w-unset w-80% prose"
          border="r gray-800"
          :value="data!"
          :components="components"
        />
      </ContentRenderer>
      <div sticky top-80px ml-4 w="20%" h-full class="hidden md:block">
        <h2 class="m-[20px_0_10px]">
          Table of content
        </h2>
        <nav pl-4>
          <TocLinks :links="data?.body?.toc?.links" />
        </nav>
      </div>
    </div>
    <footer border="t gray-800">
      <nav flex="~ justify-between" mt-20px>
        <NuxtLink
          v-if="surroundData?.[0]"
          flex="~ col items-start" space-y-5px
          :to="{ name: 'blog-slug', params: { slug: surroundData[0].slug } }"
        >
          <p op-70>
            Previous
          </p>
          <p>{{ surroundData[0].title }}</p>
        </NuxtLink>
        <div v-else aria-hidden="true" />
        <NuxtLink
          v-if="surroundData?.[1]"
          flex="~ col items-end" space-y-5px
          :to="{ name: 'blog-slug', params: { slug: surroundData[1].slug } }"
        >
          <p op-70>
            Next
          </p>
          <p>{{ surroundData[1].title }}</p>
        </NuxtLink>
        <div v-else aria-hidden="true" />
      </nav>
    </footer>
  </div>
</template>
