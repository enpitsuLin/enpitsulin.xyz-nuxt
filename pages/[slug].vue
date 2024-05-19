<script setup lang="ts">
import ProseInput from '~/components/content/ProseInput.vue'

const route = useRoute('slug')
const { data } = await useAsyncData('home', () => queryContent(route.params.slug).findOne())
if (!data.value)
  throw createError('Not Found')

const components = {
  input: ProseInput,
}
</script>

<template>
  <div>
    <article class="prose w-full!">
      <ContentRenderer :value="data!">
        <template #empty>
          <p>No content found.</p>
        </template>
        <ContentRendererMarkdown :value="data!" :components />
      </ContentRenderer>
    </article>
  </div>
</template>
