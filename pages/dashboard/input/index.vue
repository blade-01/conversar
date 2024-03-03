<script setup lang="ts">
import useValidations from "~/composables/useValidations";
const { $toast } = useNuxtApp();
definePageMeta({ layout: "dashboard" });
useHead({
  title: "Forms",
});

const { mainSchema } = useValidations();
const genders = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
];

const countries = [
  {
    label: "Nigeria",
    value: "nigeria",
  },
  {
    label: "Malaysia",
    value: "malaysia",
  },
  {
    label: "Finland",
    value: "finland",
  },
];

const cities = [
  {
    label: "Lagos",
    value: "lagos",
  },
  {
    label: "Abuja",
    value: "abuja",
  },
  {
    label: "Port Harcourt",
    value: "port-harcourt",
  },
  {
    label: "Ibadan",
    value: "ibadan",
  },
];

const items = ref<any>([]);
function search(event: any) {
  items.value = [...Array(10).keys()].map((item) => event.query + "-" + item);
}
const { autocompleteStyle, chipStyle } = usePvStyle();
const locations = ref<any>("");
const chips = ref<any>(["hi"]);

function handleFormSubmit(values: any) {
  console.log(values);
  $toast.success("Form submitted successfully");
}

function onInvalidSubmit() {
  const el = document.querySelector(".error");
  if (el) {
    el.classList.add("scroll-mt-16");
    el.scrollIntoView({
      behavior: "smooth",
    });
  }
}
</script>

