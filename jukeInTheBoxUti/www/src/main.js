import conf from "./conf/conf.json";
import Accueil from "./Accueil.vue";
import File from "./File.vue";
import Biblio from "./Bibliotheque.vue";
import Login from "./Login.vue";

import axios from "axios";

const routes = [
  { name: "Login", path: "/login", component: Login },
  { name: "Accueil", path: "/", component: Accueil },
  { name: "Biblio", path: "/bibliotheque", component: Biblio },
  { name: "File", path: "/file", component: File }
];

const router = new VueRouter({
  routes
});

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
        token: localStorage.token
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
