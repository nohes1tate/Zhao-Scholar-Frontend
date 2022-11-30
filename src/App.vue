<template>
  <v-app id="app">
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
<style>
::-webkit-scrollbar {
  width: 5px;
  height: 16px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgb(241 239 239 / 30%);
  background-color: #0274b3;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgb(224 223 223 / 30%);
  border-radius: 10px;
}

#app {
  background-color: #fcfcfc;
}
</style>
