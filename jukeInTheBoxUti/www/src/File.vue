<template>
  <div>
    <h1>Juke in the box</h1>
    <div class="file">
      <section>
        <div class="file_piste">
          <p v-cloak class="musique_file" v-for="(musique,index) in listMusiques">
            {{index+1}})
            <span v-for="(artiste,index) in musique.piste.artistes">
              {{artiste.prénom}} {{artiste.nom}}
              <span
                v-if="index != Object.keys(musique.piste.artistes).length - 1"
              >/</span>
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
     //si le token est valide alors on effectue la requete
      //sinon on coupe la boucle de recuperation de données et on redemande un token valide (cf tokenValide)
      if (this.$parent.tokenValide()) {
        axios
          .get(this.$parent.url + "File", {
            context: document.body,
            params: {
              token: this.$parent.token
            }
          })
          .then(response => {
            this.listMusiques = response["data"]["pistes"];
          });
      } else {
        this.listMusiques = [];
        clearInterval(this.boucle);
      }
    }
  },
  computed: {},
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
