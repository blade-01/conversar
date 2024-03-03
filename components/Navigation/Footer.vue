<script setup lang="ts">
import useTheme from "~/composables/useTheme";
const { setTheme } = useTheme();
const { availableLocales, locale } = useI18n();
const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales;
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length];
};
</script>

<template>
  <footer>
    <div class="flex gap-3.5 justify-center items-center">
      <NuxtLink to="/"><Icon name="mdi:home" size="23" class="link" /></NuxtLink>
      <Icon
        :name="$colorMode.value === 'dark' ? 'mdi:weather-night' : 'mdi:weather-sunny'"
        size="23"
        class="cursor-pointer"
        @click="setTheme($colorMode.preference === 'dark' ? 'light' : 'dark')"
      />
      <Icon name="mdi:translate" size="23" class="link" @click="toggleLocales" />
      <NuxtLink to="/about"
        ><Icon name="fluent:tab-desktop-multiple-20-regular" size="23" class="link"
      /></NuxtLink>
      <a href="https://github.com/blade-01/NuxtBoost" target="_blank"
        ><Icon name="mdi:github" size="23" class="link"
      /></a>
    </div>
    <aside class="text-center mt-5">
      <p class="font-light text-sm">
        Inspired by
        <a href="https://vueboost.netlify.app" target="_blank" class="underline"
          >Vue Boost</a
        >
      </p>
    </aside>
  </footer>
</template>

<style scoped>
.link {
  @apply cursor-pointer transition-colors hover:text-[#344675];
}
</style>
