var content_biblio = new Vue({
    el: '.bibliotheque',
    data: {
     bibliotheque :'',
     titreBiblio : '',

    musique: '',
    estVide: true,
    aPlusieursArtistes: false,
    nomPiste: '',
    albumPiste: '',
    imagePiste: '',
    artistesPiste: '',
    prenomArtiste: '',
    nomArtiste: '',
    genrePiste: '',
    tabPiste:[],
    
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
                console.log(response);
                //On récupère le titre de la bibliothèque
                  this.titreBiblio =  response.data.catalogue["nomCatag"] ;
                //On récupère le contenu de la bibliothèque. Comme il y a plusieurs
                //pistes dans la bibliothèque, on boucle sur toutes les pistes.
                for (var i = 0; i < response.data.catalogue.pistes.length ; i++) {
                  this.musique = response.data.catalogue.pistes[i];
                  
                  this.estVide = false;
                  this.nomPiste = this.musique["nomPiste"];
                  this.albumPiste = this.musique["albums"][0]["nomAlbum"];
                  this.imagePiste = this.musique["imagePiste"];
                  this.genrePiste = this.musique["genres"][0];
                  
                  
                  if (this.musique["artistes"].length > 1) {
                    this.aPlusieursArtistes = true;
                    this.artistesPiste = this.musique["artistes"];
                  }
                  else {
                    this.prenomArtiste = this.musique["artistes"][0]["prénom"];
                    this.nomArtiste = this.musique["artistes"][0]["nom"];
                  }
                  
                  //On ajoute les informations de chaque piste dans tabPiste qui sera interprété dans le html
                              
                              this.tabPiste+=('<img  style=width:150px src='+ this.imagePiste+'>'+'<h2> artiste: </h2>'+this.nomArtiste+'<h2> titre:</h2>'+this.nomPiste+'<h2> album:</h2>'+this.albumPiste+''+'<h2> genre: </h2>'+this.genrePiste+'<button class=add_button v-on:click=deleteFileBiblio(piste.idPiste)>Retirer</button>'+'<br />');
                }
                 
              }
          });
      },
      deleteFileBiblio : function(idPiste){
        
        const params = new URLSearchParams();
        params.append('id', idPiste);
        params.append('bartender', token);
        
        axios
          .post("https://webetu.iutnc.univ-lorraine.fr/www/rimet2u/jukeinthebox/deleteFileBiblio", params)
            .then(() => {
              let lien = window.location.toString().split("addmusic.html");
              window.location = lien[0] + 'accueil.html';
              window.alert('Votre musique a été supprimer de la Bibliothèque !');
            });
            
        },
    },
    computed: {
    },
    //On part du principe qu'il n'y a pour l'instant qu'une bibliothèque catalogue/1
    created() {
      this.getBiblio();
    }
  });