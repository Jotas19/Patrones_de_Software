import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAOkVuBT8sfvSuJarFLEqPtukZfJdkkEVg",
  authDomain: "patrones-6d287.firebaseapp.com",
  projectId: "patrones-6d287",
  storageBucket: "patrones-6d287.appspot.com",
  messagingSenderId: "613813973576",
  appId: "1:613813973576:web:d0a6d42956fb2c8afcde7d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app)