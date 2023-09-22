import React from "react";
import "react-native-gesture-handler";
// import { AuthProvider } from "./src/component/AuthContext";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Main } from "./src/component/Main";

// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);

export default function App() {
  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        {/* <AuthProvider> */}
        <Main />
        {/* </AuthProvider> */}
      </PersistGate>
    </Provider>
  );
}