/**
 * Use this composable to add keyboard shortcuts to your app.
 * @param config
 */

export function useShortcut(
  config: Partial<{
    save: () => void;
    new: () => void;
    edit: () => void;
    esc: () => void;
    meta_enter: () => void;
    toggle: () => void;
  }>
) {
  onMounted(() => {
    document.addEventListener(
      "keydown",
      function (e) {
        // Save - Ctrl + S or Cmd + S
        if ((e.ctrlKey && e.key === "s") || (e.metaKey && e.key === "s")) {
          e.preventDefault();
          config.save?.();
        }
        // New - Ctrl + K or Cmd + K
        if ((e.ctrlKey && e.key === "k") || (e.metaKey && e.key === "k")) {
          e.preventDefault();
          config.new?.();
        }
        // Esc
        if (e.key === "Escape") {
          e.preventDefault();
          config.esc?.();
        }
        // Edit - Shift + E
        if (e.shiftKey && e.key === "E") {
          // if it's a textarea, input or contenteditable element, don't trigger edit
          if (
            e.target instanceof HTMLTextAreaElement ||
            e.target instanceof HTMLInputElement ||
            (e.target as HTMLElement)?.isContentEditable
          ) {
            return;
          }
          e.preventDefault();
          config.edit?.();
        }

        // Meta + Enter
        if (e.metaKey && e.key === "Enter") {
          e.preventDefault();
          config.meta_enter?.();
        }

        // [ - toggle sidebar
        if (e.key === "[") {
          e.preventDefault();
          config.toggle?.();
        }
      },
      false
    );
  });

  onUnmounted(() => {
    // Remove event listener
    document.removeEventListener("keydown", () => {});
  });
}
