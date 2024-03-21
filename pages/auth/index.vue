<script setup lang="ts">
// @ts-ignore
definePageMeta({
  layout: "auth",
});

useHead({
  title: "Sign In",
});

function handleSubmit(values: any) {
  console.log(values);
}

const { signInWithGoogle, isSigningIn } = useAuth();
</script>

<template>
  <div
    class="flex flex-col items-center justify-center text-center absolute inset-y-0 inset-x-0 w-[90%] md:w-[340px] mx-auto"
  >
    <img
      src="~/assets/svg/logo-light.svg"
      alt="logo"
      v-if="$colorMode.value === 'dark'"
    />
    <img
      src="~/assets/svg/logo-dark.svg"
      alt="logo"
      v-if="$colorMode.value === 'light'"
    />
    <h1
      class="text-2xl lg:text-3xl font-bold text-text-primary/80 dark:text-white/80 my-2.5"
    >
      Welcome to Conversar
    </h1>
    <p class="text-sm text-text-primary/[0.64] dark:text-white/[0.64]">
      Login or Register with your email
    </p>
    <div class="flex flex-col gap-5 w-full mt-8">
      <UiBtn
        prepend-icon="mdi:google"
        size="sm"
        class="w-full !bg-bg-secondary !text-text-dark"
        @click="signInWithGoogle"
        :is-loading="isSigningIn"
      >
        Sign In With Google
      </UiBtn>
      <UiBtn
        prepend-icon="mdi:apple"
        size="sm"
        class="w-full !bg-bg-apple !text-text-dark"
        @click="signInWithGoogle"
        :is-loading="isSigningIn"
      >
        Sign In With Apple
      </UiBtn>
    </div>
  </div>
</template>

<style scoped></style>
