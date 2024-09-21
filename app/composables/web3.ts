import { coinbaseWallet, metaMask, walletConnect } from '@wagmi/connectors'
import { createConfig, http } from '@wagmi/core'
import { crossbell } from '@wagmi/core/chains'

export const config = createConfig({
  chains: [crossbell],
  connectors: [
    metaMask(),
    coinbaseWallet({
      version: '3',
      headlessMode: true,
      appName: 'enpitsulin.xyz',
    }),
    walletConnect({
      projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
      metadata: {
        name: 'enpitsulin',
        description: 'Connect to enpitsulin.xyz',
        url: 'https://enpitsulin.xyz',
        icons: ['https://enpitsulin.xyz/favicon.ico'],
      },
      showQrModal: false,
    }),
  ],
  transports: {
    [crossbell.id]: http(),
  },
})
 
export const connectorDialogStep = ref<'connectors' | 'walletconnect' | 'coinbase'>('connectors')
export function setConnectorDialogStep(step: 'connectors' | 'walletconnect' | 'coinbase') {
  connectorDialogStep.value = step
}

declare module '@wagmi/core' {
  interface Register {
    config: typeof config
  }
}
