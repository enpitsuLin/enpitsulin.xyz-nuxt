<template>
  <div px="sm:8" pointer-events-none fixed inset-0 flex justify-center>
    <div max-w-7xl w-full flex px="lg:8">
      <div w-full class="bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
    </div>
  </div>
  <div flex="~ col items-center" px="lg:8" relative mx-auto max-w-7xl w-full>
    <LayoutNavBar />
    <main
      flex="~ col items-center justify-center"
      relative mt-70px w-full
    >
      <slot />
    </main>
    <footer px="4 md:8" border="t border" mt-50 w-full pb-20 pt-5>
      footer
    </footer>
  </div>

  <LayoutFAB />
</template>
