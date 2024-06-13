<script setup lang="ts">
import { Checkbox } from '@ark-ui/vue'

const id = useId()
</script>

<template>
  <Checkbox.Root :id mr-1 inline-block align-mid>
    <Checkbox.Control size-4 border="~ data-[state=checked]:accent/80 rounded" bg="data-[state=checked]:accent/80">
      <Checkbox.Indicator size-full p-0.5>
        <div class="i-mingcute:check-fill" size-full />
      </Checkbox.Indicator>
    </Checkbox.Control>
  </Checkbox.Root>
</template>
