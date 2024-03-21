<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: string;
  appendIcon?: string;
  innerClasses?: string;
  outerClasses?: string;
  required?: boolean;
}>();

const emits = defineEmits<{
  (event: "update:modelValue", value: string): void;
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

const activateButton = ref(false);
function handleInput(event: Event) {
  activateButton.value = (event.target as HTMLTextAreaElement).value.length > 0;
  const textarea = event.target as HTMLTextAreaElement;
  // Reset field height
  textarea.style.height = "auto";
  emits("update:modelValue", textarea.value);
}

watch(
  () => props.modelValue,
  (value) => {
    console.log(value);
  }
);
</script>

<template>
  <div class="input-group !mb-0" :class="outerClasses">
    <div class="relative">
      <textarea
        v-bind="$attrs"
        rows="1"
        class="chat-style !pr-10"
        :class="innerClasses"
        ref="chatInput"
        :model-value="modelValue"
        @input="handleInput"
      />
      <div
        class="absolute inset-y-0 right-0 flex items-center gap-2.5 pr-3 icon-button append m-0"
      >
        <button type="button">
          <Icon
            name="emojione-monotone:slightly-smiling-face"
            size="17"
            class="text-gray-700/[0.6] dark:text-white/[0.6] hover:scale-95 transition-all duration-300"
          />
        </button>

        <button type="button">
          <Icon
            name="mdi:paperclip"
            size="17"
            class="text-gray-700/[0.6] dark:text-white/[0.6] hover:scale-95 transition-all duration-300"
          />
        </button>

        <button
          class="w-8 h-8 text-gray-700/[0.6] dark:text-white/[0.6] bg-[rgba(219,219,219,0.93)] dark:bg-[#515151] rounded-xl flex justify-center items-center hover:scale-95 transition-all duration-300 ease-in-out cursor-pointer disabled:!pointer-events-none"
          :class="{ '!bg-bg-secondary !text-white': activateButton }"
          :disabled="!activateButton"
        >
          <Icon name="carbon:send-alt-filled" size="20" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-group .chat-style {
  @apply relative bg-bg-input border border-border-primary focus:border-border-focus outline-none rounded-xl py-3 px-4 w-full transition-all duration-200 ease-in-out min-h-[50px] max-h-[200px] overflow-y-hidden resize-none flex items-center !pr-[100px] text-text-primary dark:text-text-dark
    /* Placeholder */
    placeholder:font-light placeholder:!text-text-placeholder  
    /* DARK MODE */
    dark:bg-bg-darkInput dark:border-border-dark dark:focus:border-border-darkFocus dark:placeholder:!text-text-darkPlaceholder;
}
</style>
