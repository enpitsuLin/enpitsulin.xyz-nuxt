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
import type { UseTimeAgoMessages, UseTimeAgoUnitNamesDefault } from '@vueuse/core'
import { AvatarFallback, AvatarImage, AvatarRoot } from '@ark-ui/vue'
import { ProseDetails, ProseGithubCard, ProseInput, ProseSummary } from '#components'

const { comment } = defineProps<{ comment: NoteEntity & { fromNotes?: ListResponse<NoteEntity> } }>()

const { data } = await useAsyncData(
  `comment:${comment.characterId}:${comment.noteId}:like`,
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

const messages: UseTimeAgoMessages<UseTimeAgoUnitNamesDefault> = {
  justNow: 'just now',
  past: n => n.match(/\d/) ? `${n}前` : n,
  future: n => n.match(/\d/) ? `${n}后` : n,
  month: (n, past) => n === 1
    ? past
      ? '上个月'
      : '下个月'
    : `${n}个月`,
  year: (n, past) => n === 1
    ? past
      ? '去年'
      : '明年'
    : `${n}年`,
  day: (n, past) => n === 1
    ? past
      ? '昨天'
      : '明天'
    : `${n}天`,
  week: (n, past) => n === 1
    ? past
      ? '上周'
      : '下周'
    : `${n}周`,
  hour: n => `${n}小时`,
  minute: n => `${n}分钟`,
  second: n => `${n}秒`,
  invalid: '未知时间',
}
const timeAgo = useTimeAgo(new Date(comment.publishedAt), { messages })

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

const img = useImage()

const components = {
  'input': ProseInput,
  'prose-github-card': ProseGithubCard,
  'details': ProseDetails,
  'summary': ProseSummary,
}
</script>

<template>
  <div flex="~" class="comment">
    <div mr-3>
      <AvatarRoot
        of-hidden rounded-full
        flex="inline items-center justify-center"
      >
        <AvatarFallback size-full bg-accent:50 text-xl flex="~ items-center justify-center" class="data-[state=hidden]:hidden">
          {{ comment.character?.metadata?.content?.name?.slice(0, 1) }}
        </AvatarFallback>
        <AvatarImage
          class="size-10 md:size-12"
          :src="img.getImage(comment.character?.metadata?.content?.avatars?.[0]!, { provider: 'ipfs' }).url"
          object-cover
          width="48"
          height="48"
          alt="avatar"
        />
      </AvatarRoot>
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
