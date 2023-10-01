import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

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
const qRef = query(
  colRef,
  where("category", "==", "drama"),
  orderBy("createdAt")
);

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

// onSnapshot(colRef, (data) => {
//   let movies = [];
//   data.docs.forEach((document) => {
//     movies.push({ ...document.data(), id: document.id });
//   });
//   console.log(movies);
// });

const addForm = document.querySelector(".add");
addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addDoc(colRef, {
    name: addForm.name.value,
    // description: addForm.description.value,
    category: addForm.category.value,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }).then(() => {
    addForm.reset();
  });
});

const deleteForm = document.querySelector(".delete");
deleteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const documentReference = doc(db, "movies", deleteForm.id.value);
  deleteDoc(documentReference).then(() => {
    deleteForm.reset();
  });
});

const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const documentReference = doc(db, "movies", updateForm.id.value);
  updateDoc(documentReference, {
    name: updateForm.name.value,
    updatedAt: serverTimestamp(),
  }).then(() => {
    updateForm.reset();
  });
});
