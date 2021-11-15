import firebaseApp from "@/fb/fb";
import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import moment from "moment";
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const state = {
  channels: [],
  channel: "",
  messages: [],
};

const getters = {
  channels: (state) => state.channels,
  channel: (state) => state.channel,
  messages: (state) => state.messages,
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
    getDocs(
      query(collection(db, "channels"), where("channelId", "==", "all"))
    ).then((docs) => {
      docs.forEach((doc) => {
        commit("getAllDetails", doc.data());
      });
    });
  },
  getMessages({ commit, state }) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(
          query(
            collection(db, "channels/Y4uVaYQNron4YrhkjBsU/messages")
          ),
          (querySnapshot) => {
            querySnapshot.docChanges().forEach((change) => {
              if (
                change.type === "added" &&
                !state.messages.some(
                  (message) => message.docId === change.doc.id
                )
              ) {
                const data = {
                  createdAt: moment(change.doc.data().createdAt).format("h:mm A"),
                  name: change.doc.data().name,
                  url: change.doc.data().url,
                  message: change.doc.data().message,
                  docId: change.doc.id,
                };
                commit("getMessages", data);
              }
            });
          }
        );
      }
    });
  }
};

const mutations = {
  getChannels(state, channel) {
    state.channels.push(channel);
  },
  getAllDetails(state, channel) {
    state.channel = channel;
  },
  getMessages(state, message) {
    state.messages.push(message);
  }
};

export default {
  getters,
  mutations,
  actions,
  state,
};
