<script setup lang="ts">
import type { XLogMarkdownParsedContent } from '~/types/content'

useHead({
  title: '文章',
})

const page = ref(1)

const { data: total } = useAsyncData(
  'posts-count',
  () => queryContent()
    .where({ _type: 'markdown', _source: 'xlog' })
    .count(),
)

const { data, pending } = useAsyncData(
  'blog-index',
  () => queryContent<XLogMarkdownParsedContent>()
    .where({ _type: 'markdown', _source: 'xlog' })
    .limit(page.value * 10)
    .sort({ publishAt: -1 })
    .find(),
  { watch: [page] },
)

const isReachEnd = computed(() => {
  return (data.value && total.value && data.value?.length >= total?.value)
})

useInfiniteScroll(
  () => document,
  loadMore,
  {
    distance: 10,
    canLoadMore: () => {
      if (pending.value || isReachEnd.value)
        return false
      return true
    },
  },
)
async function loadMore() {
  page.value++
}
</script>

<template>
  <LayoutPageContainer
    title="全部文章"
    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero neque recusandae atque earum a ut impedit dolor est temporibus animi repudiandae, similique fugit quisquam facilis autem, veniam doloribus hic reiciendis?"
  >
    <template #header>
      <div relative mt-4>
        <input
          b="~ border rounded-md"
          h-10 w-full bg-transparent
          flex="~" p="x-3 l-12 r-2" text-sm
          class="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent/50"
          type="text"
          placeholder="搜索文章"
        >
        <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="search">
          <i class="i-mingcute:search-line absolute left-4 top-1/2 size-5 -translate-y-1/2" />
        </label>
      </div>
    </template>
    <div pl="md:6" border="md:l border">
      <ul flex="~ col gap-16">
        <li v-for="article in data" :key="article._id">
          <BlogArticle :article="article" />
        </li>
      </ul>
    </div>

    <div v-if="!isReachEnd" mt-30>
      <div class="loader" />
    </div>
  </LayoutPageContainer>
</template>

<style>
.loader {
  width: 48px;
  height: 48px;
  display: inline-block;
  position: relative;
}
.loader::after,
.loader::before {
  content: '';
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  left: 0;
  top: 0;
  animation: animloader 2s linear infinite;
}
.loader::after {
  animation-delay: 1s;
}

@keyframes animloader {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
