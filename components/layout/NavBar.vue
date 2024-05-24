<script setup lang="ts">
const tabs = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'Tags',
    href: '/tags',
  },
  {
    label: 'Projects',
    href: '/projects',
  },
  {
    label: 'About',
    href: '/about',
  },
]

const links = ref<HTMLLIElement[]>([])
</script>

<template>
  <header
    fixed left-0 right-0 z-9999 pt-5
    class="navbar hidden lg:block"
  >
    <div
      relative
      flex="~ items-center justify-center" mx-auto h-full
    >
      <nav
        bg="white/60 dark:black/60"
        rounded-full px-10 py="2px"
        class="flex shadow-black/10 shadow-md backdrop-blur-0.5rem transition-background-color"
      >
        <ul
          flex="~ items-center justify-center gap-5"
          class="w-88 text-0.9rem text-gray-500 font-medium font-sans"
        >
          <li
            v-for="{ href, label } in tabs" :key="href" ref="links" relative flex="~ items-center justify-center"
            class="h-3/4 break-keep"
          >
            <LayoutNavBarLink :href>
              {{ label }}
            </LayoutNavBarLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style>
@property --translate-y {
  syntax: '<length>';
  initial-value: 0;
  inherits: false;
}

@keyframes slide-in {
  from {
    --translate-y: -4.25rem;
  }

  to {
    --translate-y: 0;
  }
}

.navbar {
  --un-translate-y: var(--translate-y);
  animation-timing-function: cubic-bezier(0.05, -0.83, 0.24, 1.12);
  --at-apply: transform animate-name-slide-in animate-duration-500;
}
</style>
