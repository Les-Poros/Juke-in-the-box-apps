<template>
  <div class>
    <ul class="navigation">
      <li>
        <button
          @click="$router.push({
        query: { page: 0,search:'',action:'biblio'}
      });"
        >Voir La bibliotheque</button>
      </li>
      <li>
        <button
          @click="$router.push({
        query: { page: 0,search:'',action:'ajouter'}
      });"
        >Ajouter Une Musique</button>
      </li>
      <li>
        <button
          @click="$router.push({
        query: { page: 0,search:'',action:'predef'}
      });"
        >Choisir Bibliothèque</button>
      </li>
    </ul>
    <bibliotheque v-if="$route.query.action=='biblio'" v-bind:apiurl="apiurl"></bibliotheque>
    <ajouter v-else-if="$route.query.action=='ajouter'" v-bind:apiurl="apiurl"></ajouter>
    <predef v-else-if="$route.query.action=='predef'" v-bind:apiurl="apiurl"></predef>
    <div v-else>Veuillez effectuer une action</div>
  </div>
</template>

<script>
import axios from "axios";
import biblio from "./Bibliotheque.vue";
import ajout from "./addBiblio.vue";
import predef from "./predefBiblio.vue";
export default {
  name: "menubiblio",
  components: {
    bibliotheque: biblio,
    ajouter: ajout,
    predef: predef
  },
  props: ["apiurl"]
};
</script>
<style>
ul,
li {
  list-style: none;
}

ul {
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