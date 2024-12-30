import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyACHXZWMC-6y-5zrWPCtQH6sVdeHA-ke8c",
    authDomain: "blogproject-875e2.firebaseapp.com",
    projectId: "blogproject-875e2",
    storageBucket: "blogproject-875e2.firebasestorage.app",
    messagingSenderId: "109809418947",
    appId: "1:109809418947:web:c028bb95e9a6dea0db1876"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();