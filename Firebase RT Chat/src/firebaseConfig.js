// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB6zGSrIE72Vg2Yxwc2uLuYWjpgXA65obA",
  authDomain: "battle-of-ruby-vally.firebaseapp.com",
  projectId: "battle-of-ruby-vally",
  storageBucket: "battle-of-ruby-vally.appspot.com",
  messagingSenderId: "50370949755",
  appId: "1:50370949755:web:910d824ccd35ac168568de",
  measurementId: "G-QB6KBYZTT6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, GoogleAuthProvider, signInWithPopup, signOut, collection, addDoc, query, orderBy, limit, serverTimestamp };

