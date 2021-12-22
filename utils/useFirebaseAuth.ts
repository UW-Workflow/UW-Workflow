import { useState, useEffect } from "react";
import firebase from "./firebase";

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
  verified: user.emailVerified,
  username: user.displayName,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState) => {
    console.log("user: ", firebase.auth().currentUser);
    console.log("auth State", authState);
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    if (authState.emailVerified) {
      setLoading(true);
      var formattedUser = formatAuthUser(authState);
      setAuthUser(formattedUser);
      setLoading(false);
      return;
    }

    setLoading(false);
    setAuthUser(null);

    // setLoading(true);
    // var formattedUser = formatAuthUser(authState);
    // setAuthUser(formattedUser);
    // if (formattedUser.verified) {
    //   setLoading(false);
    // } else {
    //   setLoading(true);
    // }
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(false);
  };

  const signInWithEmailAndPassword = (email, password) =>
    firebase.auth().signInWithEmailAndPassword(email, password);

  const createUserWithEmailAndPassword = (email, password) =>
    firebase.auth().createUserWithEmailAndPassword(email, password);

  const sendVerificationEmail = () =>
    firebase.auth().currentUser.sendEmailVerification();

  const sendPasswordResetEmail = (email) =>
    firebase.auth().sendPasswordResetEmail(email);

  const updatePassword = (newPassword) =>
    firebase.auth().currentUser.updatePassword(newPassword);

  const updateDisplayName = (name) =>
    firebase.auth().currentUser.updateProfile({ displayName: name });

  const signOut = () => firebase.auth().signOut().then(clear);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);
  return {
    authUser,
    loading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendVerificationEmail,
    sendPasswordResetEmail,
    updatePassword,
    updateDisplayName,
    signOut,
  };
}
