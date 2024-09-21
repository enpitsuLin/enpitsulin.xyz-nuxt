<script setup lang="ts">
import type { coinbaseWallet } from '@wagmi/connectors'
import { useConnectors } from '@wagmi/vue'

type CoinbaseConnector = ReturnType<ReturnType<typeof coinbaseWallet<'3'>>>

const connectors = useConnectors()

const coinbaseConnector = computed(() => connectors.value.find(i => i.id === 'coinbaseWalletSDK') as CoinbaseConnector)

const isCoinbaseWalletInstalled = computed(() => {
  if (typeof window === 'undefined')
    return false

  const { ethereum } = window

  return !!(ethereum?.isCoinbaseWallet
    || (ethereum?.providers && ethereum?.providers.find(
      (provider?: { isCoinbaseWallet?: boolean }) =>
        provider?.isCoinbaseWallet,
    )))
})

const provider = await coinbaseConnector.value.getProvider()
const qrUrl = provider.qrUrl!
</script>

<template>
  <div size-64>
    <div v-if="!isCoinbaseWalletInstalled" relative mx-auto w-full rounded-2xl bg-white p-4>
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
        <IconsCoinbase h-full w-full />
      </div>
    </div>
  </div>
</template>
