export const changeRoute = (hash, components) => {
  const containerRoot = document.getElementById("content");
  containerRoot.innerHTML = "";
  switch (hash) {
<<<<<<< HEAD
    case '':{
      return containerRoot.appendChild(components.home()) ;}
      case '#home':{
        return containerRoot.appendChild(components.home()) ;}
    case '#register':{
      return containerRoot.appendChild(components.register());}

    case '#feed':{
      return containerRoot.appendChild(components.feed());}

    default: {
        return containerRoot.appendChild(components.error404());}
      }
    };

=======
    case "":
      return containerRoot.appendChild(components.home());
    case "#home":
      return containerRoot.appendChild(components.home());
    case "#register":
      return containerRoot.appendChild(components.register());
    case "#feed":
      return containerRoot.appendChild(components.feed());
    default:
      return containerRoot.appendChild(components.error404());
  }
};
>>>>>>> 7529635eb25127a2f886633b533f3b4bc96917fd
