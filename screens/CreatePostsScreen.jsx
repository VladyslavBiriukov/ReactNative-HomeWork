import { useState } from "react";

import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { globalStyles } from "../components/styles/globalStyles";

import { CameraIcon, LocationIcon, TrashIcon } from "../components/icons/icons";

export const CreatePostsScreen = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
        }}
      >
        <View
          style={[
            globalStyles.container,
            styles.container,
            {
              paddingBottom: isKeyboardVisible ? 50 : 34,
            },
          ]}
        >
          <View>
            <View style={styles.photoContainer}>
              <View style={styles.photo}>
                <TouchableOpacity>
                  <CameraIcon />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.text}>Завантажте фото</Text>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Назва..."
                onFocus={() => setIsKeyboardVisible(true)}
                onBlur={() => setIsKeyboardVisible(false)}
              />
              <View style={[styles.input, styles.locationInputContainer]}>
                <LocationIcon />
                <TextInput
                  style={[styles.input, styles.locationInput]}
                  placeholder="Місцевість..."
                  onFocus={() => setIsKeyboardVisible(true)}
                  onBlur={() => setIsKeyboardVisible(false)}
                />
              </View>
            </View>
            <TouchableOpacity style={globalStyles.disabledButton}>
              <Text style={globalStyles.disabledButtonText}>Опубліковати</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }} />
          <TouchableOpacity>
            <View style={styles.bottomContainer}>
              <TrashIcon />
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "flex-end",

    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
  },

  photoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
    height: 240,

    backgroundColor: "#F6F6F6",

    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginBottom: 8,
  },

  photo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: 60,
    height: 60,

    backgroundColor: "white",

    borderRadius: 30,
  },

  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#BDBDBD",
    marginBottom: 32,
  },

  input: {
    height: 50,

    marginBottom: 16,

    fontFamily: "Roboto-Regular",
    fontSize: 16,

    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
  },

  locationInputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,

    marginBottom: 32,
  },

  locationInput: {
    flex: 1,

    marginBottom: 0,

    borderBottomWidth: 0,

    fontFamily: "Roboto-Regular",
  },

  bottomContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",

    width: 70,
    height: 40,

    backgroundColor: "#F6F6F6",

    borderRadius: 20,
  },
});
