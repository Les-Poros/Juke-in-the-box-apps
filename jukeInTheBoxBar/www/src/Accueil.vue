<template>
  <div>
    <ul class="navigation">
      <router-link to="/file">
        <li>
          <button>Voir le contenu de la file</button>
        </li>
      </router-link>
      <router-link to="/menuBibliotheque">
        <li>
          <button>Gérer sa bibliotheque</button>
        </li>
      </router-link>
      <router-link to="/stat">
        <li>
          <button>Statistiques</button>
        </li>
      </router-link>
    </ul>
    <h2>
      Mode du jukebox :
      <span v-if="blindtest===1">Normal</span>
      <span v-else-if="blindtest===0">Blindtest</span>
    </h2>
    <br>
    <button class="button" @click="changeMode">Changer Mode</button>

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
          <div class="bt-action">
            <button v-if="status!='pause'" :disabled="status!='play'" v-on:click="changeStatus()">
              <img src="../images/pause.png">
            </button>
            <button v-else :disabled="status!='pause'" v-on:click="changeStatus()">
              <img src="../images/play.png">
            </button>
            <button :disabled="status=='next' || status=='repeat'" v-on:click="repeat()">
              <img src="../images/replay.png">
            </button>
            <button :disabled="status=='next' || status=='repeat'" v-on:click="skip()">
              <img src="../images/skip.png">
            </button>
          </div>
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
      boucle: "",
      status: "play",
      blindtest: ""
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
            bartender: localStorage.token,
            first: true
          }
        })
        .then(response => {
          response;
          this.getStartStatus();
          if (response.data.pistes.length > 0) {
            this.musique = response.data.pistes[0].piste;
          } else {
            this.musique = "aucune";
          }
        });
    },
    getStartStatus() {
      axios
        .get(this.apiurl + "getJukeboxAction", {
          context: document.body,
          params: {
            bartender: localStorage.token
          }
        })
        .then(response => {
          this.status = response.data.action;
          this.blindtest = response.data.blindtest;
        });
    },
    changeStatus() {
      const params = new URLSearchParams();
      params.append("bartender", localStorage.token);
      if (this.status == "pause") {
        axios.post(this.apiurl + "play", null, { params: params }).then(() => {
          this.status = "play";
        });
      } else {
        axios.post(this.apiurl + "pause", null, { params: params }).then(() => {
          this.status = "pause";
        });
      }
    },
    changeMode() {
      const params = new URLSearchParams();
      params.append("bartender", localStorage.token);
      if (this.blindtest) {
        axios
          .post(this.apiurl + "modeNormal", null, { params: params })
          .then(() => {
            this.blindtest = 0;
          });
      } else {
        axios
          .post(this.apiurl + "modeBlindtest", null, { params: params })
          .then(() => {
            this.blindtest = 1;
          });
      }
    },
    skip() {
      this.status = "next";
      const params = new URLSearchParams();
      params.append("bartender", localStorage.token);
      axios.post(this.apiurl + "next", null, { params: params }).then(() => {
        let self = this;
        setTimeout(function() {
          self.getFirstFile();
        }, 2000);
      });
    },
    repeat() {
      this.status = "repeat";
      const params = new URLSearchParams();
      params.append("bartender", localStorage.token);
      axios.post(this.apiurl + "repeat", null, { params: params }).then(() => {
        let self = this;
        setTimeout(function() {
          self.getFirstFile();
        }, 2000);
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
.bt-action button {
  cursor: pointer;
  border: 0;
  padding: 5px;
  margin-top: 10px;
  background: none;
  box-shadow: none;
  border-radius: 0px;
}
button:disabled {
  background-color: gray;
}
.musique_en_cours {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
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
.button {
  color: white;
  background: #456072;
  border: 1px solid #0f2636;
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.3),
    inset 1px 1px 0px 0px rgba(255, 255, 255, 0.25);
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.3);
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 10px;
  padding-left: 10px;
  margin-top: 10px;
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
.bt-action img {
  padding-right: 10px;
  padding-left: 10px;
}
</style>
