import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import { useFirebaseAuth, useCurrentUser } from "vuefire";
export default () => {
  const provider = new GoogleAuthProvider();
  const isSigningIn = ref(false);
  const auth: any = useFirebaseAuth();
  const user: any = useCurrentUser(auth);
  async function signInWithGoogle() {
    isSigningIn.value = true;
    try {
      await signInWithPopup(auth!, provider);
      useRouter().push("/");
    } catch (error: any) {
      return Promise.reject(error);
    } finally {
      isSigningIn.value = false;
    }
  }

  return { signInWithGoogle, isSigningIn, user, auth };
};
