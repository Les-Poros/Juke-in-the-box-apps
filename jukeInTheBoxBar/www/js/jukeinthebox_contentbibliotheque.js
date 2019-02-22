var content_biblio = new Vue({
    el: '.bibliotheque',
    data: {
     titreBiblio : '',
    },
    methods: {
    },
    computed: {
    },
    created() {
      axios
        .get('https://webetu.iutnc.univ-lorraine.fr/www/rimet2u/jukeinthebox/', {
          context: document.body,
        })
        .then((response) => {
         
        });
    }
  });