<template>
  <div rounded-xl bg-zinc-2:80 dark:bg-zinc-8:80 p-8 flex="~ col items-center gap-4">
    <p text-xs>
      连接钱包并登录到 Crossbell 后，你可以使用你的 xLog 账号进行评论
    </p>
    <div flex="~ gap-4">
      <Web3ConnectDialog>
        <button
          flex="inline items-center justify-center gap-2"
          p="x-3 y-2"
          cursor-default select-none rounded-full text-sm
          shadow="lg zinc-800/5"
          class="outline-offset-2 ring-1 ring-zinc-900/5 dark:ring-white/10 dark:hover:ring-white/20"
        >
          <IconsCrossbell size-4 />
          <span text-xs>连接至钱包</span>
        </button>
      </Web3ConnectDialog>
      <button
        flex="inline items-center justify-center gap-2"
        p="x-3 y-2"
        cursor-default select-none rounded-full text-sm
        shadow="lg zinc-800/5"
        class="outline-offset-2 ring-1 ring-zinc-900/5 backdrop-blur transition dark:ring-white/10 active:transition-none dark:hover:ring-white/20"
      >
        <i class="i-mingcute:hat-fill" size-4 />
        <span text-xs>
          免登录评论
        </span>
      </button>
    </div>
  </div>
</template>
