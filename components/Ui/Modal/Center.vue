<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean;
  outerClass?: string;
  headerClass?: string;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
  (event: "hide"): void;
}>();

const visible = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <PvDialog
    modal
    v-model:visible="visible"
    unstyled
    :pt="{
      root: {
        class: [
          'bg-white dark:bg-bg-darkSec dialog rounded-lg shadow-xl border',
          props.outerClass,
        ],
      },
      header: {
        class: ['p-4 flex justify-between items-center border-b', headerClass],
      },
      headerTitle: {
        class: 'font-semibold',
      },
      content: {
        class: 'p-2 max-h-[80vh] overflow-y-auto',
      },
      footer: {
        class: 'p-2 border-t flex justify-end items-center',
      },
    }"
    @hide="() => emit('hide')"
  >
    <slot></slot>

    <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
      <slot :name="name" v-bind="slotData"></slot>
    </template>
  </PvDialog>
</template>

<style>
[data-pc-section="mask"] {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
