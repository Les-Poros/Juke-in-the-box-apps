<template>
  <div>
    <input v-model="search" type="text" class="barre" id="search" placeholder="rechercher">
    <button
      @click="$router.push({
        query: { page: 0, size:$route.query.size }
      });"
      :disabled="attente"
    >rechercher</button>
    <div class="bibliotheque">
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
          <img src="../images/plus.png" v-on:click="addMusicBiblio(piste.idPiste)">
        </div>
      </div>
    </div>
    <pagination v-if="pagination" :pagination="pagination"></pagination>
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
    return { listMusiques: "", search: "", attente: false, pagination: "" };
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
            size: this.$route.query.size
          }
        })
        .then(response => {
          this.attente = false;
          this.listMusiques = response["data"]["catalogue"]["pistes"];
          this.pagination = response["data"]["catalogue"]["pagination"];
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
      this.getCatalogue();
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
  border: 1px solid #0f2636;
  border-radius: 10px;
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.3),
    inset 1px 1px 0px 0px rgba(255, 255, 255, 0.25);
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.3);
}
</style>
