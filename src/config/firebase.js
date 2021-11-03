import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyBoUIDh4xPusG2f-2guFt1TIbEDvIaNWro",
    authDomain: "jumandi-gas.firebaseapp.com",
    projectId: "jumandi-gas",
    storageBucket: "jumandi-gas.appspot.com",
    messagingSenderId: "166811866376",
    appId: "1:166811866376:web:eace23cc8d653a494ec8bd",
    measurementId: "G-567BXVHP9K"
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore();

export {
    firebaseApp,
    firestore
}