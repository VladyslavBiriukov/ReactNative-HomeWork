import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import postsData from "../components/TransferPostsData";

const CreatePostsScreen = ({ route }) => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [postName, setPostName] = useState("");
  const [locality, setlocality] = useState("");
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const onPublish = () => {
    if (postName && locality !== "") {
      const newPost = {
        postName,
        locality,
        photoUri,
      };
      postsData.addPost(newPost);
      navigation.navigate("HomeBottomNavigator");
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.photoContainer}>
          <Camera style={styles.camera} type={type} ref={setCameraRef}>
            <TouchableOpacity
              style={styles.circleForCamera}
              onPress={async () => {
                if (cameraRef) {
                  const { uri } = await cameraRef.takePictureAsync();
                  await MediaLibrary.createAssetAsync(uri);
                  setPhotoUri(uri);
                }
              }}
            >
              <FontAwesome name="camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </Camera>
        </View>
        <Text style={styles.publicationTitle}>Завантажте фото</Text>
        <View style={styles.publicationInputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.publicationInput}
              placeholder="Назва..."
              placeholderTextColor="#BDBDBD"
              onChangeText={setPostName}
              value={postName}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TouchableOpacity onPress={() => navigation.navigate("MapScreen")}>
              <Feather name="map-pin" size={24} color="#BDBDBD" />
            </TouchableOpacity>

            <TextInput
              style={styles.publicationInput}
              placeholder="Місцевість..."
              placeholderTextColor="#BDBDBD"
              onChangeText={setlocality}
              value={locality}
            />
          </View>
        </View>
        <View style={styles.publicationBtn}>
          <Button
            onPress={onPublish}
            title="Опубліковати"
            disabled={!postName || locality === ""}
          />
        </View>
      </View>

      <View style={styles.trashBtn}>
        <Feather name="trash-2" size={24} color="#BDBDBD" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#BDBDBD",
  },
  photoContainer: {
    alignItems: "center",
    marginTop: 32,
    marginHorizontal: 16,
  },
  camera: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 8,
    height: 240,
    backgroundColor: "#F6F6F6",
  },
  circleForCamera: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF4D",
    borderRadius: 30,
  },
  publicationTitle: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    marginTop: 8,
    marginHorizontal: 16,
  },
  publicationInputContainer: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  inputWrapper: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    marginTop: 16,
    width: "100%",
    borderBottomColor: "#E8E8E8",
    gap: 4,
  },
  publicationInput: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  publicationBtn: {
    marginHorizontal: 16,
  },
  trashBtn: {
    backgroundColor: "#F6F6F6",
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 10,
  },
});

export default CreatePostsScreen;
