import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const FirebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};
// if a Firebase instance doesn't exist, create one
console.log(firebase);
if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseCredentials);
}
console.log(firebase);

export default firebase;