<template>
  <div>
    <p class="title mb-5 text-4xl">Form Input Samples</p>
    <div>
      <!-- Form -->
      <Form
        v-slot="{ errors, values }"
        :validation-schema="mainSchema"
        @submit="handleFormSubmit"
        @invalid-submit="onInvalidSubmit"
      >
        <div class="space-y-5">
          <!-- Basic Inputs -->
          <div>
            <p class="title pb-2">Basic Inputs</p>
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3.5">
              <UiInputField
                name="first_name"
                label="First Name"
                placeholder="First Name"
                required
                :error="errors.first_name"
              />
              <UiInputField
                name="last_name"
                label="Last Name"
                placeholder="Last Name"
                required
                :error="errors.last_name"
              />
              <UiInputField
                name="email"
                type="email"
                label="Email"
                placeholder="Email"
                required
                :error="errors.email"
              />
              <UiInputField
                name="portfolio"
                type="url"
                label="Portfolio"
                placeholder="Portfolio"
                required
                :error="errors.portfolio"
              />
              <UiInputPassword
                name="password"
                label="Password"
                placeholder="Password"
                required
                :error="errors.password"
              />
              <UiInputPassword
                name="password_confirmation"
                label="Confirm Password"
                placeholder="Confirm Password"
                required
                :error="errors.password_confirmation"
              />
              <UiInputNumber
                name="currency"
                currency="NGN"
                locale="en-NG"
                label="Currency"
                mode="currency"
                required
                :error="errors.currency"
              />
              <UiInputField
                as="textarea"
                name="message"
                label="Message"
                placeholder="Message"
                required
                :error="errors.message"
              />
            </div>
          </div>
          <!-- ./ Basic Inputs -->

          <!-- Not So Basic Inputs -->
          <div>
            <p class="title pb-2">Not So Basic Inputs</p>
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3.5">
              <UiInputPhone
                name="phone_number"
                label="Phone Number"
                placeholder="Phone Number"
                required
                :error="errors.phone_number"
              />
              <Field
                name="chips"
                as="div"
                class="input-group w-full"
                :class="{ error: errors.chips }"
              >
                <label for="chips">
                  Multiple Inputs
                  <span class="required-mark">*</span>
                </label>
                <PvChips
                  v-model="chips"
                  placeholder="Start Typing..."
                  :pt="chipStyle"
                  unstyled
                ></PvChips>
                <small v-if="errors.chips" class="error-message">{{
                  errors.chips
                }}</small>
              </Field>
              <Field
                name="autocomplete"
                as="div"
                class="input-group w-full"
                :class="{ error: errors.autocomplete }"
              >
                <label for="autocomplete">
                  Autocomplete
                  <span class="required-mark">*</span>
                </label>
                <PvAutoComplete
                  v-model="locations"
                  multiple
                  :suggestions="items"
                  @complete="search"
                  unstyled
                  placeholder="Start Typing..."
                  :pt="autocompleteStyle"
                ></PvAutoComplete>
                <small v-if="errors.autocomplete" class="error-message">{{
                  errors.autocomplete
                }}</small>
              </Field>
              <UiInputFile
                name="image"
                label="Image Upload"
                placeholder="Upload File"
                required
                prepend-icon="bx:cloud-upload"
                :error="errors.image"
                accept="image/*"
              />
              <UiInputFile
                name="images"
                label="Multiple Image Upload"
                placeholder="Upload Multiple Files"
                required
                prepend-icon="bx:cloud-upload"
                :error="errors.images"
                multiple
                accept="image/*"
              />
              <UiInputFile
                name="file"
                label="File Upload"
                placeholder="Upload File"
                required
                prepend-icon="bx:cloud-upload"
                :error="errors.file"
              />
              <UiInputFile
                name="files"
                label="Multiple File Upload"
                placeholder="Upload Multiple Files"
                required
                prepend-icon="bx:cloud-upload"
                :error="errors.files"
                multiple
              />
            </div>
          </div>
          <!-- ./ Not So Basic Inputs -->

          <!-- Dropdowns -->
          <div>
            <p class="title pb-2">Dropdowns</p>
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3.5">
              <UiInputDropdown
                name="gender"
                :options="genders"
                option-label="label"
                option-value="value"
                label="Basic Dropdown"
                filter
                show-clear
                required
                :error="errors.gender"
              />
              <UiInputMultiSelect
                name="country"
                :options="countries"
                option-label="label"
                option-value="value"
                label="Multiselect Dropdown"
                filter
                show-clear
                required
                :error="errors.country"
              />
              <UiInputMultiSelect
                name="city"
                :options="cities"
                option-label="label"
                option-value="value"
                label="Multiselect Dropdown with chips"
                filter
                show-clear
                required
                :error="errors.city"
                display="chip"
              />
            </div>
          </div>
          <!-- ./ Dropdowns -->

          <!-- Checkbox, Radio Button and Switch -->
          <div>
            <p class="title pb-2">Checkbox, Radio Button and Switch</p>
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3.5">
              <UiInputCheckbox name="checkbox" label="Checkbox" />
              <UiInputRadiobutton name="radio" label="Radio button" />
              <UiInputSwitch name="switch" label="Switch" />
            </div>
          </div>
          <!-- ./ Checkbox, Radio Button and Switch -->

          <!-- Date Pickers -->
          <div>
            <p class="title pb-2">Date Pickers</p>
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3.5">
              <UiInputDatePicker
                required
                :error="errors.date"
                name="date"
                label="Day"
                dateFormat="dd-mm-yy"
              />
              <UiInputDatePicker
                required
                :error="errors.month"
                name="month"
                label="Month"
                view="month"
                dateFormat="mm/yy"
              />
              <UiInputDatePicker
                required
                :error="errors.year"
                name="year"
                label="Year"
                view="year"
                dateFormat="yy"
              />
              <UiInputDatePicker
                required
                :error="errors.date_time"
                name="date_time"
                label="Date with time"
                showTime
                hourFormat="12"
                dateFormat="dd-mm-yy"
              />
              <UiInputDatePicker
                required
                :error="errors.time"
                name="time"
                label="Time"
                timeOnly
                hourFormat="24"
              />
              <UiInputDatePicker
                required
                :error="errors.multiple"
                name="multiple"
                label="Multiple Dates"
                selectionMode="multiple"
              />
              <UiInputDatePicker
                required
                :error="errors.range"
                name="range"
                label="Date Range"
                selectionMode="range"
              />
            </div>
          </div>
          <!-- ./ Date Pickers -->

          <!-- Action Buttons -->
          <div class="flex justify-end gap-2.5">
            <UiBtn
              label="Cancel"
              size="sm"
              type="button"
              outer-class="!bg-transparent border border-gray-500"
            />
            <UiBtn label="Submit" size="sm" />
          </div>
          <!-- ./ Action Buttons -->
        </div>
      </Form>
      <!-- ./ Form -->
    </div>
  </div>
</template>

<style scoped></style>
