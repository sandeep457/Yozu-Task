import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDxjV_uwRHnYA6kZqHGYzK8NYNpo1w6caE",
    authDomain: "yozu-task.firebaseapp.com",
    projectId: "yozu-task",
    storageBucket: "yozu-task.appspot.com",
    messagingSenderId: "66218354508",
    appId: "1:66218354508:web:d53f952dda905e3c3751e9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;