<script setup lang="ts">
import {
  MenuContent,
  MenuIndicator,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuPositioner,
  MenuRoot,
  type MenuSelectionDetails,
  MenuSeparator,
  MenuTrigger,
} from '@ark-ui/vue'
import { navigation } from '~/constants'

const router = useRouter()

const id = useId().replace('_', '-')

function onSelect(details: MenuSelectionDetails) {
  router.push(details.value)
}
</script>

<template>
  <MenuRoot :id="id" @select="onSelect">
    <MenuTrigger
      bg="zinc-50/50 dark:zinc-950/50"
      px-4 py="2"
      flex="inline items-center gap-1"
      border="~ border rounded-full" outline-none
      class="shadow-black/10 shadow-md backdrop-blur-0.5rem transition-background-color"
    >
      前往
      <MenuIndicator class="i-mingcute:arrows-right-line" />
    </MenuTrigger>
    <MenuPositioner
      bg="zinc-50/50 dark:zinc-950/50"
      border="~ border rounded-lg"
      class="w-[calc(100%+6rem)] shadow-black/10 shadow-md backdrop-blur-0.5rem transition-background-color"
    >
      <MenuContent flex="~ col gap-1" p-2 outline-none>
        <header p-2 text-sm op-60>
          站内导航
        </header>

        <MenuItem
          v-for="{ href, label } in navigation"
          :key="href"
          :value="href"
          flex="~ items-center"
          relative h-8 px-2
          class="not-last:border-b not-last:border-b-border/30"
        >
          {{ label }}
        </MenuItem>
      </MenuContent>
    </MenuPositioner>
  </MenuRoot>
</template>
