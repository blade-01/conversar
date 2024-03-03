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
  outerClasses?: string;
}>();
</script>

<template>
  <Field
    :name="name"
    as="div"
    class="w-full"
    :class="{
      error: error,
      [outerClasses || '']: outerClasses,
    }"
    v-slot="{ handleChange, value }"
  >
    <div class="inline-flex items-center justify-center">
      <PvInputSwitch
        :model-value="value"
        :class="{ 'p-invalid !border !border-red-500': error }"
        :pt="{ 
          slider: ({ props }: any) => ({
            class: props.modelValue ? 'bg-green-400' : 'bg-gray-300'
          })
        }"
        @update:modelValue="handleChange"
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
  </Field>
</template>

<style scoped>
:deep(.p-inputswitch .p-inputswitch-slider:before) {
  @apply !-mt-[0.625rem];
}

:deep(.p-focus) {
  @apply !border-none !ring-0;
}
:deep(.p-inputswitch .p-inputswitch-checked) {
  @apply bg-red-800;
}
</style>
