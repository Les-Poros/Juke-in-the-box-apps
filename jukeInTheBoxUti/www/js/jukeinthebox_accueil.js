var content = new Vue({
  el: '.musique_en_cours',
  data: {
    musique: 'aucune'
  },
  methods: {
    start: function () {
      this.getFirstFile();
      setInterval(function () { content.getFirstFile(); }, 15000);
    },
    getFirstFile: function () {
      axios
        .get('https://webetu.iutnc.univ-lorraine.fr/www/rimet2u/jukeinthebox/File', {
          context: document.body,
          params: {
            "token": token.token,
            "first": true
          },
        })
        .then((response) => {
          if (response.data.pistes.length > 0) {
            this.musique = response.data.pistes[0].piste;
          }
          else {
            this.musique = 'aucune';
          }
        });
    }
  },
  computed: {

  },
  created() {

  }
});
