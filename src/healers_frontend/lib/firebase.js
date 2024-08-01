import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBhX9_2plVPjy7f5zT2jiRnnb0HPdNOJnA",
  authDomain: "healershealthcare-2fd8e.firebaseapp.com",
  projectId: "healershealthcare-2fd8e",
  storageBucket: "healershealthcare-2fd8e.appspot.com",
  messagingSenderId: "793282100486",
  appId: "1:793282100486:web:3bf20bdc27643142a4b287"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };