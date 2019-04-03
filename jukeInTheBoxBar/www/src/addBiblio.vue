<template>
  <div>
    <h2>Ajouter des musiques a votre bibliotheque : {{catalogue.nomCatag}}</h2>
    <div v-if="catalogue.predef==0">
      <br>
      <input v-model="search" type="text" class="barre" id="search" placeholder="rechercher">
      <button class="button"
        v-on:click="
         $router.push({
        query: { page: 0,search:search,action:$route.query.action}
      });"
        :disabled="attente"
      >rechercher</button>
      <div class="bibliotheque">
        <p
          style="text-align:right"
        >{{catalogue.pagination.size* catalogue.pagination.act}}-{{catalogue.pagination.size*catalogue.pagination.act + catalogue.pagination.count}} sur {{catalogue.pagination.total}}</p>
        <div
          v-cloak
          class="biblio_pistes"
          v-for="(piste,index) in catalogue.pistes"
          v-bind:key="index"
        >
          <div class="piste">
            <img class="img_piste" :src="piste.imagePiste">
            <p>
              <span v-for="(artiste,index) in piste.artistes" v-bind:key="index">
                <span v-if="index !== 0">/</span>
                {{artiste.prénom}} {{artiste.nom}}
              </span>
              - {{piste.nomPiste}}
            </p>
            <button v-on:click="addMusicBiblio(piste.idPiste)">
              <img src="../images/plus.png">
            </button>
          </div>
        </div>
      </div>
      <pagination :pagination="catalogue.pagination"></pagination>
    </div>
    <div v-else-if="catalogue.predef==1">Imposible de modifier un catalogue predefinie</div>
  </div>
</template>

<script>
import axios from "axios";
import pagination from "./Pagination.vue";
export default {
  name: "addBiblio",
  props: ["apiurl"],
  components: {
    pagination
  },
  data() {
    return {
      catalogue: "",
      search: this.$route.query.search ? this.$route.query.search : "",
      attente: false
    };
  },
  methods: {
    getCatalogue: function() {
      this.attente = true;
      axios
        .get(this.apiurl + "catalogue", {
          params: {
            piste: this.search,
            bartender: localStorage.token,
            addCatag: true,
            page: this.$route.query.page,
            size: 10
          }
        })
        .then(response => {
          this.attente = false;
          this.catalogue = response["data"]["catalogue"];
        });
    },
    addMusicBiblio: function(idPiste) {
      const params = new URLSearchParams();
      params.append("id", idPiste);
      params.append("bartender", localStorage.token);
      axios.post(this.apiurl + "addMusicBiblio", params).then(() => {
        this.getCatalogue();
      });
    }
  },
  watch: {
    "$route.query"() {
      this.search = this.$route.query.search ? this.$route.query.search : "";
      this.getCatalogue();
    }
  },
  created() {
    this.getCatalogue();
  }
};
</script>

<style>
button {
  cursor: pointer;
  border: 0;
  background: none;
  box-shadow: none;
  border-radius: 0px;
}
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
  border: 1px solid #0f2636;
  border-radius: 10px;
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.3),
    inset 1px 1px 0px 0px rgba(255, 255, 255, 0.25);
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.3);
}
.button{
  color : white;
  background: #456072;
  border: 1px solid #0f2636;
  border-radius: 10px;
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.3),
    inset 1px 1px 0px 0px rgba(255, 255, 255, 0.25);
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.3);
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 10px;
  padding-left: 10px;
}
</style>
