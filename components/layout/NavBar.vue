<script setup lang="ts">
const tabs = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'Projects',
    href: '/projects',
  },
  {
    label: 'Skill',
    href: '/skill',
  },
]

const links = ref<HTMLLIElement[]>([])
</script>

<template>
  <header relative z-9999>
    <div
      class="fixed left-1/2 top-0 h-[4.5rem] w-full border border-white border-opacity-40 rounded-none bg-white bg-opacity-40 shadow-black/[0.03] shadow-lg backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[30rem] -translate-x-1/2 dark:border-black/40 sm:rounded-full dark:bg-gray-950 dark:bg-opacity-75"
      style="opacity: 1;transform: translateX(-50%) translateY(0px) translateZ(0px);"
    />
    <nav class="fixed left-1/2 top-[0.15rem] h-12 flex py-2 sm:top-[1.7rem] sm:h-[initial] -translate-x-1/2 sm:py-0">
      <ul
        class="w-[22rem] flex flex-wrap items-center justify-center gap-y-1 text-[0.9rem] text-gray-500 font-medium font-sans sm:w-[initial] sm:flex-nowrap sm:gap-5"
      >
        <li
          v-for="{ href, label } in tabs"
          :key="href"
          ref="links"
          relative
          flex="~ items-center justify-center" class="h-3/4 break-keep"
        >
          <LayoutNavBarLink :href>
            {{ label }}
          </LayoutNavBarLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
