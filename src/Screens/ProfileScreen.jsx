import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  FlatList,
} from "react-native";

import BackgroundImage from "../Images/BackgroundImage.jpg";
import UserPhoto from "../components/UserPhoto";

import ProfilePosts from "../components/ProfilePosts";
import postsData from "../components/TransferPostsData";

const ProfileScreen = () => {
  const [posts, setPosts] = useState([]);

  // Використовуємо useEffect для отримання даних після завантаження компоненту
  useEffect(() => {
    const fetchedPosts = postsData.getPosts();
    setPosts(fetchedPosts);
  }, []); // Пустий масив депенденсій - ефект викликається лише після монтування компоненту

  return (
    <ImageBackground source={BackgroundImage} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <View style={styles.form}>
          <View style={styles.userPhotoContainer}>
            <UserPhoto />
          </View>
          <Text style={styles.formTitle}>Natali Romanova</Text>
          <View style={styles.postsContainer}>
            <FlatList
              data={posts}
              renderItem={({ item }) => <ProfilePosts elements={item} />}
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  container: {
    flex: 1,
    paddingTop: 147,
  },
  formTitle: {
    color: "#212121",
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    marginTop: 32,
    marginBottom: 0,
    textAlign: "center",
  },
  form: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  userPhotoContainer: {
    alignSelf: "center",
    marginTop: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  postsContainer: {
    flex: 1,
  },
});

export default ProfileScreen;
