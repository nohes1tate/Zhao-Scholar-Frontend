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
        @click="toCoworkers"
    >
      <v-list-item-avatar>
        <v-img :src="item.avatar"></v-img>
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
      { active: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
      { active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
      { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
      { title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
    ],
  }),
  methods: {
    toCoworkers(){
      console.log("click")
    }
  }
}
</script>

<style scoped>

</style>