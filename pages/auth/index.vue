<script setup lang="ts">
// @ts-ignore
definePageMeta({
  layout: "auth",
});

useHead({
  title: "Welcome to Conversar",
});

function handleSubmit(values) {
  console.log(values);
}
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center max-w-[340px]">
    <img src="~/assets/svg/logo.svg" alt="logo" />
    <h1 class="text-2xl lg:text-3xl font-bold text-white/80 my-2.5">
      Welcome to Conversar
    </h1>
    <p class="text-sm text-white/[0.64]">Login or Register</p>
    <UiBtn prepend-icon="mdi:google" size="sm" class="w-full mt-8 !bg-[#5047EB]">
      Sign In With Google
    </UiBtn>
    <hr class="w-[80%] border-white/[0.38] my-6" />
    <Form @submit="handleSubmit" class="w-full">
      <UiInputField
        name="email"
        placeholder="Email"
        class="w-full text-center placeholder:!text-white/[0.54]"
      />
      <UiInputPassword
        name="password"
        placeholder="Password"
        class="w-full text-center placeholder:!text-white/[0.54]"
      />
      <UiBtn class="w-full font-normal border border-[#3A3A3C]" size="sm">Continue</UiBtn>
    </Form>
  </div>
</template>

<style scoped></style>
