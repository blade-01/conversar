<script setup lang="ts">
import useCharts from "~/composables/useCharts";

useHead({
  title: "Dashboard",
});

definePageMeta({ layout: "dashboard" });

const metrics: { count: number; title: string }[] = [
  {
    count: 400,
    title: "clicks",
  },
  {
    count: 422,
    title: "views",
  },
  {
    count: 350,
    title: "leads",
  },
  {
    count: 270,
    title: "sales",
  },
];
const {
  barChartSeries,
  barChartOptions,
  polarChartOptions,
  polarChartSeries,
  radialOptions,
  radialSeries,
  areaChartOptions,
  areaChartSeries,
} = useCharts();
</script>

<template>
  <div class="flex justify-center items-center flex-col max-w-2xl mx-auto mt-[100px]">
    <nuxt-img
      provider="cloudinary"
      src="/animated-waving.gif"
      alt="animated wave"
      fit="inside"
      height="120"
      width="120"
    />
    <p class="text-lg md:text-xl font-light mt-5">
      Hey tech-savvy pals! Buckle up as we dive into this digital wonderland. Picture it
      like a GPS, but instead of roads, we've got routes leading to all the cool reusable
      components I've conjured up. <br /><br />
      Explore at will! And hey, if you've got thoughts, hit me up with a PR - that's "Pull
      Request" for the uninitiated - following our
      <a
        class="underline font-extralight cursor-pointer"
        href="https://github.com/blade-01/NuxtBoost/blob/main/CONTRIBUTING.md"
        target="_blank"
        >contribution</a
      >
      protocol. Let's code and conquer!
      <br /><br />
      Arigatou 🙇🏼‍♂️
    </p>
  </div>
</template>

<style scoped>
/* CHART TITLE */
.chart-bar {
  @apply rounded-md p-4 mb-3 bg-white dark:bg-darkBgSec;
}

.chart-title {
  @apply uppercase mb-3 font-medium text-sm;
}
</style>
