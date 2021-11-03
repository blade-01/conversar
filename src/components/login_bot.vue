<template>
  <div class="login_bot">
    <img src="@/assets/img/bot.svg" alt="chat_bot" />
    <p>
      Hi there! 👋 welcome to conversar, it seems like you've not signed in,
      kindly do so <router-link to="/login">login</router-link>
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/scss/global.scss";
.login_bot {
  display: flex;
  justify-content: start;
  align-items: center;

  img {
    width: 50px;
    margin-right: 1rem;
    animation: shake 1s linear;
  }

  @keyframes shake {
    from {
      transform: rotate(-40deg);
    }
    to {
      transform: roatate(0deg);
    }
  }

  p {
    line-height: 1.5;
  }

  a {
    color: $btn;
    text-decoration: none;
    border-bottom: dashed 1px $btn;
  }
}
</style>
