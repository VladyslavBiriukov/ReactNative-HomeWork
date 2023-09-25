import React, { useState } from "react";
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
  Button,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-root-toast";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import bg from "../../../img/Photo_BG.jpg";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { registerDB } from "../../redux/auth/authOperations";
import { useEffect } from "react";
import { Loader } from "../../component/Loader";

const initialState = {
  login: "",
  email: "",
  password: "",
  avatar: "",
};

export default function RegistrationScreens() {
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [option, setOption] = useState("");
  const [state, setState] = useState(initialState);
  const [image, setImage] = useState(null);
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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setState((prevState) => ({ ...prevState, avatar: result.assets[0].uri }));
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const keyboardHide = async () => {
    Keyboard.dismiss();
    try {
      setisLoading(true);
      await dispatch(registerDB(state));
      if (error) {
        setNewError(error);
      }
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
    setState(initialState);
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
            keyboardVerticalOffset={-170}
          >
            <View style={styles.form}>
              <Text style={styles.title}>Реєстрація</Text>
              <TextInput
                onFocus={() => {
                  setOption("login");
                }}
                onBlur={() => setOption("")}
                placeholder="Логін"
                placeholderTextColor="#bdbdbd"
                autoCapitalize="none"
                onChangeText={(value) => {
                  setState((prevState) => ({ ...prevState, login: value }));
                }}
                value={state.login}
                style={[
                  styles.formInput,
                  option === "login" && styles.inputFocus,
                ]}
              />
              <TextInput
                onFocus={() => {
                  setOption("email");
                }}
                onBlur={() => setOption("")}
                placeholder="Адреса електронної пошти"
                placeholderTextColor="#bdbdbd"
                autoCapitalize="none"
                onChangeText={(value) => {
                  setState((prevState) => ({
                    ...prevState,
                    email: value.trim(),
                  }));
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
                <Text style={styles.buttonText}>Зареєструватися</Text>
              </TouchableHighlight>
              <Text
                style={styles.formEndText}
                onPress={() => navigation.navigate("Login")}
              >
                Вже є акаунт?{" "}
                <Text style={{ textDecorationLine: "underline" }}>Увійти</Text>
              </Text>
              <View style={styles.forPhoto}>
                {image && (
                  <Image source={{ uri: image }} style={styles.avatar} />
                )}
                {!image ? (
                  <MaterialCommunityIcons
                    style={styles.plus}
                    name="plus-circle-outline"
                    size={24}
                    color="#FF6C00"
                    onPress={pickImage}
                  />
                ) : (
                  <MaterialIcons
                    name="highlight-remove"
                    size={25}
                    color="#E8E8E8"
                    style={styles.plus}
                    onPress={removeImage}
                  />
                )}
              </View>
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
    alignSelf: "center",
    top: -60,
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  avatar: {
    borderRadius: 16,
    width: 120,
    height: 120,
  },
  title: {
    alignSelf: "center",
    marginTop: 82,
    marginBottom: 33,
    fontSize: 30,
    fontWeight: 500,
    color: "#212121",
  },
  formInput: {
    // width: 343,
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
    marginHorizontal: 16,
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
    marginBottom: 78,
  },
  form: {
    // marginHorizontal: 16,
    // alignItems: "center",
    height: 549,
    left: 0,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  plus: {
    position: "absolute",
    top: 81,
    left: 107,
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