<template>
  <div class="scholar-info-box box">
    <div class="scholar-top">
      <div class="scholar-img">
        <v-avatar color="grey" size="60">
          <v-icon dark large>mdi-account-circle</v-icon>
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
        <div class="field-tag-box">
          <div class="field-tag">python</div>
          <div class="field-tag">java</div>
          <div class="field-tag">c++</div>
        </div>
      </div>
      <div>
        <v-btn outlined color="primary" v-if="!isMine">认领门户</v-btn>
      </div>
    </div>
    <div class="scholar-bottom">
      <div class="scholar-bottom-statistics">
        <div style="font-size: 40px">
          1200
        </div>
        <div>papers</div>
      </div>
      <div class="scholar-bottom-statistics">
        <div style="font-size: 40px">
          10000
        </div>
        <div>citations</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScholarInfoBox',
  props:{
    isMine:{default: false},
  }
}
</script>

<style>
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
  width: 15vh;
  padding-left: 3vh;
}
.scholar-mid-info {
  display: flex;
  flex-direction: column;
  width: 50vh;
}
.field-tag-box {
  display: flex;
  flex-direction: row;
  margin-top: 2vh;
}
.field-tag {
  background-color: #f5f5f5;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 2px;
  margin-right: 5px;
}
.scholar-bottom-statistics {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4vh;
  margin-left: 15vh;
  margin-right: 15vh;
}
</style>