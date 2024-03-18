<script setup lang="ts">
interface Props {
  label?: string;
  prependIcon?: boolean | string | "emoticon-sad";
  appendIcon?: boolean | string | "emoticon-sad";
  prependSize?: string;
  appendSize?: string;
  outerClass?: string;
  size?: "xs" | "sm" | "md" | "lg";
  isLoading?: boolean;
  disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  prependSize: "20",
  appendSize: "20",
  // size: "sm", // You can set default size if you want
});

const sizes = computed(() => {
  return props.size === "xs"
    ? "btn-xs"
    : props.size === "sm"
    ? "btn-sm"
    : props.size === "md"
    ? "btn-md"
    : props.size === "lg"
    ? "btn-lg"
    : "btn";
});

const button = ref<HTMLElement | null>(null);

function triggerClick() {
  button.value?.click();
}

defineExpose({
  triggerClick,
});
</script>

<template>
  <button
    :class="[
      {
        'flex items-center gap-2': prependIcon || appendIcon,
        '!bg-opacity-70 items-center justify-center !cursor-not-allowed !pointer-events-none':
          isLoading || disabled,
      },
      outerClass,
      sizes,
    ]"
    :disabled="isLoading"
    ref="button"
  >
    <div v-if="!isLoading">
      <Icon :name="`${prependIcon}`" :size="prependSize" v-if="prependIcon" />
      <span v-if="label">{{ label }}</span>
      <slot></slot>
      <Icon :name="`${appendIcon}`" :size="appendSize" v-if="appendIcon" />
    </div>
    <div v-else>
      <Icon name="bx:loader" class="animate-spin" size="16" />
    </div>
  </button>
</template>

<style lang="scss" scoped></style>
