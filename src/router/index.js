import { createRouter, createWebHistory } from "vue-router";
import chatRoom from "../views/chat_room.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: chatRoom,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
