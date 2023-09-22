import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../../firebase/config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { uploadPhotoToServer } from "../../firebaseOperations/uploadPhotoToFirestore";
import { deleteFileFromStorage } from "../../firebaseOperations/deletePhotoFromStorage";

export const registerDB = createAsyncThunk(
  "user/signUp",
  async (credential, thunkAPI) => {
    try {
      const { login, email, password, avatar } = credential;
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (avatar !== "") {
        const url = await uploadPhotoToServer(avatar);
        await updateProfile(auth.currentUser, {
          displayName: login,
          photoURL: url,
        });
      } else {
        await updateProfile(auth.currentUser, {
          displayName: login,
        });
      }
      return result.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginDB = createAsyncThunk(
  "user/signIn",
  async (credential, thunkAPI) => {
    try {
      const { email, password } = credential;
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changeAvatar = createAsyncThunk(
  "user/changeAvatar",
  async (avatar, thunkAPI) => {
    try {
      const url = await uploadPhotoToServer(avatar);
      const result = await updateProfile(auth.currentUser, {
        photoURL: url,
      });
      return url;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteAvatar = createAsyncThunk(
  "user/deleteAvatar",
  async (avatar, thunkAPI) => {
    try {
      await deleteFileFromStorage(avatar);
      const result = await updateProfile(auth.currentUser, {
        photoURL: null,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const authStateChanged = createAsyncThunk(
//   "user/onChanged",
//   async (credential, thunkAPI) => {
//     try {
//       const result = await onAuthStateChanged(auth, (user) => {
//         if (user) {
//           return user;
//         }
//       });
//       result();
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const authStateChanged = () => async (dispatch, getState) => {
//   await onAuthStateChanged(auth, (user) => {
//     if (user) {
//       const userUpdateProfile = {
//         user: {
//           uid: user.uid,
//           displayName: user.displayName,
//           email: user.email,
//           photoURL: user.photoURL,
//         },
//         isLogin: true,
//       };

//       dispatch(updateUserProfile(userUpdateProfile));
//     }
//   });
// };

// export const authStateChanged = createAsyncThunk(
//   "user/onChanged",
//   async (credential, thunkAPI) => {
//     try {
//       const result = await onAuthStateChanged(auth, (user) => {
//         if (user) {
//           const uid = user.uid;
//         }
//       });
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const userLogOut = createAsyncThunk(
  "user/logOut",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const updateUserProfile = async (update) => {
//   const user = auth.currentUser;

//   // якщо такий користувач знайдений
//   if (user) {
//     // оновлюємо його профайл
//     try {
//       await updateProfile(user, update);
//     } catch (error) {
//       throw error;
//     }
//   }
// };