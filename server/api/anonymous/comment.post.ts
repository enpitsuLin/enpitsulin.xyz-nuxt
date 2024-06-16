import { createContract } from 'crossbell'
import z from 'zod'

const anonymousCommentSchema = z.object({
  targetCharacterId: z.number(),
  targetNoteId: z.number(),
  content: z.string(),
  name: z.string(),
  email: z.string(),
  url: z.string(),
})

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const contract = createContract(runtimeConfig.anonymousePrivateKey as `0x${string}`)
  const characterId = Number(runtimeConfig.anonymouseCharacterId)

  const form = await readValidatedBody(event, anonymousCommentSchema.safeParse)

  if (!form.success)
    throw createError('Missing required fields')

  const {
    targetCharacterId,
    targetNoteId,
    content,
    name,
    email,
    url,
  } = form.data

  const { data } = await contract.note.postForNote({
    targetCharacterId,
    targetNoteId,
    characterId,
    metadataOrUri: {
      tags: ['comment'],
      sources: ['xlog'],
      content,
      attributes: [
        {
          trait_type: 'xlog_sender_name',
          value: name,
        },
        {
          trait_type: 'xlog_sender_email',
          value: email,
        },
        {
          trait_type: 'xlog_sender_url',
          value: url,
        },
      ],
    },
  })

  return { data: { noteId: data.noteId } }
})
