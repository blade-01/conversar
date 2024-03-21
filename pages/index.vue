<script setup lang="ts">
import { doc, collection, query, orderBy } from "firebase/firestore";
// @ts-ignore
definePageMeta({
  middleware: ["auth"],
});

const db = useFirestore();
const channel = useDocument(doc(db, "channels", "introduction"));
const { data: messages, pending } = useCollection<MessageIndexData>(
  query(collection(db, "channels", "introduction", "messages"), orderBy("createdAt"))
);
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

      <div class="my-5 flex flex-col gap-5">
        <!-- MESSAGE DATA -->
        <DisplayMessage
          v-for="message in messages"
          :key="message.uid"
          :message="message"
        />
        <!-- ./ MESSAGE DATA -->
      </div>
    </div>
    <div v-else class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <client-only>
        <Vue3Lottie
          animationLink="https://res.cloudinary.com/bladencove/raw/upload/v1710981038/loading-lottie_dicrfr.json"
          :height="200"
          :width="200"
        />
      </client-only>
    </div>
  </DashboardWrapper>
</template>

<style scoped></style>
