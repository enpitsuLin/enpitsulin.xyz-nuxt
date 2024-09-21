import type { Compute } from '@wagmi/core/internal'
import { coinbaseWallet, metaMask, walletConnect } from '@wagmi/connectors'
import {
  createConfig,
  disconnect,
  getAccount,
  type GetAccountReturnType,
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

export const connectorDialogStep = ref<'connectors' | 'walletconnect' | 'coinbase' | 'siwe'>('connectors')
export function setConnectorDialogStep(step: 'connectors' | 'walletconnect' | 'coinbase' | 'siwe') {
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

export function useAccountEffect(param: {
  onConnect?: (
    data: Compute<
      Pick<
        Extract<GetAccountReturnType, { status: 'connected' }>,
        'address' | 'addresses' | 'chain' | 'chainId' | 'connector'
      > & {
        isReconnected: boolean
      }
    >,
  ) => void
  onDisconnect?: () => void
}) {
  watchEffect((onCleanup) => {
    const unwatch = watchAccount(config, {
      onChange(account, prevAccount) {
        if (
          (prevAccount.status === 'reconnecting'
            || (prevAccount.status === 'connecting'
              && prevAccount.address === undefined))
              && account.status === 'connected'
        ) {
          const { address, addresses, chain, chainId, connector } = account
          const isReconnected
          = prevAccount.status === 'reconnecting'
          // if `previousAccount.status` is `undefined`, the connector connected immediately.
          || prevAccount.status === undefined
          param.onConnect?.({
            address,
            addresses,
            chain,
            chainId,
            connector,
            isReconnected,
          })
        }
        else if (
          prevAccount.status === 'connected'
          && account.status === 'disconnected'
        ) {
          param.onDisconnect?.()
        }
      },
    })

    onCleanup(() => unwatch())
  })
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
