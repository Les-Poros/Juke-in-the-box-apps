<template>
  <div>
<ul class="navigation">
      <router-link to="/file">
        <li>
          <button>Voir le contenu de la file</button>
        </li>
      </router-link>
      <router-link to="/bibliotheque">
        <li>
          <button>Ajouter une musique</button>
        </li>
      </router-link>
    </ul>

    <div class="musique_en_cours">
      <section v-if="musique==='aucune'">
        <div class="info_musique">
          <p>Musique dans la file : Aucune</p>
        </div>
      </section>
      <section v-cloak v-else>
        <div class="info_musique">
          <img class="img_musique" v-bind:src="musique.imagePiste" style="width:150px">
          <BR/>
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "accueil",
  props: ["apiurl"],
  data() {
    return {
      musique: "aucune",
      boucle: ""
    };
  },
   beforeRouteLeave(to, from, next) {
    clearInterval(this.boucle);
    next();
  },
  methods: {
    getFirstFile: function() {
      axios
        .get(this.apiurl + "File", {
          context: document.body,
          params: {
            token: localStorage.token,
            first: true
          }
        })
        .then(response => {
          if (response.data.pistes.length > 0) {
            this.musique = response.data.pistes[0].piste;
          } else {
            axios
              .get(this.apiurl + "validateJukebox", {
                context: document.body,
                params: {
                  token: localStorage.token
                }
              })
              .then(response => {
                if (response.data.validate) this.musique = "aucune";
                else
                this.$router.push({
                    name: "Login",
                    params: { nextUrl: this.$route.fullPath }
                  });
              });
          }
        });
    }
  },
  created() {
    this.getFirstFile();
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
