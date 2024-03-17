<script setup lang="ts">
// @ts-ignore
definePageMeta({
  layout: "auth",
});

useHead({
  title: "Welcome to Conversar",
});

function handleSubmit(values: any) {
  console.log(values);
}
</script>

<template>
  <div
    class="flex flex-col items-center justify-center text-center w-[90%] md:w-[340px] mx-auto"
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
    <UiBtn
      prepend-icon="mdi:google"
      size="sm"
      class="w-full mt-8 !bg-bg-secondary !text-text-dark"
      @click="$router.push('/')"
    >
      Sign In With Google
    </UiBtn>
    <hr class="w-[80%] border-[#E4E4E4] dark:border-white/[0.38] my-6" />
    <Form @submit="handleSubmit" class="w-full">
      <UiInputField
        name="email"
        placeholder="Email"
        class="w-full text-center placeholder:!text-white/[0.54]"
      />
      <!-- <UiInputPassword
        name="password"
        placeholder="Password"
        class="w-full text-center placeholder:!text-white/[0.54]"
      /> -->
      <UiBtn class="w-full font-normal border border-border-primary" size="sm"
        >Continue</UiBtn
      >
    </Form>
  </div>
</template>

<style scoped></style>
