var accueil = new Vue({
  el: '.musique_en_cours',
  data: {
    musique: 'aucune',
    estVide: true,
    aPlusieursArtistes: false,
    aPlusieursAlbums: false,
    nomPiste: 'aucune',
    albumsPiste: '',
    nomAlbum:'',
    imagePiste: '',
    artistesPiste: '',
    prenomArtiste: '',
    nomArtiste: '',
  },
  methods: {
    getFirstFile : function(){
      axios
      .get('https://webetu.iutnc.univ-lorraine.fr/www/rimet2u/jukeinthebox/File', {
        context: document.body,
        params:{
          "token":token,
          "first":true
              },
      })
      .then((response) => {
        if (response.data.pistes.length > 0) {
          this.musique = response.data.pistes[0].piste;
          this.estVide = false;
          this.nomPiste = this.musique["nomPiste"];
          this.albumPiste = this.musique["albums"][0]["nomAlbum"];
          this.imagePiste = this.musique["imagePiste"];
          if (this.musique["artistes"].length > 1) {
            this.aPlusieursArtistes = true;
            this.artistesPiste = this.musique["artistes"];
          }
          else {
            this.aPlusieursArtistes = false;
            this.prenomArtiste = this.musique["artistes"][0]["prénom"];
            this.nomArtiste = this.musique["artistes"][0]["nom"];
          }
          if (this.musique["albums"].length > 1) {
            this.aPlusieursAlbums = true;
            this.albumsPiste = this.musique["albums"];
          }
          else {
            this.aPlusieursAlbums = false;
            this.nomAlbum = this.musique["albums"][0]["nomAlbum"];
          }
        }
        else{
          this.musique= 'aucune';
          this.estVide= true;
          this.aPlusieursArtistes= false;
          this.aPlusieursAlbums= false;
          this.nomPiste= 'aucune';
          this.albumsPiste= '';
          this.nomAlbum='';
          this.imagePiste= '';
          this.artistesPiste= '';
          this.prenomArtiste= '';
          this.nomArtiste= '';
        }
      });
    }
  },
  computed: {
  },
  created() {
    this.getFirstFile();
    setInterval(function(){accueil.getFirstFile();}, 15000);
  }
});
