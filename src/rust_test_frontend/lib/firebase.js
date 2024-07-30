import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCpFCJ7Tq9pV2bWQXQJM5VuRQv8Dgcqipk",
  authDomain: "healersmain.firebaseapp.com",
  databaseURL:
    "https://healersmain-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "healersmain",
  storageBucket: "healersmain.appspot.com",
  messagingSenderId: "279549053219",
  appId: "1:279549053219:web:4876fc6f1dca25e6922496",
  measurementId: "G-B5BQ1L2JFP",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };