import { coinbaseWallet, metaMask, walletConnect } from '@wagmi/connectors'
import {
  createConfig,
  disconnect,
  getAccount,
  http,
  hydrate,
  watchAccount,
} from '@wagmi/core'
import { crossbell } from '@wagmi/core/chains'

export const config = createConfig({
  chains: [crossbell],
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
})

const { onMount } = hydrate(config, { reconnectOnMount: true })
onMount()

export const connectorDialogStep = ref<'connectors' | 'walletconnect' | 'coinbase'>('connectors')
export function setConnectorDialogStep(step: 'connectors' | 'walletconnect' | 'coinbase') {
  connectorDialogStep.value = step
}

export function updateState(
  state: Record<string, unknown>,
  update: Record<string, any>,
): void {
  for (const key of Object.keys(state)) {
    state[key] = update[key]
  }
}

export function useAccount() {
  const account = reactive(getAccount(config))
  const unsubscribe = watchAccount(config, {
    onChange(data) {
      updateState(account, data)
    },
  })
  onScopeDispose(unsubscribe)

  return toRefs(readonly(account))
}

export function useDisconnect() {
  return () => {
    disconnect(config)
  }
}

// @ts-expect-error TEST
globalThis.config = config

declare module '@wagmi/core' {
  interface Register {
    config: typeof config
  }
}
