import { createRouter, createWebHistory } from "vue-router";
import chatRoom from "../views/chat_room.vue";
import login from "../views/login.vue";
import channel from "../views/channel.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: chatRoom,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/channel/:id",
    name: "channel",
    component: channel,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
