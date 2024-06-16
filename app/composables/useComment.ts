interface AnonymousCommentBody {
  content: string
  name: string
  email: string
  url: string
}

export function useAnonymousComment(noteId: MaybeRefOrGetter<number>) {
  const { execute, ...rest } = useAsyncState(
    (body: AnonymousCommentBody) => $fetch('/api/anonymous/comment', {
      body: {
        targetCharacterId: 54315,
        targetNoteId: toValue(noteId),
        ...body,
      },
    }),
    null,
    { immediate: false },
  )

  return {
    ...rest,
    execute(body: AnonymousCommentBody) {
      return execute(0, body)
    },
  }
}
