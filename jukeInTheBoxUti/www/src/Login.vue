<template>
  <div v-cloak>
    <div>
      <p>Veuillez scannez le qrcode du jukebox</p>
      <br>
      <button v-on:click="scan()">Scanner</button>
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
</style>
