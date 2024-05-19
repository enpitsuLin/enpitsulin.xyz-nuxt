<script setup lang="ts">
import type { IntrinsicElementAttributes } from 'vue'

const attr = useAttrs() as IntrinsicElementAttributes['input']

const isCheckbox = computed(() => attr.type === 'checkbox')
</script>

<template>
  <ProseCheckbox v-if="isCheckbox" />
  <input v-else>
</template>
