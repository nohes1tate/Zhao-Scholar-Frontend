<template>
  <div height="100vh">
    <div width="100vw" class="bgimg" :style="{ 'min-height': '60vh' }">
      <!-- <v-card   background="linear-gradient(red, blue)"> -->
      <v-row :style="{ height: '80vh' }">
        <v-col cols="12" md="12" sm="1">
          <v-row>
            <v-col cols="12" md="2" sm="12">
              <h1 class="d-flex justify-center" :style="{ color: 'white','margin-left':'0px'}">
                <img height="100px" :style="{'margin-left':'50px'}" src="../assets/HatchfulExport-All/logo_transparent.png"/>
              </h1>
            </v-col>
            <v-col cols="12" md="7" sm="12" />
            <v-col cols="12" md="3" sm="12" class="d-flex align-center">
              <div>
                <v-btn text :style="{ 'font-weight': 'bold', color: 'white' }" @click="$router.push({path: '/login'})" v-show="!state"
                  >登录</v-btn
                >
                <v-btn text :style="{ 'font-weight': 'bold', color: 'white' }" @click="$router.push({path: '/login'})" v-show="state"
                  >个人中心</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="12" sm="6" :style="{'margin-top':'-100px'}">
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
                 <v-menu offset-y> 
                  <template v-slot:activator="{ on }">
                  <v-text-field
                    class="material-symbols-outlined"
                    append-icon="search"
                    @click:append="searchTag(search)"
                    @keyup.enter="searchTag(search)"
                    hide-details
                    solo
                    label="Search something"
                    v-model="search"
                    v-on="on"
                  >
                  </v-text-field>
                  </template>
                  <v-list v-if="items.length > 0" class="border-list" dense>
                    <v-list-item v-for="(i, index) in items" :key="index" @click="searchTag(i.key)">
                      <v-list-item-title>{{ i.name }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                  </v-menu>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="3" sm="12" />
          </v-row>
        </v-col>
        <v-col cols="12" md="12" sm="3" />
        <v-col cols="12" md="12" sm="1" :style="{'max-height':'150px'}">
        <v-row>
     
      <v-col cols="12" md="1" sm="12"/>
      <v-col cols="12" md="10" sm="12" >
        <div :style="{'opacity': '0.8'}">
          <v-card text :style="{'background-color':'#333333',color:'white',height:'100px'}">
            <v-row>
              <v-col>
                <v-row>
                  <v-col cols="12" md="3" sm="12" class="d-flex align-center d-flex justify-center">
                    <v-icon class="material-symbols-outlined" :style="{color:'white','font-size':'40px','margin-left':'5px'}">school</v-icon>
                  </v-col>
                  <v-col cols="12" md="9" sm="12" :style="{padding:'0px'}">
                    <v-row>
                  <v-col cols="12" md="12" sm="6" :style="{'padding-bottom':'5px'}">
                    <h3 :style="{color:'#CCCCCC','margin-top':'5px'}">Authors</h3>
                  </v-col>
                  <v-col cols="12" md="12" sm="6" :style="{'padding-top':'0px'}">
                    <h1>{{general.authors}}</h1>
                  </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
             <v-col>
                <v-row>
                  <v-col cols="12" md="3" sm="12" class="d-flex align-center d-flex justify-center">
                    <v-icon class="material-symbols-outlined" :style="{color:'white','font-size':'40px','margin-left':'5px'}">description</v-icon>
                  </v-col>
                  <v-col cols="12" md="9" sm="12" :style="{padding:'0px'}">
                    <v-row>
                  <v-col cols="12" md="12" sm="6" :style="{'padding-bottom':'5px'}">
                    <h3 :style="{color:'#CCCCCC','margin-top':'5px'}">Papers</h3>
                  </v-col>
                  <v-col cols="12" md="12" sm="6" :style="{'padding-top':'0px'}">
                    <h1>{{general.papers}}</h1>
                  </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
              <v-col>
                <v-row>
                  <v-col cols="12" md="3" sm="12" class="d-flex align-center d-flex justify-center">
                    <v-icon class="material-symbols-outlined" :style="{color:'white','font-size':'40px','margin-left':'5px'}">domain</v-icon>
                  </v-col>
                  <v-col cols="12" md="9" sm="12" :style="{padding:'0px'}">
                    <v-row>
                  <v-col cols="12" md="12" sm="6" :style="{'padding-bottom':'5px'}">
                    <h3 :style="{color:'#CCCCCC','margin-top':'5px'}">Affiliations</h3>
                  </v-col>
                  <v-col cols="12" md="12" sm="6" :style="{'padding-top':'0px'}">
                    <h1>{{general.affiliations}}</h1>
                  </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
              <v-col>
                <v-row>
                  <v-col cols="12" md="3" sm="12" class="d-flex align-center d-flex justify-center">
                    <v-icon class="material-symbols-outlined" :style="{color:'white','font-size':'40px','margin-left':'5px'}">meeting_room</v-icon>
                  </v-col>
                  <v-col cols="12" md="9" sm="12" :style="{padding:'0px'}">
                    <v-row>
                  <v-col cols="12" md="12" sm="6" :style="{'padding-bottom':'5px'}">
                    <h3 :style="{color:'#CCCCCC','margin-top':'5px'}">Venues</h3>
                  </v-col>
                  <v-col cols="12" md="12" sm="6" :style="{'padding-top':'0px'}">
                    <h1>{{general.venues}}</h1>
                  </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
              <v-col>
                <v-row>
                  <v-col cols="12" md="3" sm="12" class="d-flex align-center d-flex justify-center">
                    <v-icon class="material-symbols-outlined" :style="{color:'white','font-size':'40px','margin-left':'5px'}">pie_chart</v-icon>
                  </v-col>
                  <v-col cols="12" md="9" sm="12" :style="{padding:'0px'}">
                    <v-row>
                  <v-col cols="12" md="12" sm="6" :style="{'padding-bottom':'5px'}">
                    <h3 :style="{color:'#CCCCCC','margin-top':'5px'}">Field</h3>
                  </v-col>
                  <v-col cols="12" md="12" sm="6" :style="{'padding-top':'0px'}">
                    <h1>{{general.fields}}</h1>
                  </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </div>
      </v-col>
      <v-col cols="12" md="1" sm="12"/>
    </v-row>
        </v-col>
        <v-col cols="12" md="12" sm="1" />
      </v-row>
    </div>
    <div :style="{
        'background-color': '#EEEEEE',
        'min-height': '50vh',
        'padding-bottom': '50px',
      }">
      <v-row>
        <v-col cols="12" md="4" sm="12">
          <v-card
          :style="{'margin-top':'-80px'}"
            class="mx-auto"
            max-width="300"
            tile
          >
          <v-card color="#e1e7e7" 
          elevation=0
          :style="{'border-radius':'0px'}">
              <v-row>
                <v-col cols="12" md="1" sm="12" />
                <v-col cols="12" md="2" sm="12" class="d-flex justify-center">
              <v-list-item-avatar color="white" size="60" :style="{'margin-left':'20px'}">
                <v-icon class="material-symbols-outlined" :style="{color:'#809def','font-size': '40px'}">
              person
              </v-icon>
              </v-list-item-avatar>
                </v-col>
                <v-col cols="12" md="9" sm="12">
            <v-card-title :style="{'color':'black'}">
              Top Author</v-card-title>
                </v-col>
              </v-row>
            </v-card>


            <v-list dense>
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
            <div class="d-flex justify-center">
           <v-btn icon color="black" :disabled="page1==1" @click="page1=page1-1">
              <v-icon>navigate_before</v-icon>
            </v-btn>
            <v-btn icon color="black" :disabled="page1==4" @click="page1=page1+1">
              <v-icon>navigate_next</v-icon>
            </v-btn>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" sm="12">
        <v-card
          :style="{'margin-top':'-80px'}"
            class="mx-auto"
            max-width="300"
            tile
          >
          <v-card color="#e1e7e7" 
          elevation=0
          :style="{'border-radius':'0px'}">
              <v-row>
                <v-col cols="12" md="1" sm="12" />
                <v-col cols="12" md="2" sm="12" class="d-flex justify-center">
              <v-list-item-avatar color="white" size="60" :style="{'margin-left':'20px'}">
                <v-icon class="material-symbols-outlined" :style="{color:'#809def','font-size': '40px'}">
              apartment
              </v-icon>
              </v-list-item-avatar>
                </v-col>
                <v-col cols="12" md="9" sm="12">
            <v-card-title :style="{'color':'black'}">
              Top Affiliations</v-card-title>
                </v-col>
              </v-row>
            </v-card>


            <v-list dense>
              <v-list-item-group v-model="item" color="primary">
                <v-list-item
                  v-for="(item, i) in TopAffiliations"
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
            <div class="d-flex justify-center">
           <v-btn icon color="black" :disabled="page2==1" @click="page1=page2-1">
              <v-icon>navigate_before</v-icon>
            </v-btn>
            <v-btn icon color="black" :disabled="page2==4" @click="page1=page2+1">
              <v-icon>navigate_next</v-icon>
            </v-btn>
            </div>
          </v-card>

        </v-col>
        <v-col cols="12" md="4" sm="12">
          <v-card
          :style="{'margin-top':'-80px'}"
            class="mx-auto"
            max-width="300"
            tile
          >
          <v-card color="#e1e7e7" 
          elevation=0
          :style="{'border-radius':'0px'}">
              <v-row>
                <v-col cols="12" md="1" sm="12" />
                <v-col cols="12" md="2" sm="12" class="d-flex justify-center">
              <v-list-item-avatar color="white" size="60" :style="{'margin-left':'20px'}">
                <v-icon class="material-symbols-outlined" :style="{color:'#809def','font-size': '40px'}">
              pages
              </v-icon>
              </v-list-item-avatar>
                </v-col>
                <v-col cols="12" md="9" sm="12">
            <v-card-title :style="{'color':'black'}">
              Top Journals</v-card-title>
                </v-col>
              </v-row>
            </v-card>


            <v-list dense>
              <v-list-item-group v-model="item" color="primary">
                <v-list-item
                  v-for="(item, i) in TopJournals"
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
            <div class="d-flex justify-center">
           <v-btn icon color="black" :disabled="page3==1" @click="page1=page3-1">
              <v-icon>navigate_before</v-icon>
            </v-btn>
            <v-btn icon color="black" :disabled="page3==4" @click="page1=page3+1">
              <v-icon>navigate_next</v-icon>
            </v-btn>
            </div>
          </v-card>
        </v-col>
        
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
import user from "@/store/user"
import request from "@/utils/request";
export default {
  name: "HomeView",
  data() {
    return {
      search: "",
      page1:1,
      page2:1,
      page3:1,
      state:user.getters.getUser(user.state),
      showSelect:false,
      general:{
        authors:2147483647,
        papers:114514000,
        affiliations:1919810,
        venues:20373614,
        fields:9876543,
      },
      items:[{key: '1234',name: '1234'},],
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
      TopAffiliations: [
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
      TopJournals: [
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
    searchTag(search) {
      this.search=search
      if (search == "") return;
      console.log(search);
    },
    goto(url) {
      console.log("url: "+url);
    },
    inputHandle (search) {
      if (search.trim() !== '') {
        this.showSelect = true
        setTimeout(() => {
          this.getEntity()
        }, 300)
      }
    },
    getEntity () {
      this.items = [
        {key: '1234',name: '1234',type:''},
        {key: 'abc',name: 'abc',type:''},
        {key: 'def',name: 'def',type:''},
        {key: 'ccc',name: 'ccc',type:''},
        {key: 'ccc',name: 'ccc',type:''},
        {key: 'ccc',name: 'ccc',type:''}]
    },
    getAll(){
      let data=new FormData();
      request('GET', "/api/PortalManager/getGeneralInfo/",data)
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  watch: {
    search:'inputHandle'
  },
  mounted(){
    this.getAll()
  }
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
