
var file = new Vue({
  el: '.file',
  data: {
    listMusiques: [],
    estVideFile: true
  },
  methods: {
    getFile : function(){
      axios
      .get('https://webetu.iutnc.univ-lorraine.fr/www/rimet2u/jukeinthebox/File', {
        context: document.body,
        params: {
          "token":token
        }
      })
      .then((response) => {
        this.listMusiques = response["data"]["pistes"];
      });
    }
  },
  computed: {
  },
  created() {
    this.getFile();
    setInterval(function(){file.getFile();}, 15000);
  }
});
