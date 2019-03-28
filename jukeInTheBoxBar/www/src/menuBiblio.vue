<template>
  <div class="">
  <ul class="navigation">
  <li><button @click = "$router.push({
        query: { page: 0,search:'',action:'biblio'}
      });">Voir Sa bibliotheque</button></li>
  <li><button @click = "$router.push({
        query: { page: 0,search:'',action:'ajouter'}
      });">Ajouter Une Musique</button></li>
  <li><button @click = "$router.push({
        query: { page: 0,search:'',action:'predef'}
      });">Bibliothèque Prédéfinie</button></li>
  
</ul>
<bibliotheque v-if="$route.query.action=='biblio'" v-bind:apiurl="apiurl"> </bibliotheque>
<ajouter v-if="$route.query.action=='ajouter'" v-bind:apiurl="apiurl"></ajouter>
  </div>
</template>

<script>
import axios from "axios";
import biblio from "./Bibliotheque.vue";
import ajout from "./addBiblio.vue";
export default {
  name: "menubiblio",
  components: {
    'bibliotheque' : biblio,
    'ajouter' : ajout,
  },
  props: ["apiurl"]
};
</script>
<style>
ul,
li {
  list-style: none;
  
}

ul{
  margin-bottom: 10px;
}

.navigation {
  background-color: rgb(60, 70, 73);
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
}

.navigation button {
  display: block;
  padding: 1em;
  color: white;
  font-weight: bold;
  cursor: pointer;
 
border: none;
background: none;
}




</style>