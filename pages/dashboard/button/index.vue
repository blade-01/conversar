<script setup lang="ts">
definePageMeta({ layout: "dashboard" });
useHead({
  title: "Buttons",
});
</script>

<template>
  <div>
    <p class="title mb-5 text-4xl">Button Samples</p>
    <p class="title pb-1.5">Buttons With Icons</p>
    <div class="flex gap-3.5 items-center flex-wrap">
      <UiBtn label="Click Me" append-icon="mdi:emoticon" />
      <UiBtn label="Click Me" prepend-icon="mdi:emoticon" />
      <UiBtn
        label="Click Me"
        append-icon="mdi:emoticon"
        prepend-icon="mdi:emoticon-excited-outline"
      />
    </div>
  </div>
  <div class="mt-5">
    <p class="title pb-1.5">Buttons With Sizes</p>
    <div class="flex gap-3.5 items-center flex-wrap">
      <UiBtn label="Extra Small Button" append-icon="mdi:emoticon" size="xs" />
      <UiBtn label="Small Button" append-icon="mdi:emoticon" size="sm" />
      <UiBtn label="Medium Button" append-icon="mdi:emoticon" size="md" />
      <UiBtn label="Normal Button" append-icon="mdi:emoticon" />
      <UiBtn label="Large Button" append-icon="mdi:emoticon" size="lg" />
    </div>
  </div>
</template>

<style scoped></style>
