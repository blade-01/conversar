<template>
  <div class="sidebar" :class="{ showSidebar: slide }">
    <div class="title-tag" :class="{ showSidebar: slide }">
      <div class="flex-title">
        <p>Channels</p>
        <svg
          v-if="!authState"
          @click="createChannel"
          class="w-6 h-6 add-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        <svg
          v-else
          class="w-6 h-6 add-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
    </div>
    <div class="group-info">
      <div class="group-channels" v-if="!authState">
        <form @keyup="searchChannel" class="searchbar">
          <input type="search" id="search" placeholder="Search" />
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </form>
        <ul class="channels">
          <li
            v-for="channel in channels"
            :key="channel.id"
            @click="enterChannel(channel.id)"
          >
            <span class="initials">{{ makeInit(channel.name) }}</span>
            <p>{{ channel.name }}</p>
          </li>
        </ul>
      </div>
      <loginBot v-else />
    </div>
    <user />
  </div>
  <addChannel
    :scale="scale"
    @close-modal="closeModal"
    @add-channel="addChannel"
  />
  <svg
    @click="closeSidebar"
    class="w-6 h-6 close-icon hide-on-lg"
    :class="{ removeIcon: !slide }"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M6 18L18 6M6 6l12 12"
    ></path>
  </svg>
</template>
<script>
import user from "@/components/user.vue";
import addChannel from "@/components/add_channel.vue";
import loginBot from "@/components/login_bot.vue";
import { mapGetters } from "vuex";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  getFirestore,
} from "firebase/firestore";
import firebaseApp from "@/fb/fb";
const db = getFirestore(firebaseApp);
export default {
  props: ["slide"],
  components: {
    user,
    addChannel,
    loginBot,
  },
  data() {
    return {
      scale: false,
      channels: [],
    };
  },
  computed: {
    ...mapGetters(["authState"]),
  },
  emits: ["close-allchannel"],
  methods: {
    closeSidebar() {
      this.$emit("close-allchannel");
    },
    makeInit(value) {
      return value.substring(0, 2);
    },
    createChannel() {
      this.scale = true;
    },
    closeModal() {
      this.scale = false;
    },
    enterChannel(channel) {
      this.$router.push({ name: "channel", params: { id: channel } });
      this.$emit("close-allchannel");
    },
    getChannels() {
      onSnapshot(
        query(collection(db, "channels"), orderBy("name", "asc")),
        (querySnapshot) => {
          querySnapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              this.channels.push(change.doc.data());
            }
          });
        }
      );
    },
    addChannel(data) {
      addDoc(collection(db, "channels"), data);
    },
  },
  created() {
    this.getChannels();
  },
};
</script>
<style lang="scss" scoped>
@import "@/scss/global.scss";
.sidebar {
  position: fixed;
  left: -100%;
  top: 0;
  height: 100vh;
  width: 88%;
  background: $side-bg;
  transition: left 0.5s ease;
  overflow: scroll;
  z-index: 10;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}

.showSidebar {
  left: 0%;
}

.add-icon {
  background: $main-bg;
  padding: 0.5rem;
  border-radius: 10px;
  transition: left 0.5s 0.1s ease;
}

.close-icon {
  position: fixed;
  top: 10px;
  left: 89%;
  background: $side-bg;
  padding: 0.5rem;
  border-radius: 10px;
  transition: left 0.5s 0.1s ease;
  z-index: 10;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 7px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -1px rgba(0, 0, 0, 0.2);
}

.removeIcon {
  left: -100%;
}

.title-tag {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  padding: 0.65rem 0;
  position: fixed;
  top: 0;
  left: inherit;
  width: inherit;
  z-index: 1;
  background: inherit;

  & .flex-title {
    font-weight: bold;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & span {
    margin-right: 0.5rem;
  }
}

.group-info {
  padding: 1rem 2rem;
  margin-top: 4rem;
  font-size: 14px;

  & .group-title {
    text-transform: uppercase;
    font-weight: bold;
    padding: 0 0 0.6rem;
    line-height: 1.5;
  }

  & .group-channels {
    margin: 1rem 0 3rem;
  }

  & .searchbar {
    position: relative;
    width: 100%;
    & input {
      background: $input-bg;
      border-radius: 5px;
      border: none;
      outline: none;
      padding: 1rem 2rem;
      color: $pri-color;
      width: inherit;

      &::placeholder {
        color: $sec-color;
      }
    }

    & svg {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
    }
  }
}

.channels {
  margin-top: 2rem;

  & li {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 0.7rem 0;
    color: $pri-color;
    text-transform: uppercase;
    font-weight: 600;
    cursor: pointer;
  }

  & span {
    margin-right: 1rem;
    border-radius: 5px;
    background: $main-bg;
    padding: 0.5rem;
  }

  & .initials {
    width: 20px;
    text-align: center;
  }
}

@media screen and (min-width: 700px) {
  .sidebar {
    height: 100vh;
    width: 30%;
  }
  .title-tag {
    width: inherit;
  }
}

@media screen and (min-width: 1100px) {
  .sidebar {
    width: 20%;
  }
}
</style>
