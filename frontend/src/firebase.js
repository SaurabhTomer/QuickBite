// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUZP3FB2nvDJs_DZBrF9eWqOZ5Olgk3pc",
  authDomain: "quickbite-f1843.firebaseapp.com",
  projectId: "quickbite-f1843",
  storageBucket: "quickbite-f1843.firebasestorage.app",
  messagingSenderId: "672226247677",
  appId: "1:672226247677:web:5831679d1d4997dff14f94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export{app,auth};