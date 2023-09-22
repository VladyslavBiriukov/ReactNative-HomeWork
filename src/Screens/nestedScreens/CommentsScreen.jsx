import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { writeCommentToFirestore } from "../../firebaseOperations/writeCommentToFirebase";
import { useSelector } from "react-redux";
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useNavigation } from "@react-navigation/native";

function CommentsScreen({ route }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const currentTime = new Date().toLocaleString("uk-UA", options);

  const { photoURL, displayName } = useSelector((state) => state.auth.user);

  const navigation = useNavigation();

  const { item } = route.params;

  const getDataFromFirestore = async () => {
    const id = item.id;
    await onSnapshot(collection(db, "posts", `${id}`, "comments"), (data) => {
      if (data) {
        const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setComments(posts);
      }
    });
  };

  useEffect(() => {
    getDataFromFirestore();
  }, []);

  const handleClickComment = () => {
    const id = item.id;
    writeCommentToFirestore(id, comment, displayName, photoURL, currentTime);
    setComment("");
    // navigation.navigate("Posts", { commentId: id });
  };

  return (
    <View style={styles.conteiner}>
      <Image style={styles.camera} source={{ uri: item.photo }} />
      {comments.length > 0 && (
        <FlatList
          style={styles.comments}
          data={comments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.commentsConteiner,
                item.displayName === displayName && styles.commentsConteiner2,
              ]}
            >
              {/* <View style={styles.logo}> */}
              <Image
                style={styles.logo}
                source={{ uri: item.photoURL || item.displayName }}
              ></Image>
              {/* <Text>{item.displayName}</Text> */}
              {/* </View> */}
              <View
                style={[
                  styles.comment,
                  item.displayName === displayName && styles.comment2,
                ]}
              >
                <Text style={styles.commentText}>{item.comment}</Text>
                <Text
                  style={[
                    styles.commentDate,
                    item.displayName === displayName && styles.commentDate2,
                  ]}
                >
                  {item.currentTime}
                </Text>
              </View>
            </View>
          )}
        />
      )}
      <View style={styles.inputConteiner}>
        <TextInput
          placeholderTextColor="#bdbdbd"
          placeholder="Коментувати..."
          onChangeText={(value) => {
            setComment(value);
          }}
          value={comment}
          style={styles.formInput}
        />
        <TouchableOpacity style={styles.arrow} onPress={handleClickComment}>
          <View>
            <Ionicons name="arrow-up" size={24} color="#ffffff" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CommentsScreen;

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  camera: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  formInput: {
    height: 50,
    paddingLeft: 16,
    backgroundColor: "#F6F6F6",
    color: "#212121",
    fontSize: 16,
    marginBottom: 16,
    borderRadius: 100,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderWidth: 1,
  },
  arrow: {
    position: "absolute",
    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    top: 8,
    right: 8,
  },
  comments: {
    marginTop: 32,
  },
  commentsConteiner: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  commentsConteiner2: {
    flexDirection: "row-reverse",
  },
  logo: {
    width: 28,
    height: 28,
    borderRadius: 50,
    backgroundColor: "red",
  },
  comment: {
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderTopRightRadius: 6,
    flex: 1,
    padding: 16,
    backgroundColor: "#00000008",
  },
  comment2: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 0,
  },
  commentText: {
    fontSize: 13,
    color: "#212121",
    marginBottom: 8,
  },
  commentDate: {
    fontSize: 10,
    color: "#BDBDBD",
    alignSelf: "flex-end",
  },
  commentDate2: {
    alignSelf: "flex-start",
  },
});