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
  onSnapshot,
  orderBy,
  query,
  Timestamp,
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
  getAllUsers({ commit, state }) {
    onSnapshot(
      query(collection(db, "users"), orderBy("createdAt")),
      (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (
            change.type === "added" &&
            !state.users.some((user) => user.id === change.doc.id)
          ) {
            const data = {
              id: change.doc.id,
              name: change.doc.data().name,
              url: change.doc.data().url,
              createdAt: change.doc.data().createdAt,
            };
            commit("getAllUsers", data);
          }
        });
      }
    );
  },
};

const mutations = {
  signIn() {
    signInWithPopup(auth, provider)
      .then((result) => {
        return setDoc(doc(db, "users", result.user.uid), {
          email: result.user.email,
          name: result.user.displayName,
          url: result.user.photoURL,
          id: result.user.uid,
          createdAt: Timestamp.now().seconds,
        });
      })
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  },
  signOut() {
    signOut(auth)
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getAllUsers: (state, users) => state.users.push(users),
  getCurrentUser: (state, user) => (state.user = user),
};

export default {
  getters,
  mutations,
  actions,
  state,
};
