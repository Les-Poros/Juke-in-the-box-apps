var bibliotheque = new Vue({
    el: '.app',
    data: {
      listMusiques: '',
      search:""
    },
    methods: {
      getCatalogue : function (){
        axios
        .get("https://webetu.iutnc.univ-lorraine.fr/www/rimet2u/jukeinthebox/catalogue", {
        params: {
          "piste":this.search,
          "bartender":token
        }
      })
        .then((response) => {
          this.listMusiques = response["data"]["catalogue"]["pistes"];
        });
      },
      // addFile : function(idPiste){
      //   console.log(idPiste);
      //   const params = new URLSearchParams();
      //   params.append('id', idPiste);
      //   axios
      //     .post("https://webetu.iutnc.univ-lorraine.fr/www/rimet2u/jukeinthebox/addfile/"+token, params)
      //     .then(() => {
      //       let lien = window.location.toString().split("bibliotheque.html");
      //       window.location = lien[0] + 'accueil.html';
      //       window.alert('Votre musique a été ajoutée à la file !');
      //     });
      // }
    },
    computed: {
    },
    created() {
      this.getCatalogue();
    }
  });
  