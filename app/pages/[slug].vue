<script setup lang="ts">
const route = useRoute('slug')

const { data } = await useAsyncData(
  `post:${route.params.slug}`,
  () => queryContent(`post`, `${route.params.slug}`)
    .only(['slug'])
    .findOne(),
)
if (data.value) {
  await navigateTo({
    name: 'blog-slug',
    params: { slug: route.params.slug },
    replace: true,
  })
}
else {
  throw createError('Not Found')
}
</script>

<template>
  {{ data }}
</template>
