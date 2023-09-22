import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import userPhoto from "../../../img/foto.jpg";
import { Feather } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";

const user = {
  id: 1,
  photo: userPhoto,
  email: "email@example.com",
  userName: "Natali Romanova",
};

export default function PostsScreeen({ route }) {
  const [photos, setPhotos] = useState([]);
  const newUser = useSelector((state) => state.auth.user);
  const isFocused = useIsFocused();

  // console.log("isFocused", isFocused);

  useEffect(() => {
    getDataFromFirestore();
    getCommentsFromFirestore();
    return () => {};
  }, [isFocused]);

  const getDataFromFirestore = async () => {
    await onSnapshot(collection(db, "posts"), async (data) => {
      if (data) {
        const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
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
      }
    });
  };

  const getCommentsFromFirestore = async () => {
    if (photos) {
      photos.map((post) => {
        const id = post.id;
        onSnapshot(collection(db, "posts", `${id}`, "comments"), (doc) => {
          post.countsOfComment = doc.docs.length;
        });
      });
    }
  };

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.conteiner}>
      <View style={styles.posts}>
        <View style={{ flexDirection: "row" }}>
          {/* <Image source={user.photo} /> */}
          <Image style={styles.photo} source={{ uri: newUser.photoURL }} />
          <View style={styles.userData}>
            <Text>{newUser.email}</Text>
            <Text>{newUser.displayName}</Text>
          </View>
        </View>
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
                  <TouchableOpacity
                    style={styles.description}
                    onPress={() => navigation.navigate("Comments", { item })}
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
                    <Text style={styles.postText}>{item.state.place}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  userData: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 8,
  },
  posts: {
    flex: 1,
    paddingTop: 32,
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
  },
  post: {
    marginTop: 32,
    flex: 1,
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 16,
    // flex: 1,
    // width: "100%",
    backgroundColor: "#0553",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  btn: {
    position: "absolute",
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ff6c00",
    justifyContent: "center",
    alignItems: "center",
  },
  btnPosition: {
    flex: 1,
    marginTop: 550,
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
  },
  message: {
    marginRight: 9,
  },
  userMessage: {
    color: "#FF6C00",
  },
  map: {
    marginLeft: 49,
    marginRight: 13,
  },
  lastPost: {
    marginTop: 32,
    marginBottom: 20,
  },
});