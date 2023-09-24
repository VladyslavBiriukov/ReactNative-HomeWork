import React from "react";
import "react-native-gesture-handler";
// import { AuthProvider } from "./src/component/AuthContext";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Main } from "./src/component/Main";
import { useFonts } from "expo-font";

// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);

export default function App() {
  	const [fontsLoaded] = useFonts({
		"Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
      "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
      "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
	});

	if (!fontsLoaded) {
		return null;
	}
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