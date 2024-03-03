// import { defineStore } from 'pinia';

export const useMainStore = defineStore("main", () => {
  const name = ref<string>("Blade");

  return {
    name
  };
});
