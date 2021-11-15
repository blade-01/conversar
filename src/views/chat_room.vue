<template>
  <div class="wrapper">
    <sidebar
      :open="open"
      @close-sidebar="closeSidebar"
      @show-channels="openChannels"
    />
    <mainbar @openBar="openSidebar" />
  </div>
</template>
<script>
import sidebar from "@/components/navbars/sidebar.vue";
import Mainbar from "@/components/navbars/mainbar.vue";
export default {
  data() {
    return {
      open: false,
    };
  },
  components: {
    sidebar,
    Mainbar,
  },
  methods: {
    openSidebar() {
      this.open = !this.open;
    },
    openChannels() {
      this.open = !this.open;
    },
    closeSidebar() {
      this.open = !this.open;
    },
  },
};
</script>
<style lang="scss"></style>
