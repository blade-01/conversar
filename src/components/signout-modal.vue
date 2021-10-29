<template>
  <div class="modal" v-show="signout" id="modal" @click="closeModal">
    <div class="modal-content">
      <img src="@/assets/img/logo.png" alt="logo" />
      <h2>Byee 👋</h2>
      <p>You're about to sign out fam, wanna proceed?</p>
      <button class="btn" @click="signOut">Proceed</button>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: ["signout"],
  emits: ["close-modal"],
  methods: {
    ...mapActions(["signOut"]),
    closeModal() {
      window.addEventListener("click", (e) => {
        if (e.target.id == "modal") {
          this.$emit("close-modal");
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/scss/global.scss";
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $modal-backdrop;
  z-index: 100;
  overflow: hidden;

  &-content {
    background: $accmod-bg;
    padding: 1.5rem;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    transform: translate(-50%, -50%) scale(0);
    animation: scaleIn 0.4s forwards;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    margin: 0.1rem;

    & img {
      width: 100px;
    }

    h2 {
      margin: 2rem 0 0.5rem;
    }

    p {
      padding: 0.2rem 0;
    }

    .btn {
      border: none;
      outline: none;
      border-radius: 50px;
      background: $btn;
      padding: 0.8rem 3rem;
      margin: 1rem 0 0.5rem;
      color: $pri-color;
      background: linear-gradient(to top left, #2fd7ed, #2f80ed);
      font-weight: bold;
      box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14),
        0 1px 7px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -1px rgba(0, 0, 0, 0.2);
    }
  }
}

@keyframes scaleIn {
  to {
    transform: translate(-50%, -50%) scale(1);
  }
}

@media screen and (min-width: 700px) {
  .modal-content {
    width: 300px;
  }
}
</style>
