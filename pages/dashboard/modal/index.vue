<script setup lang="ts">
definePageMeta({ layout: "dashboard" });
useHead({
  title: "Modals",
});

const modal = ref<boolean>(false);
const leftModal = ref<boolean>(false);
const rightModal = ref<boolean>(false);
const topModal = ref<boolean>(false);
const bottomModal = ref<boolean>(false);
const persistentModal = ref<boolean>(false);

const { tooltipStyle } = usePvStyle();
</script>

<template>
  <div>
    <p class="title mb-5 text-4xl">Modal Samples</p>
    <div class="flex flex-wrap gap-5 items-center">
      <UiBtn label="Open Center Modal" size="sm" @click="modal = !modal" />
      <UiBtn
        label="Open Left Modal"
        size="sm"
        append-icon="mdi:arrow-left"
        @click="leftModal = !leftModal"
      />
      <UiBtn
        label="Open Right Modal"
        size="sm"
        append-icon="mdi:arrow-right"
        @click="rightModal = !rightModal"
      />
      <UiBtn
        label="Open Top Modal"
        size="sm"
        append-icon="mdi:arrow-top"
        @click="topModal = !topModal"
      />
      <UiBtn
        label="Open Bottom Modal"
        size="sm"
        append-icon="mdi:arrow-bottom"
        @click="bottomModal = !bottomModal"
      />
      <UiBtn
        label="Open Persistent Modal"
        size="sm"
        @click="persistentModal = !persistentModal"
        v-tooltip.bottom="{
          value: 'Modal will not close without clicking close button',
          pt: tooltipStyle,
        }"
      />
    </div>
    <UiModalCenter v-model="modal" header="Modal" outer-class="w-[90%] lg:w-1/2">
      <div class="p-4">Hello there</div>
      <template #footer>
        <div class="flex gap-2.5">
          <UiBtn class="btn-default" size="sm" label="Cancel" @click="modal = !modal" />
          <UiBtn label="Submit" class="btn-primary" size="sm" @click="modal = !modal" />
        </div>
      </template>
    </UiModalCenter>
    <UiModalSide v-model="leftModal" title="Left Modal" position="left">
      <template #footer>
        <UiBtn
          class="btn-default"
          size="sm"
          label="Cancel"
          @click="leftModal = !leftModal"
        />
        <UiBtn
          label="Submit"
          class="btn-primary"
          size="sm"
          @click="leftModal = !leftModal"
        />
      </template>
    </UiModalSide>
    <UiModalSide v-model="rightModal" title="Right Modal">
      <template #footer>
        <UiBtn
          class="btn-default"
          size="sm"
          label="Cancel"
          @click="rightModal = !rightModal"
        />
        <UiBtn
          label="Submit"
          class="btn-primary"
          size="sm"
          @click="rightModal = !rightModal"
        />
      </template>
    </UiModalSide>
    <UiModalSide v-model="topModal" title="Top Modal" position="top">
      <template #footer>
        <UiBtn
          class="btn-default"
          size="sm"
          label="Cancel"
          @click="topModal = !topModal"
        />
        <UiBtn
          label="Submit"
          class="btn-primary"
          size="sm"
          @click="topModal = !topModal"
        />
      </template>
    </UiModalSide>
    <UiModalSide v-model="bottomModal" title="Bottom Modal" position="bottom">
      <template #footer>
        <UiBtn
          class="btn-default"
          size="sm"
          label="Cancel"
          @click="bottomModal = !bottomModal"
        />
        <UiBtn
          label="Submit"
          class="btn-primary"
          size="sm"
          @click="bottomModal = !bottomModal"
        />
      </template>
    </UiModalSide>
    <UiModalSide v-model="persistentModal" title="Persistent Modal" persistent>
      <template #footer>
        <UiBtn
          class="btn-default"
          size="sm"
          label="Cancel"
          @click="persistentModal = !persistentModal"
        />
        <UiBtn
          label="Submit"
          class="btn-primary"
          size="sm"
          @click="persistentModal = !persistentModal"
        />
      </template>
    </UiModalSide>
  </div>
</template>

<style scoped></style>
