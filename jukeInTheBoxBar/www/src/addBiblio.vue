<script>
import axios from "axios";
import template from "./templates/BiblioTemplate.js";
export default {
  name: "addBiblio",
  props: ["apiurl"],
  template:template.template,
  data() {
    return { listMusiques: "", search: "" };
  },
  methods: {
    getCatalogue: function() {
      axios
        .get(this.apiurl + "catalogue", {
          params: {
            piste: this.search,
            bartender: localStorage.token,
            addCatag: true
          }
        })
        .then(response => {
          this.listMusiques = response["data"]["catalogue"]["pistes"];
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
