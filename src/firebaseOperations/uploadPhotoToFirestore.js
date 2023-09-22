import { storage } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { nanoid } from "@reduxjs/toolkit";

export const uriToBlob = async (uri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new Error("uriToBlob failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);

    xhr.send(null);
  });
};

export async function uploadPhotoToServer(uri) {
  let url = "";
  const photoName = nanoid().toString();
  const storageRef = ref(storage, `photo/${photoName}.jpg`);
  const blobFile = await uriToBlob(uri);
  try {
    await uploadBytes(storageRef, blobFile).then(async (snapshot) => {
      url = await getDownloadURL(storageRef);

      return url;
    });
  } catch (err) {
    console.log(err);
    return null;
  }

  return url;
}