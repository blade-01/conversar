<script setup lang="ts">
const { nav } = storeToRefs(useMainStore());

watch(
  () => useRoute().path,
  () => {
    nav.value = false;
  }
);
</script>

<template>
  <div class="relative overflow-x-clip">
    <NavigationSidebar :nav="nav" />
    <main class="mainbar-wrapper" :class="{ 'mainbar-opened': nav }">
      <div class="relative">
        <NuxtPage />
      </div>
    </main>
  </div>
</template>

<style scoped>
.mainbar-wrapper {
  @apply bg-bg-primary dark:bg-bg-dark h-screen overflow-y-auto w-full md:ml-[var(--sidebar-width-md)] md:w-[calc(100%-var(--sidebar-width-md))] lg:ml-[var(--sidebar-width-lg)] lg:w-[calc(100%-var(--sidebar-width-lg))] transition-[margin-left] duration-500 md:transition-none;
}
.mainbar-opened {
  @apply ml-[var(--sidebar-width)] md:ml-[var(--sidebar-width-md)] lg:ml-[var(--sidebar-width-lg)];
}
</style>
