var content_biblio = new Vue({
    el: '.bibliotheque',
    data: {
     titreBiblio : '',
     listMusiques : '',

    },
    methods: {
      getBiblio : function (){
        axios
        .get("https://webetu.iutnc.univ-lorraine.fr/www/rimet2u/jukeinthebox/catalogue", {
          params: {
            "bartender":token
          }
        })
          .then((response) => {
              
              if (response.data.catalogue.pistes.length > 0) {
                
                //On récupère le titre de la bibliothèque
                  this.titreBiblio =  response.data.catalogue["nomCatag"] ;
                  this.listMusiques = response["data"]["catalogue"]["pistes"];
                 
              }
          });
      },
      deleteMusicBiblio : function(idPiste){
        
        const params = new URLSearchParams();
        params.append('id', idPiste);
        params.append('bartender', token);
        
        
        axios
          .post("https://webetu.iutnc.univ-lorraine.fr/www/rimet2u/jukeinthebox/deleteMusicBiblio", params)
            .then(() => {
              let lien = window.location.toString().split("contentbiblio.html");
              window.location = lien[0] + 'contentbiblio.html';
              window.alert('Votre musique a été supprimer de la Bibliothèque !');
            });
            
        },
    },
    computed: {
    },
    
    created() {
      this.getBiblio();
    }
  });