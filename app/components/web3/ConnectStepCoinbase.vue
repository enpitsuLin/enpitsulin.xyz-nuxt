<script setup lang="ts">
import type { coinbaseWallet } from '@wagmi/connectors'
import { getConnectors } from '@wagmi/core'
import { config } from '~/composables/web3'

type CoinbaseConnector = ReturnType<ReturnType<typeof coinbaseWallet<'3'>>>

const connectors = getConnectors(config)

const coinbaseConnector = computed(() => connectors.find(i => i.id === 'coinbaseWalletSDK') as CoinbaseConnector)

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
    <div v-if="!isCoinbaseWalletInstalled" w-full mx-auto p-4 bg-white rounded-2xl relative>
      <Web3QrCode
        :uri="qrUrl"
        clear-area
        ecl="M"
        dot-color="#000"
        background-color="#fff"
        w-full h-full
      />
      <div
        absolute left="1/2" top="1/2" size-18
        class="-translate-x-1/2 -translate-y-1/2"
      >
        <IconsCoinbase w-full h-full />
      </div>
    </div>
  </div>
</template>
