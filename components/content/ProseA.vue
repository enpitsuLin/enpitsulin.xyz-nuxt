<script setup lang="ts">

</script>

<template>
  <span role="note" flex="inline items-center">
    <a
      v-bind="$attrs" decoration-none
      class="from-accent to-accent duration-250 transition-property-[background-size] hover:bg-[size:100%_2px]"
      bg="gradient-to-r no-repeat [position:left_bottom] [size:0_2px] "
    >
      <ContentSlot :use="$slots.default" />
    </a>
    <i class="i-mingcute:arrow-right-up-line translate-y-2px op-70" inline-block />
  </span>
</template>
