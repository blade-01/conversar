<script setup lang="ts">
import UiBtn from "~/components/Ui/Btn/index.vue";
import useTheme from "~/composables/useTheme";
const { setTheme } = useTheme();
defineProps<{
  title: any;
}>();
defineEmits<{
  (e: "toggleMembers"): void;
}>();
const { toggleSidebar } = inject("collapsible") as {
  toggleSidebar: () => void;
};
</script>

<template>
  <div
    class="flex items-center sticky top-0 w-full h-[var(--sidebar-height)] z-30 bg-bg-topbar dark:bg-bg-darkTopbar border-b border-b-border-topbar dark:border-b-border-darkTopbar"
  >
    <div class="p-4 w-full">
      <div class="flex justify-between items-center w-full">
        <div class="flex items-center gap-2">
          <UiBtn
            ref="sidebarToggler"
            class="!p-0 !bg-transparent lg:hidden"
            @click="toggleSidebar"
          >
            <Icon name="mdi:menu" size="24"></Icon>
          </UiBtn>
          <span class="icon-style">
            <Icon name="mdi:pound" size="15" />
          </span>
          <p class="font-bold text-style capitalize">{{ title }}</p>
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
          <div
            class="flex gap-2 items-center cursor-pointer lg:cursor-auto"
            @click="$emit('toggleMembers')"
          >
            <img src="~/assets/svg/members.svg" alt="members_avatar" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
