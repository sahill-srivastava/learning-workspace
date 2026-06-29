// Import the functions you need from the SDKs you need
import {  initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQxoRP8PrUqaBpC5JRpcXi_X1H9s_bHb8",
  authDomain: "netflixgpt-1288d.firebaseapp.com",
  projectId: "netflixgpt-1288d",
  storageBucket: "netflixgpt-1288d.firebasestorage.app",
  messagingSenderId: "885520330128",
  appId: "1:885520330128:web:342e6588a8fa4094ba5715"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth
export const auth = getAuth();