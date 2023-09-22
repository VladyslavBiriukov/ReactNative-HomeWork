import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export const writeCommentToFirestore = async (
  id,
  comment,
  displayName,
  photoURL,
  currentTime
) => {
  try {
    const docRef = await addDoc(collection(db, "posts", `${id}`, "comments"), {
      comment,
      displayName,
      photoURL,
      currentTime,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};