import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD42nFDHxxoIXDwKPreVy4pJijbAObHyJk",
  authDomain: "table-tennis-a716e.firebaseapp.com",
  projectId: "table-tennis-a716e",
  storageBucket: "table-tennis-a716e.appspot.com",
  messagingSenderId: "322885122318",
  appId: "1:322885122318:web:ba2a0abd798b21e05ebf5f",
});

const db = firebaseApp.firestore();
export { db };
