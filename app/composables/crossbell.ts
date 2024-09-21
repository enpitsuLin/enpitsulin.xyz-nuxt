import type { CharacterEntity, LinkEntity, ListResponse } from 'crossbell'
import { createIndexer } from 'crossbell'

export const indexer = createIndexer()

export function useNoteLike(characterId: number, noteId: number) {
  return useAsyncData(
    `comment:${characterId}:${noteId}:like`,
    async () => {
      const res = await indexer.fetch<ListResponse<LinkEntity>>(
        `/notes/${characterId}/${noteId}/backlinks`,
        { params: { linkType: 'like', limit: 20 } },
      )

      return res.count
    },
    { server: false },
  )
}

export function useCharacterFollows(characterId: number) {
  return useAsyncData(
    `comment:${characterId}:follows`,
    async () => {
      const res = await indexer.fetch<ListResponse<LinkEntity>>(
        `/characters/${characterId}/links`,
        { params: { linkType: 'follow' } },
      )

      return res.count
    },
    { server: false },
  )
}

export function useCharacterFollowers(characterId: number) {
  return useAsyncData(
    `comment:${characterId}:followers`,
    async () => {
      const res = await indexer.fetch<ListResponse<LinkEntity>>(
        `/characters/${characterId}/backlinks`,
        { params: { linkType: 'follow', limit: 20 } },
      )

      return res.count
    },
    { server: false },
  )
}

export function useCharacterBio(characters: CharacterEntity) {
  return characters.metadata?.content?.bio ?? ''
}
