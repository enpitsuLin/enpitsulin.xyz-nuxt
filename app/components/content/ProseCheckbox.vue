<script setup lang="ts">
import { CheckboxControl, CheckboxIndicator, CheckboxRoot } from '@ark-ui/vue'

const id = useId()
</script>

<template>
  <CheckboxRoot :id mr-1 inline-block align-mid>
    <CheckboxControl size-4 border="~ data-[state=checked]:accent/80 rounded" bg="data-[state=checked]:accent/80">
      <CheckboxIndicator size-full p-0.5>
        <div class="i-mingcute:check-fill" size-full />
      </CheckboxIndicator>
    </CheckboxControl>
  </CheckboxRoot>
</template>
