<script setup lang="ts">
import UiBtn from "~/components/Ui/Btn/index.vue";
import useTheme from "~/composables/useTheme";
defineEmits(["toggleSidebar"]);
const { setTheme } = useTheme();
defineProps<{
  isNavOpen: boolean;
}>();
const { tooltipStyle } = usePvStyle();
const sidebarToggler = ref<InstanceType<typeof UiBtn> | null>(null);
useShortcut({
  toggle() {
    sidebarToggler.value?.triggerClick();
  },
});
</script>

<template>
  <div
    class="flex items-center main sticky top-0 w-full h-[60px] z-30 shadow-sm bg-white dark:bg-darkBgSec"
  >
    <div class="p-4 w-full">
      <div class="flex justify-between items-center w-full">
        <div class="flex items-center gap-2">
          <UiBtn
            v-tooltip="{
              value: `${!isNavOpen ? 'collapse [' : 'expand ['}`,
              pt: tooltipStyle,
            }"
            ref="sidebarToggler"
            class="!p-0 !bg-transparent"
            @click="$emit('toggleSidebar')"
          >
            <Icon name="mdi:menu" class="text-3xl font-bold cursor-pointer"></Icon>
          </UiBtn>
          <p>Welcome, Blade!</p>
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
          <Icon name="mdi:magnify" size="20" class="cursor-pointer" />
          <Icon name="mdi:bell-outline" size="20" class="cursor-pointer" />
          <div class="flex gap-2 items-center cursor-pointer">
            <img
              src="https://avatars.githubusercontent.com/u/47092407?v=4"
              alt="illustration_01"
              class="w-10 h-10 border-2 border-primary rounded-full"
            />
            <p class="hidden md:flex">Blade</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
