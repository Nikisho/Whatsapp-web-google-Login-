import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyCcPpNrSQscjP5CwZO7RRe2W0iW6zh8S8w",
    authDomain: "project5-chatapp.firebaseapp.com",
    projectId: "project5-chatapp",
    storageBucket: "project5-chatapp.appspot.com",
    messagingSenderId: "1050448674498",
    appId: "1:1050448674498:web:3cc1ba505a7ed5cc0a055b"
});

const auth = firebase.auth();
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider, db };