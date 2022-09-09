import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { auth } from "../firebase";

const userAuthContext = createContext();
export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
   function signUp(auth, email, firstName, lastName, password) {
    return createUserWithEmailAndPassword(
      auth,
      email,
      password,
      firstName,
      lastName
    )
  }

  function logOut() {
    return signOut(auth);
  }
  useEffect(() => {
    return () => {
      onAuthStateChanged(auth, (currentuser) => {
        if (currentuser && currentuser.email) {
          localStorage.setItem("email", currentuser.email);
        }
        setUser(currentuser);
      });
    };
  }, []);

  return (
    <userAuthContext.Provider value={{ user, logIn, signUp, logOut }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}