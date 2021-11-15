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
        {{ channel.name }}
      </p>
    </div>
    <div class="mainbar-content">
      <loginBot v-if="authState" />
      <div
        class="messages"
        v-for="message in messages"
        :key="message.src"
        v-else
      >
        <img :src="message.url" :alt="message.name" />
        <div class="message">
          <div class="dets">
            <p>{{ message.name }}</p>
            <p>{{ message.createdAt }}</p>
          </div>
          <p>{{ message.message }}</p>
        </div>
      </div>

      <messageBar />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import messageBar from "@/components/chat/message_bar.vue";
import loginBot from "@/components/auth/login_bot.vue";
export default {
  components: {
    messageBar,
    loginBot,
  },
  data() {
    return {};
  },
  emits: ["openBar"],
  computed: {
    ...mapGetters(["authState", "channel", "messages"]),
  },
  methods: {
    ...mapActions(["getMessages"]),
    openSidebar() {
      this.$emit("openBar");
    }
  },
  mounted() {
    this.getMessages()
  }
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

.chatbot {
  display: flex;
  justify-content: start;
  align-items: center;
  img {
    width: 50px;
    margin-right: 1rem;
  }
  a {
    color: $btn;
    text-decoration: none;
    border-bottom: dashed 1px $btn;
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
}

@media screen and (min-width: 1100px) {
  .mainbar {
    margin-left: 20%;
  }
  .title-tag {
    left: 20%;
  }
}
</style>
