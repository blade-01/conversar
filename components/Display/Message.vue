<script setup lang="ts">
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

const { id } = useRoute().params;

const db = useFirestore();

const { user } = useAuth();

const { $modal } = useNuxtApp();

const props = defineProps<{
  // @ts-ignore
  message: MessageIndexData;
}>();

const { copy, copied } = useClipboard();

const isLoading = ref(false);
const isEditing = ref(false);
const showOptions = ref(false);

function handleMessageDelete() {
  $modal.show({
    type: "danger",
    title: "Are you sure?",
    body: "You won't be able to revert this!",
    primary: {
      label: "Delete",
      theme: "red",
      action: () => deleteMessage(),
    },
    secondary: {
      label: "Cancel",
      theme: "white",
      action: () => {},
    },
  });
}

async function deleteMessage() {
  isLoading.value = true;
  await deleteDoc(
    doc(
      db,
      "channels",
      (id as string).toLocaleLowerCase(),
      "messages",
      props?.message?.id
    )
  );
  isLoading.value = false;
}

async function handleMessageUpdate() {
  updateDoc(
    doc(
      db,
      "channels",
      (id as string).toLocaleLowerCase(),
      "messages",
      props?.message?.id
    ),
    {
      message: props?.message?.message,
    }
  );
}

const options = ref([
  {
    icon: "bx:pencil",
    title: "edit",
    action: () => {
      isEditing.value = true;
    },
    isActive: props?.message?.uid === user?.value?.uid,
  },
  {
    icon: "mdi:content-copy",
    title: "copy",
    action: () => {
      copy(props?.message?.message);
    },
    isActive: true,
  },
  {
    icon: isLoading.value ? "bx:loader" : "bx:trash",
    title: "delete",
    action: () => handleMessageDelete(),
    isActive: props?.message?.uid === user?.value?.uid,
  },
]);
</script>

<template>
  <div
    class="px-4 py-2.5 flex items-start gap-2.5 hover:bg-bg-sidebarLink dark:hover:bg-bg-darkSidebarLink transition-colors ease-in-out group relative"
    @mouseleave="
      () => {
        showOptions = false;
        isEditing = false;
      }
    "
  >
    <img :src="message?.avatar" alt="avatar" class="w-10 h-10 rounded-full" />
    <div class="flex flex-col gap-1">
      <div class="flex items-center gap-1">
        <p class="text-style text-sm leading-[18.9px] xl:text-base font-medium">
          {{ message?.name }}
        </p>
        <Icon name="mdi:circle" size="4" class="text-style" />
        <p class="text-[10px] font-light text-style leading-[13.5px] xl:text-xs">
          {{ $dayjs(message?.createdAt?.toDate()).format("h:mm A") }}
        </p>
      </div>
      <!-- MESSAGE -->
      <textarea
        type="text"
        class="border border-border-primary dark:border-border-dark outline-none focus:border-border-topbar dark:focus:border-border-darkTopbar bg-bg-topbar dark:bg-bg-darkTopbar !w-full text-style px-2"
        ref="inputField"
        v-if="isEditing"
        v-model="message.message"
        @blur="handleMessageUpdate"
        @keypress.enter="handleMessageUpdate"
      />
      <p class="text-style text-sm xl:text-base !font-normal" v-else>
        {{ message?.message }}
      </p>
      <!-- ./ MESSAGE -->
    </div>
    <!-- OPTIONS -->
    <div>
      <div
        class="absolute right-5 -top-4 w-[70px] h-9 rounded-lg invisible bg-bg-topbar dark:bg-bg-darkTopbar border border-border-primary dark:border-border-dark text-style flex justify-center items-center gap-2.5 group-hover:visible"
      >
        <Icon
          name="emojione-monotone:slightly-smiling-face"
          size="15"
          class="cursor-pointer"
        />
        <Icon
          name="mdi:dots-vertical"
          size="15"
          class="cursor-pointer"
          @click="showOptions = !showOptions"
        />
      </div>
      <div
        class="absolute right-[92px] -top-4 w-[144px] p-1.5 h-fit invisible rounded-lg bg-bg-topbar dark:bg-bg-darkTopbar border border-border-primary dark:border-border-dark text-style flex flex-col justify-center gap-1.5"
        :class="{ '!visible': showOptions }"
      >
        <div
          class="flex gap-1.5 items-center hover:text-style hover:bg-bg-sidebarLink dark:hover:bg-bg-darkSidebarLink cursor-pointer py-1 px-2.5 rounded-[4px] text-text-primary/[0.64] dark:text-white/[0.64]"
          v-for="option in options"
          :key="option.title"
          @click="option.action()"
          v-show="option.isActive"
        >
          <Icon
            :name="copied && option.title === 'copy' ? 'mdi:check' : option.icon"
            size="15"
          />
          <p class="capitalize">
            {{ copied && option.title === "copy" ? "copied" : option.title }}
          </p>
        </div>
      </div>
    </div>
    <!-- ./ OPTIONS -->
  </div>
</template>

<style scoped></style>
