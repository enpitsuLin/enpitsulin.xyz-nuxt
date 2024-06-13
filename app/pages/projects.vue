<script setup lang="ts">
import type { XLogPortfolioParsedContent } from '~/types/content'

useHead({
  title: '项目',
})

const { data } = await useAsyncData(
  'portfolio',
  () => queryContent<XLogPortfolioParsedContent>('portfolio').find(),
)
</script>

<template>
  <LayoutPageContainer title="项目" description="我是一个开源爱好者，一直在做一些小项目满足自己，但我的创意不是很多，这些是一些我觉得还不错令我自豪的项目。">
    <h1>projects</h1>
    <div>
      <div v-for="item in data" :key="item.id">
        <p> {{ item.title }}</p>
        <p>
          {{ item.summary }}
        </p>
      </div>
    </div>
  </LayoutPageContainer>
</template>
