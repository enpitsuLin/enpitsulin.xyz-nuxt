<script setup lang="ts">
import { Tabs } from '@ark-ui/vue'
import CodeGroupTabsHeader from './CodeGroupTabsHeader.vue'
import ProsePre from './ProsePre.vue'

const slots = useSlots()

function filterPreTag(slot: VNode): slot is VNode<any, HTMLPreElement, { filename: string | null, label: string | null, active: boolean | null }> {
  return slot.type && typeof slot.type === 'object'
    && 'tag' in slot.type && slot.type.tag && slot.type.tag === 'pre'
}

function filterVNode(nodes: VNode[]) {
  return nodes.filter(filterPreTag)
    .map((slot, index) => {
      return {
        label: slot?.props?.filename || slot?.props?.label || `${index}`,
        active: slot?.props?.active || false,
        component: slot,
      }
    })
}

function CodeGroupTabsContent() {
  const _slot = slots.default?.() ?? []

  return _slot.map((slot, index) => h(
    Tabs.Content,
    { value: `${index}` },
    {
      default: () => [h(ProsePre, slot.props as any, slot.children!)],
    },
  ))
}
const id = useId()
</script>

<template>
  <Tabs.Root model-value="0" :id>
    <CodeGroupTabsHeader :tabs="filterVNode($slots.default?.() ?? [])" />
    <CodeGroupTabsContent />
  </Tabs.Root>
</template>
