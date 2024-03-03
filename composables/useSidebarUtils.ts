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
      name: "Dashboard",
      icon: "view-dashboard",
      route: "/dashboard"
    },
    {
      name: "Button Samples",
      icon: "gesture-tap-button",
      route: "/dashboard/button"
    },
    {
      name: "Input Samples",
      icon: "form-select",
      route: "/dashboard/input"
    },
    {
      name: "Modal Samples",
      icon: "help-box-multiple-outline",
      route: "/dashboard/modal"
    },
    {
      name: "Table Samples",
      icon: "table",
      route: "/dashboard/table"
    },
    {
      name: "Others",
      icon: "alien",
      show: false,
      sub: [
        {
          name: "Logout",
          route: "/"
        }
      ]
    }
  ]);

  const toggleDropdown = (item: any): void => {
    item.show = !item.show;
  };

  return { links, toggleDropdown };
};
