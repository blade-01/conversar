<script setup lang="ts">
import { collection, addDoc, Timestamp } from "firebase/firestore";
const props = defineProps<{ title: string; message?: string; description?: string }>();

const memberSheet = ref(false);

const { user } = useAuth();

async function handleSubmit(values: any, { resetForm }: any) {
  if (values.message) {
    try {
      // await addDoc(
      //   collection(
      //     collection(db, "channels"),
      //     props.title.toLocaleLowerCase(),
      //     "messages"
      //   ),
      //   {
      //     message: values.message,
      //     createdAt: Timestamp.now(),
      //     uid: user.value.uid,
      //     name: user.value.displayName,
      //     avatar: user.value.photoURL,
      //   }
      // );
      resetForm();
    } catch (error) {
      return Promise.reject(error);
    }
  }
  resetForm();
}

const db = useFirestore();
const users = useCollection(collection(db, "users"));
</script>

<template>
  <div>
    <NavigationTopbar :title="title" @toggle-members="memberSheet = !memberSheet" />
    <!-- CHATS WRAPPER -->
    <div
      class="xl:flex md:h-[calc(100vh-var(--sidebar-height))] overflow-hidden md:overflow-auto"
    >
      <div
        class="relative h-[calc(100vh-142px)] md:h-full md:flex md:flex-col overflow-y-auto w-full xl:border-r border-r-border-topbar dark:border-r-border-darkTopbar"
      >
        <!-- CONTENT WRAPPER -->
        <div class="py-4 px-4 flex-1 md:overflow-y-auto">
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
          <div class="mt-5 mb-[100px] lg:mb-0">
            <slot />
          </div>
        </div>
        <!-- ./ CONTENT WRAPPER -->

        <!-- INPUT WRAPPER -->
        <div
          class="fixed md:sticky w-full left-0 bottom-0 z-10 bg-bg-primary dark:bg-bg-dark p-4"
        >
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
        <div class="p-4 sticky top-0">
          <div class="flex flex-col gap-5">
            <p class="uppercase text-sm font-medium text-style">Members</p>
            <div v-for="user in users" :key="user.uid" class="flex gap-2.5 items-center">
              <PvAvatar :image="user.avatar" shape="circle" />
              <p class="text-style text-sm">
                {{ truncateString(user.name || "", 20) }}
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
        <div class="flex flex-col gap-5">
          <div v-for="user in users" :key="user.uid" class="flex gap-2.5 items-center">
            <PvAvatar :image="user.avatar" shape="circle" />
            <p class="text-style text-sm">
              {{ truncateString(user.name || "", 20) }}
            </p>
          </div>
        </div>
      </UiModalSide>
    </div>
    <!-- ./ MEMBERS: MOBILE AND IPAD -->
  </div>
</template>

<style scoped></style>
