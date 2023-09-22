import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreeen from "../Screens/mainScreens/PostsScreen";
import CreatePostsScreen from "../Screens/mainScreens/CreatePostsScreen";
import ProfileScreen from "../Screens/mainScreens/ProfileScreen";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { userLogOut } from "../redux/auth/authOperations";
import { useDispatch } from "react-redux";

const Tabs = createBottomTabNavigator();

export const BottomNavigation = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogOutPress = () => {
    dispatch(userLogOut());
  };

  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { paddingHorizontal: 60, height: 83, paddingBottom: 30 },
      }}
    >
      <Tabs.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <View style={[styles.tabBar, focused && styles.tabBarFocused]}>
              <Feather
                name="grid"
                size={24}
                color={focused ? "#ffffff" : "#212121cc"}
              />
            </View>
          ),
          unmountOnBlur: true,
          headerTitle: "Публікації",
          headerTitleAlign: "center",
          headerTitleStyle: { color: "#212121" },
          headerRight: () => (
            <TouchableOpacity onPress={handleLogOutPress}>
              <Feather
                style={{ marginRight: 10 }}
                name="log-out"
                size={24}
                color="#BDBDBD"
              />
            </TouchableOpacity>
          ),
        }}
        name="Posts"
        component={PostsScreeen}
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <View style={[styles.tabBar, focused && styles.tabBarFocused]}>
              <Feather
                name="plus"
                size={24}
                color={focused ? "#ffffff" : "#212121cc"}
              />
            </View>
          ),
          unmountOnBlur: true,
          tabBarStyle: { display: "none" },
          headerTitle: "Створити публікацію",
          headerTitleStyle: { color: "#212121" },
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather
                style={{ marginLeft: 16 }}
                name="arrow-left"
                size={24}
                color="#BDBDBD"
              />
            </TouchableOpacity>
          ),
        }}
        name="CreatePosts"
        component={CreatePostsScreen}
      />
      <Tabs.Screen
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused, size, color }) => (
            <View style={[styles.tabBar, focused && styles.tabBarFocused]}>
              <Feather
                name="user"
                size={24}
                color={focused ? "#ffffff" : "#212121cc"}
              />
            </View>
          ),
          headerShown: false,
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
  },
  tabBar: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarFocused: {
    backgroundColor: "#ff6c00",
  },
});