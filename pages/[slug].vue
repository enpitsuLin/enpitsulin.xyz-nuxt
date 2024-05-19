<script setup lang="ts">
const route = useRoute('slug')
const { data } = await useAsyncData('home', () => queryContent(route.params.slug).findOne())
if (!data.value)
  throw createError('Not Found')
</script>

<template>
  <div>
    <article class="text-14px prose w-full!">
      <ContentRenderer :value="data!">
        <template #empty>
          <p>No content found.</p>
        </template>
        <ContentRendererMarkdown :value="data!" />
      </ContentRenderer>
    </article>
  </div>
</template>
