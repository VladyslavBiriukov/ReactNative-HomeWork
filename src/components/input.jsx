import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";

const Input = ({ placeholder, value, onChangeText }) => {
  const [focus, setFocus] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const isPassword = placeholder === "Пароль";

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <>
      <View style={[styles.inputWrapper, focus && styles.onFocus]}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
          placeholderTextColor="#BDBDBD"
          secureTextEntry={isPassword && hidePassword}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {isPassword && (
          <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
            <View style={styles.showPasswordButton}>
              <Text style={styles.showPasswordButtonText}>
                {hidePassword ? "Показати" : "Сховати"}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    position: "relative",
    height: 50,
    width: "100%",
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  input: {
    flex: 1,
    padding: 10,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
  },
  onFocus: {
    borderColor: "#FF6C00",
    backgroundColor: "#FFFFFF",
  },
  showPasswordButton: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  showPasswordButtonText: {
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
    fontSize: 16,
  },
});

export default Input;
