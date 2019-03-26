import conf from "./conf/conf.json";
import accueil from "./Accueil.vue";
import file from "./File.vue";
import biblio from "./Bibliotheque.vue";
import addBiblio from "./addBiblio.vue";
import login from "./Login.vue";
import menuBiblio from "./menuBiblio.vue";

import axios from "axios";

const routes = [
  { name: "Login", path: "/login", component: login },
  { name: "Accueil", path: "/", component: accueil },
  { name: "Biblio", path: "/bibliotheque", component: biblio },
  { name: "MenuBiblio", path: "/menuBibliotheque", component: menuBiblio },
  { name: "AddBiblio", path: "/addBibliotheque", component: addBiblio },
  { name: "File", path: "/file", component: file }
];

const router = new VueRouter({
  routes
});

//Avant chaque entrée de page on regarde si le token est valide, si non on redirige vers une page de "login"
router.beforeEach((to, from, next) => {
  if (
    to.matched.some(record => record.path !== "/login")
  ) {
    if(localStorage.token == null)
    next({
      name: "Login",
      params: { nextUrl: to.fullPath }
    });
   else {
    axios.get(conf.apiUrl+"validateJukebox",{
      context: document.body,
      params: {
        bartender: localStorage.token
      }
    }).then(response=> {
      if(response.data.validate)
      next()
      else
      next({
        name: "Login",
        params: { nextUrl: to.fullPath }
      });
    })
  }
  }
  else next();
});

const app = new Vue({
  router,
  data: {
    apiUrl: conf.apiUrl
  }
}).$mount(".app");
