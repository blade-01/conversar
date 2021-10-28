<template>
  <div class="login">
    <div class="login-content">
      <h3>Hello 👋</h3>
      <p>Sign In to your conversar account.</p>
      <button class="btn" @click="signIn">Sign In</button>
      <small>powered by <span>Google</span></small>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["signIn"]),
  },
};
</script>
<style lang="scss" scoped>
@import "@/scss/global.scss";
.login {
  position: fixed;
  background: $modal-backdrop;
  z-index: 1000;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  &-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: $accmod-bg;
    border-radius: 10px;
    padding: 1rem;
    height: 200px;
    width: 70%;
  }

  h3,
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
    font-weight: bold;
  }

  small {
    font-size: smaller;

    span {
      font-weight: bold;
    }
  }
}

@media screen and (min-width: 700px) {
  .login-content {
    width: 250px;
    height: 250px;
  }
}
</style>
