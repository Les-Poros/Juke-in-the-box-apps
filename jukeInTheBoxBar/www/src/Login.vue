<template>
  <div v-cloak>
    
    <div><br/>
      <h2>Veuillez entrer votre token (qrcode)</h2>
      <br/>
      <input
        type="search"
        v-model="token"
        class="token-zone"
        id="token"
        placeholder="Entrer votre token"
        v-on:keyup.enter="entrerToken()"
      />
      <button class="button" v-on:click="entrerToken()">Valider</button>
      <p v-if="!saisie">Ce token n'existe pas</p>
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

.button{
  color : white;
  background: #456072;
  border: 1px solid #0f2636;
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.3),
    inset 1px 1px 0px 0px rgba(255, 255, 255, 0.25);
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.3);
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 10px;
  padding-left: 10px;
}
.token-zone {
  margin-bottom: 15px;
  margin-top: 15px;
   padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 10px;
  padding-left: 10px;
}

</style>
