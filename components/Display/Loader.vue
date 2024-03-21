<template>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <client-only>
      <Vue3Lottie
        animationLink="https://res.cloudinary.com/bladencove/raw/upload/v1710981038/loading-lottie_dicrfr.json"
        :height="100"
        :width="100"
      />
    </client-only>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
