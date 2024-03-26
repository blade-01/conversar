<script setup lang="ts">
const contentWrapper = ref<HTMLElement | null>(null);
const chatInput = ref<HTMLElement | null>(null);
if (chatInput.value) {
  chatInput.value!.addEventListener("focus", () => {
    setTimeout(() => {
      chatInput.value!.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }, 500); // Delay to account for the keyboard animation
  });
}
</script>

<template>
  <div class="relative overflow-x-clip overflow-y-hidden">
    <main
      class="mainbar relative h-full md:h-screen overflow-hidden w-full transition-[margin-left] lg:transition-none duration-500 lg:ml-[var(--sidebar-width-lg)] 2xl:ml-[var(--sidebar-width-2xl)] lg:w-[calc(100%-var(--sidebar-width-lg))] 2xl:w-[calc(100%-var(--sidebar-width-2xl))]"
    >
      <div>
        <!-- Topbar start here -->
        <div
          class="flex items-center sticky top-0 w-full h-[var(--sidebar-height)] z-30 topbar"
        >
          ...
        </div>
        <!-- Topbar ends here -->
        <!-- Entire chat wrapper start here -->
        <div
          class="xl:flex h-[calc(100vh-var(--sidebar-height))] overflow-auto break-all"
        >
          <div class="relative h-full flex flex-col overflow-y-auto w-full">
            <!-- Content Wrapper start here -->
            <div class="py-4 flex-1 overflow-y-auto" ref="contentWrapper">
              <div class="px-4">...</div>
              // This houses the channel title and description (has to stay at the top of
              the content wrapper)
              <div class="mt-5 mb-0">
                <slot /> // This houses the messages (has to stay at the top as well,
                basically the only thing at the bottom should be the form input)
              </div>
            </div>
            <!-- Content Wrapper ends here -->
            <!-- Form Input start here -->
            <div
              class="sticky w-[inherit] left-0 bottom-0 z-10 bg-bg-primary dark:bg-bg-dark p-4 message-container"
              ref="messageContainer"
            >
              <form class="w-full">
                <div class="min-h-[50px] max-h-[200px]">...</div>
              </form>
            </div>
            <!-- Form Input ends here -->
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
