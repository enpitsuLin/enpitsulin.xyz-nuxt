<script setup lang="ts">
import { ProseGithubCard, ProseInput } from '#components'
import { toc } from '~/composables/content'

const route = useRoute('blog-slug')

const { data } = await useAsyncData(
  'slug',
  () => queryContent(route.params.slug).findOne(),
)

const {
  data: surroundData,
} = useAsyncData('surround', () => queryContent()
  .only(['slug', 'title'])
  .sort({ date: -1 })
  .findSurround({ slug: route.params.slug }))

watch(data, (val) => {
  if (val)
    toc.value = val.body?.toc?.links ?? null
}, { immediate: true })

const components = {
  'input': ProseInput,
  'prose-github-card': ProseGithubCard,
}

const formatDate = useDateFormat(
  () => data.value?.date,
  'YYYY MMM DD dddd',
  {
    locales: 'en-US',
  },
)

useHead({
  title: computed(() => data.value?.title ?? ''),
})

if (!data.value)
  throw createError('Not Found')
</script>

<template>
  <div text-14px flex="~ justify-between">
    <div
      text="1.1em" class="w-full md:w-80%" pb-20 pr="0 md:7.5"
      border="md:r border"
    >
      <header pb-10>
        <section flex="~ items-center wrap gap-2" pb-10 op-80>
          <div flex="~ items-center gap-2">
            <i inline-block class="i-mingcute:calendar-fill" />
            <time :datetime="data?.date">{{ formatDate }}</time>
          </div>
          <div flex="~ items-center gap-2">
            <i inline-block class="i-mingcute:time-fill" />
            <span>{{ data?.readingTime.text }}</span>
          </div>
        </section>
        <h1 pb-5 text-4xl font-semibold>
          {{ data?.title }}
        </h1>
        <section>
          <ul flex="~ wrap items-center gap-2" tracking-tight>
            <li
              v-for="tag in data?.tags ?? []"
              :key="tag"
            >
              <Tag :tag :to="{ name: 'tags-tag', params: { tag } }" />
            </li>
          </ul>
        </section>
      </header>
      <ContentRenderer :value="data!">
        <template #empty>
          <p>No content found.</p>
        </template>
        <ContentRendererMarkdown
          tag="article"
          class="max-w-unset prose"
          :value="data!"
          :components="components"
        />
      </ContentRenderer>
    </div>
    <aside sticky top-80px ml-4 w="20%" h-full class="hidden md:block">
      <h2 class="m-[20px_0_10px]">
        Table of content
      </h2>
      <nav pl-4>
        <TocLinks :links="data?.body?.toc?.links" />
      </nav>
    </aside>
  </div>
  <footer px="4 md:8" border="t border">
    <nav flex="~ justify-between" my-20px>
      <NuxtLink
        v-if="surroundData?.[0]"
        flex="~ col items-start" space-y-5px max-w="1/2"
        :to="{ name: 'blog-slug', params: { slug: surroundData[0].slug } }"
      >
        <p op-50>
          Previous
        </p>
        <p>{{ surroundData[0].title }}</p>
      </NuxtLink>
      <div v-else aria-hidden="true" />
      <NuxtLink
        v-if="surroundData?.[1]"
        flex="~ col items-end" space-y-5px max-w="1/2"
        :to="{ name: 'blog-slug', params: { slug: surroundData[1].slug } }"
      >
        <p op-50>
          Next
        </p>
        <p>{{ surroundData[1].title }}</p>
      </NuxtLink>
      <div v-else aria-hidden="true" />
    </nav>
  </footer>
</template>
