<template>
  <div class="profile">
    <div class="profile-dets" v-if="!authState">
      <div class="user">
        <img :src="user.url" alt="user" />
        <p>{{ user.name }}</p>
      </div>
      <svg
        @click="confirmSignout"
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        ></path>
      </svg>
    </div>
    <div v-else class="profile-dets">
      <p>Let's login shall we? 👉</p>
      <svg
        @click="login"
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
        ></path>
      </svg>
    </div>
  </div>
  <signoutModal :signout="signout" @close-signout="closeModal" />
</template>

<script>
import signoutModal from "@/components/modals/signout-modal.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      signout: false,
    };
  },
  components: {
    signoutModal,
  },
  methods: {
    confirmSignout() {
      this.signout = true;
    },
    closeModal() {
      this.signout = false;
    },
    login() {
      this.$router.push({ name: "login" });
    },
  },
  computed: {
    ...mapGetters(["user", "authState"]),
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/global.scss";
.profile {
  position: fixed;
  bottom: 0;
  left: inherit;
  width: inherit;
  z-index: 1;
  background: $accmod-bg;
  padding: 1rem 0;

  &-dets {
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;
    align-items: center;
  }

  .user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & img {
      width: 30px;
      margin-right: 2rem;
      border-radius: 5px;
    }
  }
}
</style>
