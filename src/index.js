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
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

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
const auth = getAuth();
const colRef = collection(db, "movies");
const qRef = query(
  colRef,
  where("category", "==", "drama"),
  orderBy("createdAt")
);
// const documentReference = doc(db, "movies", "grahyhnseynhse");

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

const registerForm = document.querySelector(".register");
registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createUserWithEmailAndPassword(
    auth,
    registerForm.email.value,
    registerForm.password.value
  )
    .then((credentials) => {
      // console.log(credentials);
      registerForm.reset();
    })
    .catch((error) => console.log(error));
});

const logoutButton = document.querySelector(".logout");
logoutButton.addEventListener("click", (event) => {
  signOut(auth)
    .then(() => {
      console.log("User Logged Out!");
    })
    .catch((error) => {
      console.log(error);
    });
});

const loginForm = document.querySelector(".login");
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  signInWithEmailAndPassword(
    auth,
    loginForm.email.value,
    loginForm.password.value
  )
    .then((credentials) => {
      console.log(credentials.user);
      loginForm.reset();
    })
    .catch((error) => {
      console.log(error);
    });
});
