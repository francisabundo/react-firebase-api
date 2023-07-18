import {getFirestore} from '@firebase/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_CONFIG,
    authDomain: "fir-api-21c9f.firebaseapp.com",
    projectId: "fir-api-21c9f",
    storageBucket: "fir-api-21c9f.appspot.com",
    messagingSenderId: "364128358150",
    appId: "1:364128358150:web:6ae03e0a5aed16a35d1887"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();