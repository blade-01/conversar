<script setup lang="ts">
// @ts-ignore
definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <DashboardWrapper title="Introduction" description="Hello there, let's create magic 🪄">
    <div>
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
      <div v-for="i in 150" :key="i">
        <h1 class="text-xl text-style mb-1">Welcome to Channel</h1>
      </div>
    </div>
  </DashboardWrapper>
</template>

<script setup lang="ts"></script>

<style scoped></style>
