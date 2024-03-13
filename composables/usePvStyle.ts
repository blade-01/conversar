export default () => {
  const dropdownStyle = computed(() => {
    return {
      root: {
        class: "dropdown"
      },
      input: { class: "px-4 dropdown-text" },
      clearIcon: {
        class: " right-[35px] dropdown-icon"
      },
      filterInput: {
        class: "dropdown-filter-input"
      },
      filterIcon: {
        class: "right-3 dropdown-icon"
      },
      panel: {
        class: "bg-white dark:bg-bg-dark "
      },
      header: {
        class: "p-2 bg-inherit dropdown-text"
      },
      item: ({ context }: any) => ({
        class: context.selected
          ? "dropdown-item dropdown-item-selected"
          : context.focused
          ? "dropdown-item"
          : "dropdown-item"
      }),
      emptyMessage: {
        class: "p-4 dropdown-text"
      }
    };
  });

  const multiSelectStyle = computed(() => {
    return {
      ...dropdownStyle.value,
      header: {
        class:
          "flex items-center justify-between gap-2 p-2 bg-inherit dropdown-text"
      },
      item: ({ context }: any) => ({
        class: context.selected
          ? "flex items-center gap-2 dropdown-item dropdown-item-selected"
          : context.focused
          ? "flex items-center gap-2 dropdown-item"
          : "flex items-center gap-2 dropdown-item"
      }),
      label: {
        class: "px-4 dropdown-text flex items-center gap-1.5"
      },
      clearIcon: {
        class: "xs"
      },
      headerCheckboxContainer: {
        class: "dropdown-checkbox-container"
      },
      headerCheckbox: {
        class: "dropdown-checkbox ring-0"
      },
      checkboxContainer: {
        class: "dropdown-checkbox-container"
      },
      checkbox: {
        class: "dropdown-checkbox"
      },
      checkboxIcon: {
        class: "dropdown-checkbox "
      },
      token: {
        class: "dropdown-token"
      },
      tokenLabel: {
        class: "dropdown-token-label"
      },
      removeTokenIcon: {
        class: "dropdown-token-icon"
      }
    };
  });

  const datePickerStyle = computed(() => {
    return {
      input: { class: "input-style ring-0" },
      panel: { class: "bg-white dark:bg-bg-darkSec dropdown-text p-3" },
      header: { class: "bg-white dark:bg-bg-darkSec dropdown-text py-3.5" }
    };
  });

  const autocompleteStyle = computed(() => {
    return {
      root: {
        class: "input-style !h-auto !py-2 !bg-transparent !ring-0"
      },
      input: {
        class: "bg-transparent border-none outline-none ring-0 !px-0"
      },
      inputToken: {
        class:
          "placeholder:font-light placeholder:text-text-secondary dark:placeholder:text-text-placeholder"
      },
      panel: {
        class:
          "bg-white dark:bg-bg-darkSec dropdown-text max-h-[200px] overflow-y-auto w-[250px] xl:w-[350px]"
      },
      header: { class: "bg-white dark:bg-bg-darkSec dropdown-text py-3.5" },
      container: { class: "flex items-center gap-2 flex-wrap" },
      token:
        "gap-2 inline-flex items-center bg-dropdown-checkbox dark:bg-slate-500 rounded-full dropdown-token !px-1.5",
      tokenLabel: {
        class: "dropdown-token-label"
      },
      removeTokenIcon: {
        class: "dropdown-token-icon"
      },
      item: ({ context }: any) => ({
        class: context.selected
          ? "dropdown-item dropdown-item-selected"
          : context.focused
          ? "dropdown-item"
          : "dropdown-item"
      })
    };
  });

  const chipStyle = computed(() => {
    return {
      ...autocompleteStyle.value
    };
  });

  const editorStyle = computed(() => {
    return {
      input: { class: "input-style ring-0" },
      panel: { class: "bg-white dark:bg-bg-darkSec dropdown-text p-3" },
      header: { class: "bg-white dark:bg-bg-darkSec dropdown-text py-3.5" }
    };
  });

  const dialogStyle = computed(() => {
    return {
      root: {
        class: "bg-white dark:bg-bg-darkSec dialog rounded-lg shadow-xl border"
      },
      header: {
        class: "p-4 flex justify-between items-center border-b"
      },
      headerTitle: {
        class: "font-semibold"
      },
      content: {
        class: "p-2 max-h-[80vh] overflow-y-auto"
      },
      footer: {
        class: "p-2 border-t flex justify-end items-center"
      }
    };
  });

  const tooltipStyle = computed(() => {
    return {
      root: {
        class: "bg-white dark:bg-bg-darkSec dialog rounded-lg shadow-xl border"
      },
      text: "text-white !text-xs !p-1.5"
    };
  });

  return {
    dropdownStyle,
    multiSelectStyle,
    datePickerStyle,
    autocompleteStyle,
    chipStyle,
    editorStyle,
    dialogStyle,
    tooltipStyle
  };
};
