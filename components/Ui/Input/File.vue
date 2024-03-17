<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    name: string;
    prependIcon?: string;
    appendIcon?: string;
    label?: string;
    error?: string;
    outerClasses?: string;
    required?: boolean;
    multiple?: boolean;
    placeholder?: string;
  }>(),
  {
    placeholder: "Upload file...",
  }
);
</script>

<template>
  <Field
    :name="name"
    as="div"
    class="input-group"
    :class="{
      error: error,
      [outerClasses || '']: outerClasses,
    }"
    v-slot="{ value, handleChange, resetField }"
  >
    <label v-if="label" :for="name">
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
      <input
        type="file"
        class="hidden"
        v-bind="$attrs"
        :id="name"
        :model-value="value"
        @update:modelValue="handleChange"
        :multiple="multiple"
      />
      <label :for="name">
        <span
          class="input-style font-light !text-text-secondary dark:!text-text-placeholder flex gap-2.5"
          :class="{
            '!pl-10': prependIcon,
          }"
        >
          <span v-if="value">{{
            !multiple
              ? fileName(value)
              : value.length === 1
              ? fileName(value[0])
              : value.length > 1
              ? `${value.length} file${value?.length > 1 ? "s" : ""}`
              : placeholder
          }}</span>
          <span v-else>{{ placeholder }}</span>
        </span>
      </label>
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

    <!-- Upload display -->
    <div class="mt-5" v-if="value">
      <div
        class="h-16 w-16 rounded-md relative"
        :class="{
          '!w-fit h-fit': !isImage(value),
        }"
        v-if="!multiple"
      >
        <img
          v-if="isImage(value)"
          :src="fileToURL(value)"
          :alt="fileName(value)"
          class="w-full h-full object-cover"
        />
        <span class="input-style font-light !text-text-secondary dark:!text-text-placeholder" v-else>
          {{ fileName(value) }}
        </span>
        <Icon
          name="mdi:close-circle-outline"
          size="24"
          class="absolute -top-2.5 -right-2.5 text-text-secondary dark:text-text-placeholder cursor-pointer"
          @click="handleChange(null)"
        />
      </div>
      <div class="flex flex-wrap gap-5 items-center mt-5" v-else>
        <div v-for="file in value" :key="file.name">
          <div
            class="h-16 w-16 rounded-md relative"
            :class="{
              '!w-fit h-fit': !isImage(file),
            }"
          >
            <img
              v-if="isImage(file)"
              :src="fileToURL(file)"
              :alt="fileName(file)"
              class="w-full h-full object-cover"
            />
            <span
              class="input-style font-light !text-text-secondary dark:!text-text-placeholder"
              v-else
            >
              {{ fileName(file) }}
            </span>
            <Icon
              name="mdi:close-circle-outline"
              size="24"
              class="absolute -top-2.5 -right-2.5 text-text-secondary dark:text-text-placeholder cursor-pointer"
              @click="handleChange(value.filter((f: any) => f.name !== file.name))"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- ./ Upload display -->
  </Field>
</template>
