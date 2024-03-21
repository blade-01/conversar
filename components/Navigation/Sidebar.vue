<script setup lang="ts">
import { signOut } from "firebase/auth";
import {
  collection,
  query,
  where,
  orderBy,
  Timestamp,
  setDoc,
  doc,
} from "firebase/firestore";
defineProps<{ nav: boolean }>();
const { auth, user } = useAuth();
const db = useFirestore();
const { data: channels, pending } = useCollection(
  query(collection(db, "channels"), where("id", "==", user.value.uid), orderBy("name"))
);
const { links, toggleDropdown } = useSidebarUtils();
const channelModal = ref(false);
const isLoading = ref(false);
async function handleSubmit(values: any, { resetForm }: any) {
  if (values.channelName) {
    try {
      isLoading.value = true;
      await setDoc(
        doc(db, "channels", values.channelName.toLowerCase()),
        {
          name: values.channelName.toLowerCase(),
          id: user.value.uid,
          createdAt: Timestamp.now(),
        },
        { merge: true }
      );
      resetForm();
      channelModal.value = false;
      isLoading.value = false;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
async function logout() {
  await signOut(auth);
  useRouter().push("/auth");
}

const comingSoon = ref(false);
</script>

<template>
  <div class="sidebar" :class="{ 'sidebar-opened': nav }">
    <div class="sidebar-community">
      <div class="flex flex-col gap-2 items-center">
        <div
          class="bg-bg-secondary rounded-xl w-[52px] h-[52px] flex justify-center items-center"
        >
          <img src="~/assets/svg/logo-light.svg" alt="logo" class="w-7 h-8" />
        </div>
        <hr class="border-t border-t-[#2F2E31] w-[50%]" />
      </div>
      <div class="icon-style w-[50px] h-[50px]" @click="comingSoon = !comingSoon">
        <Icon name="mdi:plus" size="20" class="text-[#23A559]" />
      </div>
      <div @click="logout" class="flex flex-col items-center gap-2 cursor-pointer">
        <div
          class="w-[50px] h-[50px] rounded-full bg-bg-sidebarLink dark:bg-bg-darkSidebarLink flex justify-center items-center text-style"
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
        <div class="flex flex-col gap-y-2">
          <div v-for="(link, index) in links" :key="index" class="truncate">
            <div>
              <div
                class="flex items-center justify-between sidebar-item hover:!bg-transparent mb-2"
                @click="toggleDropdown(link)"
              >
                <p class="flex items-center gap-3 font-medium">
                  <Icon v-if="link.icon" :name="`mdi:${link.icon}`" width="25" />
                  <span class="text-sm uppercase text-style">{{ link.name }}</span>
                </p>
                <Icon
                  name="mdi:chevron-down"
                  width="20"
                  :class="
                    link.show
                      ? 'transition-all ease-in duration-300 transform rotate-180'
                      : 'transition-all ease-out duration-300 transform rotate-40'
                  "
                ></Icon>
              </div>
              <div
                class="flex flex-col"
                :class="[
                  link.show
                    ? 'transition-[max-height] max-h-[5000px] duration-200 ease-in'
                    : 'transition-[max-height] max-h-0 duration-300 ease-out overflow-hidden',
                ]"
              >
                <NuxtLink
                  to="/"
                  active-class="sidebar-active-link"
                  class="sidebar-item mb-2"
                >
                  <span class="icon-style">
                    <Icon name="mdi:pound" size="15" />
                  </span>
                  <span class="font-light">{{
                    truncateString("Introduction" || "", 15)
                  }}</span>
                </NuxtLink>
                <div v-if="!pending">
                  <NuxtLink
                    v-for="channel in channels"
                    :key="channel.id"
                    :to="{
                      name: 'channel-id',
                      params: { id: channel.id },
                    }"
                    active-class="sidebar-active-link"
                    class="sidebar-item mb-2"
                  >
                    <span class="icon-style">
                      <Icon name="mdi:pound" size="15" />
                    </span>
                    <span class="font-light">{{
                      truncateString(channel.name || "", 15)
                    }}</span>
                  </NuxtLink>
                </div>
                <div v-else>
                  <UiLoaderLinks v-for="i in 3" :key="i" />
                </div>
              </div>
            </div>
          </div>
          <li class="sidebar-item -mt-2" @click="channelModal = !channelModal">
            <span class="icon-style">
              <Icon name="mdi:plus" size="15" />
            </span>
            <span class="font-light text-text-secondary dark:text-text-darkSec"
              >Create Channel</span
            >
          </li>
        </div>
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
</style>
