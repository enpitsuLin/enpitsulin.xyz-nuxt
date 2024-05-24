<template>
  <div class="gradient" style="--size: 250px;--speed: 10s" left="md:1/2" top="md:15rem" />
  <div class="gradient" style="--size: 400px;--speed: 20s" left="md:1/3" top="md:8rem" />
  <LayoutNavBar />
  <main
    relative
    flex="~ col items-center justify-center"
    ma-auto max-w-50rem of-hidden px-4 pt-7rem
  >
    <slot />
  </main>
  <LayoutFAB />
</template>

<style>
.gradient {
  --size: 300px;
  --speed: 20s;
  --easing: cubic-bezier(0.8, 0.2, 0.2, 0.8);
  --at-apply: absolute z-0 size-[var(--size)] animate-spin pointer-events-none;
  animation-duration: var(--speed);
  animation-timing-function: var(--easing);
  filter: blur(calc(var(--size) / 5));
  background-image: linear-gradient(hsl(var(--theme-accent)), #433f68);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
}
</style>
