<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
// vueTelInput
const props = defineProps<{
  name: string;
  label?: string;
  error?: string;
  outerClasses?: string;
  required?: boolean;
  modelValue?: string;
  prependIcon?: string;
  appendIcon?: string;
}>();
const emits = defineEmits<{
  (event: "update:modelValue", value: string | undefined): void;
  (event: "update:error", value: boolean): void;
}>();

const localError = ref<string | undefined>();

interface CountryCodeResponse {
  countryCallingCode?: string;
  nationalNumber?: string;
  number?: string;
  country: {
    name: string;
    iso2: string;
    dialCode: string;
  };
  countryCode?: string;
  valid?: boolean;
  formatted: string;
}

const handleValidation = (value: string, phoneObject: CountryCodeResponse) => {
  // if (!phoneObject.valid && phoneObject.number) {
  //   emits("update:error", true);
  // } else {
  //   localError.value = undefined;
  //   emits("update:error", false);
  // }
  emits(
    "update:modelValue",
    phoneObject.number ? phoneObject.number : phoneObject.formatted
  );
};

const options = ref({
  inputOptions: {
    autocomplete: "off",
    showDialCode: true,
    placeholder: "",
  },
  dropdownOptions: {
    showDialCodeInList: true,
    showFlags: true,
    showSearchBox: true,
  },
});
</script>

<template>
  <Field
    :name="name"
    as="div"
    class="input-group w-full"
    :class="{
      error: error,
      [outerClasses || '']: outerClasses,
    }"
    v-slot="{ handleChange, value }"
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
      <vue-tel-input
        :id="name"
        :model-value="value"
        v-bind="options"
        :class="{
          error: error || localError,
        }"
        @on-input="handleValidation"
        @update:modelValue="
        (val:any) => {
          if (val) {
            handleChange(val, val.length > 4);
          }
        }
      "
      ></vue-tel-input>
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
    <span v-if="error || localError" class="error-message">
      {{ error || localError }}
    </span>
  </Field>
</template>

<style scoped>
:deep(.vue-tel-input) {
  @apply input-style !px-0 focus-within:shadow-none focus-within:ring-0 focus-within:border-white focus-within:outline-none;
}

:deep(.vti__dropdown-list) {
  @apply z-10 w-[250px] lg:w-[370px] bg-white text-[#3f3f46] border-none rounded-[4px];
}

:deep(.vti__dropdown-item) {
  @apply py-4 px-3;
}

:deep(.vti__dropdown-list) {
  box-shadow: 0 0 #0000, 0 0 #0000, 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

:deep(.vti__input) {
  @apply bg-transparent border-none focus:!border-none focus:!outline-none focus-within:ring-0 appearance-none m-0;
}

:deep(.vue-tel-input.error) {
  @apply rounded-[4px] !border-solid !border !border-red-500;
}

:deep(ul.vti__dropdown-list > .vti__input.vti__search_box) {
  @apply !border-solid !border !border-[#E5E7EB] rounded-[4px] m-1 block mx-auto sticky top-1.5 z-10 bg-white;
}

:deep(.vti__dropdown.open) {
  @apply !bg-transparent hover:!bg-transparent;
}

:deep(.vti__dropdown) {
  @apply !bg-transparent hover:!bg-transparent;
}
</style>
