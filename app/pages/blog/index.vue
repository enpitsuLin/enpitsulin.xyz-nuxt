<script setup lang="ts">
import Fuse from 'fuse.js'

useHead({
  title: '文章',
})

const page = ref(1)
const search = useRouteQuery('q', '', v => v === '' ? null : v)
const debounceSearch = refDebounced(search)

const { data: totalCount } = await useAsyncData('posts-count', () => queryCollection('posts').where('draft', '=', false).count())
const { data: searchData } = await useAsyncData('search-data', () => queryCollection('posts').where('draft', '=', false).all(), { lazy: true })

const { data, status } = await useAsyncData(
  'blog-index',
  () => {
    return queryCollection('posts')
      .limit(page.value * 10)
      .where('draft', '=', false)
      .order('publishAt', 'DESC')
      .all()
  },
  { watch: [page, debounceSearch] },
)

const fuse = new Fuse(searchData.value ?? [], {
  keys: ['title', 'description'],
})

const result = computed(() => {
  if (!search.value)
    return data.value ?? []
  return fuse.search(search.value).map(item => item.item)
})

const isReachEnd = computed(() => {
  if (data.value && totalCount.value)
    return (data.value?.length >= totalCount?.value)
  return true
})

useInfiniteScroll(
  () => document,
  loadMore,
  {
    distance: 10,
    canLoadMore: () => {
      if (status.value === 'pending' || isReachEnd.value)
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
    description="一般写博客文章是随心所欲的，想到什么就有可能会写一些，会希望能够把好用的技术知识传递给更多的人。喜欢围绕着技术为主的话题，但是也会写一些非技术的奇奇怪怪的话题。"
  >
    <template #header>
      <div relative mt-4>
        <input
          v-model="search"
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
    <div v-if="result.length > 0 " pl="md:6" border="md:l border" w-full>
      <ul flex="~ col gap-16" pb-16>
        <li v-for="article in result" :key="article.id">
          <BlogArticle :article="article" />
        </li>
      </ul>
    </div>

    <div v-else-if="status !== 'pending'">
      No Posts
    </div>

    <div v-if="!isReachEnd && status === 'pending'" mt-30>
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
