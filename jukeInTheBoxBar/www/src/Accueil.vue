<template>
  <div>
    <h1>Juke in the box</h1>
    <div class="musique_en_cours">
      <section v-if="musique==='aucune'">
        <div class="info_musique">
          <p>Musique dans la file : Aucune</p>
        </div>
      </section>
      <section v-cloak v-else>
        <img class="img_musique" v-bind:src="musique.imagePiste" style="width:150px">
        <div class="info_musique">
          <h2>Titre</h2>
          <p>{{musique.nomPiste}}</p>
          <hr>
          <h2>Artiste</h2>
          <p>
            <span v-for="(artiste,index) in musique.artistes" v-bind:key="index">
              {{artiste.prénom}} {{artiste.nom}}
              <br>
            </span>
          </p>
          <hr>
          <h2>Album</h2>
          <br>
          <p>
            <span v-for="(album,index) in musique.albums" v-bind:key="index">
              {{album.nomAlbum}}
              <br>
            </span>
          </p>
        </div>
      </section>
      <!--<div id="wait"></div>-->
    </div>
    <router-link to="/file">
      <div class="home_button">
        <p>Voir le contenu de la file</p>
      </div>
    </router-link>
    <router-link to="/menuBibliotheque">
      <div class="home_button">
        <p>Gérer sa bibliotheque</p>
      </div>
    </router-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "accueil",
  props:['url'],
  data() {
    return {
      musique: "aucune",
      boucle: ""
    };
  },
  //avant de changer de route, on supprime notre boucle de recuperation de données
  beforeRouteLeave(to, from, next) {
    clearInterval(this.boucle);
    next();
  },
  methods: {
    //retourne la premiere piste du jukebox
    getFirstFile: function() {
        axios
          .get(this.url + "File", {
            context: document.body,
            params: {
              bartender: localStorage.token,
              first: true
            }
          })
          .then(response => {
            if (response.data.pistes.length > 0) {
              this.musique = response.data.pistes[0].piste;
            } else {
              this.musique = "aucune";
            }
          });
    }
  },
  created() {
    this.getFirstFile();
    // boucle de recuperation de données
    this.boucle = setInterval(() => {
      this.getFirstFile();
    }, 15000);
  }
};
</script>

<style>
.musique_en_cours {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.musique_en_cours section {
  width: 80%;
}
</style>
