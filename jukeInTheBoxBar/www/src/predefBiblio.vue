<template>
  <div>
    <h2>Choisir une biblio</h2>
    <div v-if="catalogue">
      <br>
      <input v-model="search" type="text" class="barre" id="search" placeholder="rechercher">
      <button
        v-on:click="
         $router.push({
        query: { page: 0,search:search,action:$route.query.action}
      });"
        :disabled="attente"
      >rechercher</button>
      <div class="bibliotheque">
        <table>
          <thead>
            <tr>
              <th>titre</th>
              <th>{{catalogue.pagination.size* catalogue.pagination.act}}-{{catalogue.pagination.size*catalogue.pagination.act + catalogue.pagination.count}} sur {{catalogue.pagination.total}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-cloak v-for="(catag,index) in catalogue.catags" v-bind:key="index">
              <td>{{catag.titre}}</td>
              <td>
                <button class="add_button" v-on:click="selectCatag(catag.idBibliotheque)">Utiliser</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <pagination :pagination="catalogue.pagination"></pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import pagination from "./Pagination.vue";
export default {
  name: "biblio",
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
        .get(this.apiurl + "catalogueChoice", {
          params: {
            piste: this.search,
            bartender: localStorage.token,
            page: this.$route.query.page,
            size: 10
          }
        })
        .then(response => {
          this.catalogue = response.data.catalogue;
          this.attente = false;
        });
    },
    selectCatag: function(idCatag) {
      const params = new URLSearchParams();
      params.append("id", idCatag);
      params.append("bartender", localStorage.token);
      axios.post(this.apiurl + "selectCatag", params).then(() => {
        this.$router.push({
        query: { page: 0,search:'',action:'biblio'}
      });
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
.biblio_pistes {
  width: 95%;
}
button {
  cursor: pointer;
  border: 0;
  background: none;
  box-shadow: none;
  border-radius: 0px;
}
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
