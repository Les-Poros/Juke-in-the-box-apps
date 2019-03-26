<template>
  <div v-cloak class="modal">
    <div class="modal-content">
      <p class="white">Veuillez scannez le qrcode du jukebox</p>
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
.white {
  color: white;
}
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: gray;
  margin: 40vh 0 0 40vw;
  padding: 20px;
  border: 1px solid #888;
  width: fit-content;
}
</style>
