<script setup lang="ts">
defineProps<{ nav: boolean }>();

const { user, logout } = useAuth();

const {
  links,
  toggleDropdown,
  channelModal,
  comingSoon,
  isLoading,
  channelTaken,
  channelExceededModal,
  createChannel,
  pending,
  handleCreateChannel,
} = useChannel();
</script>

<template>
  <div class="sidebar" :class="{ 'sidebar-opened': nav }">
    <div class="sidebar-community">
      <div class="flex flex-col gap-2 items-center">
        <div class="sidebar--logo-style">
          <img src="~/assets/svg/logo-light.svg" alt="logo" class="w-7 h-8" />
        </div>
        <hr class="border-t border-t-[#2F2E31] w-[50%]" />
      </div>
      <div class="icon-style w-[50px] h-[50px]" @click="comingSoon = !comingSoon">
        <Icon name="mdi:plus" size="20" class="text-[#23A559]" />
      </div>
      <div @click="logout" class="flex flex-col items-center gap-2 cursor-pointer">
        <div class="sidebar--logout-icon">
          <Icon name="mdi:logout" width="20" />
        </div>
        <p class="text-xs text-style">Log out</p>
      </div>
    </div>
    <div class="w-full">
      <div class="sidebar-header">
        <PvAvatar :image="user?.photoURL" shape="circle" />
        <p>{{ truncateString(user?.displayName || "", 20) }}</p>
      </div>
      <div class="sidebar-content">
        <div class="flex flex-col gap-y-2">
          <div
            v-for="(link, index) in links"
            :key="index"
            v-if="links?.length"
            class="truncate"
          >
            <div>
              <div
                class="sidebar-item sidebar-channel-header"
                @click="toggleDropdown(link)"
              >
                <p class="flex items-center gap-3 font-medium">
                  <Icon v-if="link?.icon" :name="`mdi:${link?.icon}`" width="25" />
                  <span class="text-sm uppercase text-style" v-if="link?.name">{{
                    link?.name
                  }}</span>
                </p>
                <Icon
                  name="mdi:chevron-down"
                  width="20"
                  :class="
                    link?.show ? 'sidebar--active-chevron' : 'sidebar--inactive-chevron'
                  "
                ></Icon>
              </div>
              <div
                class="flex flex-col"
                :class="[
                  link?.show ? 'sidebar--active-collapse' : 'sidebar--inactive-collapse',
                ]"
              >
                <div v-if="!pending">
                  <DisplayLink
                    :channel="channel"
                    v-for="channel in link?.sub"
                    :key="channel?.id"
                    :is-editable="link?.isEditable"
                    :has-query="link?.hasQuery"
                  />
                </div>
                <div v-else>
                  <UiLoaderLinks v-for="i in 3" :key="i" />
                </div>
                <div
                  class="sidebar-item mt-0.5"
                  @click="createChannel"
                  v-if="link?.hasCreate"
                >
                  <span class="icon-style">
                    <Icon name="mdi:plus" size="15" />
                  </span>
                  <span class="sidebar--create-channel">Create Channel</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Channel Modal -->
  <UiModalCenter
    v-model="channelModal"
    header="Create Channel"
    outer-class="w-[90%] lg:w-[500px]"
  >
    <Form
      :initial-values="{ switch: true }"
      @submit="handleCreateChannel"
      class="p-4 w-full"
    >
      <UiInputField
        name="channelName"
        label="CHANNEL NAME"
        prepend-icon="mdi:pound"
        outer-classes="!mb-0"
      />
      <p class="text-xs text-[#C62828] pt-1.5" v-if="channelTaken">
        Channel name is already taken. Let's brainstorm for a fresh and unique name!
      </p>
      <p class="text-xs mt-2.5 text-[rgba(4,4,4,0.8)] dark:text-white/60">
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
      <div class="flex justify-end mt-14 gap-5">
        <UiBtn
          class="!bg-transparent !px-0"
          size="sm"
          label="Cancel"
          type="button"
          @click="channelModal = !channelModal"
        />
        <UiBtn
          label="Create Channel"
          class="btn !bg-bg-secondary !text-white"
          size="sm"
          :is-loading="isLoading"
        />
      </div>
    </Form>
  </UiModalCenter>
  <!-- ./ Channel Modal -->

  <!-- Channel Exceeded Modal -->
  <UiModalCenter
    v-model="channelExceededModal"
    outer-class="w-[90%] lg:w-[400px]"
    header-class="!justify-end !border-none"
  >
    <div
      class="p-4 pb-8 w-full flex flex-col justify-center items-center text-center gap-2.5"
    >
      <img
        src="~/assets/svg/exceeded-avatar.svg"
        alt="exceeded avatar"
        class="rounded-full border-[15px] border-border-topbar dark:border-border-darkTopbar"
      />
      <p class="text-sm mt-2.5 text-[rgba(4,4,4,0.8)] dark:text-white/60">
        Oops! You've hit the channel creation limit. Take a moment to organize your
        channels.
      </p>
    </div>
  </UiModalCenter>
  <!-- ./ Channel Exceeded Modal -->

  <!-- Coming Soon Modal -->
  <UiModalCenter
    v-model="comingSoon"
    header-class="!justify-end !border-none"
    outer-class="w-[90%] lg:w-[411px]"
  >
    <div class="flex flex-col justify-center items-center gap-2.5 text-center px-5 pb-5">
      <img src="~/assets/svg/coming-soon.svg" alt="coming-soon" class="mb-2.5" />
      <p class="text-style text-xl font-bold mb-1.5">Updates Coming Soon!!</p>
      <p
        class="text-text-primary/[0.64] dark:text-white/[0.64] text-sm leading-6 text-center"
      >
        "Uh-oh! Looks like our Channel Creation feature is playing hide-and-seek! 🙈 Don't
        fret, our detective squad is on it. Meanwhile, chat away with our other cool
        features! 😄🚀"
      </p>
    </div>
  </UiModalCenter>
  <!-- ./ Coming Soon Modal -->
