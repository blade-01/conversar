import firebaseApp from "@/fb/fb";
import {
  collection,
  onSnapshot,
  query,
  where,
  getFirestore,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const state = {
  channels: [],
};

const getters = {
  channels: (state) => state.channels,
};

const actions = {
  getChannels({ commit, state }) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(
          query(
            collection(db, "channels"),
            where("channelId", "==", auth.currentUser.uid)
          ),
          (querySnapshot) => {
            querySnapshot.docChanges().forEach((change) => {
              if (
                change.type === "added" &&
                !state.channels.some(
                  (channel) => channel.docId === change.doc.id
                )
              ) {
                const data = {
                  channelId: auth.currentUser.uid,
                  id: change.doc.data().id,
                  name: change.doc.data().name,
                  desc: change.doc.data().desc,
                  docId: change.doc.id,
                };
                commit("getChannels", data);
              }
            });
          }
        );
      }
    });
  },
  getAllDetails({ commit }) {
    commit("getAllDetails");
  },
};

const mutations = {
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
