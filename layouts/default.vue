<script setup lang="ts">
// const { nav } = storeToRefs(useMainStore());
const nav = ref<boolean>(false);
const toggleSidebar = () => {
  nav.value = !nav.value;
};

provide("collapsible", {
  nav,
  toggleSidebar,
});
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
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
.mainbar-wrapper {
  @apply relative bg-bg-primary dark:bg-bg-dark h-screen overflow-hidden w-full transition-[margin-left] lg:transition-none duration-500
  /* MARGIN */
  lg:ml-[var(--sidebar-width-lg)] 2xl:ml-[var(--sidebar-width-2xl)]
  /* WIDTH */
  lg:w-[calc(100%-var(--sidebar-width-lg))] 2xl:w-[calc(100%-var(--sidebar-width-2xl))];
}
.mainbar-opened {
  @apply ml-[var(--sidebar-width)] 
          md:ml-[var(--sidebar-width-md)] 
          lg:ml-[var(--sidebar-width-lg)] 
          2xl:ml-[var(--sidebar-width-2xl)];
}
</style>
