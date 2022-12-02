<template>
  <v-card
      class="mx-auto"
      max-width="400"
  >
    <v-toolbar>
      <v-toolbar-title>合著学者</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-list subheader>
    <v-list-item
        v-for="item in items"
        :key="item.title"
        @click="toCoworkers(item.id)"
    >
      <v-list-item-avatar>
        <v-img src="@/assets/scholar-avatar.png"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="item.title"></v-list-item-title>
      </v-list-item-content>

      <v-list-item-icon>
        <v-icon>mdi-arrow-right</v-icon>

      </v-list-item-icon>
    </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "CoWorker",
  data: () => ({
    items: [
      { title: 'Jason Oner', id: 1 },
      { title: 'Ranee Carlson', id: 2 },
      { title: 'Cindy Baker', id: 3 },
      { title: 'Ali Connors', id: 4 },
    ],
  }),
  methods: {
    toCoworkers(ID){
      this.$router.push({path:'/scholar', query: {id: ID}})
    }
  }
}
</script>

<style scoped>

</style>