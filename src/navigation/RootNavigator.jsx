import { StatusBar } from "expo-status-bar";
import RegistrationScreen from "../Screens/RegistrationScreen";
import LoginScreen from "../Screens/LoginScreen";
import HomeBottomNavigator from "./HomeBottomNavigator";
import CreatePostsScreen from "../Screens/CreatePostsScreen";
import CommentsScreen from "../Screens/CommentsScreen";
import MapScreen from "../Screens/MapScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PostsScreen from "../Screens/PostsScreen";
const MainStack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="HomeBottomNavigator"
          component={HomeBottomNavigator}
          options={{
            headerShown: false,
            headerTitleAlign: "center",
          }}
        />
        <MainStack.Screen
          name="Створити публікацію"
          component={CreatePostsScreen}
          options={{
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 17,
              fontFamily: "Roboto-Medium",
              color: "#212121",
              lineHeight: 22,
              letterSpacing: -0.408,
            },
          }}
        />
        <MainStack.Screen
          name="Коментарі"
          component={CommentsScreen}
          options={{
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 17,
              fontFamily: "Roboto-Medium",
              color: "#212121",
              lineHeight: 22,
              letterSpacing: -0.408,
            },
          }}
        />
        <MainStack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 17,
              fontFamily: "Roboto-Medium",
              color: "#212121",
              lineHeight: 22,
              letterSpacing: -0.408,
            },
          }}
        />
        <MainStack.Screen
          name="Публікації"
          component={PostsScreen}
          options={{
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 17,
              fontFamily: "Roboto-Medium",
              color: "#212121",
              lineHeight: 22,
              letterSpacing: -0.408,
            },
          }}
        />
      </MainStack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default RootNavigator;
