 export default{template :`  <div>
<h1>Juke in the box</h1>
<input
  v-model="search"
  v-on:input="getCatalogue()"
  type="text"
  class="barre"
  id="search"
  placeholder="rechercher"
>
<div class="bibliotheque">
  <div v-cloak class="biblio_pistes" v-for="(piste,index) in listMusiques" v-bind:key="index">
    <div class="piste">
      <img class="img_piste" :src="piste.imagePiste">
      <p>
        <span v-for="(artiste,index) in piste.artistes" v-bind:key="index">
          <span v-if="index !== 0">/</span>
          {{artiste.prénom}} {{artiste.nom}}
        </span>
        - {{piste.nomPiste}}
      </p>
      <button
        class="add_button"
        v-on:click="addMusicBiblio(piste.idPiste)"
      >Ajouter à votre bibliotheque</button>
    </div>
  </div>
</div>
</div>`}