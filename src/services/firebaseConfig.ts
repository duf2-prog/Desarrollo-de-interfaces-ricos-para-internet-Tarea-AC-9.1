// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCk7FlqXQQqO6UXAbpPuFZP6LQ6U3lcP6g",
  authDomain: "tarea-ac-6-2.firebaseapp.com",
  databaseURL: "https://tarea-ac-6-2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tarea-ac-6-2",
  storageBucket: "tarea-ac-6-2.firebasestorage.app",
  messagingSenderId: "115235870061",
  appId: "1:115235870061:web:512d0942d2dcd4018cf664"
};

// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getDatabase(app);