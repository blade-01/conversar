export default () => {
  const links = ref<
    {
      name: string;
      show?: boolean;
      icon?: string;
      route?: string;
      sub?: { name: string; icon?: string; route?: string; sub?: object[] }[];
    }[]
  >([
    {
      name: "Channels",
      show: true,
      sub: [
        {
          name: "Introduction",
          route: "/",
          icon: "pound"
        },
        {
          name: "General",
          route: "/channels/general",
          icon: "pound"
        }
      ]
    }
  ]);

  const toggleDropdown = (item: any): void => {
    item.show = !item.show;
  };

  return { links, toggleDropdown };
};
