<script setup lang="ts">
</script>

<template>
  <div
    bottom="5 sm:3rem" right="3 sm:3rem"
    flex="~ col items-center justify-between gap-y-2"
    border="~ border rounded-lg" bg=" slate-50/40 dark:black/40" fixed p-1
    class="shadow-black/10 shadow-md backdrop-blur-10px transition-all"
  >
    <LayoutThemeButton />
    <LayoutTopUpButton />
  </div>
</template>
