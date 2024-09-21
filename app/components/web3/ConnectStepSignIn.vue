<script setup lang="ts">
import { useMutation, useQuery } from '@tanstack/vue-query';
import { useAccount, useDisconnect, useSignMessage } from '@wagmi/vue';

const { address } = useAccount()

const { disconnect } = useDisconnect()

const { signMessageAsync, data: signature } = useSignMessage()

const { mutateAsync: loginAsync } = useMutation({
  mutationFn: () => indexer.fetch<{ token: string }>('/siwe/login', {
    method: 'POST',
    data: { address: address.value, signature: signature.value },
  }),
  onSuccess: (data) => {
    token.value = data.token
  },
})

const { isLoading } = useQuery({
  queryKey: ['siwe', address.value],
  queryFn: async () => {
    const data = await indexer.fetch<{ message: string }>('/siwe/challenge', {
      method: 'POST',
      data: {
        address: address.value,
        domain: 'enpitsulin.xyz',
        uri: 'https://enpitsulin.xyz',
        statement: 'Sign in with Crossbell to the enpitsulin\'s blog.',
      },
    })
    await signMessageAsync({ message: data.message })
    await loginAsync()
    return true
  },
  enabled: () => !token.value,
})

const { data: character, isLoading: isCharacterLoading } = useQuery({
  queryKey: ['character', address.value, token.value],
  queryFn: async () => {
    const data = await indexer.character.getPrimary(address.value!)
    return data!
  },
  enabled: () => !!token.value && !!address.value,
})
</script>

<template>
  <div>
    <div v-if="isLoading">
      Loading...
    </div>
    <div v-else>
      <div
        v-if="!isCharacterLoading && character"
        flex="~ items-center gap-2"
      >
        <CharacterAvatar :character="character" />
        <div flex="~ col 1">
          <span>{{ character.metadata?.content?.name }}</span>
          <span text-sm text-accent:50>@{{ character.handle }}</span>
        </div>

        <button
          @click="() => disconnect()"
        >
          <div class="i-mingcute:align-arrow-right-line" />
        </button>
      </div>
    </div>
  </div>
</template>
