export const useMainStore = defineStore("main", () => {
  const nav = ref(false);
  const toggleSidebar = () => {
    nav.value = !nav.value;
  };

  return {
    nav,
    toggleSidebar
  };
});
