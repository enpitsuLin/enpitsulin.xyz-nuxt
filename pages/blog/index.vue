<script setup lang="ts">
import type { MarkdownContent } from '~/types/content'

useHead({
  title: '文章',
})

const page = ref(1)

const { data: total } = useAsyncData(
  'posts-count',
  () => queryContent()
    .where({
      $or: [
        {
          draft: {
            $exists: false,
          },
        },
        {
          draft: {
            $ne: true,
          },
        },
      ],
    })
    .count(),
)

const { data, pending } = useAsyncData(
  'blog-index',
  () => queryContent<MarkdownContent>()
    .where({
      $or: [
        {
          draft: {
            $exists: false,
          },
        },
        {
          draft: {
            $ne: true,
          },
        },
      ],
    })
    .limit(page.value * 10)
    .sort({ date: -1 })
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
  <div flex="~ col items-center" pt-20>
    <div flex="~ col">
      <header pb-20>
        <h2 pb-3 text-3xl>
          所有文章
        </h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui nihil voluptatum ex tempore, voluptatem tenetur, unde eligendi harum neque facilis nulla labore voluptate reprehenderit. Totam, sed mollitia. Aliquid, similique nam?
        </p>
      </header>
      <div pl="md:6" border="md:l border">
        <ul flex="~ col gap-16">
          <li v-for="article in data" :key="article._id">
            <BlogArticle :article />
          </li>
        </ul>
      </div>
    </div>

    <div v-if="!isReachEnd" mt-30>
      <div class="loader" />
    </div>
  </div>
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
