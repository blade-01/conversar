<script setup lang="ts">
import useTheme from "~/composables/useTheme";
const { setTheme } = useTheme();
</script>

<template>
  <div
    class="flex flex-col justify-center items-center gap-2.5 text-center h-screen px-4"
  >
    <div class="fixed top-5 right-5">
      <Icon
        :name="$colorMode.value === 'dark' ? 'mdi:weather-night' : 'mdi:weather-sunny'"
        size="23"
        class="cursor-pointer"
        @click="setTheme($colorMode.preference === 'dark' ? 'light' : 'dark')"
      />
    </div>
    <slot />
  </div>
</template>

<style scoped></style>
