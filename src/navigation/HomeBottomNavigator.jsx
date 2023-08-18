import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Feather } from "@expo/vector-icons";
import PostsScreen from "../Screens/PostsScreen";
import CreatePostsScreen from "../Screens/CreatePostsScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import LogOut from "../components/LogOut";
import { useNavigation, useRoute } from "@react-navigation/native";

const Tabs = createBottomTabNavigator();

const HomeBottomNavigator = () => {
  const navigation = useNavigation();

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Публікації") {
            iconName = (
              <View style={[styles.footerItems, focused && styles.activeItem]}>
                <Feather name="grid" size={size} color={color} />
              </View>
            );
          } else if (route.name === "Створити публікацію") {
            iconName = (
              <TouchableOpacity
                onPress={() => navigation.navigate("Створити публікацію")}
                style={[styles.footerItems, focused && styles.activeItem]}
              >
                <AntDesign name="plus" size={size} color={color} />
              </TouchableOpacity>
            );
          } else if (route.name === "ProfileScreen") {
            iconName = (
              <View style={[styles.footerItems, focused && styles.activeItem]}>
                <Feather name="user" size={size} color={color} />
              </View>
            );
          }
          return iconName;
        },
        tabBarActiveTintColor: "#FFF",
        tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
      })}
    >
      <Tabs.Screen
        name="Публікації"
        component={PostsScreen}
        options={{
          headerTitle: () => <LogOut navigation={navigation} />,
          headerTitleAlign: "center",
          tabBarLabel: "",
        }}
      />
      <Tabs.Screen
        name="Створити публікацію"
        component={CreatePostsScreen}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          tabBarLabel: "",
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          tabBarLabel: "",
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  footerItems: {
    backgroundColor: "transparent",
    marginTop: 20,
    marginBottom: 1,
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  activeItem: {
    backgroundColor: "rgba(255, 108, 0, 1)",
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});

export default HomeBottomNavigator;
