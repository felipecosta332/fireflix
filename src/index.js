import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGHGnHTIJw6GqFXePb9zuEXzQ3a6dTz4E",
  authDomain: "fireflix-8af81.firebaseapp.com",
  projectId: "fireflix-8af81",
  storageBucket: "fireflix-8af81.appspot.com",
  messagingSenderId: "417184782852",
  appId: "1:417184782852:web:d4d5ba00703e7d499e3351",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const colRef = collection(db, "movies");

getDocs(colRef)
  .then((data) => {
    let movies = [];
    data.docs.forEach((document) =>
      movies.push({ ...document.data(), id: document.id })
    );
    console.log(movies);
  })
  .catch((error) => {
    console.log(error);
  });
