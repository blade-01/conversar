<script setup lang="ts">
import { doc, deleteDoc } from "firebase/firestore";
const db = useFirestore();
const { $modal } = useNuxtApp();
const { id } = useRoute().params;
const props = defineProps<{
  user: MemberIndexData;
}>();

function handleMemberDelete() {
  $modal.show({
    type: "danger",
    title: "Are you sure?",
    body: "You won't be able to revert this!",
    primary: {
      label: "Delete",
      theme: "red",
      action: () => deleteMember(),
    },
    secondary: {
      label: "Cancel",
      theme: "white",
      action: () => {},
    },
  });
}

async function deleteMember() {
  await deleteDoc(
    doc(db, "channels", (id as string).toLocaleLowerCase(), "members", props.user?.id)
  );
}
</script>

<template>
  <div
    class="flex justify-between items-center hover:bg-bg-sidebarLink dark:hover:bg-bg-darkSidebarLink group px-4 py-2.5"
  >
    <div class="flex gap-2.5 items-center">
      <PvAvatar :image="user.avatar" shape="circle" />
      <p class="text-style text-sm">
        {{ truncateString(user.name || "", 20) }}
      </p>
    </div>
    <div
      class="invisible cursor-pointer mb-1.5"
      :class="{ 'group-hover:visible': id !== 'introduction' }"
    >
      <Icon name="bx:trash" size="18" @click="handleMemberDelete" />
    </div>
  </div>
</template>

<style scoped></style>
