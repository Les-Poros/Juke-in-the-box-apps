<template>
  <div>
    <h1>Juke in the box</h1>
    <div class="file">
      <section>
        <div class="file_piste">
          <p v-cloak class="musique_file" v-for="(musique,index) in listMusiques" v-bind:key="index">
            {{index+1}})
            <span v-for="(artiste,index) in musique.piste.artistes" v-bind:key="index">
               <span
                v-if="index !== 0"
              >/</span>
              {{artiste.prénom}} {{artiste.nom}}
            </span>
            - {{musique.piste.nomPiste}}
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props:['url'],
  name: "accueil",
  data() {
    return { listMusiques: [], boucle: "" };
  },
  //avant de changer de route, on supprime notre boucle de recuperation de données
  beforeRouteLeave(to, from, next) {
    clearInterval(this.boucle);
    next();
  },
  methods: {
      //retourne la file du jukebox
    getFile: function() {
        axios
          .get(this.url + "File", {
            context: document.body,
            params: {
              token: localStorage.token
            }
          })
          .then(response => {
            this.listMusiques = response["data"]["pistes"];
          });
    }
  },
  computed:{
    lastFor : function(list){
      return 
    }
  },
  created() {
    this.getFile();
    // boucle de recuperation de données
    this.boucle = setInterval(() => {
      this.getFile();
    }, 15000);
  }
};
</script>

<style>
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
  padding-top: 5%;
  padding-bottom: 5%;
  text-align: left;
  min-height: 70vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.file_piste {
  width: 100%;
}
</style>
