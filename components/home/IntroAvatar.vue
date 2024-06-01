<template>
  <div relative>
    <div class="view-transition-avatar">
      <NuxtImg
        alt="avatar"
        width="250" height="250" decoding="async"
        class="border-[0.35rem] border-white rounded-full object-cover shadow-xl"
        src="https://avatars.githubusercontent.com/enpitsuLin"
      />
    </div>
    <span
      absolute bottom-0 right-0 cursor-default text-4xl
      class="transition-transform view-transition-avatar-wave-hand hover:animate-name-wave-hand hover:animate-duration-1000 hover:animate-iteration-infinite"
    >
      👋
    </span>
  </div>
</template>
