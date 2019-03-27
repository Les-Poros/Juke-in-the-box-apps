<template>
  <div>
    <h1>Juke in the box</h1>
    <div class="file">
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Artiste</th>
            <th>Titre</th>
          </tr>
        </thead>
        <tbody>
          <tr v-cloak v-for="(musique,index) in listMusiques" v-bind:key="index">
            <td>{{index+1}}</td>
            <td>
              <span v-for="(artiste,index) in musique.piste.artistes" v-bind:key="index">
                <span v-if="index !== 0">/</span>
                {{artiste.prénom}} {{artiste.nom}}
              </span>
            </td>
            <td>{{musique.piste.nomPiste}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["apiurl"],
  name: "accueil",
  data() {
    return { listMusiques: [], boucle: "" };
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.boucle);
    next();
  },
  methods: {
    getFile: function() {
      axios
        .get(this.apiurl + "File", {
          context: document.body,
          params: {
            bartender: localStorage.token
          }
        })
        .then(response => {
          this.listMusiques = response["data"]["pistes"];
        });
    }
  },
  created() {
    this.getFile();
    this.boucle = setInterval(() => {
      this.getFile();
    }, 15000);
  }
};
</script>

<style>
table {
  width: 100%;
  overflow: hidden;
}

th,
td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dbdada;
}

th {
  background-color: darkslategrey;

  color: white;
}
.musique_file {
  font-size: 18px;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 2%;
  padding-bottom: 2%;
}

.file {
  border: solid grey 1px;
  border-radius: 5px;
  margin: 5%;
  text-align: left;
  background-color: white;
}
</style>
