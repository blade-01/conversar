<script setup lang="ts">
defineProps<{ title: string; message?: string; description?: string }>();
const items = [
  {
    name: "Taofiq Animashaun",
    avatar: "https://randomuser.me/api/port",
  },
  {
    name: "Moses Ajor",
    avatar: "https://randomuser.me/api/port",
  },
  {
    name: "Oluwaseun Salisu",
    avatar: "https://randomuser.me/api/port",
  },
];

const memberSheet = ref(false);

function handleSubmit(values: any) {
  console.log("submitted", values);
}
</script>

<template>
  <NavigationTopbar :title="title" @toggle-members="memberSheet = !memberSheet" />
  <!-- CHATS WRAPPER -->
  <div class="xl:flex h-auto overflow-hidden">
    <div
      class="relative w-full border-r border-r-border-topbar dark:border-r-border-darkTopbar"
    >
      <!-- CONTENT WRAPPER -->
      <div class="py-4 px-4 flex-1 h-[calc(100vh-142px)] overflow-y-auto">
        <div>
          <div class="icon-style h-12 w-12 lg:h-16 lg:w-16 mb-3">
            <Icon name="mdi:pound" class="text-2xl lg:text-3xl" />
          </div>
          <h1 class="text-xl lg:text-2xl font-bold text-style mb-1">
            {{ message || `Welcome to ${title} channel` }}
          </h1>
          <p class="text-sm lg:text-base text-style">
            {{ description || `This is the start of ${title} channel` }}
          </p>
        </div>
        <div class="mt-5">
          <slot />
        </div>
      </div>
      <!-- ./ CONTENT WRAPPER -->

      <!-- INPUT WRAPPER -->
      <div class="sticky w-full left-0 bottom-0 z-50 bg-bg-primary dark:bg-bg-dark p-4">
        <Form @submit="handleSubmit" class="w-full">
          <UiInputChat
            name="message"
            as="textarea"
            rows="1"
            placeholder="Send a message"
            append-icon="carbon:send-alt-filled"
          >
            <template #appendIcon>
              <div
                class="w-8 h-8 text-gray-700/[0.6] dark:text-white/[0.6] bg-[rgba(219,219,219,0.93)] dark:bg-[#515151] rounded-xl flex justify-center items-center hover:scale-95 transition-all duration-300 ease-in-out cursor-pointer"
              >
                <Icon name="carbon:send-alt-filled" />
              </div>
            </template>
          </UiInputChat>
        </Form>
      </div>
      <!-- ./ INPUT WRAPPER -->
    </div>
    <!-- ./ CHATS WRAPPER -->

    <!-- MEMBERS -->
    <div
      class="xl:basis-[var(--sidebar-width-lg)] 2xl:basis-[var(--sidebar-width-2xl)] hidden xl:block"
    >
      <div class="p-4 sticky top-[var(--sidebar-height)]">
        <div class="flex flex-col gap-5">
          <p class="uppercase text-sm font-medium text-style">Members</p>
          <div v-for="item in items" :key="item.name" class="flex gap-2.5 items-center">
            <PvAvatar
              image="https://avatars.githubusercontent.com/u/47092407?v=4"
              shape="circle"
            />
            <p class="text-style text-sm">{{ truncateString(item.name || "", 20) }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- ./ MEMBERS -->
  </div>

  <!-- MEMBERS: MOBILE AND IPAD -->
  <div class="xl:hidden">
    <UiModalSide v-model="memberSheet" title="Members" size="sm">
      <div class="flex flex-col gap-5">
        <div v-for="item in items" :key="item.name" class="flex gap-2.5 items-center">
          <PvAvatar
            image="https://avatars.githubusercontent.com/u/47092407?v=4"
            shape="circle"
          />
          <p class="text-style text-sm">{{ truncateString(item.name || "", 20) }}</p>
        </div>
      </div>
    </UiModalSide>
  </div>
  <!-- ./ MEMBERS: MOBILE AND IPAD -->
</template>

<style scoped></style>
