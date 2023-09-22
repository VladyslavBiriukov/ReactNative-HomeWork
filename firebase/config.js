// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCYiJUed3BnM0ZRvKilZbM0vuUqSYm_F2g",
  authDomain: "reactnative-81b46.firebaseapp.com",
  projectId: "reactnative-81b46",
  storageBucket: "reactnative-81b46.appspot.com",
  messagingSenderId: "1005238342600",
  appId: "1:1005238342600:web:061713a48f403de8c626fd",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);