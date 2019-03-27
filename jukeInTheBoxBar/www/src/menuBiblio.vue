<template>
  <div class="">
    <h1>Juke in the box</h1>
  <ul class="navigation">
  <li><button @click = "choix = biblio">Voir Sa bibliotheque</button></li>
  <li><button @click = "choix = ajouter">Ajouter Une Musique</button></li>
  <li><button @click = "choix = predef">Bibliothèque Prédéfinie</button></li>
  
</ul>
<bibliotheque v-if="choix==biblio" v-bind:apiurl="apiurl">

  </bibliotheque>
    <!-- <router-link to="/bibliotheque">
      <div class="home_button">
        <p>Voir sa bibliothèque</p>
      </div>
    </router-link>
    <router-link to="/addBibliotheque">
      <div class="home_button">
        <p>Ajouter une musique</p>
      </div>
    </router-link> -->
  </div>
</template>

<script>
import axios from "axios";
import biblio from "./Bibliotheque.vue";
export default {
  name: "menubiblio",
  components: {
    'bibliotheque' : biblio
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