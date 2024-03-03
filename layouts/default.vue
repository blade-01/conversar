<script setup lang="ts">
const nav = ref<boolean>(false);

const toggleSidebar = () => {
  nav.value = !nav.value;
};
</script>

<template>
  <div class="relative overflow-x-clip">
    <NavigationSidebar :nav="nav" />
    <main class="sidebar-wrapper" :class="{ 'active-mainbar': nav }">
      <div class="relative">
        <NavigationTopbar @toggle-sidebar="toggleSidebar" :isNavOpen="nav" />
        <div class="p-4">
          <NuxtPage />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.sidebar-wrapper {
  @apply bg-gray-200 dark:bg-darkBg h-screen overflow-y-auto w-full md:ml-[260px] md:w-[calc(100%-260px)] transition-[margin-left];
}
.active-mainbar {
  @apply ml-[260px] md:ml-0 md:w-full;
}
</style>
