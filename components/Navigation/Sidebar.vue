<script setup lang="ts">
const { links, toggleDropdown } = useSidebarUtils();
defineProps<{ nav: boolean }>();
</script>

<template>
  <div class="sidebar" :class="{ 'sidebar-opened': nav }">
    <div class="sidebar-channel">
      <div class="flex flex-col gap-2 items-center">
        <div
          class="bg-bg-secondary rounded-xl w-[52px] h-[52px] flex justify-center items-center"
        >
          <img src="~/assets/svg/logo-light.svg" alt="logo" class="w-7 h-8" />
        </div>
        <hr class="border-t border-t-[#2F2E31] w-[50%]" />
      </div>
      <NuxtLink to="/auth" class="flex flex-col items-center gap-1 cursor-pointer">
        <div
          class="w-10 h-10 rounded-full bg-bg-sidebarLink dark:bg-bg-darkSidebarLink flex justify-center items-center text-text-primary dark:text-text-dark"
        >
          <Icon name="mdi:logout" width="20" />
        </div>
        <p class="text-xs text-text-primary dark:text-text-dark">Log out</p>
      </NuxtLink>
    </div>
    <div class="w-full">
      <div class="sidebar-header">
        <PvAvatar
          image="https://avatars.githubusercontent.com/u/47092407?v=4"
          shape="circle"
        />
        <p>Salisu Blade</p>
      </div>
      <div class="sidebar-content">
        <ul class="flex flex-col gap-y-2">
          <li v-for="(link, index) in links" :key="index" class="truncate">
            <span>
              <span
                class="flex items-center justify-between sidebar-item mb-2"
                @click="toggleDropdown(link)"
              >
                <span class="flex items-center gap-3 font-medium">
                  <Icon v-if="link.icon" :name="`mdi:${link.icon}`" width="25" />
                  <span class="text-sm uppercase text-text-primary dark:text-text-dark">{{
                    link.name
                  }}</span>
                </span>
                <Icon
                  name="mdi:chevron-down"
                  width="20"
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
                  <span class="block pb-2">
                    <RouterLink
                      :to="`${sub.route}`"
                      active-class="sidebar-active-link"
                      class="sidebar-item"
                    >
                      <span
                        class="rounded-full bg-bg-sidebarLink dark:bg-bg-darkSidebarLink flex justify-center items-center w-8 h-8 cursor-pointer"
                      >
                        <Icon v-if="sub.icon" :name="`mdi:${sub.icon}`" width="15" />
                      </span>
                      <span class="font-light">{{
                        truncateString(sub.name || "", 15)
                      }}</span>
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
  @apply bg-white dark:bg-bg-darkSidebar border-r border-r-border-topbar dark:border-r-border-darkTopbar z-40 w-[var(--sidebar-width)] md:w-[var(--sidebar-width-md)] lg:w-[var(--sidebar-width-lg)] fixed top-0 -left-full md:left-0 transition-[left] duration-500 flex;
}

.sidebar-channel {
  @apply flex items-center flex-col gap-10 bg-bg-channelBar dark:bg-bg-darkChannelBar h-[inherit] p-2.5;
}

.sidebar-header {
  @apply sticky top-0 text-text-primary dark:text-text-dark font-medium bg-white dark:bg-bg-darkSec w-full h-[var(--sidebar-height)] border-b border-b-border-topbar dark:border-b-border-darkTopbar p-4 flex items-center gap-2.5;
}

.sidebar-content {
  @apply h-[calc(100vh-var(--sidebar-height))] py-6 px-4 overflow-y-auto;
}

.sidebar-item {
  @apply p-2 transition-all ease-in-out duration-300 hover:bg-hover-sidebar hover:text-text-primary dark:hover:text-text-dark hover:rounded-md cursor-pointer flex items-center gap-2 hover:bg-bg-sidebarLink dark:hover:bg-bg-darkSidebarLink;
}
.sidebar-active-link {
  @apply bg-bg-sidebarLink dark:bg-bg-darkSidebarLink rounded-md text-text-primary dark:text-text-dark  !important;
}

.sidebar-opened {
  @apply left-0;
}
</style>
