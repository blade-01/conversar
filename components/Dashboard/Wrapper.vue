<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div>
    <NavigationTopbar :title="title" />
    <div class="p-4">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
