import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Button = ({ onPress, title, disabled }) => {
  return (
    <>
      <TouchableOpacity
        style={[styles.button, disabled && styles.disabledButton]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text
          style={[styles.buttonText, disabled && styles.disabledButtonText]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 43,
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#F6F6F6",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto-Medium",
  },
  disabledButtonText: {
    color: "#BDBDBD",
  },
});

export default Button;
