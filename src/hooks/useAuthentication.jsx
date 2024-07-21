import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { app, database } from "../firebase/config";

export const useAuthentication = () => {
  const [authError, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //dealing w/ memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth(app);

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });

      setLoading(false);
      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMsg;

      if (error.message.includes("Password")) {
        systemErrorMsg = "Password should be at least 6 characters!";
      } else if (error.message.includes("email-already")) {
        systemErrorMsg = "This email has been registered already!";
      } else {
        systemErrorMsg = "There was an error, please try again later!";
      }
      setLoading(false);
      setError(systemErrorMsg);
    }
  };

  useEffect(() => {
    return () => setCancelled[true];
  }, []);

  //logout
  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  //login
  const login = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(false);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let systemErrorMsg;

      if (error.message.includes("invalid-credential")) {
        console.log(error);
        systemErrorMsg = "User not found!";
      } else if (error.message.includes("invalid-credential")) {
        console.log(error);
        systemErrorMsg = "Incorrect password!";
      } else {
        systemErrorMsg = "There was an error! Please try again later.";
      }
      setLoading(false);
      setError(systemErrorMsg);
    }
  };

  return { auth, createUser, authError, loading, logout, login };
};
