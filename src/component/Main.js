import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { router } from "../navigation/router";
import { useDispatch, useSelector } from "react-redux";
// import { authStateChanged } from "../redux/auth/authOperations";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { updateUserProfile } from "../redux/auth/authReducer";

export const Main = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userUpdateProfile = {
          user: {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          },
          isLogin: true,
        };

        dispatch(updateUserProfile(userUpdateProfile));
      }
    });
  }, []);

  const routing = router(isLogin);

  return <NavigationContainer>{routing}</NavigationContainer>;
};