<script setup lang="ts">
const { data } = await useAsyncData(
  'recent-posts',
  () => queryCollection('posts')
    .order('publishAt', 'DESC')
    .select('id', 'title', 'publishAt', 'path', 'excerpt', 'description')
    .where('draft', '=', false)
    .limit(2)
    .all(),
)
</script>

<template>
  <section w-full flex="~ col items-center" pb-10>
    <h1
      flex="~ items-center justify-between" w-full
      class="text-3xl text-zinc-700 font-bold tracking-tight sm:text-4xl dark:text-zinc-100"
      pb-12
    >
      最新文章
      <Button as-child>
        <NuxtLink
          role="button"
          href="/blog"
        >
          <span text-sm>查看全部</span>
        </NuxtLink>
      </Button>
    </h1>
    <div grid="~ cols-1 md:cols-2 gap-16">
      <HomeRecentArticle
        v-for="article in data"
        :key="article.id"
        :article="article"
      />
    </div>
  </section>
</template>
