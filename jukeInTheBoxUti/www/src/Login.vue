<template>
  <div v-cloak>
    <div class="container">
      <h2>Aucun qrcode n'à été scanné ou celui-ci à expiré</h2>
      <br/><br/>
      <h2>Veuillez scannez le qrcode du jukebox</h2>
      <br/>
      <button class="button buttonScan" v-on:click="scan()">Scanner</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  props: ["nextUrl"],
  methods: {
    scan: function() {
      let self=this;
      cordova.plugins.barcodeScanner.scan(
        function(result) {
          if(result.text!="")
          localStorage.token = result.text;
          if (self.$route.params.nextUrl)
            self.$router.push(self.$route.params.nextUrl);
          else self.$router.push("/");
        },
        function(error) {
          alert("Scanning failed: " + error);
        }
      );
    }
  }
};
</script>

<style>
.button{
  color : white;
  background: #456072;
  border: 1px solid #0f2636;
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.3),
    inset 1px 1px 0px 0px rgba(255, 255, 255, 0.25);
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.3);
  padding-top: 5px;
  margin-top: 10px;
  padding-bottom: 5px;
  padding-right: 10px;
  padding-left: 10px;
}
.container{
  margin-top: 10px;
}
</style>
