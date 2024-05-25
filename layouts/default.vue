<template>
  <div px="sm:8" pointer-events-none fixed inset-0 flex="~ justify-center">
    <div max-w-7xl w-full flex px="lg:8">
      <div w-full class="bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
    </div>
  </div>
  <div px="sm:8" flex="~ 1 justify-center">
    <div
      flex="~ 1 col items-center"
      px="lg:8" relative max-w-7xl w-full
    >
      <LayoutNavBar />
      <main relative mt-16 w-full px="8 sm:12">
        <slot />
      </main>
      <div mt-auto aria-hidden="true" />
      <footer border="t border" mt-50 w-full pb-20 pt-5>
        footer
      </footer>
    </div>
  </div>

  <LayoutFAB />
</template>
