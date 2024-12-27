import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCV-pUCIvhu0nBV7f5_0LREk8X8nSMnPzc",
  authDomain: "test-project-824d3.firebaseapp.com",
  projectId: "test-project-824d3",
  storageBucket: "test-project-824d3.firebasestorage.app",
  messagingSenderId: "65981083306",
  appId: "1:65981083306:web:0dbc782419e443d074ead3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// auth
export const auth = getAuth();
// db
export const db = getFirestore();
