<script setup lang="ts">
import { formatDate } from '@vueuse/core'
import type { NotePostParsedContent } from '~/types/content'

interface Props {
  article: Pick<NotePostParsedContent, 'slug' | 'title' | 'createAt' | 'publishAt' | 'updateAt' | 'description' | 'tags' | 'summary'>
}
const { article } = defineProps<Props>()
const el = ref<HTMLElement>()

declare const ScrollTimeline: any

function shouldAnimationBeStopped(animation: CSSAnimation, animationName: string | null = null) {
  if (!ScrollTimeline || !(animation.timeline instanceof ScrollTimeline))
    return false

  if (animationName === null) {
    return true
  }

  return animation.animationName === animationName
}

const unsubscribe = useEventListener(el, 'animationend', (e) => {
  if (e.elapsedTime === 0)
    return
  const animations = (e.target! as HTMLElement).getAnimations() as CSSAnimation[]
  const animation = animations.find(a => a.animationName === e.animationName)
  if (!animation)
    return

  // Only process if the animation name matches
  if (shouldAnimationBeStopped(animation, 'animate-enter')) {
    const fill = animation.effect?.getComputedTiming().fill
    if (fill && !['forwards', 'both'].includes(fill)) {
      console.warn(`The fillMode for the animation “animate-enter” is not set to \`forwards\`. This can cause a glitch when removing the animation.`)
    }

    // Commit the styles and remove the animation
    animation.commitStyles()
    animation.cancel()
    unsubscribe()
  }
})
</script>

<template>
  <article
    ref="el"
    grid="md:~ md:cols-4 md:items-baseline"
    class="ease-$spring-easing animate-in zoom-in-70 [animation-fill-mode:both]! [animation-range:entry_0%,exit_100%]! [animation-timeline:view(y)]!"
  >
    <div
      relative
      flex="~ col items-start"
      class="group md:col-span-3"
    >
      <ArticleCardTitle :title="article.title" :slug="article.slug" />
      <ArticleCardTime :date="article.publishAt" class="md:hidden" />
      <p relative z-10 mt-2 text-sm text="zinc-600 dark:zinc-400">
        {{ article.summary || article.description }}
      </p>
      <div
        aria-hidden="true"
        relative z-10 mt-4 flex items-center text-sm text-accent font-medium
      >
        立即阅读
        <i inline-block class="i-mingcute:right-small-line ml-1 size-4" />
      </div>
    </div>
    <div relative z-10 order-first class="hidden md:flex" flex="col items-start">
      <time
        mb-3 mt-1 text-sm
        class="text-zinc-500 dark:text-zinc-500"
        :datetime="article.publishAt"
      >
        {{ formatDate(new Date(article.publishAt), 'MMM DD YYYY', { locales: 'zh-Hans' }) }}
      </time>
      <div flex="~ gap-1 wrap" pr-10>
        <ArticleTag v-for="tag in article.tags" :key="tag" :tag text-xs />
      </div>
    </div>
  </article>
</template>
