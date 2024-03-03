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
  requiredMark?: boolean;
}>();
</script>

<template>
  <div class="w-full">
    <div class="inline-flex items-center justify-center">
      <Field
        :name="name"
        type="radio"
        :id="name"
        v-bind="$attrs"
        class="input-style cursor-pointer"
      />
      <label
        v-if="label"
        :for="name"
        class="ml-2 select-none"
        :class="{
          'error text-red-500': error,
        }"
        >{{ label }}
        <span v-if="requiredMark" class="required-mark">*</span>
      </label>
    </div>
    <span v-if="error" class="error-message text-red-500 text-xs">{{ error }}</span>
  </div>
</template>
