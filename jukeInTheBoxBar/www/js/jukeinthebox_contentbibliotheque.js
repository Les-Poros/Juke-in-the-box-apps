var content = new Vue({
    el: '.bibliotheque',
    data: {
     titreBiblio : '',
     listMusiques : '',

    },
    methods: {
      start : function(){
        this.getBiblio();
      },
      getBiblio : function (){
        axios
        .get("https://webetu.iutnc.univ-lorraine.fr/www/rimet2u/jukeinthebox/catalogue", {
          params: {
            "bartender":token.token
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
        params.append('bartender', token.token);
        
        axios
          .post("https://webetu.iutnc.univ-lorraine.fr/www/rimet2u/jukeinthebox/deleteMusicBiblio", params)
            .then(() => {
              this.getBiblio();
            });
            
        },
    },
    computed: {
    },
    
    created() {
    }
  });