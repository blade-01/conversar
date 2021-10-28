import { createRouter, createWebHistory } from "vue-router";
import chatRoom from "../views/chat_room.vue";
import login from "../views/login.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: chatRoom,
    children: [
      {
        path: "login",
        name: "login",
        component: login,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
