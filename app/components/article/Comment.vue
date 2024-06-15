<script setup lang="ts">
import { type LinkEntity, type ListResponse, type NoteEntity, createIndexer } from 'crossbell'

import { parseMarkdown } from '@nuxtjs/mdc/runtime'

const { comment } = defineProps<{ comment: NoteEntity & { fromNotes?: ListResponse<NoteEntity> } }>()

const { data } = await useAsyncData(
  `comment:${comment.characterId}:${comment.noteId}`,
  async () => {
    const res = await createIndexer()
      .fetch<ListResponse<LinkEntity>>(
      `/notes/${comment.characterId}/${comment.noteId}/backlinks`,
      { params: { linkType: 'like', limit: 20 } },
      )

    return res.count
  },
  { server: false },
)

const content = computed(() => comment.metadata?.content?.content)

const { data: ast } = await useAsyncData(
 `markdown-content:${comment.characterId}:${comment.noteId}`,
 () => parseMarkdown(content.value ?? ''),
 { watch: [content], server: false },
)
</script>

<template>
  <div flex="~" class="comment">
    <div mr-3>
      <div flex="inline items-center justify-center">
        <NuxtImg
          provider="ipfs"
          :src="comment.character?.metadata?.content?.avatars?.[0]"
          of-hidden rounded-full
          object-cover
          width="48"
          height="48"
          class="size-10 md:size-12"
        />
      </div>
    </div>

    <div flex="~ 1 col gap-1">
      <NuxtLink
        is-external
        :href="`https://${comment.character?.handle}.xlog.app`"
        class="text-xs md:text-sm" text-accent
      >
        {{ comment.character?.metadata?.content?.name }}
      </NuxtLink>
      <div mb-2 class="text-xs md:text-sm">
        <ContentRenderer :value="ast">
          <template #empty>
            <p>No content found.</p>
          </template>
          <ContentRendererMarkdown
            tag="article"
            class="relative max-w-unset prose"
            :value="ast?.body!"
          />
        </ContentRenderer>

        <div flex="~ items-center gap-2">
          <button
            type="button"
            flex="inline items-center"
            class="rounded-full text-[13px] text-gray-500 hover:c-rose"
          >
            <i class="i-mingcute:thumb-up-2-fill mr-1 text-base" />
            <span class="leading-snug">{{ data }}</span>
          </button>
          <button
            type="button"
            flex="inline items-center"
            class="rounded-full text-[13px] text-gray-500"
          >
            <i class="i-mingcute:comment-fill mr-1 text-base" />
            <span class="leading-snug">{{ comment.fromNotes?.list.length ?? 0 }}</span>
          </button>
        </div>
      </div>
      <div
        v-if="(comment.fromNotes?.list.length ?? 0) > 0"
        flex="~ col gap-2"
      >
        <Comment
          v-for="c in comment.fromNotes?.list"
          :key="`${c.characterId}:${c.noteId}`"
          :comment="c"
        />
      </div>
    </div>
  </div>
</template>
