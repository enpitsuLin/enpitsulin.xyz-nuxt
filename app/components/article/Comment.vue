<script setup lang="ts">
import type { MDCParseOptions } from '@nuxtjs/mdc'
import { parseMarkdown } from '@nuxtjs/mdc/runtime'
import rehypeSanitize from 'rehype-sanitize'
import type { CharacterEntity, ListResponse, NoteEntity } from 'crossbell'
import { ProseDetails, ProseGithubCard, ProseInput, ProseSummary } from '#components'

const { comment } = defineProps<{ comment: NoteEntity & { fromNotes?: ListResponse<NoteEntity> } }>()

const { data } = await useNoteLike(comment.characterId, comment.noteId)

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

const timeAgo = useTimeAgo(new Date(comment.publishedAt))

function getCharacterSiteUrl(character: CharacterEntity) {
  // TODO: custom metadata attributes, TDB with some admin panel?
  if (character.metadata?.content?.attributes?.find(i => i.trait_type === 'xlog_alternate_site')?.value) {
    return `https://${character.metadata.content.attributes.find(i => i.trait_type === 'xlog_alternate_site')!.value}`
  }
  if (character.metadata?.content?.attributes?.find(i => i.trait_type === 'xlog_custom_domain')?.value) {
    return `https://${character.metadata.content.attributes.find(i => i.trait_type === 'xlog_custom_domain')!.value}`
  }
  return `https://${character?.handle}.xlog.app`
}

const components = {
  'input': ProseInput,
  'prose-github-card': ProseGithubCard,
  'details': ProseDetails,
  'summary': ProseSummary,
}
</script>

<template>
  <Suspense>
    <div flex="~" class="comment">
      <div mr-3>
        <CharacterAvatarHoverCard
          v-if="comment.character"
          :character="comment.character"
        />
      </div>

      <div flex="~ 1 col gap-1">
        <div flex="inline items-center">
          <NuxtLink
            is-external
            rel="noreferrer"
            :href="getCharacterSiteUrl(comment.character!)"
            class="text-xs md:text-sm" text-accent
          >
            {{ comment.character?.metadata?.content?.name }}
          </NuxtLink>
          <span px-1>·</span>
          <span text-sm op-70>{{ timeAgo }}</span>
        </div>
        <div mb-2 class="text-xs md:text-sm">
          <MDCRenderer
            v-if="ast"
            tag="article"
            class="relative mb-2 max-w-unset prose"
            :body="ast.body"
            :data="ast.data"
            :components
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

        <ul
          v-if="(comment.fromNotes?.list.length ?? 0) > 0"
          flex="~ col gap-2"
        >
          <li
            v-for="c in comment.fromNotes?.list"
            :key="`${c.characterId}:${c.noteId}`"
          >
            <Comment :comment="c" />
          </li>
        </ul>
      </div>
    </div>
    <template #fallback>
      <ArticleCommentSkeleton />
    </template>
  </Suspense>
</template>
