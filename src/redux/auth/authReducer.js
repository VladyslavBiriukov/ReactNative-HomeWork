import { createSlice } from "@reduxjs/toolkit";
import {
  changeAvatar,
  deleteAvatar,
  loginDB,
  registerDB,
  userLogOut,
} from "./authOperations";

export const authSlise = createSlice({
  name: "auth",
  initialState: {
    user: {
      uid: null,
      displayName: null,
      email: null,
      photoURL: null,
    },
    isLogin: null,
    error: null,
  },
  reducers: {
    updateUserProfile: (state, { payload }) => {
      state.user.uid = payload.user.uid;
      state.user.email = payload.user.email;
      state.user.displayName = payload.user.displayName;
      state.user.photoURL = payload.user.photoURL;
      state.isLogin = true;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(registerDB.pending, (state) => {
        state.error = null;
      })
      .addCase(registerDB.fulfilled, (state, { payload }) => {
        state.user.uid = payload.uid;
        state.user.email = payload.email;
        state.user.displayName = payload.displayName;
        state.user.photoURL = payload.photoURL;
        state.isLogin = true;
      })
      .addCase(registerDB.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(loginDB.pending, (state) => {
        state.error = null;
      })
      .addCase(loginDB.fulfilled, (state, { payload }) => {
        state.user.uid = payload.uid;
        state.user.email = payload.email;
        state.user.displayName = payload.displayName;
        state.user.photoURL = payload.photoURL;
        state.isLogin = true;
      })
      .addCase(loginDB.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(changeAvatar.fulfilled, (state, { payload }) => {
        state.user.photoURL = payload;
      })
      .addCase(deleteAvatar.fulfilled, (state) => {
        state.user.photoURL = null;
      })
      .addCase(userLogOut.fulfilled, (state, { payload }) => {
        (state.isLogin = null),
          (state.user.displayName = null),
          (state.user.email = null),
          (state.user.photoURL = null),
          (state.user.uid = null);
      }),
});

export const { updateUserProfile } = authSlise.actions;