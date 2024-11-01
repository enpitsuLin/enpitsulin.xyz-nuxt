<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout>
    <div flex="~ col items-center justify-center">
      <h2 pb-4 text-3xl>
        {{ error.statusCode }}
      </h2>
      <UiButton @click="handleError">
        Clear errors
      </UiButton>
    </div>
  </NuxtLayout>
</template>
