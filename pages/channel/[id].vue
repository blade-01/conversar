<script setup lang="ts">
// @ts-ignore
definePageMeta({
  middleware: ["auth"],
});

const { pending, groupedMessages } = useMessage();
const { channel, title } = useChannel();

useHead({
  title: title.value,
});
</script>

<template>
  <DashboardWrapper :title="channel?.name">
    <div v-if="!pending" v-for="group in groupedMessages" :key="group.date">
      <!-- DATE -->
      <div
        class="relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0 before:content-[''] before:bg-border-topbar dark:before:bg-border-darkTopbar before:h-[1px] before:w-full text-center"
      >
        <p
          class="text-sm text-text-secondary dark:text-text-darkSec bg-bg-primary dark:bg-bg-dark inline relative z-20 px-2"
        >
          {{ group.date }}
        </p>
      </div>
      <!-- ./ DATE -->

      <div class="my-5 flex flex-col gap-1">
        <!-- MESSAGE DATA -->
        <DisplayMessage
          v-for="message in group.messages"
          :key="message.id"
          :message="message"
          :ref="message.id"
        />
        <!-- ./ MESSAGE DATA -->
      </div>
    </div>
    <div v-else>
      <DisplayLoader />
    </div>
  </DashboardWrapper>
</template>

<style scoped></style>
