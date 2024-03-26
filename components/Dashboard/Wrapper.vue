<script setup lang="ts">
defineProps<{
  title: string | undefined;
  message?: string;
  description?: string;
}>();

const { type } = useRoute().query;

const {
  pendingUsers,
  filteredUsers,
  pending,
  users,
  introductionChannel,
  memberExceededModal,
  memberModal,
  handleAddMembers,
  addMembers,
  initialValues,
  isLoading,
} = useMember();

const {
  mainSchema,
  contentWrapper,
  chatInput,
  memberSheet,
  chat,
  resetForm,
  isLoading: messageLoading,
  handleMessageSend,
  handleEnterPress,
} = useMessage();

const adjustChatContainerHeight = () => {
  // const chatContainer = document.querySelector(".chat-container") as HTMLElement;
  if (contentWrapper.value) {
    contentWrapper.value.style.height = window.innerHeight + "px";
  }
};

if (process.client) {
  onMounted(() => {
    adjustChatContainerHeight();
    window.addEventListener("resize", adjustChatContainerHeight);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", adjustChatContainerHeight);
  });
}
</script>

<template>
  <div>
    <NavigationTopbar :title="title" @toggle-members="memberSheet = !memberSheet" />
    <!-- CHATS WRAPPER -->
    <div class="xl:flex h-[calc(100vh-var(--sidebar-height))] overflow-auto break-all">
      <div
        class="relative h-full flex flex-col overflow-hidden md:overflow-y-auto w-full xl:border-r border-r-border-topbar dark:border-r-border-darkTopbar"
      >
        <!-- CONTENT WRAPPER -->
        <div
          class="py-4 flex-1 overflow-y-auto h-auto content-wrapper"
          ref="contentWrapper"
        >
          <div class="px-4">
            <div class="icon-style h-12 w-12 lg:h-16 lg:w-16 mb-3">
              <Icon name="mdi:pound" class="text-2xl lg:text-3xl" />
            </div>
            <h1 class="text-xl lg:text-2xl font-bold text-style mb-1">
              Welcome to <span class="capitalize">{{ title || "..." }}</span> channel
            </h1>
            <p class="text-sm lg:text-base text-style">
              This is the start of
              <span class="capitalize">{{ title || "..." }}</span> channel
            </p>
          </div>
          <div class="mt-5 mb-0">
            <slot />
          </div>
        </div>
        <!-- ./ CONTENT WRAPPER -->

        <!-- INPUT WRAPPER -->
        <div
          class="sticky w-[inherit] left-0 bottom-0 z-10 bg-bg-primary dark:bg-bg-dark p-4 message-container"
          ref="messageContainer"
        >
          <form
            @submit.prevent="handleMessageSend"
            @keydown.enter.prevent="handleEnterPress"
            class="w-full"
            ref="resetForm"
          >
            <UiInputChat
              v-model="chat"
              name="message"
              placeholder="Send a message"
              ref="chatInput"
              :is-loading="messageLoading"
            />
          </form>
        </div>
        <!-- ./ INPUT WRAPPER -->
      </div>
      <!-- ./ CHATS WRAPPER -->

      <!-- MEMBERS -->
      <div
        class="xl:basis-[var(--sidebar-width-lg)] 2xl:basis-[var(--sidebar-width-2xl)] hidden xl:block overflow-y-auto"
      >
        <div class="sticky top-0">
          <div class="flex flex-col gap-2 pb-5">
            <div
              class="flex justify-between items-center sticky top-0 bg-bg-primary dark:bg-bg-dark p-4"
            >
              <p class="uppercase text-sm font-medium text-style">Members</p>
              <span
                class="icon-style"
                @click="addMembers"
                v-if="!introductionChannel && !type"
              >
                <Icon name="mdi:plus" size="15" />
              </span>
            </div>
            <div v-if="users?.length">
              <div class="flex flex-col gap-1" v-if="!pending || !pendingUsers">
                <DisplayMember
                  v-for="user in users"
                  :key="user.uid"
                  :user="(user as MemberIndexData)"
                />
              </div>
              <div class="px-4 flex flex-col gap-5" v-else>
                <UiLoaderUsers v-for="i in 5" :key="i" />
              </div>
            </div>
            <div v-if="!users.length && !pending && !pendingUsers" class="px-4">
              <p
                class="text-sm text-center mt-2.5 text-[rgba(4,4,4,0.8)] dark:text-white/60"
              >
                Oops! You don't have any members in this channel yet.
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- ./ MEMBERS -->
    </div>

    <!-- MEMBERS: MOBILE AND IPAD -->
    <div class="xl:hidden">
      <UiModalSide v-model="memberSheet" title="Members" size="sm">
        <div v-if="users?.length">
          <div class="flex flex-col gap-5" v-if="!pending || !pendingUsers">
            <DisplayMember
              v-for="user in users"
              :key="user.uid"
              :user="(user as MemberIndexData)"
            />
          </div>
          <div class="flex flex-col gap-5" v-else>
            <UiLoaderUsers v-for="i in 5" :key="i" />
          </div>
        </div>
        <div v-if="!users.length && !pending && !pendingUsers" class="px-4">
          <p class="text-sm text-center mt-2.5 text-[rgba(4,4,4,0.8)] dark:text-white/60">
            Oops! You don't have any members in this channel yet.
          </p>
        </div>
        <template #add>
          <div
            class="flex gap-2.5 justify-end items-center"
            @click="addMembers"
            v-if="!introductionChannel && !type"
          >
            <span class="icon-style">
              <Icon name="mdi:plus" size="15" />
            </span>
          </div>
        </template>
      </UiModalSide>
    </div>
    <!-- ./ MEMBERS: MOBILE AND IPAD -->

    <!-- Member Modal -->
    <UiModalCenter
      v-model="memberModal"
      header="Invite members"
      outer-class="w-[90%] lg:w-[500px]"
    >
      <Form
        @submit="handleAddMembers"
        :validation-schema="mainSchema"
        :initial-values="initialValues"
        v-slot="{ errors }"
        class="p-4 w-full"
      >
        <UiInputMultiSelect
          name="users"
          :options="filteredUsers"
          option-label="name"
          label="Select Members"
          filter
          show-clear
          :error="errors.users"
          display="chip"
        />
        <p class="text-xs mt-2.5 text-[rgba(4,4,4,0.8)] dark:text-white/60">
          Each channel can have up to 2 members. Ensure you don't exceed this limit when
          adding users.
        </p>

        <div class="flex justify-end mt-14 gap-5">
          <UiBtn
            class="!bg-transparent !px-0"
            size="sm"
            label="Cancel"
            type="button"
            @click="memberModal = !memberModal"
          />
          <UiBtn
            label="Add member"
            class="btn !bg-bg-secondary !text-white"
            size="sm"
            :is-loading="isLoading"
          />
        </div>
      </Form>
    </UiModalCenter>
    <!-- ./ Member Modal -->

    <!-- Member Exceeded Modal -->
    <UiModalCenter
      v-model="memberExceededModal"
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
          Oops! You've hit the member invite limit. Take a moment to your remove the weak
          link amongst your members 🌚.
        </p>
      </div>
    </UiModalCenter>
    <!-- ./ Member Exceeded Modal -->
  </div>
</template>

<style scoped>
.content-wrapper {
  -webkit-overflow-scrolling: touch;
}
.content-wrapper::-webkit-scrollbar {
  /* @apply rounded-full bg-red-600; */
}
</style>
