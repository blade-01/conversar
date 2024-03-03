<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
defineProps<{
  name: string;
  label?: string;
  error?: string;
  outerClasses?: string;
  required?: boolean;
}>();

const isVisible = ref(false);

const inputType = computed(() => {
  return isVisible.value ? "text" : "password";
});
</script>

<template>
  <div
    class="input-group"
    :class="{
      error: error,
      [outerClasses || '']: outerClasses,
    }"
  >
    <label v-if="label" :for="name">
      {{ label }}
      <span v-if="required" class="required-mark">*</span>
    </label>
    <div class="relative">
      <Field :name="name" :type="inputType" v-bind="$attrs" class="input-style" />
      <span
        class="mdi absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
        @click="isVisible = !isVisible"
      >
        <Icon :name="isVisible ? 'mdi:eye' : 'mdi:eye-off'" />
      </span>
    </div>
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>
