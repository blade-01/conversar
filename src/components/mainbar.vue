<template>
  <div class="mainbar">
    <div class="title-tag">
      <p>
        <span @click="openSidebar" class="hide-on-lg close">
          <svg
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
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </span>
        front-end developers
      </p>
    </div>
    <div class="mainbar-content">
      <div class="messages" v-for="message in messages" :key="message.src">
        <img src="../assets/img/avatar-01.jpg" alt="avatar" />
        <div class="message">
          <div class="dets">
            <p>{{ message.username }}</p>
            <p>{{ message.createdAt }}</p>
          </div>
          <p>{{ message.message }}</p>
        </div>
      </div>
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
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      messages: [
        {
          src: "1",
          username: "Denzel Barrett",
          message:
            "Hi there! 👋, welcome to the Front-end developers group, we share news about front-end tools, jobs and youtube content that aid you in becoming a better developer, I welcome y'all once again.",
          createdAt: "yesterday at 1:29 PM",
        },
        {
          src: "2",
          username: "Zack Niche",
          message:
            "Hi there! 👋, welcome to the Front-end developers group, we share news about front-end tools, jobs and youtube content that aid you in becoming a better developer, I welcome y'all once again.",
          createdAt: "yesterday at 1:50 PM",
        },
        {
          src: "3",
          username: "Annaliese Huynh",
          message:
            "Hi there! 👋, welcome to the Front-end developers group, we share news about front-end tools, jobs and youtube content that aid you in becoming a better developer, I welcome y'all once again.",
          createdAt: "yesterday at 2:20 PM",
        },
        {
          src: "4",
          username: "Xanche Neal",
          message:
            "Hi there! 👋, welcome to the Front-end developers group, we share news about front-end tools, jobs and youtube content that aid you in becoming a better developer, I welcome y'all once again.",
          createdAt: "yesterdat at 3:00 PM",
        },
        {
          src: "5",
          username: "Annaliese Huynh",
          message:
            "Hi there! 👋, welcome to the Front-end developers group, we share news about front-end tools, jobs and youtube content that aid you in becoming a better developer, I welcome y'all once again.",
          createdAt: "today at 10:40 AM",
        },
        {
          src: "6",
          username: "Zack Niche",
          message:
            "Hi there! 👋, welcome to the Front-end developers group, we share news about front-end tools, jobs and youtube content that aid you in becoming a better developer, I welcome y'all once again.",
          createdAt: "today at 11:00 AM",
        },
      ],
      message: "",
    };
  },
  emits: ["openBar"],
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
.title-tag {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  padding: 1rem 2rem;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: $main-bg;
  z-index: 1;

  & p {
    display: flex;
    justify-content: start;
    align-items: center;
    font-weight: bold;
    text-transform: uppercase;
  }

  & span {
    margin-right: 0.5rem;
  }
}

.mainbar-content {
  margin: 5rem auto 2rem;
  padding: 1rem 2rem;
  position: relative;

  .messages {
    display: flex;
    justify-content: start;
    align-items: start;

    .message {
      margin: 0 0 2rem;
      line-height: 1.5;
    }

    & img {
      width: 30px;
      border-radius: 5px;
      margin-right: 2rem;
    }

    .dets {
      display: flex;
      justify-content: start;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 1rem;
      color: $sec-color;

      & p:first-child {
        margin-right: 1rem;
        font-weight: bold;
        font-size: 14px;
      }
    }
  }
}

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
  .mainbar {
    margin-left: 30%;
  }
  .title-tag {
    left: 30%;
    padding: 1.2rem 3rem;
    & span {
      visibility: hidden;
    }
  }
  .mainbar-content {
    padding: 1.2rem 3rem 1.2rem 3rem;
  }
  .message-bar {
    left: 30%;
    width: calc(100% - 30%);

    & form {
      margin: 0 3rem;
    }
  }
}

@media screen and (min-width: 1100px) {
  .mainbar {
    margin-left: 20%;
  }
  .title-tag {
    left: 20%;
  }
  .message-bar {
    left: 20%;
    width: calc(100% - 20%);
  }
}
</style>
