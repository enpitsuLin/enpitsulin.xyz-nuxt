<script setup lang="ts">
const { href } = defineProps<{ href: string, rel?: 'noopener' | 'noreferrer' | 'nofollow' | 'sponsored' | 'ugc' }>()

const { url } = useParseHref(href)

const target = ref<HTMLDivElement>()

const { data, pending } = useAsyncData(
  `github-repo${url.value.pathname.replaceAll('/', ':')}`,
  () => $fetch<{ name: string, stargazers_count: number, description: string, owner: { avatar_url: string } }>(`https://api.github.com/repos${url.value.pathname}`),
)
</script>

<template>
  <NuxtLink
    ref="target" :href="url.toString()" :rel="rel" target="_blank"
    flex="~ justify-between items-center gap-4"
    m="x-auto" p="x-4 y-2"
    relative max-w-110 min-h-24 w-full rounded-md bg-accent:10 decoration-none
  >
    <ProseGithubCardSkeleton v-if="pending" />
    <template v-else>
      <div flex="~ col grow-1 shrink-1 gap-1 basis-auto" min-w0>
        <div flex="~ justify-between">
          <div text-base>
            {{ data?.name }}
          </div>
          <div inline-flex shrink-0 items-center self-center gap-1 text-xs text="orange-400 dark:yellow-500">
            <i class="i-mingcute:star-line" />
            <span>{{ data?.stargazers_count }}</span>
          </div>
        </div>
        <div truncate text-xs op-60>
          {{ data?.description }}
        </div>
      </div>

      <div flex-shrink-0 aspect-ratio="1/1">
        <img :src="data?.owner?.avatar_url" alt="" size-12 rounded>
      </div>
    </template>
  </NuxtLink>
</template>
