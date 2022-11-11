<template>
  <div class="scholar-page">
    <div class="scholar-info-box box">
      <div class="scholar-top">
        <div class="scholar-img">
          <v-avatar color="grey">
            <v-icon dark>mdi-account-circle</v-icon>
          </v-avatar>
        </div>
        <div class="scholar-mid-info">
          <div style="font-size: 30px">
            Scholar Name
          </div>
          <div>
            <v-icon>mdi-home-outline</v-icon>
            Beihang University
          </div>
        </div>
      </div>
      <div class="scholar-bottom"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ScholarPortal',
  }
</script>

<style>
.scholar-page{
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  padding-left: 10vh;
}
.scholar-info-box {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 100vh;
}
.box{
  box-shadow: 0 2px 10px rgb(0 0 0 / 10%);
  border-radius: 4px;
}
.scholar-top {
  display: flex;
  flex-direction: row;
  min-height: 25vh;
  align-items: center;
}
.scholar-bottom {
  display: flex;
  flex-direction: row;
  background: #f9fafc;
  height: 20vh;
}
.scholar-img {
  width: 10vh;
}
.scholar-mid-info {
  display: flex;
  flex-direction: column;
}
</style>