</template>

<style scoped>
.sidebar {
  @apply bg-bg-sidebar dark:bg-bg-darkSidebar border-r border-r-border-topbar dark:border-r-border-darkTopbar z-40 fixed top-0 -left-full lg:left-0 transition-[left] lg:transition-none duration-500 flex
  /* WIDTH */
  w-[var(--sidebar-width)] md:w-[var(--sidebar-width-md)] lg:w-[var(--sidebar-width-lg)] 2xl:w-[var(--sidebar-width-2xl)];
}

.sidebar-community {
  @apply flex items-center flex-col gap-5 bg-bg-channelBar dark:bg-bg-darkChannelBar h-[inherit] p-2.5;
}

.sidebar-header {
  @apply sticky top-0 text-style font-medium bg-bg-sidebar dark:bg-bg-darkSidebar w-full h-[var(--sidebar-height)] border-b border-b-border-topbar dark:border-b-border-darkTopbar p-4 flex items-center gap-2.5;
}

.sidebar-item.sidebar-channel-header {
  @apply flex items-center justify-between hover:!bg-transparent mb-2;
}
.sidebar-content {
  @apply h-[calc(100vh-var(--sidebar-height))] py-6 px-4 overflow-y-auto;
}

.sidebar-item {
  @apply capitalize p-2 transition-all ease-in-out duration-300 text-style hover:rounded-md cursor-pointer flex items-center gap-2 hover:bg-bg-sidebarLink dark:hover:bg-bg-darkSidebarLink;
}
.sidebar-active-link {
  @apply bg-bg-sidebarLink dark:bg-bg-darkSidebarLink rounded-md text-style  !important;
}

.sidebar-opened {
  @apply left-0;
}

.sidebar--logout-icon {
  @apply w-[50px] h-[50px] rounded-full bg-bg-sidebarLink dark:bg-bg-darkSidebarLink flex justify-center items-center text-style;
}

.sidebar--logo-style {
  @apply bg-bg-secondary rounded-xl w-[52px] h-[52px] flex justify-center items-center;
}

.sidebar--active-chevron {
  @apply transition-all ease-in duration-300 transform rotate-180;
}

.sidebar--inactive-chevron {
  @apply transition-all ease-out duration-300 transform rotate-[40deg];
}

.sidebar--active-collapse {
  @apply transition-[max-height] max-h-[5000px] duration-200 ease-in;
}

.sidebar--inactive-collapse {
  @apply transition-[max-height] max-h-0 duration-300 ease-out overflow-hidden;
}

.sidebar--create-channel {
  @apply font-light text-text-secondary dark:text-text-darkSec;
}
</style>
