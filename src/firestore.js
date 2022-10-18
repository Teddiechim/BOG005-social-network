import {
  getFirestore,
  collection,
  addDoc,
  orderBy,
  query,
  getDocs,
  doc,
  arrayUnion,
  arrayRemove,
  updateDoc,
  getDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
import { auth } from "./auth.js";
import { app } from "./firebase.js";
import {
  onAuthStateChanged,
  getAuth,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";

const db = getFirestore(app);
// const auth = getAuth(app);
// const user = auth.currentUser;

export async function saveData(email, password, name) {
  try {
    const docRef = await addDoc(collection(db, "usuarios"), {
      name: name,
      email: email,
      password: password,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.log(e);
    console.error("Error adding document: ", e);
  }
}

export async function saveDataPosts(title, description) {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      title: title,
      description: description,
      date: new Date(),
      likes: [],
      uid: auth.currentUser.uid,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.log(e);
    console.error("Error adding document: ", e);
  }
}

export function getPosts() {
  const q = query(collection(db, "posts"), orderBy("date", "desc"));
  return getDocs(q);
}

export async function addLike(postId) {
  try {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      likes: arrayUnion(auth.currentUser.uid),
    });
  } catch (e) {
    console.log(e);
  }
}

export async function removeLike(postId) {
  try {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      likes: arrayRemove(auth.currentUser.uid),
    });
  } catch (e) {
    console.log(e);
  }
}

export const currentUser = {};

// Get posts & order posts
export const onGetPost = () => {
  const q = query(collection(db, "usuarios"));
  return getDocs(q);
};

// Get one post
//obtener una tarea UNICA
export const getPost = (id) => getDoc(doc(db, "posts", id));
// export const getUser = (id) => getDoc(doc(db, 'usuarios', id));

// Edit post

export const updatePost = (id, newFields) =>
  updateDoc(doc(db, "posts", id), newFields);

export const deletePost = (id) => deleteDoc(doc(db, "posts", id));
