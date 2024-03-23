<script setup lang="ts">
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
const db = useFirestore();
const props = defineProps<{
  channel: any;
}>();
const { $modal } = useNuxtApp();

const isEditing = ref(false);
const isLoading = ref(false);

function handleChannelDelete() {
  $modal.show({
    type: "danger",
    title: "Are you sure?",
    body: "You won't be able to revert this!",
    primary: {
      label: "Delete",
      theme: "red",
      action: () => deleteChannel(),
    },
    secondary: {
      label: "Cancel",
      theme: "white",
      action: () => {},
    },
  });
}

async function deleteChannel() {
  isLoading.value = true;
  await deleteDoc(doc(db, "channels", props?.channel?.id.toLowerCase()));
  isLoading.value = false;
  useRouter().push({
    name: "channel-id",
    params: { id: "introduction" },
  });
}

async function handleChannelUpdate() {
  isEditing.value = false;
  updateDoc(doc(db, "channels", props?.channel?.id.toLowerCase()), {
    name: props?.channel.name,
  });
}

const inputField = ref<HTMLElement | null>(null);
function toggleEdit() {
  isEditing.value = !isEditing.value;
}
</script>

<template>
  <div>
    <NuxtLink
      :to="{
        name: 'channel-id',
        params: { id: channel.id },
      }"
      active-class="sidebar-active-link"
      class="sidebar-item mb-2 relative group"
      @mouseleave="handleChannelUpdate"
    >
      <span class="icon-style">
        <Icon name="mdi:pound" size="15" />
      </span>
      <span class="font-light">
        <input
          type="text"
          class="border border-border-primary dark:border-border-dark outline-none focus:border-border-topbar dark:focus:border-border-darkTopbar bg-bg-topbar dark:bg-bg-darkTopbar w-full box-border text-style px-2"
          ref="inputField"
          v-if="isEditing"
          v-model="channel.name"
          @blur.prevent.stop="handleChannelUpdate"
          @click.prevent.stop
        />
        <span v-else>
          {{ truncateString(channel.name || "", 15) }}
        </span>
      </span>
      <div
        class="absolute right-5 -top-4 w-[80px] h-9 rounded-lg invisible bg-bg-topbar dark:bg-bg-darkTopbar border border-border-primary dark:border-border-dark text-style flex justify-center items-center gap-2.5"
        :class="{ 'group-hover:visible': channel?.id != 'introduction' }"
      >
        <Icon name="bx:pencil" size="15" @click.prevent.stop="toggleEdit" />
        <Icon
          name="bx:trash"
          size="15"
          @click.prevent.stop="handleChannelDelete"
          v-if="!isLoading"
        />
        <Icon name="bx:loader" class="animate-spin" size="16" v-else />
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped>
.sidebar-item {
  @apply capitalize p-2 transition-all ease-in-out duration-300 text-style hover:rounded-md cursor-pointer flex items-center gap-2 hover:bg-bg-sidebarLink dark:hover:bg-bg-darkSidebarLink;
}
.sidebar-active-link {
  @apply bg-bg-sidebarLink dark:bg-bg-darkSidebarLink rounded-md text-style  !important;
}
</style>
