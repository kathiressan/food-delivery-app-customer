import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyAwiLVnhNWbAbl8UWNUlatpyB5gABkxxNA",
  authDomain: "food-delivery-app-d74ec.firebaseapp.com",
  projectId: "food-delivery-app-d74ec",
  storageBucket: "food-delivery-app-d74ec.appspot.com",
  messagingSenderId: "557519451522",
  appId: "1:557519451522:web:aa9b700eea7c1d0e7b4b9b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
