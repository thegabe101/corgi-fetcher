// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0XlQfMhJzxfMmWVYm0qQqB6Jw_xJ-3uY",
  authDomain: "corgi-fetcher.firebaseapp.com",
  projectId: "corgi-fetcher",
  storageBucket: "corgi-fetcher.appspot.com",
  messagingSenderId: "887587695905",
  appId: "1:887587695905:web:bfa739236acf39901e6260",
  measurementId: "G-8JGFD3YYRK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);