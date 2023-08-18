import React, { useEffect } from "react";

import { useFonts } from "expo-font";

import RootNavigator from "./src/navigation/RootNavigator";
import "react-native-gesture-handler";

import * as Font from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
        "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
        "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
      });
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return <RootNavigator />;
}
