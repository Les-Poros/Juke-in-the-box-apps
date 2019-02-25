
var token = new Vue({
    el: '.modal',
    data: {
      token:"",
      unshow: true
    },
    methods: {
        disparait : function(){
            this.unshow=true;
            localStorage.qrcode = this.token;
            content.start();
        },
    getCookie : function(cname){
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }
    },
    computed: {
        
    },
    created() {
        if (localStorage.qrcode) {
            this.token = localStorage.qrcode;
          }
          if(this.token == "")
          this.unshow=false;
          else 
          window.onload=function(){content.start()};
    }
  });