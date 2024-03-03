<script setup lang="ts">
const { t } = useI18n();
const router = useRouter();
const reRoute = (values: any): void => {
  if (values.name) {
    router.push(`/hi/${encodeURIComponent(values.name)}`);
  }
};

useHead({
  title: "Nuxt Boost",
});
</script>

<template>
  <NavigationHeader />
  <Form
    @submit="reRoute"
    class="flex flex-col justify-center items-center gap-3 text-center"
  >
    <UiInputField
      required
      type="text"
      name="name"
      :placeholder="$t('placeholder')"
      class="text-center mt-5"
    />
    <UiBtn :label="$t('go')" class="px-6 h-[35px]" />
  </Form>
</template>

<script setup lang="ts"></script>

<style scoped></style>
