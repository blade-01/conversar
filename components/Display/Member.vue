<script setup lang="ts">
const { id } = useRoute().params;
const props = defineProps<{
  user: MemberIndexData;
}>();
const { handleMemberDelete } = useMember(props);
const { user: currentUser } = useAuth();
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
      v-if="user?.uid !== currentUser.uid"
    >
      <Icon name="bx:trash" size="18" @click="handleMemberDelete(id as string)" />
    </div>
  </div>
</template>

<style scoped></style>
