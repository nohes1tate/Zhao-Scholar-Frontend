<template>
  <div>
    <div class="institution-top">
      <div class="top-left">
        <v-card  elevation="2">
          <v-row>
            <v-col cols="2">
              <v-img width="20vh" height="20vh" :src="institutionLogo">

              </v-img>
            </v-col>
            <v-col cols="6">
              <v-row>
                <div class="institution-name">
                  中国科学院
                </div>
              </v-row>
              <v-row>
                content
              </v-row>
              <v-row>
                <v-btn> button1 </v-btn>
                <v-btn> button2 </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </div>
      <div class="top-right" >
        机构数据
      </div>
    </div>
    <div class="institution-charts">
      <div v-for="item in charts" v-bind:key="item.id">
        <v-card elevation="2">{{item.value}}</v-card>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'SearchResult',
    data: () => ( {
      charts: [{id: 1,value: 2},{id: 2,value: 6}],
      institutionLogo: "https://www.acemap.info/api/v2/img/affiliation/2101067073.jpg"
    })
  }
</script>

<style scoped>
.institution-top {
  width: 100%;
  display: flex;
  justify-content: space-between;
}


.top-left {
  width: 66%;
  margin-top: 10vh;
}

.top-right {
  width: 33%;
  height: 30vh;
}

.institution-name{
  font-size: 32px;
  font-weight: bold;
}

.institution-charts {
  display: flex;
  margin-top: 5vh;
}
</style>
