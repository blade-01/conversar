import firebaseApp from "@/fb/fb";
// import router from "@/router";
// import {
//   getAuth,
//   signInWithPopup,
//   GoogleAuthProvider,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";
import {
  // doc,
  addDoc,
  collection,
  getDocs,
  // where,
  // query,
  // onSnapshot,
  getFirestore,
} from "firebase/firestore";
const db = getFirestore(firebaseApp);
// const auth = getAuth(firebaseApp);

const state = {
  channels: [],
};

const getters = {
  allChannels: (state) => state.channels,
};

const actions = {
  addChannel({ commit }, data) {
    addDoc(collection(db, "channels"), data);
    commit("addChannel", data);
  },
  getChannels({ commit }) {
    getDocs(collection(db, "channels")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        commit("getChannels", doc.data());
      });
    });
  },
};

const mutations = {
  addChannel(state, data) {
    state.channels.push(data);
  },
  getChannels(state, channel) {
    state.channels.push(channel);
  },
};

export default {
  getters,
  mutations,
  actions,
  state,
};
