<script setup lang="ts">
interface Props {
  channel: any;
  isEditable?: boolean;
  hasQuery?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isEditable: true,
});

const {
  handleCancel,
  isEditing,
  handleChannelUpdate,
  handleToggle,
  handleChannelDelete,
  isLoading,
  inputField,
} = useChannel(props);
</script>

<template>
  <div>
    <NuxtLink
      :to="{
        name: 'channel-id',
        params: { id: channel.id },
        query: hasQuery
          ? {
              type: 'invited',
            }
          : {},
      }"
      active-class="sidebar-active-link"
      class="sidebar-item mb-2 relative group"
      @mouseleave="handleCancel"
    >
      <span class="icon-style">
        <Icon name="mdi:pound" size="15" />
      </span>
      <span class="font-light">
        <input
          type="text"
          class="edit-input"
          ref="inputField"
          v-if="isEditing"
          v-model="channel.name"
          @blur.prevent.stop="handleChannelUpdate"
          @click.prevent.stop
          @keypress.prevent.enter="handleChannelUpdate"
        />
        <span v-else>
          {{ truncateString(channel.name || "", 15) }}
        </span>
      </span>
      <div
        class="absolute right-5 -top-4 w-[80px] h-9 rounded-lg invisible opacity-0 bg-bg-topbar dark:bg-bg-darkTopbar border border-border-primary dark:border-border-dark text-style flex justify-center items-center gap-2.5"
        :class="{
          'group-hover:visible group-hover:opacity-100': channel?.id !== 'introduction',
          '!hidden': !isEditable,
        }"
      >
        <Icon
          :name="isEditing ? 'bx:check' : 'bx:pencil'"
          size="15"
          @click.prevent.stop="handleToggle"
        />
        <Icon
          name="bx:trash"
          size="15"
          @click.prevent.stop="handleChannelDelete"
          v-if="!isLoading"
        />
        <Icon name="bx:loader" class="animate-spin" size="16" v-else />
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped>
.sidebar-item {
  @apply capitalize p-2 transition-all ease-in-out duration-300 text-style hover:rounded-md cursor-pointer flex items-center gap-2 hover:bg-bg-sidebarLink dark:hover:bg-bg-darkSidebarLink;
}
.sidebar-active-link {
  @apply bg-bg-sidebarLink dark:bg-bg-darkSidebarLink rounded-md text-style  !important;
}
</style>
