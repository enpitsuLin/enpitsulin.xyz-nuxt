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
  <Teleport to="body">
    <header sticky top-5 z-9999 flex="~ items-center justify-center">
      <div fixed left-0 right-0 top-0 h-25 class="navbar-blur" />
      <div relative z-2 h-full w-fit>
        <nav
          bg="white/60 dark:black/60"
          rounded-full px-10 py="2px"
          class="navbar flex shadow-black/10 shadow-md backdrop-blur-0.5rem transition-background-color"
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
  </Teleport>
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

.navbar-blur {
  top: 0;
  position: fixed !important;
  z-index: 999;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  pointer-events: none;
  position: -webkit-sticky;
  position: sticky;
  width: 100vw;
  height: 100px;
  z-index: 1;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  opacity: 0.95;
  -webkit-mask-image: linear-gradient(to bottom, #161616 10%, transparent);
}
.navbar-blur::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, var(--gray9), transparent);
}
</style>
