import Register from "./lib/views/register.js";
import Home from "./lib/views/home.js";
import Feed from "./lib/views/feed.js";
import error from "./lib/views/error.js"

//decidir nuestras rutas y la página específica para esa ruta en particular y ponerlas en un objeto.
const COMPONENTS = {
  register: Register,
  home: Home,
  feed: Feed,
  error: error
};
export { COMPONENTS };
