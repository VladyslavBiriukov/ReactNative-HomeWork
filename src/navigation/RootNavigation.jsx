import React from "react";
import RegistrationScreens from "../Screens/authScreens/RegistrationScreen";
import LoginScreen from "../Screens/authScreens/LoginScreen";
import { createStackNavigator } from "@react-navigation/stack";
import CommentsScreen from "../Screens/nestedScreens/CommentsScreen";
import MapScreen from "../Screens/nestedScreens/MapScreen";
import { useSelector } from "react-redux";
import { BottomNavigation } from "./BottomNavigation";

const AuthStack = createStackNavigator();

export const RootNavigation = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);

  return (
    <AuthStack.Navigator>
      {!isLogin ? (
        <AuthStack.Group>
          <AuthStack.Screen
            options={{
              headerShown: false,
            }}
            name="Login"
            component={LoginScreen}
          />
          <AuthStack.Screen
            options={{
              headerShown: false,
            }}
            name="Register"
            component={RegistrationScreens}
          />
        </AuthStack.Group>
      ) : (
        <AuthStack.Group>
          <AuthStack.Screen
            options={{
              headerShown: false,
              unmountOnBlur: true,
            }}
            name="Home"
            component={BottomNavigation}
          />
          <AuthStack.Screen
            options={{
              headerShow: false,
              title: "Коментарі",
              headerTitleAlign: "center",
            }}
            name="Comments"
            component={CommentsScreen}
          />
          <AuthStack.Screen
            options={{
              title: "Карта",
              headerTitleAlign: "center",
            }}
            name="Map"
            component={MapScreen}
          />
        </AuthStack.Group>
      )}
    </AuthStack.Navigator>
  );
};