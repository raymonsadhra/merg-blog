// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-5f28e.firebaseapp.com",
  projectId: "mern-blog-5f28e",
  storageBucket: "mern-blog-5f28e.appspot.com",
  messagingSenderId: "606930592390",
  appId: "1:606930592390:web:420658ac7eb09146e3a707"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
