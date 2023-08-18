import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ProfilePosts = ({ elements }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        <View style={styles.publicationPhoto}>
          <Image source={{ uri: elements.photoUri }} style={styles.photo} />
        </View>
      </View>
      <Text style={styles.publicationTitle}>{elements.postName}</Text>
      <View style={styles.publicationData}>
        <View style={styles.commentsAndLikesContainer}>
          <View style={styles.commentsAndLikes}>
            <TouchableOpacity onPress={() => navigation.navigate("Коментарі")}>
              <Feather name="message-circle" size={24} color="#BDBDBD" />
            </TouchableOpacity>
            <Text style={styles.count}>8</Text>
          </View>
          <View style={styles.commentsAndLikes}>
            <AntDesign name="like2" size={24} color="#BDBDBD" />
            <Text style={styles.count}>153</Text>
          </View>
        </View>

        <View style={styles.locality}>
          <Feather name="map-pin" size={24} color="#BDBDBD" />
          <Text style={styles.localityTitle}>Ukraine</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  photoContainer: {
    alignItems: "center",
    marginTop: 32,
  },
  publicationPhoto: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 240,
    borderRadius: 8,
    backgroundColor: "#E8E8E8",
  },
  publicationTitle: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    marginTop: 8,
  },
  publicationData: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  commentsAndLikesContainer: {
    flexDirection: "row",
    gap: 24,
  },
  commentsAndLikes: {
    flexDirection: "row",
    color: "#BDBDBD",
  },
  count: {
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginLeft: 6,
  },
  locality: {
    flexDirection: "row",
  },
  localityTitle: {
    color: "#212121",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginLeft: 6,
  },
});
export default ProfilePosts;
