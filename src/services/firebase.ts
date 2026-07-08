import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Datos de configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAYE1l5UEWaqFO7rmGEYzW-tFaVz2zvwiM",
  authDomain: "chambea-ya-e3b7d.firebaseapp.com",
  projectId: "chambea-ya-e3b7d",
  storageBucket: "chambea-ya-e3b7d.firebasestorage.app",
  messagingSenderId: "366227658050",
  appId: "1:366227658050:web:c85880965182ea72b324db",
  measurementId: "G-7RPWH3LTW5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicialización de los servicios de Firebase 
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);