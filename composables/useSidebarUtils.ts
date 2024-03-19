export default () => {
  const links = ref<
    {
      name: string;
      show?: boolean;
      icon?: string;
      route?: string;
      sub?: {
        name: string;
        icon?: string;
        route?: string;
        sub?: object[];
        params?: string;
      }[];
    }[]
  >([
    {
      name: "Channels",
      show: true
    }
  ]);

  const toggleDropdown = (item: any): void => {
    item.show = !item.show;
  };

  return { links, toggleDropdown };
};
