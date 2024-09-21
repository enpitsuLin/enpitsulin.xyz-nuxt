<script setup lang="ts">
import { signMessage } from '@wagmi/core'

const { address } = useAccount()

const disconnect = useDisconnect()

async function signIn() {
  if (!address.value)
    return

  const { message } = await indexer.fetch<{ message: string }>('/siwe/challenge', {
    method: 'POST',
    data: {
      address: address.value,
      domain: 'enpitsulin.xyz',
      uri: 'https://enpitsulin.xyz',
      statement: 'test',
    },
  })

  const signature = await signMessage(config, { message })
  const res = await indexer.fetch<{ token: string }>('/siwe/login', {
    method: 'POST',
    data: { address: address.value, signature },
  })

  token.value = res.token
}

const { data, isLoading } = useAsyncState(() => signIn(), null)
</script>

<template>
  <div v-if="isLoading">
    Loading...
  </div>
  <div v-else>
    SignIn
    <div>{{ address }}</div>
    <button @click="disconnect">
      Disconnect
    </button>
  </div>
</template>
