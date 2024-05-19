<script setup lang="ts">
import { Tabs } from '@ark-ui/vue'

interface Props {
  tabs: Array<{ label: string }>
}
defineProps<Props>()
</script>

<template>
  <Tabs.List
    v-if="tabs"
    class="relative flex gap-2"
  >
    <Tabs.Trigger
      v-for="({ label }, i) in tabs"
      :key="`${i}${label}`"
      :value="`${i}`"
      class="relative flex px-2 py-1 text-sm"
    >
      {{ label }}
    </Tabs.Trigger>
    <Tabs.Indicator w="$width" bottom-0 h-2px rounded-md bg-accent />
  </Tabs.List>
</template>
