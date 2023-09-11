import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBkjPf_-Syv-pUqN9goR0jSk7s-Guzd59E",
  authDomain: "driverclockin.firebaseapp.com",
  databaseURL: "https://driverclockin-default-rtdb.firebaseio.com",
  projectId: "driverclockin",
  storageBucket: "driverclockin.appspot.com",
  messagingSenderId: "475741513584",
  appId: "1:475741513584:web:56db001f0b168a274551b5",
  measurementId: "G-VSHZQ0EFQD",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
