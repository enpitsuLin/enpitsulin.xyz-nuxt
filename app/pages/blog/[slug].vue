<script setup lang="ts">
import { ProseDetails, ProseGithubCard, ProseInput, ProseSummary } from '#components'
import { toc } from '~/composables/content'

const route = useRoute('blog-slug')

const { data } = await useAsyncData(
  `post:${route.params.slug}`,
  () => queryCollection('posts')
    .path(`/posts/${route.params.slug}`)
    .first(),
)

const {
  data: surroundData,
} = useAsyncData('surround', () => {
  if (!data.value)
    return Promise.resolve([])

  return queryCollectionItemSurroundings(
    'posts',
    data.value?.path ?? '',
    {
      after: 1,
      before: 1,
      fields: ['title'],
    },
  )
    .order('publishAt', 'DESC')
})

watch(data, (val) => {
  if (val)
    toc.value = val.body?.toc?.links ?? null
}, { immediate: true })

const components = {
  'input': ProseInput,
  'prose-github-card': ProseGithubCard,
  'details': ProseDetails,
  'summary': ProseSummary,
}

const formatDate = useDateFormat(
  () => data.value?.publishAt,
  'YYYY MMM DD dddd',
  {
    locales: 'zh-Hans',
  },
)

useHead({
  title: computed(() => data.value?.title ?? ''),
})

if (!data.value)
  throw createError('Not Found')
</script>

<template>
  <div
    id="zoom-positioner"
    data-part="positioner"
  />

  <div mt-16 text-14px flex="~ justify-between">
    <div text="1.1em" class="w-full md:w-80%" pb-20 pr="0 md:7.5" border="md:r border">
      <header
        pb-10 space-y-10 bg="gradient-to-r [position:bottom] [size:10px_1px] repeat-x"
        class="from-border to-transparent"
      >
        <section flex="~ items-center wrap gap-2" text-sm op-80>
          <div flex="~ items-center gap-2">
            <span class="sr-only">发布时间</span>
            <i inline-block class="i-mingcute:calendar-fill" />
            <time :datetime="data?.publishAt">{{ formatDate }}</time>
          </div>
          <div v-if="data?.meta.readingTime.minutes" flex="~ items-center gap-2">
            <span class="sr-only">阅读时间</span>
            <i inline-block class="i-mingcute:time-fill" />
            <span>约 {{ Math.ceil(data?.meta.readingTime.minutes) }} 分钟</span>
          </div>
        </section>
        <h1 text-4xl font-semibold>
          {{ data?.title }}
        </h1>
        <section>
          <ul flex="~ wrap items-center gap-2" tracking-tight>
            <li v-for="tag in data?.tags ?? []" :key="tag">
              <ArticleTag :tag="tag" />
            </li>
          </ul>
        </section>
      </header>
      <ContentRenderer
        :value="data!" tag="article" :components="components"
        text-15px
        class="max-w-unset prose dark:prose-invert"
      >
        <template #empty>
          <p>No content found.</p>
        </template>
      </ContentRenderer>
    </div>
    <aside sticky top-80px ml-4 w="20%" h-full pb-20 class="hidden md:block">
      <h2 class="m-[20px_0_10px]">
        Table of content
      </h2>
      <nav pl-4>
        <TocLinks :links="data?.body?.toc?.links" />
      </nav>
    </aside>
  </div>
  <footer mx="-8 sm:-12" px="8 sm:12" border="t border">
    <nav flex="~ justify-between" my-20px>
      <NuxtLink
        v-if="surroundData?.[0]"
        flex="~ col items-start" space-y-5px max-w="1/2"
        :to="{ name: 'blog-slug', params: { slug: surroundData[0].path.replace('/posts/', '') } }"
      >
        <p op-50>
          Next
        </p>
        <p>{{ surroundData[0].title }}</p>
      </NuxtLink>
      <div v-else aria-hidden="true" />
      <NuxtLink
        v-if="surroundData?.[1]"
        flex="~ col items-end" space-y-5px max-w="1/2"
        :to="{ name: 'blog-slug', params: { slug: surroundData[1].path.replace('/posts/', '') } }"
      >
        <p op-50>
          Previous
        </p>
        <p>{{ surroundData[1].title }}</p>
      </NuxtLink>
      <div v-else aria-hidden="true" />
    </nav>
  </footer>
</template>
