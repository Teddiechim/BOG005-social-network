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

<div class="ctn-icon-search">
       <i class="fa-solid fa-magnifying-glass" class="icon-search"></i>
    </div>

</nav>
</header>

<div class="ctn-bars-search">
  <input type="text" class="inputSearch" placeholder="¿Qué deseas buscar?">
</div>

<div class="cover-ctn-search"> 
</div>



<h2>AQUI VAN LOS POST</h2>
<input type="checkbox" class="btn-modal">
<div class="modal-container">
  <div class="modal modal-close">
                  <p class="close">X</p>
                  <img src="img/logoheart.png" alt="" >
                  <div class="modal-textos">
                  <h2>Realiza una publicación</h2>
                  <p class="modal-textos-2">Publica un video, imagen o comentario</p>
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
    modal.classList.toggle("modal-close");
  });

  cerrar.addEventListener("click", () => {
    modal.classList.toggle("modal-close");
    modalC.style.opacity = "0";
    modalC.style.visibility = "hidden";
  });

  const signOutButton = feedSection.querySelector(".signOut");
  signOutButton.addEventListener("click", (e) => {
    signOutUser();
  });

  const holaButton = feedSection.querySelector(".prueba");
  holaButton.addEventListener("click", (e) => {
    getUser();
  });

  return feedSection;
};
