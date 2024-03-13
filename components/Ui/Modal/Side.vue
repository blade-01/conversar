<script setup lang="ts">
interface Props {
  modelValue: boolean;
  position?: string;
  size?: string;
  persistent?: boolean;
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: true,
  position: "right",
  size: "md",
  persistent: false,
});

const emits = defineEmits(["update:modelValue", "close"]);

function handleClose() {
  emits("update:modelValue", false);
  emits("close", true);
}

function handleOuterClick() {
  if (!props.persistent) {
    handleClose();
  }
}

onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      handleOuterClick();
    }
  });
});

watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      document?.body?.classList?.add("overflow-hidden");
    } else {
      document?.body?.classList?.remove("overflow-hidden");
    }
  }
);
</script>
<template>
  <Transition :name="`fade-${position}`">
    <div
      v-if="modelValue"
      class="fixed w-full h-screen bg-black/20 dark:bg-black/80 top-0 left-0 z-[1000] sheet-wrapper"
      :class="{
        'flex justify-end': position === 'right',
        'flex justify-start': position === 'left',
        'flex items-end': position === 'bottom',
      }"
      @click.self="handleOuterClick"
    >
      <div
        class="flex bg-white dark:bg-bg-darkSec h-full sheet"
        :class="{
          'w-full sm:w-1/4': size === 'sm',
          'w-full md:w-1/2': size === 'md',
          'w-full lg:w-3/4': size === 'lg',
          'w-full': size === 'full',
          '!h-1/2 !w-full': position === 'top' || position === 'bottom',
        }"
      >
        <div class="inner w-full relative">
          <!-- Header  -->
          <slot name="header">
            <div
              class="flex items-center w-full p-5 border-b dark:border-b-gray-500"
              :class="
                position === 'left'
                  ? 'justify-between'
                  : 'gap-3 flex-row-reverse justify-end'
              "
            >
              <slot name="title">
                <h4 v-if="title" class="font-semibold dark:text-white text-gray-700">
                  {{ title }}
                </h4>
              </slot>
              <slot name="close">
                <button
                  class="text-gray-800 dark:text-gray-300 border rounded-xl dark:border-gray-600 p-1"
                  @click="handleClose"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m16.192 6.344l-4.243 4.242l-4.242-4.242l-1.414 1.414L10.535 12l-4.242 4.242l1.414 1.414l4.242-4.242l4.243 4.242l1.414-1.414L13.364 12l4.242-4.242z"
                    />
                  </svg>
                </button>
              </slot>
            </div>
          </slot>
          <!-- ./ Header  -->

          <!-- Main Slot  -->
          <div
            class="h-full overflow-y-scroll p-5 bg-white dark:bg-bg-darkSec pb-32 sheet-body"
            :class="{ '!h-auto': position === 'top' }"
          >
            <slot />
          </div>
          <!-- ./ Main Slot  -->
          <!-- Footer  -->
          <div
            v-if="$slots.footer"
            class="footer fixed gap-3 sm:absolute bottom-0 sm:bottom-8 xl:bottom-0 right-0 left-0 bg-white dark:bg-bg-darkSec px-4 py-2 flex justify-end border-t dark:border-t-gray-500 z-50"
          >
            <slot name="footer"> </slot>
          </div>
          <!-- ./ Footer -->
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* LEFT MODAL TRANSITIONS */
.fade-left-enter-active,
.fade-left-enter-active .sheet,
.fade-left-leave-active,
.fade-left-leave-active .sheet {
  transition: all 0.2s ease;
}
.fade-left-enter-from .sheet,
.fade-left-leave-to .sheet {
  transform: translateX(-100%);
  opacity: 0;
}

/* RIGHT MODAL TRANSITIONS */
.fade-right-enter-active,
.fade-right-enter-active .sheet,
.fade-right-leave-active,
.fade-right-leave-active .sheet {
  transition: all 0.2s ease;
}
.fade-right-enter-from .sheet,
.fade-right-leave-to .sheet {
  transform: translateX(100%);
  opacity: 0;
}

/* TOP MODAL TRANSITIONS */
.fade-top-enter-active,
.fade-top-enter-active .sheet,
.fade-top-leave-active,
.fade-top-leave-active .sheet {
  transition: all 0.2s ease;
}
.fade-top-enter-from .sheet,
.fade-top-leave-to .sheet {
  transform: translateY(-100%);
  opacity: 0;
}

/* BOTTOM MODAL TRANSITIONS */
.fade-bottom-enter-active,
.fade-bottom-enter-active .sheet,
.fade-bottom-leave-active,
.fade-bottom-leave-active .sheet {
  transition: all 0.2s ease;
}
.fade-bottom-enter-from .sheet,
.fade-bottom-leave-to .sheet {
  transform: translateY(100%);
  opacity: 0;
}
.footer {
  box-shadow: 0px -1px 5px 0px rgb(0 0 0 / 10%);
}
</style>
