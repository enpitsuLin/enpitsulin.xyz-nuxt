<script setup lang="ts">
useHead({
  title: 'Tags',
})

const { data } = useAsyncData(async () => {
  const tags = await queryContent({
    where: [
      {
        tags: {
          $exists: true,
        },
      },
    ],
  }).only(['tags', 'title'])
    .find()
    .then((posts) => {
      return posts.map(p => p.tags).flat()
    })
  const tagCountMap = tags.reduce((acc, curTag) => {
    if (curTag in acc)
      acc[curTag]++
    else acc[curTag] = 1
    return acc
  }, {} as Record<string, number>)
  return Object.entries(tagCountMap)
})
</script>

<template>
  <div flex="~ wrap gap-2">
    <Tag
      v-for="([tag, count]) in data" :key="tag" :tag
      flex="inline items-center gap-1"
    >
      {{ count }}
    </Tag>
  </div>
</template>
