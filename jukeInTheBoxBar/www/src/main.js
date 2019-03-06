import accueil from './Accueil.vue'
import file from './File.vue'
import biblio from './Bibliotheque.vue'
import addBiblio from './addBiblio.vue'
import login from './Login.vue'

const menuBiblio={template : `
<div>
<h1>Juke in the box</h1>
<router-link to="/bibliotheque">
    <div class="home_button">
        <p>Voir sa bibliothèque</p>
    </div>
</router-link>
<router-link to="/addBibliotheque">
    <div class="home_button">
        <p>Ajouter une musique</p>
    </div>
</router-link>
</div>
`};
const routes = [
  { name:"Login" ,path: '/login', component: login},
  { name:"Accueil",path: '/', component: accueil},
  { name:"Biblio",path: '/bibliotheque', component: biblio },
  { name:"MenuBiblio",path: '/menuBibliotheque', component: menuBiblio },
  { name:"AddBiblio",path: '/addBibliotheque', component: addBiblio },
  { name:"File",path: '/file', component: file}
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
