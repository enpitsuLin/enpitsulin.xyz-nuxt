<script setup lang="ts">
const props = withDefaults(
  defineProps<{ href?: string, target?: '_blank' | '_parent' | '_self' | '_top' | (string & object) | null | undefined }>(),
  { href: '' },
)

const { type, url } = useParseHref(props.href)
</script>

<template>
  <ProseGithubCard v-if="LinkType.GithubRepo === type" :url />
  <NuxtLink
    v-else
    :href="url.toString()"
    :target="target"
  >
    <slot />
  </NuxtLink>
</template>
