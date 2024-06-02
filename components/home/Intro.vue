<script setup lang="ts">
import { IconsBilibili } from '#components'

const { y } = useWindowScroll()

const links = [
  { name: 'Email', href: 'mailto://enpitsulin@gmail.com', icon: 'i-mingcute:mail-line', class: 'bg-#c45040' },
  { name: 'Twitter', href: 'https://twitter.com/enpitsulin', icon: 'i-mingcute:twitter-line', class: 'bg-#4d9feb' },
  { name: 'Github', href: 'https://github.com/enpitsulin', icon: 'i-mingcute:github-line', class: 'bg-black' },
  { name: 'Mastodon', href: 'https://elk.zone/m.cmx.im/@enpitsulin', icon: 'i-mingcute:mastodon-fill', class: 'bg-#479fd1' },
  { name: 'RSS', href: '/feed.xml', icon: 'i-mingcute:rss-line', class: 'bg-#f2a93b' },
  { name: 'Bilibili', href: 'https://space.bilibili.com/423632', icon: IconsBilibili, class: 'bg-#e479b4' },
]
</script>

<template>
  <section w-full flex="~ col items-center" class="mb-10 sm:mb-0">
    <div flex="~ col-reverse md:row md:justify-between gap-8" class="w-full md:my-16">
      <div
        flex="~ col gap-4"
        class="[will-change:transform,opacity]"
      >
        <h1 text-2xl>
          Hi, 这里是 <ruby>enpitsu<rp>(</rp><rt>鉛筆</rt><rp>)</rp>lin</ruby>. <br>
        </h1>
        <p text-2xl>
          是一位普通的 <code class="font-mono">&lt;Developer /&gt;</code>.
        </p>
        <p text-sm op-70>
          每天随心所欲充满激情还有带着 🧡 地写代码.
        </p>
        <div mt-4>
          <ul flex="~ gap-2">
            <li v-for="link in links" :key="link.name">
              <a
                flex="~ items-center justify-center"
                inline-block aspect-square size-9
                rounded-full text-white
                rel="noreferrer"
                class="group"
                :href="link.href"
                :title="link.name"
                :class="link.class"
              >
                <span class="sr-only">{{ link.name }}</span>
                <i v-if="typeof link.icon === 'string'" inline-block class="transition-transform group-hover:scale-110" :class="link.icon" />
                <component :is="link.icon" v-else class="transition-transform group-hover:scale-110" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <HomeIntroAvatar class="size-28 md:size-34" />
    </div>
    <ClientOnly>
      <div
        class="mt-auto hidden pb-6 pt-8 transition-opacity duration-500 sm:flex sm:justify-center"
        :class=" y > 20 ? 'op-0' : 'op-100'"
      >
        <span class="animate-bounce text-gray-500">
          <i inline-block class="i-mingcute:right-line rotate-90" />
        </span>
      </div>
    </ClientOnly>
  </section>
</template>

<style>
@keyframes wave-hand {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(30deg) scale(1.1);
  }
  100% {
    transform: rotate(0deg);
  }
}

::view-transition-group(avatar) {
  animation-duration: 300ms;
}

::view-transition-group(avatar-wave-hand) {
  animation-duration: 1ms;
}
</style>
