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
        :key="item.id"
        @click="toCoworkers(item.id)"
    >
      <v-list-item-avatar>
        <v-img src="@/assets/scholar-avatar.png"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="item.name"></v-list-item-title>
      </v-list-item-content>

      <v-list-item-icon>
        <v-icon>mdi-arrow-right</v-icon>

      </v-list-item-icon>
    </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "CoWorker",
  mounted() {
    const data = new FormData();
    data.append("scholarID", this.$route.query.id);
    request("POST", "/api/PortalManager/getCoauthors/", data)
      .then((res) => {
        console.log(res)
        this.items = res.coworkers;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data: () => ({
    items: [],
  }),
  methods: {
    toCoworkers(ID){
      if(ID){
        this.$router.push({path:'/scholar', query: {id: ID}})
        this.$router.go(0)
      } else {
        this.$message.error('没有该学者信息');
      }
    }
  }
}
</script>

<style scoped>

</style>