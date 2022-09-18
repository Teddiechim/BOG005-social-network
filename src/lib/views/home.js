export default () => {
  const homeSection = document.createElement("div");
  homeSection.classList.add("home");

  //homeSection.style.display="inline-flex"

  const viewHome = `<section class="container">
      <figure>
        <img
          alt="Logotipo de MovieManía"
          class="titleImg"
          src="img/movie.png"
        />
      </figure>
      <article>
        <h2 class="textLandingPage">
          Conéctate con tus amigos y habla sobre películas y series coreanas a
          través de K-drama Lovers
        </h2>
      </article>
      <section>
        <a  class="googleButton">
          <img
            alt="Logo de google gmail"
            class="googleImg"
            src="img/google.png"
          />
          <h4 class="googleText">Ingresa con Google</h4>
        </a>

        <input type="text" placeholder="Usuario/Email" class="inputMail" />
        <input type="password" placeholder="Contraseña" class="inputPassword" />
        <a href="#wall" class="loginButton"><h4>Ingresar</h4></a>
        <a href="#register" class="registerButton"><h4>Regístrate</h4></a>
      </section>
    </section>
    <figure class="imgContainer">
        <img src="img/tvs2.jfif" alt="Imagen de televisores" />
    </figure>
    `;

  homeSection.innerHTML = viewHome;
  return homeSection;
};
