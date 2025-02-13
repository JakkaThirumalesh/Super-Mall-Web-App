// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "super-mall-10c99.firebaseapp.com",
  projectId: "super-mall-10c99",
  storageBucket: "super-mall-10c99.firebasestorage.app",
  messagingSenderId: "377752840752",
  appId: "1:377752840752:web:e49b3ed190163297675bf5",
  measurementId: "G-QFBWCVTP9Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
