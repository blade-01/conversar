<template>
  <div class="login">
    <div class="login-content">
      <img src="@/assets/img/logo.png" alt="logo" />
      <h2>Hello there 👋</h2>
      <p>Sign in to your conversar account.</p>
      <button class="btn" @click="signIn">Sign In</button>
      <small>powered by <span>Google</span></small>
    </div>
    <div class="aside hide-on-sm">
      <img src="@/assets/img/conversar.png" alt="logo" />
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["signIn"]),
  },
};
</script>
<style lang="scss" scoped>
@import "@/scss/global.scss";
.login {
  background: $side-bg;
  width: 100%;
  height: 100vh;

  &-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
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
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 7px 0 rgba(0, 0, 0, 0.12),
      0 3px 1px -1px rgba(0, 0, 0, 0.2);
  }

  small {
    font-size: smaller;

    span {
      font-weight: bold;
    }
  }
}

img {
  width: 100px;
}

@media screen and (min-width: 700px) {
  .login {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-content {
      flex: 0 1 40vw;
    }

    & .aside {
      flex: 0 1 60vw;
      display: flex;
      justify-content: center;
      align-items: center;
      background: $main-bg;
      height: 100vh;

      & img {
        width: 130px;
        animation: grow 2s linear forwards;
      }

      @keyframes grow {
        from {
          transform: scale(0.8);
        }
        to {
          transform: scale(1);
        }
      }
    }
  }
}
</style>
