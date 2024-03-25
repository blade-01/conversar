<script setup lang="ts">
import { doc, collection, query, orderBy } from "firebase/firestore";
// @ts-ignore
definePageMeta({
  middleware: ["auth"],
});
const { id } = useRoute().params;

// Channel and messages Collection
const db = useFirestore();
const channel = useDocument(doc(db, "channels", id as string));
const { data: messages, pending } = useCollection<MessageIndexData>(
  query(collection(db, "channels", id as string, "messages"), orderBy("createdAt"))
);

const title = computed(() => capitalizeFirstLetter(id as string) + " Channel");

useHead({
  title: title.value,
});
</script>

<template>
  <DashboardWrapper :title="channel?.name">
    <div v-if="!pending">
      <!-- DATE -->
      <div class="flex justify-between items-center gap-5 text-center mb-5">
        <hr
          class="border-t border-t-border-topbar dark:border-t-border-darkTopbar basis-full"
        />
        <span
          class="text-text-secondary dark:text-text-darkSec basis-[180px] md:basis-[132px] text-sm"
          >Jan 16th</span
        >
        <hr
          class="border-t border-t-border-topbar dark:border-border-darkTopbar basis-full"
        />
      </div>
      <!-- ./ DATE -->

      <div class="my-5 flex flex-col gap-1">
        <!-- MESSAGE DATA -->
        <DisplayMessage
          v-for="message in messages"
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
