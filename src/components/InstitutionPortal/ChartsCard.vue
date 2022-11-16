<template>
  <div class="institution-chart-card">
    <v-card height="25vh" width="30vw"  elevation="2">
      <div>{{ title }}</div>
    </v-card>
  </div>
</template>

<script>

export default {
  name: "ChartsCard",
  props: {
    title: {
      type: String,
      default: ""
    }
  }
}
</script>

<style scoped>
.institution-chart-card {
  margin-left: 2vw;
  margin-top: 2vh;
}
</style>
