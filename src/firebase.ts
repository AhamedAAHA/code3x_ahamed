// firebase setup, created project in firebase console
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// my web app config from firebase
const firebaseConfig = {
  apiKey: "AIzaSyDWSxPDx7KZt6cp_UkSUVPrxzjlNqHBWuk",
  authDomain: "codex-ahamed.firebaseapp.com",
  projectId: "codex-ahamed",
  storageBucket: "codex-ahamed.firebasestorage.app",
  messagingSenderId: "144478254835",
  appId: "1:144478254835:web:7c070905a47a5de8d6a986",
};

const app = initializeApp(firebaseConfig);

// auth for google login
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
