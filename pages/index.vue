<script setup lang="ts">
// @ts-ignore
definePageMeta({
  middleware: ["auth"],
});

onMounted(() => {
  navigateTo({
    name: "channel-id",
    params: { id: "introduction" },
  });
});
</script>

<template>
  <div></div>
</template>

<style scoped></style>
