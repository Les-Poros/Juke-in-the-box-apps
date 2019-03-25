<template>
  <div v-cloak class="modal">
    <div class="modal-content">
      <p class="white">Veuillez entrer votre token (qrcode)</p>
      <br>
      <input
        type="search"
        v-model="token"
        class
        id="token"
        placeholder="Entrer votre qrcode"
        v-on:keyup.enter="entrerToken()"
      >
      <button v-on:click="entrerToken()">Valider</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  props: ["nextUrl"],
  data() {
    return {
      token: ""
    };
  },
  methods: {
    entrerToken: function() {
      localStorage.token = this.token;
      if (this.$route.params.nextUrl)
        this.$router.push(this.$route.params.nextUrl);
      else this.$router.push("/");
    }
  },
  created() {
    if (localStorage.token != null) {
      this.$router.push("/");
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
