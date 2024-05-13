import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase Configuration object.
const firebaseConfig = {
    apiKey: process.env["FIREBASE_API_KEY"],
    authDomain: process.env["FIREBASE_AUTH_DOMAIN"],
    projectId: process.env["FIREBASE_PROJECT_ID"],
    storageBucket: process.env["FIREBASE_STORAGE_BUCKET"],
    messageSenderId: process.env["FIREBASE_MESSAGE_SENDER_ID"],
    appId: process.env["FIREBASE_APP_ID"],
    measurementId: process.env["FIREBASE_MEASUREMENT_ID"],
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Add authentication
const auth = getAuth(app)

export { app, auth }