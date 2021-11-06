<template>
  <div class="sidebar" :class="{ showSidebar: open }">
    <div class="title-tag" :class="{ showSidebar: open }">
      <p @click="showChannels">
        <span
          ><svg
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
              d="M15 19l-7-7 7-7"
            ></path></svg
        ></span>
        All channels
      </p>
    </div>
    <div class="group-info" v-if="!authState">
      <p class="group-title">front-end developers</p>
      <p class="group-desc">
        Hi there! 👋, welcome to the Front-end developers group, we share news
        about front-end tools, jobs and youtube content that aid you in becoming
        a better developer, I welcome y'all once again.
      </p>
      <div class="group-members">
        <p class="group-title">members</p>
        <ul class="members">
          <li v-for="user in users" :key="user.email">
            <img :src="user.url" :alt="user.name" />
            <p>{{ user.name }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="group-info">
      <loginBot />
    </div>
    <user />
    <svg
      @click="closeSidebar"
      class="w-6 h-6 close-icon hide-on-lg"
      :class="{ removeIcon: !open }"
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
  </div>
  <all-channels :slide="slide" @close-allchannel="closeChannels" />
</template>
<script>
import allChannels from "@/components/all_channels.vue";
import loginBot from "@/components/login_bot.vue";
import user from "@/components/user.vue";
import { mapGetters } from "vuex";
import firebaseApp from "@/fb/fb";
import {
  collection,
  onSnapshot,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
const db = getFirestore(firebaseApp);
export default {
  props: ["open"],
  components: {
    allChannels,
    user,
    loginBot,
  },
  data() {
    return {
      slide: false,
      users: [],
    };
  },
  emits: ["close-sidebar", "show-channels"],
  methods: {
    closeSidebar() {
      this.$emit("close-sidebar");
    },
    showChannels() {
      this.$emit("show-channels");
      this.slide = !this.slide;
    },
    closeChannels() {
      this.slide = !this.slide;
    },
    getAllUsers() {
      onSnapshot(
        query(collection(db, "users"), orderBy("name")),
        (querySnapshot) => {
          querySnapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              this.users.push(change.doc.data());
            }
          });
        }
      );
    },
  },
  computed: {
    ...mapGetters(["authState"]),
  },
  created() {
    this.getAllUsers();
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
  padding: 1rem 0;
  position: fixed;
  top: 0;
  left: inherit;
  width: inherit;
  z-index: 1;
  background: inherit;

  & p {
    display: flex;
    justify-content: start;
    align-items: center;
    font-weight: bold;
    padding-left: 2rem;
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

  & .group-desc {
    padding: 0.5rem 0;
    line-height: 1.5;
  }

  & .group-members {
    margin: 1.5rem 0 3rem;
  }
}

.members {
  margin-top: 1rem;

  & li {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 0.7rem 0;
    color: $sec-color;
  }

  & img {
    width: 30px;
    margin-right: 2rem;
    border-radius: 5px;
  }
}

@media screen and (min-width: 700px) {
  .sidebar {
    left: 0;
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
