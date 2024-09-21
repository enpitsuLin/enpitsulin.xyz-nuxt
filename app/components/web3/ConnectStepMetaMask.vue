<script setup lang="ts">
import type { metaMask } from '@wagmi/connectors'
import type { ConnectErrorType } from '@wagmi/vue/actions'
import { useConnect, useConnectors } from '@wagmi/vue'

type MetaMaskConnector = ReturnType<ReturnType<typeof metaMask>>

const connectors = useConnectors()
const metamaskConnector = computed(() => connectors.value.find(i => i.id === 'metaMaskSDK') as unknown as MetaMaskConnector)

const { connect, isPending, isError, error } = useConnect()

function formatError(error: ConnectErrorType) {
  switch (error.name) {
    case 'UserRejectedRequestError':
      return '请求已取消'
    case 'ConnectorAlreadyConnectedError':
      return '已连接'
    case 'ResourceUnavailableRpcError':
      return '资源不可用'
    case 'WagmiCoreError':
      return '连接失败'
    case 'Error':
    default:
      return error.name
  }
}

function excuteConnect() {
  // @ts-expect-error TODO
  connect({ connector: metamaskConnector.value })
}

onMounted(() => {
  excuteConnect()
})
</script>

<template>
  <div
    flex="~ col items-center"
  >
    <div min-h-120px>
      <div relative size-100px>
        <div absolute size-76px class="left-1/2 top-1/2 -translate-1/2">
          <IconsMetaMask size-full />
        </div>
        <div v-if="isPending" absolute inset="-10px">
          <svg
            size-full class="animate-spin" width="102" height="102" viewBox="0 0 102 102" fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M52 100C24.3858 100 2 77.6142 2 50" stroke="url(#paint0_linear_1943_4139)" stroke-width="3.5"
              stroke-linecap="round" stroke-linejoin="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1943_4139" x1="2" y1="48.5" x2="53" y2="100"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="hsl(var(--theme-accent))" />
                <stop offset="1" stop-color="hsl(var(--theme-accent))" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <button
          v-else-if="isError" absolute bottom-0 right-0 rounded-full bg-background p-1
          @click="excuteConnect"
        >
          <div i-mingcute:refresh-1-line />
        </button>
      </div>
    </div>
    <h4 text-center font-bold>
      {{ isError ? formatError(error!) : '连接中...' }}
    </h4>
    <p pt-5 text-center text-sm op-40>
      通过您的钱包接受请求以连接到此网站。
    </p>
  </div>
</template>
