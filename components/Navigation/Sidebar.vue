<script setup lang="ts">
const { links, toggleDropdown } = useSidebarUtils();
defineProps<{ nav: boolean }>();
</script>

<template>
  <div class="sidebar" :class="{ 'active-sidebar': nav }">
    <div>
      <div class="sidebar-header">
        <NuxtLink to="/">
          <nuxt-img
            provider="cloudinary"
            :src="$colorMode.value === 'dark' ? '/nb-light.svg' : '/nb-dark.svg'"
            alt="logo"
            fit="inside"
            height="60"
            width="60"
          />
        </NuxtLink>
      </div>
      <div class="sidebar-content">
        <ul class="flex flex-col gap-y-2">
          <li v-for="(link, index) in links" :key="index">
            <span v-if="!link.sub">
              <RouterLink
                :to="`${link.route}`"
                active-class="sidebar-active"
                class="sidebar-item"
              >
                <Icon v-if="link.icon" :name="`mdi:${link.icon}`" width="25" />
                <span class="font-light">{{ link.name }}</span>
              </RouterLink>
            </span>
            <span v-else>
              <span
                class="flex items-center justify-between sidebar-item mb-2"
                @click="toggleDropdown(link)"
              >
                <span class="flex items-center gap-3">
                  <Icon v-if="link.icon" :name="`mdi:${link.icon}`" width="25" />
                  <span class="font-light">{{ link.name }}</span>
                </span>
                <Icon
                  name="mdi:menu-down-outline"
                  width="18"
                  :class="
                    link.show
                      ? 'transition-all ease-in duration-300 transform rotate-180'
                      : 'transition-all ease-out duration-300 transform rotate-40'
                  "
                ></Icon>
              </span>
              <span
                class="flex flex-col"
                :class="[
                  link.show
                    ? 'transition-[max-height] max-h-[5000px] duration-200 ease-in'
                    : 'transition-[max-height] max-h-0 duration-300 ease-out overflow-hidden',
                ]"
              >
                <span v-for="(sub, index) in link.sub" :key="index">
                  <span class="block pl-[37px] pb-2">
                    <RouterLink
                      :to="`${sub.route}`"
                      active-class="sidebar-active"
                      class="sidebar-item"
                    >
                      <span class="font-light">{{ sub.name }}</span>
                    </RouterLink>
                  </span>
                </span>
              </span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  @apply bg-white dark:bg-darkBgSec shadow-sm z-40 w-[260px] fixed top-0 md:left-0  -left-full transition-[left];
}

.sidebar-header {
  @apply sticky top-0 bg-white dark:bg-darkBgSec w-full h-[60px] shadow-sm p-4 flex justify-between items-center;
}

.sidebar-content {
  @apply h-screen md:h-[calc(100vh-60px)] py-6 px-4 overflow-y-auto;
}

.active-sidebar {
  @apply left-0 w-[260px] md:-left-full;
}

.sidebar-item {
  @apply p-3 transition-all ease-in-out duration-300 hover:bg-[#00000042] hover:text-white hover:rounded-md cursor-pointer flex items-center gap-2;
}
.sidebar-active {
  @apply bg-[rgb(140,139,139)] dark:bg-[rgba(225,225,225,0.1)] rounded-md text-white hover:bg-[rgb(169,169,169)] dark:hover:bg-[rgba(225,225,225,0.1)] !important;
}
</style>
