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
        class="flex bg-white dark:bg-bg-dark h-full sheet"
        :class="{
          'w-full sm:w-1/4 md:w-1/3 lg:w-1/4': size === 'sm',
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
              class="flex justify-between items-center p-5 border-b dark:border-b-gray-500"
            >
              <div
                class="flex items-center w-full"
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
                  <button class="text-style pb-0.5" @click="handleClose">
                    <Icon name="mdi:arrow-left" size="20" />
                  </button>
                </slot>
              </div>
              <slot name="add"> </slot>
            </div>
          </slot>
          <!-- ./ Header  -->

          <!-- Main Slot  -->
          <div
            class="h-full overflow-y-scroll p-5 bg-white dark:bg-bg-dark pb-32 sheet-body"
            :class="{ '!h-auto': position === 'top' }"
          >
            <slot />
          </div>
          <!-- ./ Main Slot  -->
          <!-- Footer  -->
          <div
            v-if="$slots.footer"
            class="footer fixed gap-3 sm:absolute bottom-0 sm:bottom-8 xl:bottom-0 right-0 left-0 bg-white dark:bg-bg-dark px-4 py-2 flex justify-end border-t dark:border-t-gray-500 z-50"
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
  transition: all 0.5s ease;
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
  transition: all 0.5s ease;
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
  transition: all 0.5s ease;
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
  transition: all 0.5s ease;
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
