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
      addFileBiblio : function(idPiste){
        console.log(idPiste);
      const params = new URLSearchParams();
      params.append('id', idPiste);
      params.append('bartender', token);
      console.log(token);
      axios
        .post("https://webetu.iutnc.univ-lorraine.fr/www/rimet2u/jukeinthebox/addFileBiblio", params)
          .then(() => {
            let lien = window.location.toString().split("addmusic.html");
            window.location = lien[0] + 'accueil.html';
            window.alert('Votre musique a été ajoutée à la Bibliothèque !');
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
  