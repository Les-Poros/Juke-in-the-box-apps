import Accueil from './Accueil.vue'
import File from './File.vue'
import Biblio from './Bibliotheque.vue'
import Login from './Login.vue'

const routes = [
  { name:"Login" ,path: '/login', component: Login},
  { name:"Accueil",path: '/', component: Accueil},
  { name:"Biblio",path: '/bibliotheque', component: Biblio },
  { name:"File",path: '/file', component: File}
]

const router = new VueRouter({
  routes 
})

//Avant chaque entrée de page on regarde si le token est valide, si non on redirige vers une page de "login"
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.path!=="/login")) {
    if (localStorage.token == null) { 
        next({
            name: 'Login',
            params: { nextUrl: to.fullPath } 
        })
    }  else{next();}
      
  }else{next();}
  });
    
const app = new Vue({
  router,
  data : {
    url : "https://webetu.iutnc.univ-lorraine.fr/www/rimet2u/jukeinthebox/"
  },
}).$mount('.app')
