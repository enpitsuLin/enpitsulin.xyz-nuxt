<script setup lang="ts">
import type { CharacterEntity } from 'crossbell'
import {
  HoverCardArrow,
  HoverCardArrowTip,
  HoverCardContent,
  HoverCardPositioner,
  HoverCardRoot,
  HoverCardTrigger,
} from '@ark-ui/vue'

const { character } = defineProps<{ character: CharacterEntity }>()

const bio = useCharacterBio(character)
const { data: followers } = useCharacterFollowers(character.characterId)
const { data: follows } = useCharacterFollows(character.characterId)

const id = useId().replace('_', '-')

const timeAgo = useTimeAgo(new Date(character.createdAt))
</script>

<template>
  <HoverCardRoot :id>
    <HoverCardTrigger>
      <CharacterAvatar :character />
    </HoverCardTrigger>
    <Teleport to="body">
      <HoverCardPositioner>
        <HoverCardContent
          relative w-60 rounded-md p-4 shadow-2xl
          class="bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20"
        >
          <HoverCardArrow>
            <HoverCardArrowTip />
          </HoverCardArrow>
          <div space-y-2>
            <CharacterAvatar :character />
            <div>
              <span font-bold>{{ character.metadata?.content?.name }}</span>
            </div>
            <p text-sm>
              {{ bio }}
            </p>
            <div flex="~ items-center justify-between" w-full op-70>
              <div text-sm>
                {{ followers }} 关注者
              </div>
              <div text-sm>
                {{ follows }} 正在关注
              </div>
            </div>
            <p text-xs op-70>
              <time :datetime="character.createdAt">
                {{ timeAgo }}
              </time>
              <span>加入</span>
            </p>
          </div>
        </HoverCardContent>
      </HoverCardPositioner>
    </Teleport>
  </HoverCardRoot>
</template>
