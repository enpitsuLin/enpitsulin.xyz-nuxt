<script setup lang="ts">
import type { PropType } from 'vue'
import type { TocLink } from '@nuxt/content/dist/runtime/types'

defineProps({
  links: {
    type: Array as PropType<TocLink[]>,
    default: () => [],
  },
})

const emit = defineEmits(['move'])

const router = useRouter()

const { activeHeadings, updateHeadings } = useScrollspy()

if (import.meta.client) {
  setTimeout(() => {
    updateHeadings([
      ...document.querySelectorAll('.prose h1'),
      ...document.querySelectorAll('.prose h2'),
      ...document.querySelectorAll('.prose h3'),
      ...document.querySelectorAll('.prose h4'),
    ])
  }, 300)
}

function scrollToHeading(id: string) {
  router.push(`#${id}`)
  emit('move', id)
}

function childMove(id: string) {
  emit('move', id)
}
</script>

<template>
  <ul class="docs-toc-links">
    <li
      v-for="link in links"
      :key="link.text"
      :class="[`depth-${link.depth}`]"
    >
      <a
        :href="`#${link.id}`"
        :class="[activeHeadings.includes(link.id) && 'active']"
        @click.prevent="scrollToHeading(link.id)"
      >
        {{ link.text }}
      </a>
      <TocLinks
        v-if="link.children"
        :links="link.children"
        @move="childMove($event)"
      />
    </li>
  </ul>
</template>

<style>
.docs-toc-links .depth-3 {
  --at-apply: pl-3;
}

.docs-toc-links .depth-4 {
  --at-apply: pl-6;
}

.docs-toc-links a {
  --at-apply: block py-1 text-sm text-gray-500 truncate;
}

.dark .docs-toc-links a {
  --at-apply: text-gray-400;
}

@media (min-width: 1024px) {
  .docs-toc-links a {
    --at-apply: pr-3;
  }
}

.docs-toc-links a:not(.active):hover {
  --at-apply: text-accent/30;
}
.docs-toc-links a.active {
  --at-apply: text-accent;
}
</style>
