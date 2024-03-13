<script setup lang="ts">
import UiBtn from "~/components/Ui/Btn/index.vue";
import useTheme from "~/composables/useTheme";
defineEmits<{
  (e: "toggleSidebar"): void;
}>();
const { setTheme } = useTheme();
const { toggleSidebar } = useMainStore();
defineProps<{
  title: string;
}>();
</script>

<template>
  <div
    class="flex items-center sticky top-0 w-[inherit] h-[var(--sidebar-height)] z-30 bg-bg-topbar dark:bg-bg-darkTopbar border-b border-b-border-topbar dark:border-b-border-darkTopbar"
  >
    <div class="p-4 w-full">
      <div class="flex justify-between items-center w-full">
        <div class="flex items-center gap-2">
          <UiBtn
            ref="sidebarToggler"
            class="!p-0 !bg-transparent md:hidden"
            @click="toggleSidebar"
          >
            <Icon name="mdi:menu" class="text-3xl font-bold cursor-pointer"></Icon>
          </UiBtn>
          <span
            class="rounded-full bg-bg-sidebarLink dark:bg-bg-darkSidebarLink text-text-primary dark:text-text-dark flex justify-center items-center w-8 h-8 cursor-pointer"
          >
            <Icon name="mdi:pound" width="15" />
          </span>
          <p class="font-bold text-text-primary dark:text-text-dark">{{ title }}</p>
        </div>
        <div class="flex items-center gap-4">
          <Icon
            :name="
              $colorMode.value === 'dark' ? 'mdi:weather-night' : 'mdi:weather-sunny'
            "
            size="23"
            class="cursor-pointer"
            @click="setTheme($colorMode.preference === 'dark' ? 'light' : 'dark')"
          />
          <div class="flex gap-2 items-center cursor-pointer">
            <img src="~/assets/svg/members.svg" alt="members_avatar" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
