// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqYEGVEV4u8hrngdpQLsVDmJlGKxzi7Cs", // Tu API key actual
  authDomain: "sistema-de-agendamiento-8986f.firebaseapp.com",
  projectId: "sistema-de-agendamiento-8986f",
  storageBucket: "sistema-de-agendamiento-8986f.appspot.com",
  messagingSenderId: "259953799774",
  appId: "1:259953799774:web:2f89d234c345e19829f478"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };