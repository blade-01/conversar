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
  innerClasses?: string;
  outerClasses?: string;
  required?: boolean;
}>();

const chatInput = ref<HTMLElement | null>(null);
onMounted(() => {
  const inputElement = chatInput.value;
  if (inputElement) {
    inputElement.addEventListener("input", (e: Event) => {
      inputElement.style.height = "50px";
      inputElement.style.height = `${inputElement.scrollHeight}px`;

      if (inputElement.scrollHeight > 200) {
        inputElement.style.overflowY = "scroll";
      } else {
        inputElement.style.overflowY = "hidden";
      }

      const target = e.target as HTMLTextAreaElement;
      if (!target.value) {
        inputElement.style.height = "50px";
      }
    });
  }
});
</script>

<template>
  <Field
    :name="name"
    as="div"
    class="input-group !mb-0"
    :class="{
      error: error,
      [outerClasses || '']: outerClasses,
    }"
    v-slot="{ value, handleChange }"
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
      <textarea
        v-bind="$attrs"
        class="chat-style"
        :class="{
          '!pl-10': prependIcon,
          [innerClasses || '']: innerClasses,
        }"
        ref="chatInput"
        :model-value="value"
        @update:modelValue="handleChange"
      />
      <!-- <button
        v-if="appendIcon"
        class="absolute inset-y-0 right-10 flex items-center pr-3 icon-button append"
      >
        <slot name="appendIcon">
          <Icon :name="appendIcon" class="w-5 h-5 text-gray-400 icon" />
        </slot>
      </button> -->
      <button
        v-if="appendIcon"
        class="absolute inset-y-0 right-0 flex items-center pr-3 icon-button append m-0"
      >
        <slot name="appendIcon">
          <Icon :name="appendIcon" class="w-5 h-5 text-gray-400 icon" />
        </slot>
      </button>
    </div>
    <span v-if="error" class="error-message">{{ error }}</span>
  </Field>
</template>

<style scoped>
.input-group .chat-style {
  @apply relative bg-bg-input border border-border-primary focus:border-border-focus outline-none rounded-xl py-3 px-4 w-full transition-all duration-200 ease-in-out min-h-[50px] max-h-[200px] overflow-y-hidden resize-none flex items-center
    /* Placeholder */
    placeholder:font-light placeholder:!text-text-placeholder  
    /* DARK MODE */
    dark:bg-bg-darkInput dark:border-border-dark dark:focus:border-border-darkFocus dark:placeholder:!text-text-darkPlaceholder;
}
</style>
