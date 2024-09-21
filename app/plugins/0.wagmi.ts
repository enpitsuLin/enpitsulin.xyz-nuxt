import { coinbaseWallet, injected, metaMask, walletConnect } from '@wagmi/connectors'
import { createConfig, http, WagmiPlugin } from '@wagmi/vue'
import { crossbell } from '@wagmi/vue/chains'

function createWagmiConfig() {
  return createConfig({
    syncConnectedChain: true,
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
    chains: [crossbell],
  })
}

export default defineNuxtPlugin((nuxt) => {
  const config = createWagmiConfig()

  nuxt.vueApp.use(WagmiPlugin, { config })
})

declare module '@wagmi/vue' {
  interface Register {
    config: ReturnType<typeof createWagmiConfig>
  }
}
