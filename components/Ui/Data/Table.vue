<script lang="ts" setup>
interface Props {
  headers?: {
    key: string;
    label: string;
    sortable?: boolean;
  }[];
  items: Array<any>;
  selectable?: boolean;
  selectedItems?: Array<any>;
  selectField?: string;
  rowClasses?: string;
  stickyFirstColumn?: boolean;
  outerClass?: string;
  tableHeader?: string;
}
const props = withDefaults(defineProps<Props>(), {
  headers: () => [],
  items: () => [],
});

const emits = defineEmits(["select", "update:selectedItems", "rowClick"]);

// Computed
const filteredItems = computed(() => props.items);

const selectedItems = computed<any>({
  get() {
    return props.selectedItems;
  },
  set(value) {
    emits("update:selectedItems", value);
  },
});

// Methods
const selectAll = () => {
  if (selectedItems.value.length === filteredItems.value.length) {
    selectedItems.value = [];
  } else {
    selectedItems.value = filteredItems.value.map(
      (item) => item[props.selectField || "_id"]
    );
  }
};

const isScrolled = ref(false);

function handleScroll(event: Event) {
  if (!props.stickyFirstColumn) return;

  const target = event.target as HTMLDivElement;
  const scrollLeft = target.scrollLeft;

  if (scrollLeft > 0) {
    isScrolled.value = true;
  } else {
    isScrolled.value = false;
  }
}
</script>

<template>
  <div
    class="rounded-lg overflow-x-auto border"
    :class="[
      {
        'table-fixed-column': props.stickyFirstColumn,
      },
      outerClass,
    ]"
    @scroll="handleScroll"
  >
    <slot name="beforeTable"></slot>

    <table class="w-full table-auto text-sm text-left">
      <thead>
        <tr class="bg-gray-300 dark:bg-darkBg text-xs uppercase" :class="tableHeader">
          <th
            v-if="props.selectable"
            class="p-3 bg-inherit border-r w-[30px]"
            :class="{
              'sticky left-0 z-[2]': props.stickyFirstColumn,
              'flex items-center justify-end w-[70px]': $slots.beforeCheckbox,
            }"
          >
            <input
              type="checkbox"
              scope="col"
              class="form-control"
              @change="selectAll"
              :checked="selectedItems.length === filteredItems.length"
            />
          </th>
          <th
            v-for="header in headers"
            :key="header.key"
            scope="col"
            class="py-2 px-4 font-normal whitespace-nowrap z-[1]"
            :class="{
              'sticky left-[38px] z-[3] bg-inherit':
                props.stickyFirstColumn && header.key === headers[0].key,
              'sticky-column-shadow':
                isScrolled && props.stickyFirstColumn && header.key === headers[0].key,
              '!left-0':
                props.stickyFirstColumn &&
                header.key === headers[0].key &&
                !props.selectable,
              [tableHeader || '']: tableHeader,
            }"
          >
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody class="w-full">
        <tr v-if="filteredItems.length <= 0">
          <td class="text-center py-5 bg-white" :colspan="headers.length + 1">
            {{ $t("no_results_found") }}
          </td>
        </tr>
        <tr
          v-for="(item, i) in filteredItems"
          :key="i"
          class="border-b last:border-b-0 bg-white dark:bg-darkBgSec group"
          :class="rowClasses"
        >
          <td
            v-if="props.selectable"
            class="p-3 border-r z-[1] w-[30px]"
            :class="{
              'sticky left-0 z-[2] bg-inherit': props.stickyFirstColumn,
              'flex items-center justify-between w-[70px]': $slots.beforeCheckbox,
            }"
          >
            <div>
              <slot name="beforeCheckbox" v-bind="item"></slot>
            </div>
            <input
              v-model="selectedItems"
              :value="item[selectField || '_id']"
              type="checkbox"
              class="form-control"
            />
          </td>

          <td
            v-for="header in headers"
            :key="header.key"
            class="py-2 px-4 text-sm whitespace-nowrap z-1"
            :class="{
              'sticky left-[38px] z-[3] bg-inherit':
                props.stickyFirstColumn && header.key === headers[0].key,
              'sticky-column-shadow':
                isScrolled && props.stickyFirstColumn && header.key === headers[0].key,
              '!left-0':
                props.stickyFirstColumn &&
                header.key === headers[0].key &&
                !props.selectable,
            }"
            @click.self="$emit('rowClick', item)"
          >
            <slot :name="header.key" v-bind="item">
              <template v-if="header.key.includes('.')">
                {{ item[header.key.split(".")[0]][header.key.split(".")[1]] }}
              </template>
              <template v-else>
                {{ item[header.key] }}
              </template>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.sticky-column-shadow {
  @apply shadow-md border-r-gray-100 dark:border-r-darkBg;
}
.table-fixed-column table {
  border-collapse: separate;
  background-color: transparent;
  border-spacing: 0;
}

.table-fixed-column td,
tr,
th {
  border-bottom: 1px solid #e2e8f0;
}

::-webkit-scrollbar {
  @apply w-4 h-1.5;
}
</style>
