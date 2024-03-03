<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
defineProps<{
  name: string;
  options: any[];
  label?: string;
  error?: string;
  outerClasses?: string;
  required?: boolean;
  optionLabel?: string;
  optionValue?: string;
  filter?: boolean;
  disabled?: boolean;
  showClear?: boolean;
  prependIcon?: string;
  appendIcon?: string;
}>();

const { multiSelectStyle } = usePvStyle();
</script>

<template>
  <Field
    :name="name"
    as="div"
    class="input-group w-full"
    :class="{
      error: error,
      [outerClasses || '']: outerClasses,
    }"
    v-slot="{ handleChange, value }"
  >
    <label v-if="label" :for="label">
      {{ label }}
      <span v-if="required" class="required-mark">*</span>
    </label>
    <div class="relative">
      <button
        v-if="prependIcon"
        type="button"
        class="absolute inset-y-0 left-0 flex items-center pl-3 icon-button prepend"
      >
        <slot name="prependIcon">
          <Icon :name="prependIcon" class="w-5 h-5 text-gray-400 icon" />
        </slot>
      </button>
      <PvMultiSelect
        :model-value="value"
        class="!rounded-md w-full px-5"
        :class="{
          'p-invalid !border !border-red-500': error,
        }"
        :pt="multiSelectStyle"
        :options="options"
        :option-label="optionLabel"
        :option-value="optionValue"
        :filter="filter"
        :disabled="disabled"
        :show-clear="showClear"
        v-bind="$attrs"
        @update:modelValue="handleChange"
      ></PvMultiSelect>
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
    <small v-if="error" class="error-message">{{ error }}</small>
  </Field>
</template>

<style scoped></style>
