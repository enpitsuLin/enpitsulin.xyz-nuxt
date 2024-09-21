<script setup lang="ts">
import {
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogContext,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@ark-ui/vue'
</script>

<template>
  <DialogRoot  :close-on-interact-outside="false">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <Teleport to="body">
      <DialogContext v-slot="{ setOpen }">
        <DialogBackdrop
          fixed inset-0 z-10000
          bg-transparent opacity-100 backdrop-blur-4px backdrop-filter
          @click="setOpen(false)"
        />
      </DialogContext>
      <DialogPositioner
        flex="~ items-center justify-center"
        pointer-events-none fixed inset-0 z-10001 opacity-100
      >
        <DialogContent
          touch-pan="x y"
          bg="dark:neutral-900 neutral-100"
          pointer-events-auto
          relative isolate h-fit w-80 of-y-auto overscroll-contain rounded-2xl p-8 shadow-lg
          class="transition-height duration-300 ease-in-out"
        >
          <div flex="~ col gap-4">
            <DialogTitle flex="~ items-center gap-2">
              <button
                v-if="connectorDialogStep !== 'connectors'"
                flex="inline items-center justify-center gap-2"
                @click="setConnectorDialogStep('connectors')"
              >
                <div class="i-mingcute:left-fill" />
              </button>
              <span text-lg>连接钱包</span>
            </DialogTitle>
            <Web3ConnectStepConnectors v-if="connectorDialogStep === 'connectors'" />
            <Web3ConnectStepWalletConnect v-if="connectorDialogStep === 'walletconnect'" />
            <Web3ConnectStepCoinbase v-if="connectorDialogStep === 'coinbase'" />
          </div>
          <DialogCloseTrigger
            flex="inline items-center justify-center gap-2"
            shadow="lg zinc-800/5" absolute right-6 top-6
            cursor-default select-none rounded-md p-1 text-sm
            class="outline-offset-2 backdrop-blur transition transition-colors hover:bg-zinc-900/5 dark:hover:bg-white/10 dark:hover:bg-white/20"
          >
            <div class="i-mingcute:close-fill" size-6 />
          </DialogCloseTrigger>
        </DialogContent>
      </DialogPositioner>
    </Teleport>
  </DialogRoot>
</template>
