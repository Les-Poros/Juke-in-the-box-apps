
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