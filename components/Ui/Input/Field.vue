<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
defineProps<{
  name: string;
  prependIcon?: string;
  appendIcon?: string;
  label?: string;
  error?: string;
  outerClasses?: string;
  required?: boolean;
}>();
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
      <button
        v-if="prependIcon"
        type="button"
        class="absolute inset-y-0 left-0 flex items-center pl-3 icon-button prepend z-10"
      >
        <slot name="prependIcon">
          <Icon :name="prependIcon" class="w-5 h-5 text-gray-400 icon" />
        </slot>
      </button>
      <Field
        :name="name"
        v-bind="$attrs"
        class="input-style"
        :class="{
          '!pl-10': prependIcon,
        }"
      />
      <button
        v-if="appendIcon"
        type="button"
        class="absolute inset-y-0 right-0 flex items-center pr-3 icon-button append"
      >
        <slot name="appendIcon">
          <Icon :name="appendIcon" class="w-5 h-5 text-gray-400 icon" />
        </slot>
      </button>
    </div>
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>
