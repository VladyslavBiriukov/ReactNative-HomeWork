import { storage } from "../../firebase/config";
import { getStorage, ref, deleteObject } from "firebase/storage";

export const deleteFileFromStorage = async (avatar) => {
  // Create a reference to the file to delete
  const url = avatar.split("?");
  const img = url[0].split("%2F");

  const storageRef = ref(storage, `photo/${img[1]}`);

  // Delete the file
  deleteObject(storageRef)
    .then(() => {
      console.log("File delete");
    })
    .catch((error) => {
      console.log(error);
    });
};