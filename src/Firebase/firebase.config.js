// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcB0sIRjkjPZK0pdGIo3DCAVegSkaXB3k",
  authDomain: "user-email-password-auth-c4c29.firebaseapp.com",
  projectId: "user-email-password-auth-c4c29",
  storageBucket: "user-email-password-auth-c4c29.appspot.com",
  messagingSenderId: "679121168478",
  appId: "1:679121168478:web:26d5878733f77b6fb46ccf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default (auth)