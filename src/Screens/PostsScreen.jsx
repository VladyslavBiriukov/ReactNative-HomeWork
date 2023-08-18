import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import Ava from "../Images/Ava.jpg";
import Posts from "../components/Posts";
import postsData from "../components/TransferPostsData";

const PostsScreen = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchedPosts = postsData.getPosts();
    setPosts(fetchedPosts);
  }, [postsData.getPosts]);

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image source={Ava} style={styles.photo} />
        <View style={styles.textContainer}>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>example@mail.com</Text>
        </View>
      </View>
      <View style={styles.postsContainer}>
        <FlatList
          data={posts}
          renderItem={({ item }) => <Posts elements={item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#BDBDBD",
  },
  userInfo: {
    flexDirection: "row",
    marginTop: 32,
    gap: 8,
    marginLeft: 16,
  },
  photo: {
    borderRadius: 16,
  },
  textContainer: {
    justifyContent: "center",
  },
  userName: {
    color: "#212121",
    fontFamily: "Roboto-Bold",
    fontSize: 13,
  },
  userEmail: {
    color: "rgba(33, 33, 33, 0.80)",
    fontFamily: "Roboto-Regular",
    fontSize: 11,
  },
  postsContainer: {
    marginHorizontal: 16,
    marginBottom: 120,
  },
});

export default PostsScreen;
