<script setup lang="ts"></script>

<template>
  <header class="flex flex-col justify-center items-center text-center">
    <div class="flex justify-between gap-x-8 items-center text-center">
      <div class="flex flex-col items-center gap-2">
        <nuxt-img
          provider="cloudinary"
          :src="$colorMode.value === 'dark' ? '/nb-light.svg' : '/nb-dark.svg'"
          alt="logo"
          fit="inside"
          height="120"
          width="120"
        />
        <p class="text-base font-medium">Nuxt Boost</p>
      </div>
    </div>
    <p class="text-lg font-light italic mt-5">{{ $t("title") }}</p>
  </header>
</template>

<style lang="scss" scoped></style>
