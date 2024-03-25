<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import UiBtn from "~/components/Ui/Btn/index.vue";

const emojiBtnRef = ref<InstanceType<typeof UiBtn> | null>();

useShortcut({
  esc() {
    emojiBtnRef.value?.triggerClick();
  },
});

const props = defineProps<{
  modelValue: string;
  appendIcon?: string;
  innerClasses?: string;
  outerClasses?: string;
  required?: boolean;
  isLoading?: boolean;
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
const emojiPopup = ref(false);

function showEmojiSelector() {
  emojiPopup.value = !emojiPopup.value;
}

function insertAtCursor(originalText: any, emoji: any, cursorPosition: any) {
  return (
    originalText.substring(0, cursorPosition) +
    emoji +
    originalText.substring(cursorPosition, originalText.length)
  );
}

function handleInput(event: Event) {
  activateButton.value = (event.target as HTMLTextAreaElement).value.length > 0;
  const textarea = event.target as HTMLTextAreaElement;
  textarea.focus();
  textarea.style.height = "auto";
  emits("update:modelValue", textarea.value);
}

watch(emojiPopup, (val) => {
  if (val) {
    setTimeout(() => {
      document
        .querySelector("emoji-picker")!
        .addEventListener("emoji-click", (e: any) => {
          const emoji = e.detail.unicode;
          const textarea = chatInput.value as HTMLTextAreaElement;

          if (textarea) {
            const cursorPosition = textarea.selectionStart;
            const updatedText = insertAtCursor(textarea.value, emoji, cursorPosition);
            textarea.value = updatedText;
            textarea.focus();
            const newPosition = cursorPosition + emoji.length;
            textarea.setSelectionRange(newPosition, newPosition);

            activateButton.value = textarea.value.length > 0;
            emits("update:modelValue", textarea.value);
          }
        });
    }, 1000);
  }
});

function reduceChatBoxHeight() {
  const inputElement = chatInput.value;
  if (inputElement) {
    inputElement.style.height = "initial"; // Set to default height
    inputElement.style.overflowY = "hidden"; // Hide scrollbars
    inputElement.focus();
    emits("update:modelValue", "");
    activateButton.value = false;
  }
}

defineExpose({
  reduceChatBoxHeight,
});
</script>

<template>
  <div class="input-group !mb-0" :class="outerClasses">
    <div class="relative">
      <textarea
        v-bind="$attrs"
        rows="1"
        class="chat-style !pr-10"
        :class="innerClasses"
        id="chat-input"
        ref="chatInput"
        :model-value="modelValue"
        @input="handleInput"
      />
      <div
        class="absolute inset-y-0 right-0 flex items-center gap-2.5 pr-3 icon-button append m-0"
      >
        <UiBtn
          ref="emojiBtnRef"
          type="button"
          class="cursor-pointer !p-0 !m-0 outline-none border-none !bg-transparent h-fit"
          @click="showEmojiSelector"
        >
          <Icon
            name="emojione-monotone:slightly-smiling-face"
            size="17"
            class="text-gray-700/[0.6] dark:text-white/[0.6] hover:scale-95 transition-all duration-300"
          />
        </UiBtn>

        <!-- <button type="button">
          <Icon
            name="mdi:paperclip"
            size="17"
            class="text-gray-700/[0.6] dark:text-white/[0.6] hover:scale-95 transition-all duration-300"
          />
        </button> -->

        <button
          class="w-8 h-8 text-gray-700/[0.6] dark:text-white/[0.6] bg-[rgba(219,219,219,0.93)] dark:bg-[#515151] rounded-xl flex justify-center items-center hover:scale-95 transition-all duration-300 ease-in-out cursor-pointer disabled:!pointer-events-none"
          :class="{ '!bg-bg-secondary !text-white': activateButton }"
          :disabled="!activateButton"
        >
          <Icon name="carbon:send-alt-filled" size="20" v-if="!isLoading" />
          <Icon name="bx:loader" class="animate-spin" size="16" v-else />
        </button>
      </div>
    </div>
    <Transition name="fade">
      <div v-if="emojiPopup" class="absolute mx-auto -top-[400px] right-5">
        <emoji-picker></emoji-picker>
      </div>
    </Transition>
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity ease-in-out 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
