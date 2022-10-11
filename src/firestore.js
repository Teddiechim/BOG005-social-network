import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
import { app } from "./firebase.js";

// conexion a la base de datos (db)
const db = getFirestore(app);

export async function saveData(email, password, name) {
  try {
    // quiero añadir un documento en la coleccion de usuarios
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

export const saveTask = (title, description) => 
  // quiero añadir un documento a la coleccion de tareas ('tasks'), que utiliza la conexcion db, que va a guardar un objeto
  addDoc(collection(db, "tasks"), {title, description});

export const getTasks = () => getDocs(collection(db, "tasks"));
