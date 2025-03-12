// Import required Firebase functions
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, update, remove } from "firebase/database";

// Your Firebase configuration (Corrected)
const firebaseConfig = {
    apiKey: "AIzaSyBxPUQjGL-Wc2DqwdLT-qzsg6yf7AFJ3w4",
    authDomain: "mobile-prepaid-recharge.firebaseapp.com",
    projectId: "mobile-prepaid-recharge",
    storageBucket: "mobile-prepaid-recharge.appspot.com",
    messagingSenderId: "766572012852",
    appId: "1:766572012852:web:aea0748cc25e0a9ce9b161"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

