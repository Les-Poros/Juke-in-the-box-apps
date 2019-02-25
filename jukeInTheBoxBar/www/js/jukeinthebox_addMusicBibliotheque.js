var content = new Vue({
    el: '.app',
    data: {
      listMusiques: '',
      search:""
    },
    methods: {
      start : function(){
        this.getCatalogue();
      },
      getCatalogue : function (){
        axios
        .get("https://webetu.iutnc.univ-lorraine.fr/www/rimet2u/jukeinthebox/catalogue", {
        params: {
          "piste":this.search,
          "bartender":token.token,
          "addCatag":true
        }
      })
        .then((response) => {
          console.log(response);
          this.listMusiques = response["data"]["catalogue"]["pistes"];
        });
      },
      addMusicBiblio : function(idPiste){
      const params = new URLSearchParams();
      params.append('id', idPiste);
      params.append('bartender', token.token);
      
      axios
        .post("https://webetu.iutnc.univ-lorraine.fr/www/rimet2u/jukeinthebox/addMusicBiblio", params)
          .then(() => {
            this.getCatalogue();
          });
          
      }
    },
    computed: {
    },
    created() {

    }
  });
  