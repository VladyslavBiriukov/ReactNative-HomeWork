import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const LogOut = ({ navigation }) => {
  const handleLogout = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.headerTitleContainer}>
      <Text style={styles.headerTitle}>Публікації</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Feather name="log-out" size={24} color="rgba(189, 189, 189, 1)" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: "Roboto-Medium",
    color: "#212121",
    lineHeight: 22,
    letterSpacing: -0.408,
    textAlign: "center",
  },
  logoutButton: {
    position: "absolute",
    right: -140,
  },
});

export default LogOut;
