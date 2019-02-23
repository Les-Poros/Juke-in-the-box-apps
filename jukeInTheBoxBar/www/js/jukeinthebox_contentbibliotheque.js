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
    },
    computed: {
    },
    created() {
      axios
        .get('https://webetu.iutnc.univ-lorraine.fr/www/rimet2u/jukeinthebox/catalogue/1', {
          context: document.body,
        })
        .then((response) => {
            
            if (response.data.catalogue.pistes.length > 0) {
              
              //On récupère le titre de la bibliothèque
                this.bibliotheque = response.data.catalogue.pistes[0].bibliotheques ;
                this.titreBiblio = this.bibliotheque[0]['titre'];
              //On récupère le contenu de la bibliothèque
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
              
                this.tabPiste+=('<img  style=width:150px src='+ this.imagePiste+'>'+'<h2> artiste: </h2>'+this.nomArtiste+'<h2> titre:</h2>'+this.nomPiste+'<h2> album:</h2>'+this.albumPiste+''+'<h2> genre: </h2>'+this.genrePiste+'<br />');
              }
               
            }
        });
    }
  });