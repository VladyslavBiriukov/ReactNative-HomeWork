// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
   apiKey: "AIzaSyA9FuvcZGUfLDTnYk38dZFA6pZBj54vbuM",
  authDomain: "react-native-project-b3393.firebaseapp.com",
  projectId: "react-native-project-b3393",
  storageBucket: "react-native-project-b3393.appspot.com",
  messagingSenderId: "432902580945",
  appId: "1:432902580945:web:cda49434c2216bf0cd33f0",
  measurementId: "G-25SZF58TRY",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);