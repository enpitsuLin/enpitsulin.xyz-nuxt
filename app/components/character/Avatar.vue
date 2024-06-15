<script setup lang="ts">
import type { CharacterEntity } from 'crossbell'
import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
  HoverCardRoot,
  HoverCardTrigger,
} from '@ark-ui/vue'

defineProps<{ character: CharacterEntity }>()

const img = useImage()
</script>

<template>
  <AvatarRoot
    of-hidden rounded-full
    flex="inline items-center justify-center"
  >
    <AvatarFallback
      bg-accent:50 text-xl
      flex="~ items-center justify-center"
      class="size-10 data-[state=hidden]:hidden md:size-12"
    >
      {{ character?.metadata?.content?.name?.slice(0, 1) }}
    </AvatarFallback>
    <AvatarImage
      class="size-10 md:size-12"
      :src="img.getImage(character?.metadata?.content?.avatars?.[0]!, { provider: 'ipfs' }).url"
      object-cover
      width="48"
      height="48"
      alt="avatar"
    />
  </AvatarRoot>
</template>
