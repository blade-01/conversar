<template>
  <div class="message-bar">
    <form @submit.prevent="sendMessage">
      <input
        type="text"
        id="message"
        placeholder="Type a message here"
        v-model="message"
      />
      <button type="submit">
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="#ffffff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.75778 6.14799C6.84443 5.77187 6.0833 5.45843 5.49196 5.30702C4.91915 5.16036 4.18085 5.07761 3.63766 5.62862C3.09447 6.17962 3.18776 6.91666 3.34259 7.48732C3.50242 8.07644 3.8267 8.83302 4.21583 9.7409L4.86259 11.25H10C10.4142 11.25 10.75 11.5858 10.75 12C10.75 12.4142 10.4142 12.75 10 12.75H4.8626L4.21583 14.2591C3.8267 15.167 3.50242 15.9236 3.34259 16.5127C3.18776 17.0833 3.09447 17.8204 3.63766 18.3714C4.18085 18.9224 4.91915 18.8396 5.49196 18.693C6.0833 18.5416 6.84443 18.2281 7.75777 17.852L19.1997 13.1406C19.4053 13.0561 19.6279 12.9645 19.7941 12.867C19.944 12.779 20.3434 12.5192 20.3434 12C20.3434 11.4808 19.944 11.221 19.7941 11.133C19.6279 11.0355 19.4053 10.9439 19.1997 10.8594L7.75778 6.14799Z"
            fill="#ffffff"
          />
        </svg>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
    };
  },
  methods: {
    openSidebar() {
      this.$emit("openBar");
    },
    sendMessage() {
      if (this.message !== "") {
        confirm("Are your sure?");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/global.scss";
.message-bar {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  background: $main-bg;
  z-index: 1;
  padding: 1rem 0;

  & form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $input-bg;
    padding: 0.5rem;
    border-radius: 5px;
    margin: 0 2rem;
  }

  & input {
    background: transparent;
    border: none;
    outline: none;
    padding: 0.5rem;
    color: $pri-color;

    &::placeholder {
      color: $sec-color;
    }
  }

  & button {
    outline: none;
    border: none;
    background: none;
    margin: 0;
    padding: 0;
  }

  & svg {
    padding: 0.2rem 0.3rem;
    background: $btn;
    border-radius: 5px;
  }
}

@media screen and (min-width: 700px) {
  .message-bar {
    left: 30%;
    width: calc(100% - 30%);

    & form {
      margin: 0 3rem;
    }
  }
}

@media screen and (min-width: 1100px) {
  .message-bar {
    left: 20%;
    width: calc(100% - 20%);
  }
}
</style>
