import { signOutUser, getUser } from "../../auth.js";
import { subirImagenAlFirebase } from "../../storage.js";
import { saveTask, getTasks } from "../../firestore.js";


export default () => {
  const feedSection = document.createElement("div");
  feedSection.classList.add("feed");

  const viewFeed = /*html*/ ` 
  <section id="sectionFeed"> 
  <header class="header">
  <nav class="navbar">
  <div class="logo">
    <img src="./img/logoheart.png" alt="Logo de la marca">
    <a class="toggle-button">
    <span class="bar"></span>
    <span class="bar"></span>
    </a>
  </div>
  <div class="navbar-links">
    <ul>
      <li><a class="cta">Nuevo Post</a></li>
      <li><a class="signOut">Cerrar Cesión</a></li>   
</ul>
</div>

</nav>
</header>

<h2>AQUI VAN LOS POST</h2>
<input type="file" class="btn-modal">
<div class="modal-container">
  <div class="modal modal-close">
                  <p class="close">X</p>
                 
                  <div class="modal-textos">
                  <h2>Realiza una publicación</h2>
                  <p class="modal-textos-2">Publica un video, imagen o comentario</p>
                  
                  <div class="col s12 m6 registro-formulario">
                  <div class="input-field">

                  <form id="task-form">
                  
                  <label for="tituloNewPost">Titulo:</label>
                  <input id="tituloNewPost" type="text" maxlength="30" data-length="30" required />
                      
                  <label for="descripcionNewPost">Descripción:</label>    
                  <textarea id="descripcionNewPost" type="text" placeholder="Escribe tus comentarios" maxlength="200" data-length="200" class="materialize-textarea" required></textarea>
                      
                  <button class="btnUploadImage" id="btn-task-save">Guardar</button>

                      </div>

                      </form>

             <div id="tasks-container" class="tasks-container">
                          </div>

                          
                          
                          <div class="progress">
                              <div class="determinate" style="width: 0%"></div>
                          </div>
                          
                      </div>
                  </div>
  </div>
</div>

</section>
`;

  feedSection.innerHTML = viewFeed;

  // MENU RESPONSIVE
  const toggleButton = feedSection.querySelector(".toggle-button");
  const navbarLinks = feedSection.querySelector(".navbar-links");


  toggleButton.addEventListener("click", () => {
    navbarLinks.classList.toggle("active");
  });

  // FUNCIONALIDAD DEL MODAL PARA ABRIR Y CERRAR
  const cerrar = feedSection.querySelector(".close");
  const abrir = feedSection.querySelector(".cta");
  const modal = feedSection.querySelector(".modal");
  const modalC = feedSection.querySelector(".modal-container");

  abrir.addEventListener("click", () => {
    console.log("click");
    modalC.style.display = "block";
    modal.style.display = "block";
  });

  cerrar.addEventListener("click", () => {
    modalC.style.display = "none";
    modal.style.display = "none";
  });

  const signOutButton = feedSection.querySelector(".signOut");
  signOutButton.addEventListener("click", (e) => {
    signOutUser();
  });


function imageUp () {
const inputUp = feedSection.querySelector("#fichero");
inputUp.addEventListener("change", subirImagenAlFirebase, false)
storageRef = firebase.storage().ref();

}

const taskForm = feedSection.querySelector("#task-form");


// EVENTO PARA QUE EL FORMULARIO SEA ENVIADO
// añadir un evento (submit) que cuando lo ejecute reciba un evento (e) y con este que me cancele el evento por defecto o que se refresque la pagina
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
// traer los inputs del titulo y la descripcion
  const title = taskForm['tituloNewPost']
  const description = taskForm['descripcionNewPost']


  saveTask(title.value, description.value)

  taskForm.reset()
})

const tasksContainer = feedSection.querySelector(".tasks-container");

// querySnapshot son los datos que existen en este momento
window.addEventListener('DOMContentLoaded', async () => {
  const querySnapshot = await getTasks();
  
  let html = ''

  // le pido que recorra los documentos y por c/u quiero verlos en consola
  querySnapshot.forEach(doc => {
    const task = doc.data()
    html = `
            <div>
                <h3>${task.title}</h3>
                <p>${task.description}</p>
            </div>                         
            ` 
  })

  feedSection.tasksContainer.innerHTML = html;
})


  return feedSection;
};



