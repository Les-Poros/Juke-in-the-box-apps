<template>
  <div>
    <!--Selecteur page-->
    <nav>
      <ul style="display:flex;justify-content:center">
        <li @click="pageSuivant(pagination.prev)" class="pagination">
          <p>Precedent</p>
        </li>
        <li
          class="pagination"
          @click="pageSuivant(pagination.prev)"
          v-if="pagination.prev!=pagination.act"
        >
          <p>{{pagination.prev}}</p>
        </li>

        <li class="pagination active">
          <p>{{pagination.act}}</p>
        </li>

        <li
          @click="pageSuivant(pagination.next)"
          class="pagination"
          v-if="pagination.next!=pagination.act"
        >
          <p>{{pagination.next}}</p>
        </li>
        <li @click="pageSuivant(pagination.next)" class="pagination">
          <p>Suivant</p>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "pagination",
  props: ["pagination"],
  methods: {
    //Permet de changer les parametres actuelle de la route en fonction de la page voulu et de la taille voulu
    pageSuivant: function(page) {
      this.$router.push({
       query: { page: page, search:this.$route.query.search,action:this.$route.query.action}
      });
    }
  }
};
</script>

<style>
.pagination {
  color: white;
  padding: 8px 16px;
  margin: 0;
  background-color: rgb(60, 70, 73);
  border: 1px solid black;
  text-decoration: none;
}
.active {
  background-color: gray
}
</style>
