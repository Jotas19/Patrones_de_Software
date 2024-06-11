// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUOXjRZhHxqXUhBDHXr9HsHCeuszfKpyM",
  authDomain: "patrones-95d74.firebaseapp.com",
  databaseURL: "https://patrones-95d74-default-rtdb.firebaseio.com",
  projectId: "patrones-95d74",
  storageBucket: "patrones-95d74.appspot.com",
  messagingSenderId: "699099451650",
  appId: "1:699099451650:web:d25df3ccfebf739176721b",
  measurementId: "G-ECM8GGDYLX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);