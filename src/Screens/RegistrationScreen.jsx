import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Text,
  View,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackgroundImage from "../Images/BackgroundImage.jpg";
import Input from "../components/Input";
import Button from "../components/Button";
import UserPhoto from "../components/UserPhoto";

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const onRegistration = () => {
    if (login && mail && password !== "") {
      navigation.navigate("HomeBottomNavigator", { mail: mail });
      resetForm();
    } else {
      Alert.alert("Заповніть форму реєстрації");
    }
  };

  const resetForm = () => {
    setLogin("");
    setMail("");
    setPassword("");
  };

  const [login, setLogin] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={-180}
      >
        <ImageBackground
          source={BackgroundImage}
          style={styles.backgroundImage}
        >
          <SafeAreaView style={styles.form}>
            <View style={styles.photoContainer}>
              <UserPhoto />
            </View>
            <Text style={styles.formTitle}>Реєстрація</Text>
            <View style={styles.inputContainer}>
              <Input
                placeholder="Логін"
                onChangeText={setLogin}
                value={login}
              />
              <Input
                placeholder="Адреса електронної пошти"
                onChangeText={setMail}
                value={mail}
              />
              <Input
                placeholder="Пароль"
                onChangeText={setPassword}
                value={password}
              />
              <Button onPress={onRegistration} title="Зареєструватися" />
              <View style={styles.link}>
                <Text style={styles.textQuestion}>Вже є акаунт? </Text>
                <Text
                  style={[styles.textQuestion, styles.linkOpen]}
                  onPress={() => navigation.navigate("Login")}
                >
                  Увійти
                </Text>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  formTitle: {
    color: "#212121",
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    marginTop: 92,
    marginBottom: 17,
    textAlign: "center",
  },
  form: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
  },
  inputContainer: {
    marginHorizontal: 16,
  },
  link: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 45,
  },
  textQuestion: {
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    color: "#1B4371",
  },
  linkOpen: {
    textDecorationLine: "underline",
  },
  photoContainer: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -60 }],
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  addBtn: {
    position: "absolute",
    right: -28,
    bottom: 8,
    paddingHorizontal: 16,
  },
});

export default RegistrationScreen;
