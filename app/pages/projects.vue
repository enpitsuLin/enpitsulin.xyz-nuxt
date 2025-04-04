<script setup lang="ts">
useHead({
  title: '项目',
})

const { data } = await useAsyncData(
  'portfolio',
  () => queryCollection('portfolios').all(),
)
</script>

<template>
  <LayoutPageContainer title="项目" description="我是一个开源爱好者，一直在做一些小项目满足自己，但我的创意不是很多，这些是一些我觉得还不错令我自豪的作品。">
    <ul flex="~ col gap-12">
      <li v-for="item in data" :key="item.id">
        <div flex="~ gap-2 md:gap-4" class="group relative">
          <NuxtImg
            z-1
            provider="ipfs" :src="item.cover" :alt="item.title"
            class="aspect-video" max-w-60 rounded-md
          />
          <div h-full>
            <h2 mb-2>
              <div
                absolute z-0 op="0 group-hover:100"
                bg="zinc-50 dark:zinc-800/50"
                class="scale-95 transition -inset-x-2 -inset-y-4 group-hover:scale-100 sm:rounded-2xl sm:-inset-x-4"
              />
              <NuxtLink
                :href="item.href" external
                rel="noreferrer"
              >
                <span
                  absolute z-20
                  class="-inset-x-2 -inset-y-4 sm:rounded-2xl sm:-inset-x-4"
                />
                <span relative z-10>{{ item.title ?? 'Untitled Project' }}</span>
              </NuxtLink>
            </h2>
            <p :href="item.href" line-clamp-3 text-sm op-70>
              {{ item.summary }}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </LayoutPageContainer>
</template>
