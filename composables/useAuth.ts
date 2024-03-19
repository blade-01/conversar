import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
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
          avatar: user.photoURL
        },
        { merge: true }
      );
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  return { signInWithGoogle, isSigningIn, user, auth };
};
