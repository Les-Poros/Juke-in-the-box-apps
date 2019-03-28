<template>
  <div v-cloak>
    <div>
      <p>Veuillez entrer votre token (qrcode)</p>
      <br>
      <input
        type="search"
        v-model="token"
        class
        id="token"
        placeholder="Entrer votre qrcode"
        v-on:keyup.enter="entrerToken()"
      >
      <p v-if="!saisie">Se token n'existe pas</p>
      <button v-on:click="entrerToken()">Valider</button>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "login",
  props: ["nextUrl","apiurl"],
  data() {
    return {
      token: "",
      saisie: true
    };
  },
  methods: {
    entrerToken: function() {
      localStorage.token = this.token;
      axios
        .get(this.apiurl + "validateJukebox", {
          context: document.body,
          params: {
            bartender: localStorage.token
          }
        })
        .then(response => {
          if (response.data.validate) {
            if (this.$route.params.nextUrl)
              this.$router.push(this.$route.params.nextUrl);
            else this.$router.push("/");
          } else this.saisie = false;
        });
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
</style>
