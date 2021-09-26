import firebase from 'firebase/compat/app';
require('firebase/auth');

const FirebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
}
// if a Firebase instance doesn't exist, create one
if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseCredentials)
}

export default firebase;


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDA1j7a88RJN_E41p87crM2VoGx26okwII",
//   authDomain: "uwworkflow-7fb9c.firebaseapp.com",
//   projectId: "uwworkflow-7fb9c",
//   storageBucket: "uwworkflow-7fb9c.appspot.com",
//   messagingSenderId: "50548040632",
//   appId: "1:50548040632:web:20fd00d87a32b5950f654d",
//   measurementId: "G-TGS8TJJZSK"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
