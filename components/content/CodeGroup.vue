<script setup lang="ts">
import { Tabs } from '@ark-ui/vue'
import CodeGroupTabsHeader from './CodeGroupTabsHeader.vue'
import ProsePre from './ProsePre.vue'

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

function render(props: { node: VNode }) {
  return h(ProsePre, props.node.props as any, props.node.children!)
}
</script>

<template>
  <Tabs.Root model-value="0">
    <CodeGroupTabsHeader :tabs="filterVNode($slots.default?.() ?? [])" />
    <Tabs.Content
      v-for="(slot, index) in $slots.default?.() ?? []"
      :key="index"
      :value="`${index}`"
    >
      <render :node="slot" />
    </Tabs.Content>
  </Tabs.Root>
</template>
