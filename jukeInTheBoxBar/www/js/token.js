
var token = new Vue({
    el: '.modal',
    data: {
      token:"",
      unshow: true
    },
    methods: {
        disparait : function(){
            this.unshow=true;
            localStorage.bartender = this.token;
            content.start();
        }
    },
    computed: {
        
    },
    created() {
        if (localStorage.bartender) {
            this.token = localStorage.bartender;
          }
          if(this.token == "")
          this.unshow=false;
          else 
          window.onload=function(){content.start()};
    }
  });