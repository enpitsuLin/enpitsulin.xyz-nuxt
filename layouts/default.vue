<script setup lang="ts">
const route = useRoute()
</script>

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
        <div v-if="route.meta.title && route.meta.description" flex="~ col items-center" pt-10>
          <header pb="10 md:20">
            <h2 pb-10 font-bold text="4xl md:6xl">
              {{ route.meta.title }}
            </h2>
            <p>
              {{ route.meta.description }}
            </p>
          </header>
          <slot />
        </div>
        <template v-else>
          <slot />
        </template>
      </main>
      <div mt-auto aria-hidden="true" />
      <LayoutFooter />
    </div>
  </div>
  <LayoutFAB />
</template>
