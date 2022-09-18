import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";
import { app } from "./firebase.js";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export function registerWithEmail(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location.hash = "";
    })
    .catch((error) => {
      if (error.code == "auth/email-already-in-use") {
        alert("El email ya está registrado");
      }
      if (error.code == "auth/invalid-email") {
        alert("El email no es válido");
      }
      if (error.code == "auth/weak-password") {
        alert("La contraseña debe tener al menos 6 caracteres");
      }
      const errorCode = error.code;
      console.log(error.code);
      const errorMessage = error.message;
    });
}

export function loginWithEmail(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location.hash = "#feed";
    })
    .catch((error) => {
      if (error.code == "auth/invalid-email") {
        alert("El email no es válido");
      }
      if (error.code == "auth/wrong-password") {
        alert("La contraseña es incorrecta");
      }
      if (error.code == "auth/user-not-found") {
        alert("El usuario no está registrado");
      }
      const errorCode = error.code;
      console.log(error.code);
      const errorMessage = error.message;
    });
}

export function signInWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      window.location.hash = "#feed";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}