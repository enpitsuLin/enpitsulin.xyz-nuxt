<script setup lang="ts">
import { connect, type Connector, getConnectors } from '@wagmi/core'
import { config } from '~/composables/web3'

const connectors = getConnectors(config)

function onConnectorClick(connector: Connector) {
  if (connector.id === 'walletConnect') {
    connectorDialogStep.value = 'walletconnect'
  }
  else if (connector.id === 'coinbaseWalletSDK') {
    connectorDialogStep.value = 'coinbase'
  }
  else {
    connect(config, { connector })
  }
}
</script>

<template>
  <div flex="~ col gap-3">
    <button
      v-for="connector in connectors" :key="connector.id"
      bg="background hover:border/60" p="x5 y3.5" w-66 w-full rounded-xl
      flex="inline items-center justify-between"
      transition="colors duration-150 ease-in-out"
      @click="onConnectorClick(connector)"
    >
      <span>{{ connector.name }}</span>
      <IconsMetaMask v-if="connector.id === 'metaMaskSDK'" size-8 />
      <IconsCoinbase v-else-if="connector.id === 'coinbaseWalletSDK'" size-8 />
      <div v-else-if="connector.id === 'walletConnect'" grid="~ cols-2 rows-2">
        <IconsRainbow size-4 scale-90 />
        <IconsImToken size-4 scale-90 />
        <IconsZerion size-4 scale-90 />
        <IconsWalletConnect size-4 scale-90 />
      </div>
      <img v-else-if="connector.icon" :src="connector.icon" size-8>
    </button>
  </div>
</template>
