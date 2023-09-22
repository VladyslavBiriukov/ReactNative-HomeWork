import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableHighlight,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import bg from "../../../img/Photo_BG.jpg";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginDB } from "../../redux/auth/authOperations";
import { Loader } from "../../component/Loader";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen() {
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [option, setOption] = useState("");
  const [state, setState] = useState(initialState);
  const [newError, setNewError] = useState(null);
  const [isloading, setisLoading] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      setNewError(null);
    };
  }, [newError]);

  const keyboardHide = async () => {
    try {
      Keyboard.dismiss();
      setisLoading(true);
      await dispatch(loginDB(state));
      if (error) {
        setNewError(error);
      }
      setisLoading(false);
      setState(initialState);
    } catch (error) {
      console.log(error);
    }
  };

  if (newError) {
    let toast = Toast.show(`${error}`, {
      duration: Toast.durations.LONG,
    });
  }

  const toggleHidePassword = () => {
    setIsHidePassword((prev) => !prev);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground style={styles.image} resizeMode="cover" source={bg}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-240}
          >
            <View style={styles.form}>
              <Text style={styles.title}>Увійти</Text>
              <TextInput
                onFocus={() => {
                  setOption("email");
                }}
                onBlur={() => setOption("")}
                placeholder="Адреса електронної пошти"
                autoCapitalize="none"
                placeholderTextColor="#bdbdbd"
                onChangeText={(value) => {
                  setState((prevState) => ({ ...prevState, email: value }));
                }}
                value={state.email}
                style={[
                  styles.formInput,
                  option === "email" && styles.inputFocus,
                ]}
              />
              <View style={styles.passwordInput}>
                <TextInput
                  onFocus={() => {
                    setOption("password");
                  }}
                  onBlur={() => setOption("")}
                  secureTextEntry={isHidePassword}
                  placeholder="Пароль"
                  placeholderTextColor="#bdbdbd"
                  autoCapitalize="none"
                  onChangeText={(value) => {
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }));
                  }}
                  value={state.password}
                  style={[
                    styles.formInput,
                    option === "password" && styles.inputFocus,
                  ]}
                />
                <Text
                  onPress={toggleHidePassword}
                  style={styles.inscriptiption}
                >
                  {isHidePassword ? "Показати" : "Сховати"}
                </Text>
              </View>
              <TouchableHighlight onPress={keyboardHide} style={styles.button}>
                <Text style={styles.buttonText}>Увійти</Text>
              </TouchableHighlight>
              <Text
                style={styles.formEndText}
                onPress={() => navigation.navigate("Register")}
              >
                Немає акаунту?{" "}
                <Text style={{ textDecorationLine: "underline" }}>
                  Зареєструватися
                </Text>
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>

        <View style={[isloading ? styles.loader : styles.none]}>
          <Loader />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
  },
  forPhoto: {
    top: -60,
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  title: {
    alignSelf: "center",
    marginTop: 32,
    marginBottom: 33,
    fontSize: 30,
    fontWeight: 500,
    color: "#212121",
  },
  formInput: {
    marginHorizontal: 16,
    height: 50,
    paddingLeft: 32,
    backgroundColor: "#F6F6F6",
    color: "#212121",
    fontSize: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderWidth: 1,
  },
  inputFocus: {
    backgroundColor: "#ffffff",
    borderColor: "#FF6C00",
  },

  inscriptiption: {
    position: "absolute",
    alignSelf: "flex-end",
    paddingTop: 16,
    paddingRight: 32,
    color: "#1B4371",
    fontSize: 16,
  },
  button: {
    marginHorizontal: 20,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
    marginTop: 27,
    marginBottom: 16,
    fontSize: 16,
  },
  buttonText: {
    color: "#ffffff",
    fontFamily: "Roboto",
    fontSize: 16,
  },
  formEndText: {
    alignSelf: "center",
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "Roboto",
    marginBottom: 144,
  },
  form: {
    height: 489,
    left: 0,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  image: {
    flex: 1,
  },
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    backgroundColor: "#ffffff8a",
    width: "100%",
    height: "100%",
  },
  none: { display: "none" },
});