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

const route = useRoute()
</script>

<template>
  <header sticky top-0 z-9999 pt-5 flex="~ items-center justify-center">
    <div pointer-events-none fixed left-0 right-0 top-0 h-25 select-none class="navbar-blur" />
    <div relative z-2 h-full w-fit>
      <div
        v-if="route.path !== '/'"
        absolute top="1/2" class="left--12 translate-y--1/2 view-transition-avatar"
      >
        <NuxtImg
          alt="avatar"
          width="250" height="250"
          decoding="async"
          class="size-9 border-2 border-white rounded-full object-cover shadow-xl"
          src="https://avatars.githubusercontent.com/enpitsuLin"
        />
      </div>
      <nav
        bg="white/60 dark:black/60"
        rounded-full px-10 py="2px"
        class="navbar hidden shadow-black/10 shadow-md backdrop-blur-0.5rem transition-background-color md:flex"
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

.navbar-blur {
  --at-apply: backdrop-blur-10px op-95;
  mask-image: linear-gradient(
    to bottom,
    theme('colors.border') 10%,
    transparent
  );
}
.navbar-blur::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    theme('colors.border') 10%,
    transparent
  );
}
</style>
