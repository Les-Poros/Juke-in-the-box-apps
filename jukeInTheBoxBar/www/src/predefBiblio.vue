<template>
  <div>
    <div v-if="catalogue">
      <br>
      <div class="search-zone">
      <input v-model="search" type="text" class="barre" id="search" placeholder="rechercher">
      <button class="button"
        v-on:click="
         $router.push({
        query: { page: 0,search:search,action:$route.query.action}
      });"
        :disabled="attente"
      >rechercher</button>
      </div>
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
              <td>{{catag.titre}}
               
                 <span v-if="catag.predef == 0" class="tag">#Perso</span>
                 <span class="tag" v-else>#Predef</span>
            
              </td>
              <td>
                <button class="button" v-on:click="selectCatag(catag.idBibliotheque)">Utiliser</button>
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

.search-zone {
  margin-bottom: 15px;
  
}

.tag {
  color: white;
  background-color: #2e3235;
  padding: 1px 9px 2px;
  font-size: 12.025px;
  font-weight: bold;
  white-space: nowrap;
  -webkit-border-radius: 9px;
  -moz-border-radius: 9px;
  border-radius: 9px;
}
</style>
