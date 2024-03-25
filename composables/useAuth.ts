import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
export default () => {
  const provider = new GoogleAuthProvider();
  const isSigningIn = ref(false);
  const auth: any = useFirebaseAuth();
  const user: any = useCurrentUser(auth);
  async function signInWithGoogle() {
    isSigningIn.value = true;
    try {
      await signInWithPopup(auth!, provider);
      if (user) {
        await updateUserList(user.value);
      }
      useRouter().push("/");
    } catch (error: any) {
      return Promise.reject(error);
    } finally {
      isSigningIn.value = false;
    }
  }

  async function updateUserList(user: any) {
    const db = useFirestore();
    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
          uid: user.uid
        },
        { merge: true }
      );
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  async function logout() {
    await signOut(auth);
    useRouter().push("/auth");
  }

  return { signInWithGoogle, isSigningIn, user, auth, logout };
};
