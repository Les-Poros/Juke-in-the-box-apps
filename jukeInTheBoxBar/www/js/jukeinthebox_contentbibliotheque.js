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
            console.log(response);
            if (response.data.catalogue.pistes.length > 0) {
              //On récupère le titre de la bibliothèque
                this.bibliotheque = response.data.catalogue.pistes[0].bibliotheques ;
                this.titreBiblio = this.bibliotheque[0]['titre'];
              //On récupère le contenu de la bibliothèque
                this.musique = response.data.catalogue.pistes[0];
                
                this.estVide = false;
                this.nomPiste = this.musique["nomPiste"];
                this.albumPiste = this.musique["albums"][0]["nomAlbum"];
                this.imagePiste = this.musique["imagePiste"];
                
                if (this.musique["artistes"].length > 1) {
                  this.aPlusieursArtistes = true;
                  this.artistesPiste = this.musique["artistes"];
                }
                else {
                  this.prenomArtiste = this.musique["artistes"][0]["prénom"];
                  this.nomArtiste = this.musique["artistes"][0]["nom"];
                }
                console.log(this.nomArtiste);
                
            }
        });
    }
  });