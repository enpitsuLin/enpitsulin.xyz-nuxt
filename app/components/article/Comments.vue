<script setup lang="ts">
const { noteId } = defineProps<{ noteId: number }>()
const comment = ref<HTMLDivElement>()

const {
  data: commentData,
  status: commentStatus,
  execute,
} = await useAsyncData(
  `comment:${noteId}`,
  async () => {
    const res = await indexer.note.getMany({
      toNoteId: noteId,
      toCharacterId: 54315,
      includeCharacter: true,
      includeNestedNotes: true,
      limit: 5,
      nestedNotesDepth: 3,
      nestedNotesLimit: 20,
    })

    return res
  },
  { server: false, immediate: false },
)

const { stop } = useIntersectionObserver(
  comment,
  (entries) => {
    if (entries.at(0)?.isIntersecting) {
      execute()
      stop()
    }
  },
)
</script>

<template>
  <div ref="comment">
    <div mb-6 border="b border" pb-2>
      <div flex="~ gap-0.5">
        <span class="px-1" :class="[commentStatus === 'pending' && 'animate-pulse rounded-md bg-border ']">
          <span :class="[commentStatus === 'pending' && 'invisible']">{{ commentData?.count ?? 0 }}</span>
        </span>
        <span>
          评论
        </span>
      </div>
    </div>
    <div>
      //TODO form
    </div>
    <ul flex="~ col" divide-y divide-border divide-dashed>
      <li
        v-for="comment in commentData?.list"
        :key="`${comment.characterId}:${comment.noteId}`"
        class="not-first:pt-3 not-last:pb-3"
      >
        <ArticleComment :comment />
      </li>
    </ul>
  </div>
</template>
