import firebaseApp from "@/fb/fb";
import router from "@/router";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  where,
  query,
  getFirestore,
} from "firebase/firestore";
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

const state = {
  users: [],
  user: "",
  userState: false,
};

const getters = {
  user: (state) => state.user,
  users: (state) => state.users,
  authState: (state) => state.userState,
};

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
  signOut({ commit }) {
    signOut(auth)
      .then(() => {
        router.push("/login");
        commit("signOut");
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getCurrentUser({ commit, state }) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userMail = auth.currentUser.email;
        getDocs(
          query(collection(db, "users"), where("email", "==", userMail))
        ).then((docs) => {
          docs.forEach((doc) => {
            commit("getCurrentUser", doc.data());
          });
        });
        state.userState = false;
      } else {
        state.userState = true;
      }
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
  getCurrentUser: (state, user) => (state.user = user),
};

export default {
  getters,
  mutations,
  actions,
  state,
};
