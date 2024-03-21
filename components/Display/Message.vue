<script setup lang="ts">
defineProps<{
  // @ts-ignore
  message: MessageIndexData;
}>();
</script>

<template>
  <div class="flex items-start gap-2.5">
    <img :src="message.avatar" alt="avatar" class="w-10 h-10 rounded-full" />
    <div class="flex flex-col gap-1">
      <div class="flex items-center gap-1">
        <p class="text-style text-sm leading-[18.9px] xl:text-base font-medium">
          {{ message.name }}
        </p>
        <Icon name="mdi:circle" size="4" class="text-style" />
        <p class="text-[10px] font-light text-style leading-[13.5px] xl:text-xs">
          {{ $dayjs(message?.createdAt?.toDate()).format("h:mm A") }}
        </p>
      </div>
      <!-- MESSAGE -->
      <p class="text-style text-sm xl:text-base">
        {{ message.message }}
      </p>
      <!-- ./ MESSAGE -->
    </div>
  </div>
</template>

<style scoped></style>
