import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authSlise } from "./auth/authReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["uid", "isLogin"],
};

// const persistedReducer = persistReducer(persistConfig, authSlise.reducer);

const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authSlise.reducer),
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});

const persistor = persistStore(store);

export default { store, persistor };