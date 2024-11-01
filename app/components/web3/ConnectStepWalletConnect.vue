<script setup lang="ts">
import type { walletConnect } from '@wagmi/connectors'
import { useConnect, useConnectors } from '@wagmi/vue'

type WalletConnectConnector = ReturnType<ReturnType<typeof walletConnect>>

const connectors = useConnectors()
const { connect } = useConnect()

const walletConnectConnector = computed(() => connectors.value.find(i => i.id === 'walletConnect') as unknown as WalletConnectConnector)

const provider = await walletConnectConnector.value.getProvider()

const { state: qrUrl, isLoading } = useAsyncState(async () => {
  return new Promise<string>((resolve) => {
    provider.on('display_uri', (uri) => {
      resolve(uri)
    })

    connect({
      // @ts-expect-error TODO
      connector: walletConnectConnector.value,
    })
  })
}, '')
</script>

<template>
  <div size-64>
    <div v-if="isLoading" size-64 rounded-2xl bg-white flex="~ items-center justify-center">
      <div class="i-mingcute:loading-fill animate-spin text-black" />
    </div>
    <div v-else relative mx-auto w-full rounded-2xl bg-white p-4>
      <Web3QrCode
        :uri="qrUrl"
        ecl="M"
        dot-color="#000"
        background-color="#fff"
        clear-area h-full w-full
      />
      <div
        absolute left="1/2" top="1/2" size-18
        class="-translate-x-1/2 -translate-y-1/2"
      >
        <IconsWalletConnect h-full w-full />
      </div>
    </div>
  </div>
</template>
