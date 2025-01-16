// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPbEvz0yA2p12cjNuZFao_C6Ib5ca6fa8",
  authDomain: "vlog-a9088.firebaseapp.com",
  projectId: "vlog-a9088",
  storageBucket: "vlog-a9088.appspot.com", // Corrected storage bucket format
  messagingSenderId: "79745412823",
  appId: "1:79745412823:web:0c382a2d36726d57874a92",
  measurementId: "G-WQELPMFX57"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Expose Firebase services globally
window.auth = firebase.auth();
window.db = firebase.firestore();
window.storage = firebase.storage(); // Initialize Firebase Storage

// Debugging logs
console.log('Firebase initialized:', firebase);
console.log('Auth instance:', auth);
console.log('Firestore instance:', db);
console.log('Storage instance:', storage);
