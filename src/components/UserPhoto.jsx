import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const UserPhoto = () => {
  const [addBtnVisible, setAddBtnVisible] = useState(true);

  const handleAddBtnPress = () => {
    setAddBtnVisible(false);
  };

  const handleCloseBtnPress = () => {
    setAddBtnVisible(true);
  };

  return (
    <>
      {addBtnVisible ? (
        <Pressable onPress={handleAddBtnPress} style={styles.Btn}>
          <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
        </Pressable>
      ) : (
        <Pressable onPress={handleCloseBtnPress} style={styles.Btn}>
          <AntDesign name="closecircleo" size={25} color="#BDBDBD" />
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  Btn: {
    position: "absolute",
    right: -28,
    bottom: 16,
    paddingHorizontal: 16,
  },
});

export default UserPhoto;
