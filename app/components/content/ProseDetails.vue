<script setup lang="ts">
import { CollapsibleContent, CollapsibleRoot } from '@ark-ui/vue'
import { isComponent } from '@skirtle/vue-vnode-utils'
import { Fragment } from 'vue'

const slots = useSlots()

function Children() {
  const _children = slots.default?.() ?? []
  const content = _children.filter((c) => {
    if (isComponent(c)) {
      if ('__name' in c.type && c.type.__name === 'ProseSummary') {
        return false
      }
      return true
    }
    return true
  })
  const trigger = _children.filter(c => !content.includes(c))

  return h(
    Fragment,
    [
      trigger,
      h(CollapsibleContent, () => content),
    ],
  )
}

const id = useId()
</script>

<template>
  <CollapsibleRoot :id class="group" rounded-md>
    <Children />
  </CollapsibleRoot>
</template>

<style>
@keyframes slideDown {
  from {
    height: 0;
  }

  to {
    height: var(--height);
  }
}

@keyframes slideUp {
  from {
    height: var(--height);
  }

  to {
    height: 0;
  }
}

[data-scope='collapsible'][data-part='root'] {
  overflow: hidden;
  margin: 1em 0;
  padding: 1rem 1.25rem;
  background: var(--un-prose-bg-soft);
}

[data-scope='collapsible'][data-part='content'] {
  margin-top: 0.6em;
}

[data-scope='collapsible'][data-part='content'][data-state='open'] {
  animation: slideDown 350ms;
  animation-timing-function: var(--ease-spring);
}

[data-scope='collapsible'][data-part='content'][data-state='closed'] {
  animation: slideUp 300ms;
  animation-timing-function: var(--ease-spring);
}
</style>
