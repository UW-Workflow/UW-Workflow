import { createContext, useContext, Context } from "react";
import useFirebaseAuth from "../lib/useFirebaseAuth";

const authUserContext = createContext({
  authUser: null,
  loading: true,
  signInWithEmailAndPassword: async (
    email: any,
    password: any
  ): Promise<any> => {},
  createUserWithEmailAndPassword: async (
    email: any,
    password: any
  ): Promise<any> => {},
  sendVerificationEmail: () => {},
  sendPasswordResetEmail: async (email): Promise<void> => {},
  signOut: async () => {},
});

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
}
// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(authUserContext);
