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
    class="flex justify-center items-center flex-col max-w-lg mx-auto text-center h-screen overflow-hidden bg-bg-primary dark:bg-bg-dark p-6"
  >
    <div class="fixed top-5 right-5 lg:top-10 lg:right-10">
      <Icon
        :name="$colorMode.value === 'dark' ? 'mdi:weather-night' : 'mdi:weather-sunny'"
        size="23"
        class="cursor-pointer"
        @click="setTheme($colorMode.preference === 'dark' ? 'light' : 'dark')"
      />
    </div>
    <div>
      <img src="~/assets/svg/404-dark.svg" alt="404" v-if="$colorMode.value === 'dark'" />
      <img
        src="~/assets/svg/404-light.svg"
        alt="404"
        v-if="$colorMode.value === 'light'"
      />
    </div>
    <div class="flex flex-col gap-5 items-center mt-7 text-style">
      <p class="text-3xl lg:text-5xl font-bold">Oops!</p>
      <p class="text-base md:text-lg">
        We can't seem to find the page you are looking for.
      </p>
      <p class="text-xs italic md:text-sm break-all">({{ error.message }})</p>
    </div>
    <div class="flex justify-center mt-8">
      <UiBtn
        append-icon="bx:home-alt"
        @click="handleClearError"
        class="!bg-bg-secondary !text-white"
      >
        Go Home
      </UiBtn>
    </div>
  </div>
</template>
