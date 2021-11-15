import { createStore } from "vuex";
import user from "./modules/user";
import channels from "./modules/channels";

export default createStore({
  modules: {
    user,
    channels,
  },
});
