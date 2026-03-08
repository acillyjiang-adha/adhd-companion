// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcWZVUgSw0BJBxCWU0XOA_5HZAW1dzX6I",
  authDomain: "adha-b3b4d.firebaseapp.com",
  projectId: "adha-b3b4d",
  storageBucket: "adha-b3b4d.appspot.com",
  messagingSenderId: "120170656643",
  appId: "1:120170656643:web:195e4bf6b8a7eac502bcb6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the necessary services
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
