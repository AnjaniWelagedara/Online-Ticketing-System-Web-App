import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Firebase Configurations
const firebaseConfig = {
    apiKey: "AIzaSyCMgrs0k4HlX5jnhCFEQba814lQX6av-3I",
    authDomain: "online-ticketing-system-220ab.firebaseapp.com",
    databaseURL: "https://online-ticketing-system-220ab.firebaseio.com",
    projectId: "online-ticketing-system-220ab",
    storageBucket: "online-ticketing-system-220ab.appspot.com",
    messagingSenderId: "448243941382",
    appId: "1:448243941382:web:608a55fd7fa7887f6c8387"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;