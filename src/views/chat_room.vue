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
import sidebar from "@/components/sidebar.vue";
import Mainbar from "@/components/mainbar.vue";
import { mapActions } from "vuex";
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
    ...mapActions(["getCurrentUser", "getAllUsers"]),
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
  mounted() {
    this.getCurrentUser();
    this.getAllUsers();
  },
};
</script>
<style lang="scss"></style>
