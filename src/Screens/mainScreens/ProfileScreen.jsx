import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  FlatList,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import bg from "../../../img/Photo_BG.jpg";
import userPhoto from "../../../img/user.jpg";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  changeAvatar,
  deleteAvatar,
  userLogOut,
} from "../../redux/auth/authOperations";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { deleteFileFromStorage } from "../../firebaseOperations/deletePhotoFromStorage";
// import { uploadPhotoToServer } from "../../firebaseOperations/uploadPhotoToFirestore";

const user = {
  id: 1,
  photo: userPhoto,
  email: "email@example.com",
  userName: "Natali Romanova",
};

export default function ProfileScreen({ route }) {
  const [photos, setPhotos] = useState([]);
  const post = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const newUser = useSelector((state) => state.auth.user);
  const avatar = useSelector((state) => state.auth.user.photoURL);

  const getDataFromFirestore = async () => {
    const q = query(collection(db, "posts"), where("uid", "==", newUser.uid));

    const querySnapshot = await await getDocs(q);
    const posts = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    posts.map(async (el) => {
      setPhotos([]);
      const id = el.id;
      const comment = await getDocs(
        collection(db, "posts", `${id}`, "comments")
      );
      const commentsLength = comment.docs.length;
      const author = new Set([]);
      const authorOfComment = comment.docs.map((comment) => {
        author.add(comment.data().displayName);
      });
      setPhotos((prev) => [
        ...prev,
        { ...el, countsOfComment: commentsLength, author: [...author] },
      ]);
    });
  };

  useEffect(() => {
    getDataFromFirestore();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      dispatch(changeAvatar(result.assets[0].uri));
    }
  };

  const deleteUserAvatar = () => {
    dispatch(deleteAvatar(avatar));
  };

  const handleLogOutPress = async () => {
    await dispatch(userLogOut());
  };

  return (
    <ImageBackground style={styles.image} resizeMode="cover" source={bg}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>{newUser.displayName}</Text>
          <View style={styles.forPhoto}>
            <Image
              source={{ uri: newUser.photoURL }}
              resizeMode="cover"
              style={styles.userPhoto}
            ></Image>
            {!newUser.photoURL ? (
              <EvilIcons
                style={styles.plus}
                name="plus"
                size={25}
                color="#FF6C00"
                onPress={pickImage}
              />
            ) : (
              <MaterialIcons
                name="highlight-remove"
                size={25}
                color="#E8E8E8"
                style={styles.plus}
                onPress={deleteUserAvatar}
              />
            )}
          </View>
          <TouchableOpacity style={styles.logOff} onPress={handleLogOutPress}>
            <Feather
              style={{ marginRight: 10 }}
              name="log-out"
              size={24}
              color="#BDBDBD"
            />
          </TouchableOpacity>
          <View style={styles.postsConteiner}>
            {photos.length > 0 && (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={photos}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View
                    style={
                      photos.length > 1 && photos.length === index + 1
                        ? styles.lastPost
                        : styles.post
                    }
                  >
                    <Image style={styles.camera} source={{ uri: item.photo }} />
                    <Text style={styles.postText}>{item.state.name}</Text>
                    <View style={styles.descriptionConteiner}>
                      <View style={styles.description}>
                        <TouchableOpacity
                          style={styles.description}
                          onPress={() =>
                            navigation.navigate("Comments", { item })
                          }
                        >
                          <Feather
                            style={styles.message}
                            name="message-circle"
                            size={24}
                            color={
                              item.author.includes(newUser.displayName)
                                ? "#FF6C00"
                                : "#BDBDBD"
                            }
                          />
                          <Text style={styles.postText}>
                            {item.countsOfComment || 0}
                          </Text>
                        </TouchableOpacity>
                        <View style={styles.description}>
                          <Feather
                            style={styles.map}
                            name="thumbs-up"
                            size={24}
                            color="#FF6C00"
                          />
                          <Text style={styles.postText}>0</Text>
                        </View>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={styles.description}
                          onPress={() => navigation.navigate("Map", { item })}
                        >
                          <Feather
                            style={styles.map}
                            name="map-pin"
                            size={24}
                            color="#BDBDBD"
                          />
                          <Text style={styles.postText}>
                            {item.state.place}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: "100%",
  },
  postsConteiner: {
    // flex: 1,
    marginHorizontal: 16,
    justifyContent: "flex-start",
  },
  userPhoto: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
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
  title: {
    alignSelf: "center",
    marginTop: 82,
    marginBottom: 33,
    fontSize: 30,
    fontWeight: 500,
    color: "#212121",
  },
  form: {
    // alignItems: "center",
    marginTop: 149,
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
  camera: {
    flex: 1,
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  postText: {
    color: "#212121",
    fontSize: 16,
    marginTop: 8,
  },
  description: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  descriptionConteiner: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  message: {
    marginRight: 9,
  },
  map: {
    marginLeft: 49,
    marginRight: 13,
  },
  post: {
    marginTop: 32,
    flex: 1,
    justifyContent: "flex-end",
    alignContent: "flex-end",
    paddingBottom: 20,
  },
  lastPost: {
    marginTop: 32,
    marginBottom: 350,
  },
  logOff: {
    position: "absolute",
    alignSelf: "flex-end",
    paddingTop: 22,
    paddingRight: 16,
  },
});