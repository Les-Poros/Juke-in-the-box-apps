<template>
  <div>
    <h1>Juke in the box</h1>
    <input v-model="search" type="text" class="barre" id="search" placeholder="rechercher">
    <button @click="getCatalogue()" :disabled="attente">rechercher</button>
    <div class="bibliotheque">
      <div id="wait"></div>
      <div v-cloak class="biblio_pistes" v-for="(piste,index) in listMusiques" v-bind:key="index">
        <div class="piste">
          <img class="img_piste" :src="piste.imagePiste">
          <p>
            <span v-for="(artiste,index) in piste.artistes" v-bind:key="index">
              <span v-if="index !== 0">/</span>
              {{artiste.prénom}} {{artiste.nom}}
            </span>
            - {{piste.nomPiste}}
          </p>
          <button class="add_button" v-on:click="addFile(piste.idPiste)">Ajouter à la file</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["apiurl"],
  data() {
    return { listMusiques: "", search: "", attente: false };
  },
  methods: {
    getCatalogue: function() {
      this.attente = true;
      axios
        .get(this.apiurl + "catalogue", {
          params: {
            piste: this.search,
            token: localStorage.token
          }
        })
        .then(response => {
          this.attente = false;
          if (response["data"]["catalogue"]["pistes"].length > 0) {
            this.listMusiques = response["data"]["catalogue"]["pistes"];
          } else {
            axios
              .get(this.apiurl + "validateJukebox", {
                context: document.body,
                params: {
                  token: localStorage.token
                }
              })
              .then(response => {
                if (response.data.validate) this.listMusiques = "";
                else
                  this.$router.push({
                    name: "Login",
                    params: { nextUrl: this.$route.fullPath }
                  });
              });
          }
        });
    },
    addFile: function(idPiste) {
      const params = new URLSearchParams();
      params.append("id", idPiste);
      params.append("token", localStorage.token);
      axios.post(this.apiurl + "addfile", params).then(() => {
        this.$router.push("/");
      });
    }
  },
  created() {
    this.getCatalogue();
  }
};
</script>

<style>
.biblio_pistes {
  width: 95%;
}
.piste {
  height: 100px;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 2%;
  padding-bottom: 2%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.piste p {
  width: 50%;
  padding-left: 5px;
  padding-right: 5px;
}
.img_piste {
  width: 30%;
  height: inherit;
}
.add_button {
  width: 20%;
  height: 80%;
  color: #ffffff;
  background: #456072;
  background: linear-gradient(top, #456072 0%, #2c4759 100%);
  background: -moz-linear-gradient(top, #456072 0%, #2c4759 100%);
  background: -webkit-linear-gradient(top, #456072 0%, #2c4759 100%);
  background: -o-linear-gradient(top, #456072 0%, #2c4759 100%);
  border: 1px solid #0f2636;
  border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  -o-border-radius: 10px;
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.3),
    inset 1px 1px 0px 0px rgba(255, 255, 255, 0.25);
  -moz-box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.3),
    inset 1px 1px 0px 0px rgba(255, 255, 255, 0.25);
  -webkit-box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.3),
    inset 1px 1px 0px 0px rgba(255, 255, 255, 0.25);
  -o-box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.3),
    inset 1px 1px 0px 0px rgba(255, 255, 255, 0.25);
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.3);
}
</style>
