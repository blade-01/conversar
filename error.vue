<script setup lang="ts">
const props = defineProps<{
  error: any;
}>();

useHead({
  title: `Error ${props.error.statusCode} - ${props.error.message}`,
});

const handleClearError = () => clearError({ redirect: "/" });
const { setTheme } = useTheme();
</script>

<template>
  <div
    class="flex justify-center items-center flex-col max-w-sm mx-auto text-center h-screen overflow-hidden bg-bg-primary dark:bg-bg-dark"
  >
    <div class="fixed top-5 right-5">
      <Icon
        :name="$colorMode.value === 'dark' ? 'mdi:weather-night' : 'mdi:weather-sunny'"
        size="23"
        class="cursor-pointer"
        @click="setTheme($colorMode.preference === 'dark' ? 'light' : 'dark')"
      />
    </div>
    <p class="mt-7 text-7xl font-bold">{{ error.statusCode }}</p>
    <p class="mt-7">{{ error.message }}</p>
    <div class="flex justify-center mt-8">
      <UiBtn append-icon="bx:home-alt" @click="handleClearError"> Go Home </UiBtn>
    </div>
  </div>
</template>
