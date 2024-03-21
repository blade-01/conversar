<script setup lang="ts">
import { collection, addDoc, Timestamp, query, orderBy } from "firebase/firestore";
const props = defineProps<{ title: string; message?: string; description?: string }>();

const memberSheet = ref(false);

const { user } = useAuth();
const chat = ref("");
const chatBox = ref<HTMLElement | null>(null);
const resetForm = ref<HTMLFormElement | null>(null);
async function handleSubmit() {
  try {
    await addDoc(
      collection(collection(db, "channels"), props.title.toLocaleLowerCase(), "messages"),
      {
        message: chat.value,
        createdAt: Timestamp.now(),
        uid: user.value.uid,
        name: user.value.displayName,
        avatar: user.value.photoURL,
      }
    );
    resetForm.value?.reset();
    resetForm.value?.focus();
    const inputElement = chatBox.value;
    console.log(inputElement);
    // if (inputElement) {
    //   inputElement.style.height = "initial"; // Set to default height
    //   inputElement.style.overflowY = "hidden"; // Hide scrollbars
    // }
    // chatBox.value?.style.height = "50px";
    scrollToBottom();
  } catch (error) {
    return Promise.reject(error);
  }
}

const db = useFirestore();
const users = useCollection(query(collection(db, "users"), orderBy("name")));
// const messageContainer = ref<HTMLElement | null>(null);
// function scrollToBottom() {
//   const messageContainer = document.querySelector(".message-container") as HTMLElement;
//   messageContainer.scrollTop = messageContainer.scrollHeight;
//   // nextTick(() => {
//   //   if (messageContainer.value) {
//   //     messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
//   //   }
//   // });
// }

// const messageContainer = ref<HTMLElement | null>(null);

// const scrollToBottom = () => {
//   // Vue.nextTick ensures that the DOM is updated before scrolling
//   nextTick(() => {
//     const container = messageContainer.value;
//     if (container) {
//       container.scrollTop = container.scrollHeight;
//     }
//   });
// };

onMounted(() => {
  setTimeout(() => {
    scrollToBottom();
  }, 1000);
});

const contentWrapper = ref<HTMLElement | null>(null);

// After a new message is sent, call this function
const scrollToBottom = () => {
  nextTick(() => {
    const contentElement = contentWrapper.value;
    if (contentElement) {
      // contentElement.scrollTop = contentElement.scrollHeight;
      contentElement.scrollTo({ top: contentElement.scrollHeight, behavior: "smooth" });
    }
  });
};
</script>

<template>
  <div>
    <NavigationTopbar :title="title" @toggle-members="memberSheet = !memberSheet" />
    <!-- CHATS WRAPPER -->
    <div
      class="xl:flex md:h-[calc(100vh-var(--sidebar-height))] overflow-hidden md:overflow-auto break-all"
    >
      <div
        class="relative h-[calc(100vh-142px)] md:h-full md:flex md:flex-col overflow-y-auto w-full xl:border-r border-r-border-topbar dark:border-r-border-darkTopbar"
      >
        <!-- CONTENT WRAPPER -->
        <div class="py-4 flex-1 md:overflow-y-auto" ref="contentWrapper">
          <div class="px-4">
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
          <div class="mt-5 mb-[80px] lg:mb-0">
            <slot />
          </div>
        </div>
        <!-- ./ CONTENT WRAPPER -->

        <!-- INPUT WRAPPER -->
        <div
          class="fixed md:sticky w-[inherit] left-0 bottom-0 z-10 bg-bg-primary dark:bg-bg-dark p-4 message-container"
          ref="messageContainer"
        >
          <form @submit.prevent="handleSubmit" class="w-full" ref="resetForm">
            <UiInputChat
              v-model="chat"
              name="message"
              placeholder="Send a message"
              ref="chatBox"
            />
          </form>
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
