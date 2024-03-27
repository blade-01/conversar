<script setup lang="ts">
import UiBtn from "~/components/Ui/Btn/index.vue";
const props = defineProps<{
  // @ts-ignore
  message: MessageIndexData;
}>();

const {
  showOptions,
  handleCancel,
  isEditing,
  handleMessageUpdate,
  inputField,
  options,
  copied,
  isLoading,
  reactToMessage,
} = useMessage(props);

// Save and Cancel shortcut
const saveBtn = ref<InstanceType<typeof UiBtn> | null>(null);
const cancelBtn = ref<InstanceType<typeof UiBtn> | null>(null);
useShortcut({
  esc() {
    cancelBtn.value?.triggerClick();
  },
  enter() {
    saveBtn.value?.triggerClick();
  },
});
</script>

<template>
  <div
    class="px-4 py-2.5 flex items-start gap-2.5 hover:bg-bg-sidebarLink dark:hover:bg-bg-darkSidebarLink transition-colors ease-in-out group relative"
    @mouseleave="
      () => {
        showOptions = false;
        handleCancel();
      }
    "
  >
    <img :src="message?.avatar" alt="avatar" class="w-10 h-10 rounded-full" />
    <div class="flex flex-col gap-1">
      <div class="flex items-center gap-1">
        <p class="text-style text-sm leading-[18.9px] xl:text-base font-medium">
          {{ message?.name }}
        </p>
        <Icon name="mdi:circle" size="4" class="text-style" />
        <p class="text-[10px] font-light text-style leading-[13.5px] xl:text-xs">
          {{ formatDate(message?.createdAt?.toDate(), "h:mm A") }}
        </p>
      </div>
      <!-- MESSAGE -->
      <div>
        <textarea
          class="edit-input p-2"
          ref="inputField"
          v-if="isEditing"
          v-model="message.message"
          @keypress.enter="handleMessageUpdate"
          @click="showOptions = false"
          cols="1000"
          :rows="message?.message?.split('\n')?.length + 1"
        />
        <p class="text-style text-sm xl:text-base !font-normal" v-else>
          {{ message?.message }}
        </p>
        <div class="text-xs !p-0 !m-0 flex" v-if="isEditing">
          escape to
          <UiBtn
            class="!text-bg-secondary dark:!text-white cursor-pointer !p-0 !m-0 outline-none border-none !bg-transparent text-xs h-fit !px-1.5"
            @click="handleCancel"
            ref="cancelBtn"
            >cancel</UiBtn
          >
          • or click
          <UiBtn
            class="!text-bg-secondary dark:!text-white cursor-pointer !p-0 !m-0 outline-none border-none !bg-transparent text-xs h-fit !px-1.5"
            @click="handleMessageUpdate"
            ref="saveBtn"
            :is-loading="isLoading"
            >save</UiBtn
          >
        </div>
      </div>
      <!-- ./ MESSAGE -->
    </div>
    <!-- OPTIONS -->
    <div>
      <div
        class="absolute z-20 right-5 -top-4 w-[70px] h-9 rounded-lg invisible opacity-0 bg-bg-topbar dark:bg-bg-darkTopbar border border-border-primary dark:border-border-dark text-style flex justify-center items-center gap-2.5 group-hover:visible group-hover:opacity-100"
      >
        <Icon
          name="emojione-monotone:slightly-smiling-face"
          size="15"
          class="cursor-pointer"
          @click="reactToMessage"
        />
        <Icon
          name="mdi:dots-vertical"
          size="15"
          class="cursor-pointer"
          @click="showOptions = !showOptions"
        />
      </div>
      <div
        class="absolute z-20 right-[92px] -top-4 w-[144px] p-1.5 h-fit invisible rounded-lg bg-bg-topbar dark:bg-bg-darkTopbar border border-border-primary dark:border-border-dark text-style flex flex-col justify-center gap-1.5"
        :class="{ '!visible': showOptions }"
      >
        <div
          class="flex gap-1.5 items-center hover:text-style hover:bg-bg-sidebarLink dark:hover:bg-bg-darkSidebarLink cursor-pointer py-1 px-2.5 rounded-[4px] text-text-primary/[0.64] dark:text-white/[0.64]"
          :class="{ '!text-[#C62828]': option.title === 'delete' }"
          v-for="option in options"
          :key="option.title"
          @click="option.action()"
          v-show="option.isActive"
        >
          <Icon
            :name="copied && option.title === 'copy' ? 'mdi:check' : option.icon"
            size="15"
          />
          <p class="capitalize">
            {{ copied && option.title === "copy" ? "copied" : option.title }}
          </p>
        </div>
      </div>
    </div>
    <!-- ./ OPTIONS -->
  </div>
</template>

<style scoped></style>
