import type { CharacterEntity, LinkEntity, ListResponse } from 'crossbell'
import { createIndexer } from 'crossbell'

export const indexer = createIndexer()

export const connectorDialogStep = ref<'connectors' | 'metamask' | 'walletconnect' | 'coinbase' | 'sign-in'>('connectors')
export function setConnectorDialogStep(step: 'connectors' | 'metamask' | 'walletconnect' | 'coinbase' | 'sign-in') {
  connectorDialogStep.value = step
}

export const token = useLocalStorage('crossbell-token', '')

watchEffect(() => {
  if (token.value)
    indexer.siwe.token = token.value
})

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
