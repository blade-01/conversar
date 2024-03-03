<script lang="ts" setup>
const { $toast, $modal } = useNuxtApp();
definePageMeta({ layout: "dashboard" });
useHead({
  title: "Table",
});
const headers = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "phone_number",
    label: "phone number",
  },
  {
    key: "role",
    label: "Role",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "location",
    label: "location",
  },
  {
    key: "next_of_kin",
    label: "next of kin",
  },
  {
    key: "spouse",
    label: "spouse",
  },
  {
    key: "family_tree",
    label: "family tree",
  },
  {
    key: "created_at",
    label: "created at",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

const items = [
  {
    _id: Math.random().toString().substr(2, 10).toLocaleUpperCase(),
    name: "John Doe",
    email: "jd@me.com",
    role: "Admin",
    status: "active",
    phone_number: "08012345678",
    location: "Lagos",
    next_of_kin: "Jane Doe",
    spouse: "Jane Doe",
    family_tree: "The Doe Family",
    created_at: "2023-08-12",
  },
  {
    _id: Math.random().toString().substr(2, 10).toLocaleUpperCase(),
    name: "Elijah Michaelson",
    email: "ej@me.com",
    role: "Quality Assurance",
    status: "neutral",
    phone_number: "080783456765",
    location: "Lagos",
    next_of_kin: "Rebeka Michaelson",
    spouse: "Caroline Forbes",
    family_tree: "The Michaelson's",
    created_at: "2023-08-5",
  },
];
const selectedItems = ref<string[]>([]);

function handleRowClick(item: any) {
  $toast.show({
    title: "Row Clicked",
    message: `Row with id ${item._id} was clicked`,
    type: "info",
  });
}

function handleDelete() {
  $modal.show({
    type: "danger",
    title: "Are you sure?",
    body: "You won't be able to revert this!",
    primary: {
      label: "Delete",
      theme: "red",
      action: () => $toast.success("Item deleted successfully 🎉"),
    },
    secondary: {
      label: "Cancel",
      theme: "white",
      action: () => {},
    },
  });
}
</script>

<template>
  <div>
    <p class="title mb-5 text-4xl">Table Samples</p>
    <div class="space-y-5">
      <!-- Basic Table -->
      <div>
        <p class="title pb-2">Basic Table</p>
        <UiDataTable :headers="headers" :items="items">
          <template #actions="item">
            <div class="flex space-x-2">
              <UiBtn class="btn-white !p-0 w-8 h-8 grid place-content-center">
                <Icon name="bx:edit" size="16" />
              </UiBtn>
              <UiBtn
                class="btn-white !p-0 w-8 h-8 grid place-content-center"
                @click="handleDelete"
              >
                <Icon name="bx:trash" size="16" />
              </UiBtn>
            </div>
          </template>
        </UiDataTable>
      </div>
      <!-- ./ Basic Table -->

      <!-- Reshape-able Content Table -->
      <div>
        <p class="title pb-2">Reshape-able Content Table</p>
        <UiDataTable :headers="headers" :items="items">
          <template #status="item">
            <span class="badge" :class="getStatusBadge(item.status)">{{
              item?.status
            }}</span>
          </template>
          <template #created_at="item">
            <span>{{ formatDate(item?.created_at, "DD MMM, YYYY hh:mm A") }}</span>
          </template>
          <template #actions="item">
            <div class="flex space-x-2">
              <UiBtn class="btn-white !p-0 w-8 h-8 grid place-content-center">
                <Icon name="bx:edit" size="16" />
              </UiBtn>
              <UiBtn
                class="btn-white !p-0 w-8 h-8 grid place-content-center"
                @click="handleDelete"
              >
                <Icon name="bx:trash" size="16" />
              </UiBtn>
            </div>
          </template>
        </UiDataTable>
      </div>
      <!-- ./ Reshape-able Content Table -->

      <!-- Selectable Table -->
      <div>
        <p class="title pb-2">Selectable Table</p>
        <UiDataTable
          :headers="headers"
          :items="items"
          selectable
          v-model:selected-items="selectedItems"
        >
          <template #actions="item">
            <div class="flex space-x-2">
              <UiBtn class="btn-white !p-0 w-8 h-8 grid place-content-center">
                <Icon name="bx:edit" size="16" />
              </UiBtn>
              <UiBtn
                class="btn-white !p-0 w-8 h-8 grid place-content-center"
                @click="handleDelete"
              >
                <Icon name="bx:trash" size="16" />
              </UiBtn>
            </div>
          </template>
        </UiDataTable>
      </div>
      <!-- ./ Selectable Table -->

      <!-- Sticky Column Table -->
      <div>
        <p class="title pb-2">Sticky Column Table</p>
        <UiDataTable
          :headers="headers"
          :items="items"
          selectable
          v-model:selected-items="selectedItems"
          sticky-first-column
        >
          <template #actions="item">
            <div class="flex space-x-2">
              <UiBtn class="btn-white !p-0 w-8 h-8 grid place-content-center">
                <Icon name="bx:edit" size="16" />
              </UiBtn>
              <UiBtn
                class="btn-white !p-0 w-8 h-8 grid place-content-center"
                @click="handleDelete"
              >
                <Icon name="bx:trash" size="16" />
              </UiBtn>
            </div>
          </template>
        </UiDataTable>
      </div>
      <!-- ./ Sticky Column Table -->

      <!-- Clickable Table -->
      <div>
        <p class="title pb-2">Clickable Table</p>
        <UiDataTable
          :headers="headers"
          :items="items"
          @row-click="handleRowClick"
          row-classes="cursor-pointer"
        >
          <template #actions="item">
            <div class="flex space-x-2">
              <UiBtn class="btn-white !p-0 w-8 h-8 grid place-content-center">
                <Icon name="bx:edit" size="16" />
              </UiBtn>
              <UiBtn
                class="btn-white !p-0 w-8 h-8 grid place-content-center"
                @click="handleDelete"
              >
                <Icon name="bx:trash" size="16" />
              </UiBtn>
            </div>
          </template>
        </UiDataTable>
      </div>
      <!-- ./ Clickable Table -->
    </div>
  </div>
</template>

<style scoped></style>
