<template>
  <div class="">
  <ul class="navigation">
  <li><button @click = "choix = 'biblio'">Voir Sa bibliotheque</button></li>
  <li><button @click = "choix = 'ajouter'">Ajouter Une Musique</button></li>
  <li><button @click = "choix = 'predef'">Bibliothèque Prédéfinie</button></li>
  
</ul>
<bibliotheque v-if="choix=='biblio'" v-bind:apiurl="apiurl"> </bibliotheque>
<ajouter v-if="choix=='ajouter'" v-bind:apiurl="apiurl"></ajouter>
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
  props: ["apiurl"],
  data() {
    return { choix : ""};
  },
  methods: {
  },
  created() {
    
  }
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