import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default () => {
  const { $auth } = useNuxtApp();
  const provider = new GoogleAuthProvider();
  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup($auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential!.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      console.log(user, token, credential);
    } catch (error: any) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.error(errorCode, errorMessage, email, credential);
    }
  }

  return { signInWithGoogle };
};
