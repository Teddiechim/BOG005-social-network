// Este es el punto de entrada de tu aplicacion
import home from "./lib/views/home.js";
import { changeRoute } from "./lib/router.js";

const init = () => {
  document.getElementById("content").appendChild(home());
  // changeRoute(window.location.hash, COMPONENTS);
  window.addEventListener("hashchange", () => {
    changeRoute(window.location.hash);
  });
};
window.addEventListener("load", init);

// Evento que arranca la aplicacion
// window.addEventListener("DOMContentLoaded", () => {});


