<template>
  <div class="scholar-info-box box">
    <div class="scholar-top">
      <div class="scholar-img">
        <v-avatar size="80">
          <img src="@/assets/scholar-avatar.png" alt="scholar avatar">
        </v-avatar>
      </div>
      <div class="scholar-mid-info">
        <div style="font-size: 30px">
          {{ scholarInfo.name }}
        </div>
        <div>
          <v-icon>mdi-home-outline</v-icon>
          {{ scholarInfo.affiliation }}
        </div>
        <div class="field-tag-box">
          <div class="field-tag">python</div>
          <div class="field-tag">java</div>
          <div class="field-tag">c++</div>
        </div>
      </div>
      <div style="margin-left: 1vw">
        <v-btn outlined color="primary" v-if="!isMine" @click="toApply">认领门户</v-btn>
      </div>
      <div style="margin-left: 1.5vw">
        <v-btn outlined color="green" v-if="!hasFavored" @click="favor">关注学者</v-btn>
        <v-btn outlined color="gray" v-if="hasFavored" @click="unFavor">取消关注</v-btn>
      </div>
    </div>
    <div class="scholar-bottom">
      <div class="scholar-bottom-statistics">
        <div style="font-size: 40px">
          {{ scholarInfo.paperCount }}
        </div>
        <div>文献数</div>
      </div>
      <div class="scholar-bottom-statistics">
        <div style="font-size: 40px">
          {{ scholarInfo.citationCount }}
        </div>
        <div>被引数</div>
      </div>
      <div class="scholar-bottom-statistics">
        <div style="font-size: 40px">
          {{ scholarInfo.hIndex }}
        </div>
        <div>影响力指数</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScholarInfoBox',
  props:{
    isMine:{default: false},
  },
  methods: {
    toApply(){
      this.$router.push({path:'/apply'})
    },
    favor(){
      this.hasFavored = true
    },
    unFavor(){
      this.hasFavored = false
    }
  },
  data() {
    return {
      scholarInfo: {
        name: 'Scholar Name',
        affiliation: 'Beihang University',
        field: ['python', 'java', 'c++'],
        paperCount: 1200,
        citationCount: 10000,
        hIndex: 10000,
      },
      hasFavored: false,
    }
  },
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
  padding-left: 2vh;
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
  margin-left: 9vh;
  margin-right: 9vh;
}
</style>