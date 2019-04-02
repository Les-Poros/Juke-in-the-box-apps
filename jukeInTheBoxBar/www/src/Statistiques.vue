<template>
  <div class="appStat">
    <h2>Visualiser vos statistiques</h2>
    <h3>Vos musiques les plus jouées</h3>
    <div class="statistiques">
        <div
          v-cloak
          class="stat_pistes"
          v-for="(piste,index) in pistes"
          v-bind:key="index"
        >
            <div class="piste">
                <img class="img_piste" :src="piste.imagePiste">
                <p>
                <span v-for="(artiste,index) in piste.artistes" v-bind:key="index">
                    <span v-if="index !== 0">/</span>
                    {{artiste.prénomArtiste}} {{artiste.nomArtiste}}
                </span>
                - {{piste.nomPiste}}
                </p>
                <p>
                    Joué {{piste.nbFoisJoue}}x
                </p>
            </div>
        </div>
        <h3>Vos genres les plus joués</h3>
        <div
          v-cloak
          class="stat_genre"
          v-for="(genre,index) in genres"
          v-bind:key="index"
        >
            <div class="genre">
                <p>
                Nom du genre : {{genre.nomGenre}}
                </p>
                <p>
                    Joué {{genre.nbFoisJoue}}x
                </p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["apiurl"],
  name: "stat",
  data() {
    return {
        pistes: "",
        genres: ""
    };
  },
  methods: {
    getStats: function() {
      axios
        .get(this.apiurl + "getStats", {
          context: document.body,
          params: {
            bartender: localStorage.token
          }
        })
        .then(response => {
          this.pistes = response.data.pistes;
          this.genres = response.data.genres;
        });
    }
  },
  created() {
    this.getStats();
  }
};
</script>

<style>
.appStat{
    margin-top: 5px;
}
h2{
    font-size: 14pt;
}
h3{
    background-color: white;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
}
.biblio_pistes {
  width: 95%;
}
.piste, .genre {
  height: 100px;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 2%;
  padding-bottom: 2%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.piste p, .genre p {
  width: 50%;
  padding-left: 5px;
  padding-right: 5px;
}
.img_piste {
  width: 30%;
  height: inherit;
}
</style>