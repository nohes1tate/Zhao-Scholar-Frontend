<template>
  <div height="100vh">
    <div width="100vw" class="bgimg" :style="{ height: '60vh' }">
      <!-- <v-card   background="linear-gradient(red, blue)"> -->
      <v-row :style="{ height: '60vh' }">
        <v-col cols="12" md="12" sm="2">
          <v-row>
            <v-col cols="12" md="2" sm="12">
              <h1 class="d-flex justify-center" :style="{ color: 'white' }">
                LOGO
              </h1>
            </v-col>
            <v-col cols="12" md="7" sm="12" />
            <v-col cols="12" md="3" sm="12" class="d-flex align-center">
              <div>
                <v-btn text :style="{ 'font-weight': 'bold', color: 'white' }"
                  >English</v-btn
                >
                <v-btn text :style="{ 'font-weight': 'bold', color: 'white' }"
                  >登录</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="12" sm="10">
          <v-row>
            <v-col cols="12" md="3" sm="12" />
            <v-col cols="12" md="6" sm="12">
              <v-row min-height="800px">
                <v-col cols="12" md="12" sm="2" />
                <v-col cols="12" md="12" sm="4">
                  <h1
                    class="d-flex justify-center"
                    :style="{ 'font-size': '80px', color: 'white' }"
                  >
                    ZScholar
                  </h1>
                </v-col>
                <v-col cols="12" md="12" sm="1" />
                <v-col cols="12" md="12" sm="5" class="d-flex align-center">
                  <v-text-field
                    class="material-symbols-outlined"
                    append-icon="search"
                    @click:append="searchTag"
                    @keyup.enter="searchTag"
                    hide-details
                    solo
                    label="Search something"
                    v-model="search"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="3" sm="12" />
          </v-row>
        </v-col>
        <v-col cols="12" md="12" sm="2" />
      </v-row>
    </div>
    <div
      :style="{
        'background-color': '#EEEEEE',
        'min-height': '50vh',
        'padding-bottom': '50px',
      }"
    >
      <v-row>
        <v-col cols="12" md="4" sm="12">
          <v-card
            :style="{ 'margin-top': '-50px' }"
            class="mx-auto"
            max-width="300"
            tile
          >
            <v-list dense>
              <v-subheader :style="{ 'font-size': '20px' }"
                >Scholars</v-subheader
              >
              <v-list-item-group v-model="item" color="primary">
                <v-list-item
                  v-for="(item, i) in TopAuthors"
                  :key="i"
                  :style="{ 'margin-left': '10px', 'margin-right': '10px' }"
                  inactive
                >
                  <v-row>
                    <v-col
                      class="d-flex justify-space-between"
                      :style="{ 'padding-top': '0px', 'padding-bottom': '0px' }"
                    >
                      <div class="d-flex justify-space-between">
                        {{ item.name }}
                      </div>
                      <div class="d-flex justify-end">
                        {{ item.progress }} papers
                      </div>
                    </v-col>

                    <v-progress-linear
                      v-model="item.percentage"
                      color="primary"
                      rounded
                      height="8"
                      background-opacity="0.1"
                    ></v-progress-linear>
                  </v-row>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" sm="12"> </v-col>
        <v-col cols="12" md="4" sm="12"> </v-col>
      </v-row>
    </div>
    <div :style="{ 'background-color': '#FFFFFF', 'min-height': '50vh' }">
      <v-row>
        <v-col cols="12" md="3" sm="12">
          <v-card class="mx-auto" max-width="300" :style="{ 'margin-top': '50px' }">
            <v-card color="#99C4B1">
              <v-row>
                <v-col cols="12" md="1" sm="12" />
                <v-col cols="12" md="2" sm="12" class="d-flex justify-center">
              <v-list-item-avatar color="white" size="60" :style="{'margin-left':'20px'}">
                <v-icon class="material-symbols-outlined" :style="{color:'#99C481','font-size': '40px'}">
              developer_board
              </v-icon>
              </v-list-item-avatar>
                </v-col>
                <v-col cols="12" md="9" sm="12">
            <v-card-title :style="{'color':'white'}">
              CCF Conference</v-card-title>
                </v-col>
              </v-row>
            </v-card>
            
            
            <v-card-text class="text--primary">
             <ul v-for="(item, i) in Conference"  :key="i">
                  <li @click="goto(item.url)" style="cursor:pointer" class="span-line" :style="{'margin-bottom':'10px','margin-top':'10px'}">
                  <h3>{{item.name}}</h3>
                  </li>
             </ul>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3" sm="12"></v-col>
        <v-col cols="12" md="3" sm="12"></v-col>
        <v-col cols="12" md="3" sm="12"></v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      search: "",
      
      TopAuthors: [
        { progress: 454, name: "AAA", percentage: 100 },
        { progress: 453, name: "BBB", percentage: 453 / 4.54 },
        { progress: 346, name: "CCC", percentage: 346 / 4.54 },
        { progress: 234, name: "DDD", percentage: 234 / 4.54 },
        { progress: 220, name: "EEE", percentage: 220 / 4.54 },
        { progress: 198, name: "FFF", percentage: 198 / 4.54 },
        { progress: 176, name: "GGG", percentage: 176 / 4.54 },
        { progress: 154, name: "HHH", percentage: 154 / 4.54 },
        { progress: 132, name: "III", percentage: 132 / 4.54 },
        { progress: 123, name: "JJJ", percentage: 123 / 4.54 },
      ],
      Conference: [
        {name:"CVPR 2020",url:"www.baidu.com"},
        {name:"CVPR 2019",url:"www.baidu.com"},
        {name:"CVPR 2018",url:"www.baidu.com"},
        {name:"CVPR 2017",url:"www.baidu.com"},
        {name:"CVPR 2016",url:"www.baidu.com"},
        {name:"CVPR 2015",url:"www.baidu.com"},
        {name:"CVPR 2014",url:"www.baidu.com"},
      ],
    };
  },
  methods: {
    searchTag() {
      if (this.search == "") return false;
      console.log(this.search);
    },
    goto(url) {
      console.log("url: "+url);
    },
  },
};
</script>
<style scoped>
.bgimg {
  background-image: url("../assets/bg.png");
  background-size: cover;
}
.span-line:hover{
  text-decoration:underline;
}
</style>>
