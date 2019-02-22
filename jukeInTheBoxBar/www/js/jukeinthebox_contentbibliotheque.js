var content_biblio = new Vue({
    el: '.bibliotheque',
    data: {
     bibliotheque :'',
     titreBiblio : '',
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
                this.bibliotheque = response.data.catalogue.pistes[0].bibliotheques ;
                this.titreBiblio = this.bibliotheque[0]['titre'];
                
            }
        });
    }
  });