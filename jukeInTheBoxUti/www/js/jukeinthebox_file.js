
var content = new Vue({
  el: '.file',
  data: {
    listMusiques: [],
    estVideFile: true
  },
  methods: {
    start : function(){
      this.getFile();
      setInterval(function(){content.getFile();}, 15000);
    },
    getFile : function(){
      axios
      .get('https://webetu.iutnc.univ-lorraine.fr/www/rimet2u/jukeinthebox/File', {
        context: document.body,
        params: {
          "token":token.token
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
  }
});
