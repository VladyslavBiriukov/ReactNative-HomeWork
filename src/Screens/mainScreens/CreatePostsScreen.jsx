import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { UserCamera } from "../../component/Camera";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { writeDataToFirestore } from "../../firebaseOperations/writeDataToFirestore";
import { useSelector } from "react-redux";

function CreatePostsScreen() {
  const [state, setState] = useState({ name: "", place: "" });
  const [photo, setPhoto] = useState(null);
  const [location, setlocation] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const navigation = useNavigation();
  const { displayName, uid } = useSelector((state) => state.auth.user);

  useEffect(() => {
    const locationCoords = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
        }
        const { coords } = await Location.getCurrentPositionAsync({});
        setlocation(coords);
      } catch (error) {
        console.log(error);
      }
    };
    locationCoords();
  }, []);

  const takePhoto = async (data) => {
    setPhoto(data);
  };

  const isReady = (data) => {
    setCameraReady(data);
  };

  const handleCreatePost = () => {
    if (!photo) return;
    writeDataToFirestore(photo, state, location, displayName, uid);
    navigation.navigate("Posts");
    handleDelete();
  };

  const handleDelete = () => {
    setPhoto(null);
    setState({ name: "", place: "" });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboard}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={-100}
        >
          <View>
            <View style={styles.photo}>
              <UserCamera
                photo={photo}
                takePhoto={takePhoto}
                isReady={isReady}
              />
            </View>
            <Text style={styles.textUnderPhoto}>
              {photo ? "Редагувати фото" : "Завантажте фото"}
            </Text>
            <View>
              <View>
                <TextInput
                  placeholder="Назва..."
                  placeholderTextColor="#BDBDBD"
                  onChangeText={(value) => {
                    setState((prevState) => ({ ...prevState, name: value }));
                  }}
                  value={state.name}
                  style={styles.photoName}
                />
              </View>
              <View style={styles.locationConteiner}>
                <TextInput
                  placeholder="Місцевість..."
                  placeholderTextColor="#BDBDBD"
                  onChangeText={(value) => {
                    setState((prevState) => ({ ...prevState, place: value }));
                  }}
                  value={state.place}
                  style={styles.location}
                />
                <Feather
                  style={styles.locationIcon}
                  name="map-pin"
                  size={24}
                  color="#BDBDBD"
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={handleCreatePost}
              style={[styles.button, photo && styles.confirmBtn]}
            >
              <Text style={[styles.buttonText, photo && styles.confirmBtnText]}>
                Опубліковати
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.deleteBtn}>
            <View style={[styles.delete, photo && styles.deleteActive]}>
              <Feather
                onPress={handleDelete}
                name="trash-2"
                size={24}
                color={(photo && "#FFFFFF") || "#BDBDBD"}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  keyboard: {
    marginTop: 32,
    marginHorizontal: 16,
    flex: 1,
    justifyContent: "flex-end",
  },
  photoName: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    marginTop: 48,
    paddingBottom: 15,
    fontSize: 16,
  },
  locationConteiner: {
    justifyContent: "center",
    marginTop: 32,
  },
  location: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    paddingLeft: 28,
    paddingBottom: 15,
    fontSize: 16,
  },
  locationIcon: {
    position: "absolute",
    paddingBottom: 15,
  },
  deleteBtn: {
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 34,
    marginTop: 10,
  },
  textUnderPhoto: {
    marginTop: 8,
    color: "#BDBDBD",
    fontSize: 16,
  },
  button: {
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
    marginTop: 32,
    fontSize: 16,
  },
  confirmBtn: {
    backgroundColor: "#FF6C00",
  },
  buttonText: {
    color: "#BDBDBD",
    fontSize: 16,
  },
  confirmBtnText: {
    color: "#ffffff",
  },
  delete: {
    width: 70,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
  },
  deleteActive: {
    backgroundColor: "#FF6C00",
  },
  photo: {
    height: 240,
    borderRadius: 8,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreatePostsScreen;