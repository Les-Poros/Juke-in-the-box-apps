import Accueil from './Accueil.vue'
import File from './File.vue'
import Biblio from './Bibliotheque.vue'

const start = {template: `
<div class="index">
        <img src="./src/assets/logo.png" width="156.2px" height="156.2px" />
        <h1>Juke in the box</h1>
        <router-link to="/accueil">
            <div class="home_button">
                <p>Accéder à l'application</p>
            </div>
        </router-link>
      </div>
`}
const routes = [
  { path: '/', component: start },
  { path: '/accueil', component: Accueil },
  { path: '/bibliotheque', component: Biblio },
  { path: '/file', component: File}
]

const router = new VueRouter({
  routes 
})

const app = new Vue({
  router,
  data : {
    url : "https://webetu.iutnc.univ-lorraine.fr/www/rimet2u/jukeinthebox/",
    token :localStorage.qrcode,
    unshow: true,
  },
  methods: {
    //permet de valider la saisie d'un token
    entrerToken : function(){
      this.unshow=true;
      localStorage.qrcode = this.token;
      location.reload();
  },
  //permet de verifier lavalidité d'un token (ongoing)
  //refresh la page afin de relancer la boucles de recuperations de données de données de la page actuelle
  tokenValide : function (){
    this.token =localStorage.qrcode;
    if(this.token==null){
    this.unshow=false;
    return false;
    }
    return true;
  }
},created(){
}
}).$mount('.app')
