import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-storage.js";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD7kMgr26ETngVhy9VMP1P_IV-X5ac1768",
  authDomain: "aznew-de931.firebaseapp.com",
  projectId: "aznew-de931",
  storageBucket: "aznew-de931.firebasestorage.app",
  messagingSenderId: "79015742466",
  appId: "1:79015742466:web:5d0d0636abfabd453b6b1b",
  measurementId: "G-Z2T7SCTYVT"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy };
