/*
 *      Author          -   Ashen Senevirathne
 *      IT Number       -   IT18178678
 *
 */
import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";


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

//New Singleton Instance
let singletonInstance = null;

class Singleton {
    constructor() {
        if (!singletonInstance) {
            singletonInstance = this;

            firebase.initializeApp(firebaseConfig);
            singletonInstance = firebase;

            //alert("New Instance created");
        }

        //alert("Instance Get From Created Instance");
        return singletonInstance;
    }
}

//Create singletonObject
const singletonObject = new Singleton();

//Export
export default singletonObject;