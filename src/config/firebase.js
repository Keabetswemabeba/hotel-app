// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBy0tRP-zu_qkpQU7rYwYsty5aP9joqs58",
  authDomain: "hotel-app-faf2f.firebaseapp.com",
  projectId: "hotel-app-faf2f",
  storageBucket: "hotel-app-faf2f.appspot.com",
  messagingSenderId: "708070346821",
  appId: "1:708070346821:web:402230603001ce4ea6132c",
  measurementId: "G-WHSTVM90ME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app)
export {auth ,db};
