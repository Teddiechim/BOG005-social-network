import { signOutUser, auth } from "../../auth.js";
import {
  saveDataPosts,
  getPosts,
  addLike,
  removeLike,
  onGetPost,
  updatePost,
  deletePost,
  getPost,
} from "./../../firestore.js";

export default () => {
  let editStatus = false;
  let id = "";
  const feedSection = document.createElement("div");
  feedSection.classList.add("feed");

  const viewFeed = /*html*/ `
      <section id="sectionFeed">
      <header class="header">
        <nav class="navbar">
          <div class="logo">
            <img src="./img/logoheart.png" alt="Logo de la marca" />
            <a class="toggle-button">
              <span class="bar"></span>
              <span class="bar"></span>
            </a>
          </div>
          <div class="navbar-links">
            <ul>
              <li><a class="cta">Nuevo Post</a></li>
              <li><a class="signOut">Cerrar Sesión</a></li>
            </ul>
            <figure class="imgUserNavC">
                <img
                 alt="Foto del usuario"
                 class="imgUserNav"
                 src="img/heart.jpg"
                />
            </figure>
          </div>
        </nav>
      </header>

      
      <div class="postsContainer">
      
      </div>
      <input type="file" class="btn-modal" />
      <div class="modal-container">
         <div class="modal modal-close"> 
        <p class="close">X</p>
        <form class="modal-textos">
          <h2>Realiza una publicación</h2>
          <p class="modal-textos-2">Publica un comentario</p>
          <div class="registro-formulario">
            <div class="input-field">
            <label for="tituloNewPost">Título</label><br>
              <input
                id="tituloNewPost"
                name="newPostTitle"
                type="text"
                maxlength="30"
                data-length="30"
                required
              />
              
            </div>
            <div class="input-field">
            <label for="descripcionNewPost">Comentarios</label><br>
              <textarea
                id="descripcionNewPost"
                name="newPostText"
                type="text"
                maxlength="200"
                data-length="200"
                class="materialize-textarea"
                required
              ></textarea>
              
            </div>

            <div class="progress-panel">
              <form class="form-imagenes">
                

                <div class="btnUpload">
                  <button type="submit" class="btnUploadImage" id="btnUploadImage">Publicar</button>
                </div>
              </form>

              <div class="progress">
                <div class="determinate" style="width: 0%"></div>
              </div>
            </div>
          </div>
        </form>
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
  // const formModal = feedSection.querySelector(".modal-textos");

  abrir.addEventListener("click", () => {
    console.log("click");
    modalC.style.display = "block";
    modal.style.display = "block";
    formModal["tituloNewPost"].value = "";
    formModal["descripcionNewPost"].value = "";
    formModal["btnUploadImage"].innerHTML = "Publicar";
  });

  cerrar.addEventListener("click", () => {
    modalC.style.display = "none";
    modal.style.display = "none";
  });

  const signOutButton = feedSection.querySelector(".signOut");
  signOutButton.addEventListener("click", (e) => {
    signOutUser();
  });

  const formModal = feedSection.querySelector(".modal-textos");
  // formModal.addEventListener("submit", (e) => {
  //   e.preventDefault();
  //   console.log(e);
  //   const formData = new FormData(e.target);
  //   const title = formData.get("newPostTitle");
  //   const description = formData.get("newPostText");
  //   saveDataPosts(title, description);
  //   cerrar.click();
  // });

  function showPostsOnFeed() {
    let documents = [];
    getPosts().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        documents.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      let everyPosts = "";
      for (let i = 0; i < documents.length; i++) {
        const idUsers = documents[i].likes ?? [];
        const idPost = documents[i].id ?? [];
        const idUser = documents[i].uid ?? [];

        everyPosts =
          everyPosts +
          `<div class="post">
            <div class="headPost">
              <figure class="imgUser">
                <img
                 alt="Foto del usuario"
                 class="ImgU"
                 src="img/heart.jpg"
                />
              </figure>
              <h1 class="nameUser">${documents[i].author}</h1>
           </div>
           <div class="postText">
               <h2>${documents[i].title}</h2>
               
               <p>${documents[i].description}</p>
           </div>
          <div class="postIcons">
           <div class="like">
            <img
             alt="sin likes"
             class="likesButtons ${
               idUsers.includes(auth.currentUser.uid) ? "likeImg" : "unlikeImg"
             }"

             data-id=${documents[i].id}
             src="${
               idUsers.includes(auth.currentUser.uid)
                 ? "img/logoheart.png"
                 : "img/likeGris.png"
             }"
            />  
            
           <h2 class="counter">${idUsers.length} likes</h2>
           </div>
           <div class="otherIcons">
           <buttom><i data-id="${idPost}" class="${
            idUser == auth.currentUser.uid ? "fi btn-edit fi-rr-pencil" : ""
          }" ></i></buttom>
          <i class="${
            idUser == auth.currentUser.uid ? "fi fi-rs-trash delete" : ""
          }" id="btn-delete" data-id="${idPost}"></i>
            
           </div>
          </div>
      </div>`;
      }
      feedSection.querySelector(".postsContainer").innerHTML = everyPosts;

      // ------------LIKE POSTS-------------

      const likesButtons = feedSection.querySelectorAll(".likesButtons");
      likesButtons.forEach((button) => {
        button.addEventListener("click", likes);
      });

      function likes(e) {
        const idPost = e.target.dataset.id;
        console.log(e);
        if (e.target.className.includes("unlikeImg")) {
          addLike(idPost);
          e.target.src = "img/logoheart.png";
          e.target.classList.add("likeImg");
          e.target.classList.remove("unlikeImg");
          let counter = e.target.nextElementSibling;
          const newCounter = Number(counter.innerHTML.split(" ")[0]);
          counter.innerHTML = `${newCounter + 1} likes`;
        } else if (e.target.className.includes("likeImg")) {
          removeLike(idPost);
          e.target.src = "img/likeGris.png";
          e.target.classList.add("unlikeImg");
          e.target.classList.remove("likeImg");
          let counter = e.target.nextElementSibling;
          const newCounter = Number(counter.innerHTML.split(" ")[0]);
          counter.innerHTML = `${newCounter - 1} likes`;
        }
      }

      // ----------------EDITAR------------------

      const buttonEdit = feedSection.querySelectorAll(".btn-edit");

      buttonEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const doc = await getPost(e.target.dataset.id);
          const post = doc.data();
          console.log(post);

          modalC.style.display = "block";
          modal.style.display = "block";

          formModal["tituloNewPost"].value = post.title;
          formModal["descripcionNewPost"].value = post.description;
          editStatus = true;
          id = e.target.dataset.id;
          console.log("editSTATUS", editStatus);
          formModal["btnUploadImage"].innerText = "Editar";
        });
      });

      formModal.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get("newPostTitle");
        const description = formData.get("newPostText");

        if (editStatus) {
          updatePost(id, {
            title: title,
            description: description,
          });
        } else {
          saveDataPosts(title, description);
          editStatus = false;
        }
        cerrar.click();
        e.stopImmediatePropagation();
      });

      // ----------------ELIMINAR------------------

      const btnsDelete = feedSection.querySelectorAll(".delete");
      btnsDelete.forEach((btn) => {
        btn.addEventListener("click", (event) => {
          deletePost(event.target.dataset.id).then(() => showPostsOnFeed());
        });
      });
    });
  }

  showPostsOnFeed();

  // const submitButton = feedSection.querySelector(".btnUploadImage");
  // submitButton.addEventListener("click", showPostsOnFeed);

  return feedSection;
};
