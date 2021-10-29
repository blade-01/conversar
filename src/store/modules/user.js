import firebaseApp from "@/fb/fb";
import router from "@/router";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut, getRedirectResult, signInWithRedirect
} from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

const state = {
  user: "",
};

const getters = {};

const actions = {
  signIn({ commit }) {
    signInWithPopup(auth, provider)
      .then((result) => {
        return setDoc(doc(db, "users", result.user.uid), {
          email: result.user.email,
          name: result.user.displayName,
          url: result.user.photoURL,
        });
      })
      .then(() => {
        router.push("/");
        commit("signIn");
      })
      .catch((error) => {
        console.log(error.message);
      });
  },
  redirectIn({commit}) {
    signInWithRedirect(auth, provider);
    getRedirectResult(auth)
    .then((result) => {
      console.log(result.user.displayName);
      return setDoc(doc(db, "users", result.user.uid), {
        email: result.user.email,
        name: result.user.displayName,
        url: result.user.photoURL,
      });
    })
    .then(() => {
      router.push("/");
      commit("signIn");
    })
    .catch((error) => {
      console.log(error.message);
    });
  },
  signOut({ commit }) {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        router.push("/");
        commit("signOut");
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

const mutations = {
  signIn(state) {
    state.user;
  },
  signOut(state) {
    state.user;
  },
};

export default {
  getters,
  mutations,
  actions,
  state,
};
