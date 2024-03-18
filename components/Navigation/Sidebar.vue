<script setup lang="ts">
import { signOut } from "firebase/auth";
defineProps<{ nav: boolean }>();
const { links, toggleDropdown } = useSidebarUtils();
const channelModal = ref(false);
function handleSubmit(values: any) {
  console.log("submitted", values);
  channelModal.value = false;
}
const { auth, user } = useAuth();
async function logout() {
  await signOut(auth);
  useRouter().push("/auth");
}
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
      <div @click="logout" class="flex flex-col items-center gap-1 cursor-pointer">
        <div
          class="w-10 h-10 rounded-full bg-bg-sidebarLink dark:bg-bg-darkSidebarLink flex justify-center items-center text-style"
        >
          <Icon name="mdi:logout" width="20" />
        </div>
        <p class="text-xs text-style">Log out</p>
      </div>
    </div>
    <div class="w-full">
      <div class="sidebar-header">
        <PvAvatar :image="user.photoURL" shape="circle" />
        <p>{{ user?.displayName }}</p>
      </div>
      <div class="sidebar-content">
        <ul class="flex flex-col gap-y-2">
          <li v-for="(link, index) in links" :key="index" class="truncate">
            <span>
              <span
                class="flex items-center justify-between sidebar-item hover:!bg-transparent mb-2"
                @click="toggleDropdown(link)"
              >
                <span class="flex items-center gap-3 font-medium">
                  <Icon v-if="link.icon" :name="`mdi:${link.icon}`" width="25" />
                  <span class="text-sm uppercase text-style">{{ link.name }}</span>
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
                      <span class="icon-style">
                        <Icon v-if="sub.icon" :name="`mdi:${sub.icon}`" size="15" />
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
          <li class="sidebar-item -mt-2" @click="channelModal = !channelModal">
            <span class="icon-style">
              <Icon name="mdi:plus" size="15" />
            </span>
            <span class="font-light text-text-secondary dark:text-text-darkSec"
              >Create Channel</span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>

  <UiModalCenter
    v-model="channelModal"
    header="Create Channel"
    outer-class="w-[90%] lg:w-[500px]"
  >
    <Form :initial-values="{ switch: true }" @submit="handleSubmit" class="p-4 w-full">
      <UiInputField
        name="channelName"
        label="CHANNEL NAME"
        prepend-icon="mdi:pound"
        outer-classes="!mb-0"
      />
      <p class="text-style text-xs mt-2.5 text-[rgba(4,4,4,0.8)] dark:text-white/60">
        Channels are where conversations happen around a topic. Use a name that is easy to
        find and understand.
      </p>
      <div class="flex justify-between items-center text-style mt-5 w-full">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-1.5">
            <Icon name="mdi:lock" size="20" />
            <p class="text-sm lg:text-base font-medium">Private Channel</p>
          </div>
          <p class="text-xs">Channels created are only visible to you</p>
        </div>
        <UiInputSwitch name="switch" outer-classes="!w-fit" disabled />
      </div>
      <div class="flex justify-end mt-14 gap-2.5">
        <UiBtn
          class="!bg-transparent"
          size="sm"
          label="Cancel"
          type="button"
          @click="channelModal = !channelModal"
        />
        <UiBtn
          label="Create Channel"
          class="btn !bg-bg-secondary !text-white"
          size="sm"
        />
      </div>
    </Form>
  </UiModalCenter>
</template>

<style scoped>
.sidebar {
  @apply bg-bg-sidebar dark:bg-bg-darkSidebar border-r border-r-border-topbar dark:border-r-border-darkTopbar z-40 fixed top-0 -left-full lg:left-0 transition-[left] lg:transition-none duration-500 flex
  /* WIDTH */
  w-[var(--sidebar-width)] md:w-[var(--sidebar-width-md)] lg:w-[var(--sidebar-width-lg)] 2xl:w-[var(--sidebar-width-2xl)];
}

.sidebar-channel {
  @apply flex items-center flex-col gap-10 bg-bg-channelBar dark:bg-bg-darkChannelBar h-[inherit] p-2.5;
}

.sidebar-header {
  @apply sticky top-0 text-style font-medium bg-bg-sidebar dark:bg-bg-darkSidebar w-full h-[var(--sidebar-height)] border-b border-b-border-topbar dark:border-b-border-darkTopbar p-4 flex items-center gap-2.5;
}

.sidebar-content {
  @apply h-[calc(100vh-var(--sidebar-height))] py-6 px-4 overflow-y-auto;
}

.sidebar-item {
  @apply p-2 transition-all ease-in-out duration-300 text-style hover:rounded-md cursor-pointer flex items-center gap-2 hover:bg-bg-sidebarLink dark:hover:bg-bg-darkSidebarLink;
}
.sidebar-active-link {
  @apply bg-bg-sidebarLink dark:bg-bg-darkSidebarLink rounded-md text-style  !important;
}

.sidebar-opened {
  @apply left-0;
}
</style>
