import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCYIJeVRexnfuG8852GGdQEWcFU3Xe-WP0",
    authDomain: "fanapp-android.firebaseapp.com",
    projectId: "fanapp-android",
    storageBucket: "fanapp-android.appspot.com",
    messagingSenderId: "455112949225",
    appId: "1:455112949225:web:14a933181e637fb6d79f78",
    measurementId: "G-5591TKPZ10"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
export const auth = firebase.auth;
const db = firebase.firestore();

export { db };