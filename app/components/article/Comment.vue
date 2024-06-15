<script setup lang="ts">
import type {
  CharacterEntity,
  LinkEntity,
  ListResponse,
  NoteEntity,
} from 'crossbell'
import { createIndexer } from 'crossbell'
import { parseMarkdown } from '@nuxtjs/mdc/runtime'
import type { MDCParseOptions } from '@nuxtjs/mdc'
import rehypeSanitize from 'rehype-sanitize'

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

const ast = await parseMarkdown(
  comment.metadata?.content?.content ?? '',
  {
    rehype: {
      plugins: {
        'rehype-sanitize': {
          instance: rehypeSanitize,
          options: undefined,
        },
      },
    },
  } as MDCParseOptions,
)

function getCharacterSiteUrl(character: CharacterEntity) {
  // TODO: custom metadata attributes, TDB with some admin panel?
  if (character.metadata?.content?.attributes?.find(i => i.trait_type === 'xlog_alternate_site')) {
    return `https://${character.metadata.content.attributes.find(i => i.trait_type === 'xlog_alternate_site')!.value}`
  }
  if (character.metadata?.content?.attributes?.find(i => i.trait_type === 'xlog_custom_domain')) {
    return `https://${character.metadata.content.attributes.find(i => i.trait_type === 'xlog_custom_domain')!.value}`
  }
  return `https://${character?.handle}.xlog.app`
}
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
        rel="noreferrer"
        :href="getCharacterSiteUrl(comment.character!)"
        class="text-xs md:text-sm" text-accent
      >
        {{ comment.character?.metadata?.content?.name }}
      </NuxtLink>
      <div mb-2 class="text-xs md:text-sm">
        <MDCRenderer
          v-if="ast"
          tag="article"
          class="relative mb-2 max-w-unset prose"
          :body="ast.body"
          :data="ast.data"
        />

        <div flex="~ items-center gap-2">
          <button
            type="button"
            flex="inline items-center"
            class="rounded-full text-[13px] text-gray-500 hover:c-rose-600"
          >
            <i class="i-mingcute:thumb-up-2-fill mr-1 text-base" />
            <span class="leading-snug">{{ data }}</span>
          </button>
          <button
            type="button"
            flex="inline items-center"
            class="rounded-full text-[13px] text-gray-500 hover:c-accent"
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
