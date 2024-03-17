<script setup lang="ts">
// @ts-ignore
definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <DashboardWrapper title="Introduction" description="Hello there, let's create magic 🪄">
    <div>
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

      <div class="mt-5 flex flex-col gap-5">
        <!-- MESSAGE DATA -->
        <div class="flex items-start gap-2.5" v-for="i in 10" :key="i">
          <PvAvatar
            image="https://avatars.githubusercontent.com/u/47092407?v=4"
            shape="circle"
            class="w-10 h-10"
          />
          <div class="flex flex-col gap-1">
            <div class="flex items-end gap-1">
              <p class="text-style text-sm font-medium">Robert Kiyasoki</p>
              <Icon name="mdi:circle" size="4" class="mb-2.5 text-style" />
              <p class="text-[10px] font-light text-style">3:55AM</p>
            </div>
            <!-- MESSAGE -->
            <p class="text-style text-sm">
              Popular tools like Figma, Sketch, and Adobe XD are great for UI/UX design.
              Experiment to find the one that suits your workflow.
            </p>
            <!-- ./ MESSAGE -->
          </div>
        </div>
        <!-- ./ MESSAGE DATA -->
      </div>
    </div>
  </DashboardWrapper>
</template>

<script setup lang="ts"></script>

<style scoped></style>
