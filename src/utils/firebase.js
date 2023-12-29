// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "finprez-61922.firebaseapp.com",
  projectId: "finprez-61922",
  storageBucket: "finprez-61922.appspot.com",
  messagingSenderId: "444816059014",
  appId: "1:444816059014:web:e7515e3f72355e3b11ff07",
  measurementId: "G-6Q5508SZQ3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);