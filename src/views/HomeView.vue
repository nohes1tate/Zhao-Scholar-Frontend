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
                <v-btn text :style="{ 'font-weight': 'bold', color: 'white' }" @click="$router.push({path:'/user', query: {id: userId} })" v-show="state"
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
                    label="点击搜索"
                    v-model="search"
                    v-on="on"
                  >
                  </v-text-field>
                  </template>
                  <v-list v-if="items.length > 0" class="border-list" dense>
                    <v-list-item v-for="(i, index) in items" :key="index" @click="searchType(i.name,i.type,i.id)">
                      <v-list-item-title><h3 :style="{color:'grey'}">{{i.type}}: </h3><h3>{{i.name}}</h3></v-list-item-title>
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
        <div :style="{'opacity': '0.7'}">
          <v-card text :style="{'background-color':'#000000',color:'white',height:'100px'}">
            <v-row>
              <v-col>
                <v-row>
                  <v-col cols="12" md="3" sm="12" class="d-flex align-center d-flex justify-center">
                    <v-icon class="material-symbols-outlined" :style="{color:'white','font-size':'40px','margin-left':'5px'}">school</v-icon>
                  </v-col>
                  <v-col cols="12" md="9" sm="12" :style="{padding:'0px'}">
                    <v-row>
                  <v-col cols="12" md="12" sm="6" :style="{'padding-bottom':'5px'}">
                    <h3 :style="{color:'#CCCCCC','margin-top':'5px'}">作者</h3>
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
                    <h3 :style="{color:'#CCCCCC','margin-top':'5px'}">论文</h3>
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
                    <h3 :style="{color:'#CCCCCC','margin-top':'5px'}">机构</h3>
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
                    <h3 :style="{color:'#CCCCCC','margin-top':'5px'}">会议</h3>
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
                    <h3 :style="{color:'#CCCCCC','margin-top':'5px'}">领域</h3>
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
              最高作者</v-card-title>
                </v-col>
              </v-row>
            </v-card>


            <v-list dense>
              <v-list-item-group v-model="item" color="primary">
                <v-list-item
                  v-for="(item, i) in ShowAuthors"
                  :key="i"
                  :style="{ 'margin-left': '10px', 'margin-right': '10px' }"
                >
                  <v-row>
                    <v-col
                      class="d-flex justify-space-between"
                      :style="{ 'padding-top': '0px', 'padding-bottom': '0px' }"

                    >
                      <div class="d-flex justify-space-between" @click="$router.push({path:'/scholar', query: { id: item.id } })">
                        {{ item.name }}
                      </div>
                      <div class="d-flex justify-end">
                        {{ item.progress }} 篇
                      </div>
                    </v-col>

                    <v-progress-linear
                      :value="item.percentage"
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
              最高机构</v-card-title>
                </v-col>
              </v-row>
            </v-card>


            <v-list dense>
              <v-list-item-group v-model="item" color="primary">
                <v-list-item
                  v-for="(item, i) in ShowAffiliations"
                  :key="i"
                  :style="{ 'margin-left': '10px', 'margin-right': '10px' }"

                >
                  <v-row>
                    <v-col
                      class="d-flex justify-space-between"
                      :style="{ 'padding-top': '0px', 'padding-bottom': '0px' }"
                    >
                      <div class="d-flex justify-space-between" @click="$router.push({name:'institutionPortal', params:{ institutionID:item.id } } )">
                        {{ item.name }}
                      </div>
                      <div class="d-flex justify-end">
                        {{ item.progress }} 篇论文
                      </div>
                    </v-col>

                    <v-progress-linear
                      :value="item.percentage"
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
           <v-btn icon color="black" :disabled="page2==1" @click="page2=page2-1">
              <v-icon>navigate_before</v-icon>
            </v-btn>
            <v-btn icon color="black" :disabled="page2==4" @click="page2=page2+1">
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
              最高期刊</v-card-title>
                </v-col>
              </v-row>
            </v-card>


            <v-list dense>
              <v-list-item-group v-model="item" color="primary">
                <v-list-item
                  v-for="(item, i) in ShowJournals"
                  :key="i"
                  :style="{ 'margin-left': '10px', 'margin-right': '10px' }"
                  inactive
                >
                  <v-row>
                    <v-col
                      class="d-flex justify-space-between"
                      :style="{ 'padding-top': '0px', 'padding-bottom': '0px' }"
                    >
                      <div class="d-flex justify-space-between" @click="$router.push({ path: '/search', query: { keyword: item.name } })">
                        {{ item.name }}
                      </div>
                      <div class="d-flex justify-end">
                        {{ item.progress }} 篇论文
                      </div>
                    </v-col>

                    <v-progress-linear
                      :value="item.percentage"
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
           <v-btn icon color="black" :disabled="page3==1" @click="page3=page3-1">
              <v-icon>navigate_before</v-icon>
            </v-btn>
            <v-btn icon color="black" :disabled="page3==4" @click="page3=page3+1">
              <v-icon>navigate_next</v-icon>
            </v-btn>
            </div>
          </v-card>
        </v-col>

      </v-row>
    </div>
    <!-- <div :style="{ 'background-color': '#FFFFFF', 'min-height': '50vh' }">
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
    </div> -->
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
      userId:"",
      state:user.getters.getUser(user.state),
      showSelect:false,
      general:{},
      items:[],
      TopAuthors: [],
      TopAffiliations: [],
      TopJournals: [],
      ShowAuthors:[],
      ShowAffiliations:[],
      ShowJournals:[],

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
      if (search === "") return;
      this.$router.push({ path: "/search", query: { keyword: search } });
    },
    searchType(search,type,id) {
      this.search=search
      if (search === "") return;
      if(type==="Author"){this.$router.push({path:'/scholar', query: {id:id}})}
      if(type==="Paper"){this.$router.push({path:"/document", query:{Title:search, Id:id}})}
      if(type==="Affiliation"){this.$router.push({name:"institutionPortal", params:{ institutionID:id } } ) }
    },
    goto(url) {
      console.log("url: "+url);
    },
    inputHandle (search) {
      if (search.trim() !== '') {
        this.showSelect = true
        setTimeout(() => {
          this.getEntity()
        }, 1000)
      }
    },
    getEntity () {
      let data=new FormData();
      let i=0;

      if(this.search.trim().length>=3){
      data.append('search',this.search)
       request('POST', "/api/SearchManager/SearchByRealTime/",data)
        .then(response => {
          console.log(response)
          let temporary=[]
          temporary=response.result;
          this.items=[]
          this.items1=[],
          this.items2=[],
          this.items3=[]

          for(i=0;i<temporary.length;i++){
            if(temporary[i].type==="Affiliation"){
              this.items.push({name:temporary[i].name, type:'机构', id:temporary[i].id})
            }
          }
          for(i=0;i<temporary.length;i++){
            if(temporary[i].type==="Author"){
              this.items.push({name:temporary[i].name, type:'作者', id:temporary[i].id})
            }
          }
          i=0
          while(this.items.length<10){
              if(temporary[i].type==="Paper")
              this.items.push({name:temporary[i].name, type:'论文', id:temporary[i].id})
              i++
          }
          this.items=this.items.slice(0,10)
          for(i=0;i<this.items.length;i++){
            if(this.items[i].name.length>30){
              this.items[i].name=this.items[i].name.slice(0,30)+"..."
            }
          }
        })
        .catch(error => {
          console.error(error);
        });
      }
      else{
        this.items=[];
      }
    },
    getAll(){
      let data=new FormData();
      request('GET', "/api/PortalManager/getGeneralInfo/",data)
        .then(response => {
          this.general=response
        })
        .catch(error => {
          console.error(error);
        });
    },
    getAuthors(){
      this.TopAuthors=[
        {
          "progress": 8080,
          "name": "Linus Pauling",
          "percentage": 100,
          "id": "548824c0dabfaed7b5fa34f6"
        },
        {
          "progress": 8005,
          "name": "Sibylle Schwart...",
          "percentage": 99.07178217821783,
          "id": "53f3aea6dabfae4b34b0dc04"
        },
        {
          "progress": 6984,
          "name": "S. I. Sukhoruch...",
          "percentage": 86.43564356435644,
          "id": "53f45182dabfaee43eca9cea"
        },
        {
          "progress": 6962,
          "name": "Z. N. Soroko",
          "percentage": 86.16336633663366,
          "id": "53f439a7dabfaeee229c95b0"
        },
        {
          "progress": 6050,
          "name": "Human Rights",
          "percentage": 74.87623762376238,
          "id": "53f436d5dabfaeee229aed3d"
        },
        {
          "progress": 6000,
          "name": "Erasmus Univers...",
          "percentage": 74.25742574257426,
          "id": "53f434c7dabfaeee2299c098"
        },
        {
          "progress": 5209,
          "name": "Kia Silverbrook",
          "percentage": 64.46782178217822,
          "id": "53f426c4dabfaec09f0d5401"
        },
        {
          "progress": 5034,
          "name": "Not Available N...",
          "percentage": 62.301980198019805,
          "id": "5430061bdabfaeca69bbd556"
        },
        {
          "progress": 4931,
          "name": "Alberta Agricul...",
          "percentage": 61.02722772277228,
          "id": "53f42799dabfaeb22f3cba19"
        },
        {
          "progress": 4603,
          "name": "Lei Wang",
          "percentage": 56.96782178217822,
          "id": "5429cf62dabfaec7081ba5f8"
        },
        {
          "progress": 4351,
          "name": "Wei Zhang",
          "percentage": 53.8490099009901,
          "id": "53f4b8f6dabfaed83b77b41e"
        },
        {
          "progress": 4120,
          "name": "Jing Zhang",
          "percentage": 50.99009900990099,
          "id": "542a61a5dabfae2b4e0fd344"
        },
        {
          "progress": 4093,
          "name": "Natural Resourc...",
          "percentage": 50.6559405940594,
          "id": "53f43407dabfaeee229939e4"
        },
        {
          "progress": 3574,
          "name": "Y. Xie",
          "percentage": 44.23267326732673,
          "id": "5406c70cdabfae44f085a3a1"
        },
        {
          "progress": 3532,
          "name": "Y. Liu",
          "percentage": 43.71287128712871,
          "id": "5432960adabfaeb54215f5a2"
        },
        {
          "progress": 3526,
          "name": "Ricardo A. Hane...",
          "percentage": 43.63861386138614,
          "id": "543270ccdabfaeb4c6a84f07"
        },
        {
          "progress": 3522,
          "name": "K. Tanaka",
          "percentage": 43.58910891089109,
          "id": "53f55beadabfae4e24f8045b"
        },
        {
          "progress": 3519,
          "name": "Dileep R. Yavag...",
          "percentage": 43.551980198019805,
          "id": "53f358f3dabfae4b34967778"
        },
        {
          "progress": 3505,
          "name": "Jue Wang",
          "percentage": 43.37871287128713,
          "id": "53f565c4dabfae61fef8045d"
        },
        {
          "progress": 3495,
          "name": "J. Li",
          "percentage": 43.254950495049506,
          "id": "5433c99ddabfaeb4c6acf42d"
        },
        {
          "progress": 3492,
          "name": "M. A. Cazalilla",
          "percentage": 43.21782178217822,
          "id": "53f45f17dabfaee1c0b4d1fc"
        },
        {
          "progress": 3480,
          "name": "Us Epa",
          "percentage": 43.06930693069307,
          "id": "53f42842dabfaeb22f3ceee1"
        },
        {
          "progress": 3424,
          "name": "Weiwei Zhang",
          "percentage": 42.37623762376238,
          "id": "5447fe3fdabfae87b7dbda37"
        },
        {
          "progress": 3257,
          "name": "Lijun Zhang",
          "percentage": 40.30940594059406,
          "id": "54409f34dabfae805a6df627"
        },
        {
          "progress": 3254,
          "name": "Lili Liu",
          "percentage": 40.272277227722775,
          "id": "53f55b8edabfae4db6f8045d"
        },
        {
          "progress": 3209,
          "name": "Richard M. Schu...",
          "percentage": 39.71534653465347,
          "id": "53f4cf59dabfaeedd477d0d0"
        },
        {
          "progress": 3203,
          "name": "Barry E. Gidal",
          "percentage": 39.64108910891089,
          "id": "53f4574bdabfaee0d9bf79e0"
        },
        {
          "progress": 3195,
          "name": "Erik K. St. Lou...",
          "percentage": 39.54207920792079,
          "id": "53f448b7dabfaee1c0af64d4"
        },
        {
          "progress": 3173,
          "name": "John M. Stern",
          "percentage": 39.26980198019802,
          "id": "53f3988fdabfae4b34a8338d"
        },
        {
          "progress": 3165,
          "name": "Thomas R. Henry",
          "percentage": 39.17079207920792,
          "id": "53f42c54dabfaedce54b54bc"
        },
        {
          "progress": 3159,
          "name": "Allan Krumholz",
          "percentage": 39.09653465346535,
          "id": "53f43509dabfaee4dc776eeb"
        },
        {
          "progress": 3145,
          "name": "Georgia D. Mont...",
          "percentage": 38.92326732673268,
          "id": "53f3830adabfae4b34a01722"
        },
        {
          "progress": 3135,
          "name": "Brien J. Smith",
          "percentage": 38.79950495049505,
          "id": "53f4593bdabfaeecd69f5ee9"
        },
        {
          "progress": 3134,
          "name": "William R. Garn...",
          "percentage": 38.78712871287129,
          "id": "53f45930dabfaeecd69f5bca"
        },
        {
          "progress": 3132,
          "name": "William E. Rose...",
          "percentage": 38.76237623762376,
          "id": "53f433eadabfaec09f164f8f"
        },
        {
          "progress": 3119,
          "name": "B. Stugu",
          "percentage": 38.601485148514854,
          "id": "54855a31dabfaed7b5fa20ad"
        },
        {
          "progress": 3113,
          "name": "Xiaojun Li",
          "percentage": 38.52722772277228,
          "id": "53f45411dabfaee2a1d6b03f"
        },
        {
          "progress": 3018,
          "name": "Saudi Arabia",
          "percentage": 37.351485148514854,
          "id": "54851fcedabfae9b4013339e"
        },
        {
          "progress": 3004,
          "name": "Wei Wang",
          "percentage": 37.17821782178218,
          "id": "542992e2dabfaec88b4d13ff"
        },
        {
          "progress": 3000,
          "name": "Seik Weng Ng",
          "percentage": 37.12871287128713,
          "id": "53f46ddddabfaeecd6a29a7e"
        }
      ];
      this.ShowAuthors=this.TopAuthors.slice(0,10)
      for(let i=0;i<this.TopAuthors.length;i++){
        if(this.TopAuthors[i].name.length>15){
          this.TopAuthors[i].name=this.TopAuthors[i].name.slice(0,15)+"..."
        }
      }
      // let data=new FormData();
      // let i=0
      // data.append('count','40')
      //  request('POST', "/api/PortalManager/getTopAuthor/",data)
      //   .then(response => {
      //     console.log("authors", response)
      //     this.TopAuthors=[
      //       {
      //         "progress": 8080,
      //         "name": "Linus Pauling",
      //         "percentage": 100,
      //         "id": "548824c0dabfaed7b5fa34f6"
      //       },
      //       {
      //         "progress": 8005,
      //         "name": "Sibylle Schwart...",
      //         "percentage": 99.07178217821783,
      //         "id": "53f3aea6dabfae4b34b0dc04"
      //       },
      //       {
      //         "progress": 6984,
      //         "name": "S. I. Sukhoruch...",
      //         "percentage": 86.43564356435644,
      //         "id": "53f45182dabfaee43eca9cea"
      //       },
      //       {
      //         "progress": 6962,
      //         "name": "Z. N. Soroko",
      //         "percentage": 86.16336633663366,
      //         "id": "53f439a7dabfaeee229c95b0"
      //       },
      //       {
      //         "progress": 6050,
      //         "name": "Human Rights",
      //         "percentage": 74.87623762376238,
      //         "id": "53f436d5dabfaeee229aed3d"
      //       },
      //       {
      //         "progress": 6000,
      //         "name": "Erasmus Univers...",
      //         "percentage": 74.25742574257426,
      //         "id": "53f434c7dabfaeee2299c098"
      //       },
      //       {
      //         "progress": 5209,
      //         "name": "Kia Silverbrook",
      //         "percentage": 64.46782178217822,
      //         "id": "53f426c4dabfaec09f0d5401"
      //       },
      //       {
      //         "progress": 5034,
      //         "name": "Not Available N...",
      //         "percentage": 62.301980198019805,
      //         "id": "5430061bdabfaeca69bbd556"
      //       },
      //       {
      //         "progress": 4931,
      //         "name": "Alberta Agricul...",
      //         "percentage": 61.02722772277228,
      //         "id": "53f42799dabfaeb22f3cba19"
      //       },
      //       {
      //         "progress": 4603,
      //         "name": "Lei Wang",
      //         "percentage": 56.96782178217822,
      //         "id": "5429cf62dabfaec7081ba5f8"
      //       },
      //       {
      //         "progress": 4351,
      //         "name": "Wei Zhang",
      //         "percentage": 53.8490099009901,
      //         "id": "53f4b8f6dabfaed83b77b41e"
      //       },
      //       {
      //         "progress": 4120,
      //         "name": "Jing Zhang",
      //         "percentage": 50.99009900990099,
      //         "id": "542a61a5dabfae2b4e0fd344"
      //       },
      //       {
      //         "progress": 4093,
      //         "name": "Natural Resourc...",
      //         "percentage": 50.6559405940594,
      //         "id": "53f43407dabfaeee229939e4"
      //       },
      //       {
      //         "progress": 3574,
      //         "name": "Y. Xie",
      //         "percentage": 44.23267326732673,
      //         "id": "5406c70cdabfae44f085a3a1"
      //       },
      //       {
      //         "progress": 3532,
      //         "name": "Y. Liu",
      //         "percentage": 43.71287128712871,
      //         "id": "5432960adabfaeb54215f5a2"
      //       },
      //       {
      //         "progress": 3526,
      //         "name": "Ricardo A. Hane...",
      //         "percentage": 43.63861386138614,
      //         "id": "543270ccdabfaeb4c6a84f07"
      //       },
      //       {
      //         "progress": 3522,
      //         "name": "K. Tanaka",
      //         "percentage": 43.58910891089109,
      //         "id": "53f55beadabfae4e24f8045b"
      //       },
      //       {
      //         "progress": 3519,
      //         "name": "Dileep R. Yavag...",
      //         "percentage": 43.551980198019805,
      //         "id": "53f358f3dabfae4b34967778"
      //       },
      //       {
      //         "progress": 3505,
      //         "name": "Jue Wang",
      //         "percentage": 43.37871287128713,
      //         "id": "53f565c4dabfae61fef8045d"
      //       },
      //       {
      //         "progress": 3495,
      //         "name": "J. Li",
      //         "percentage": 43.254950495049506,
      //         "id": "5433c99ddabfaeb4c6acf42d"
      //       },
      //       {
      //         "progress": 3492,
      //         "name": "M. A. Cazalilla",
      //         "percentage": 43.21782178217822,
      //         "id": "53f45f17dabfaee1c0b4d1fc"
      //       },
      //       {
      //         "progress": 3480,
      //         "name": "Us Epa",
      //         "percentage": 43.06930693069307,
      //         "id": "53f42842dabfaeb22f3ceee1"
      //       },
      //       {
      //         "progress": 3424,
      //         "name": "Weiwei Zhang",
      //         "percentage": 42.37623762376238,
      //         "id": "5447fe3fdabfae87b7dbda37"
      //       },
      //       {
      //         "progress": 3257,
      //         "name": "Lijun Zhang",
      //         "percentage": 40.30940594059406,
      //         "id": "54409f34dabfae805a6df627"
      //       },
      //       {
      //         "progress": 3254,
      //         "name": "Lili Liu",
      //         "percentage": 40.272277227722775,
      //         "id": "53f55b8edabfae4db6f8045d"
      //       },
      //       {
      //         "progress": 3209,
      //         "name": "Richard M. Schu...",
      //         "percentage": 39.71534653465347,
      //         "id": "53f4cf59dabfaeedd477d0d0"
      //       },
      //       {
      //         "progress": 3203,
      //         "name": "Barry E. Gidal",
      //         "percentage": 39.64108910891089,
      //         "id": "53f4574bdabfaee0d9bf79e0"
      //       },
      //       {
      //         "progress": 3195,
      //         "name": "Erik K. St. Lou...",
      //         "percentage": 39.54207920792079,
      //         "id": "53f448b7dabfaee1c0af64d4"
      //       },
      //       {
      //         "progress": 3173,
      //         "name": "John M. Stern",
      //         "percentage": 39.26980198019802,
      //         "id": "53f3988fdabfae4b34a8338d"
      //       },
      //       {
      //         "progress": 3165,
      //         "name": "Thomas R. Henry",
      //         "percentage": 39.17079207920792,
      //         "id": "53f42c54dabfaedce54b54bc"
      //       },
      //       {
      //         "progress": 3159,
      //         "name": "Allan Krumholz",
      //         "percentage": 39.09653465346535,
      //         "id": "53f43509dabfaee4dc776eeb"
      //       },
      //       {
      //         "progress": 3145,
      //         "name": "Georgia D. Mont...",
      //         "percentage": 38.92326732673268,
      //         "id": "53f3830adabfae4b34a01722"
      //       },
      //       {
      //         "progress": 3135,
      //         "name": "Brien J. Smith",
      //         "percentage": 38.79950495049505,
      //         "id": "53f4593bdabfaeecd69f5ee9"
      //       },
      //       {
      //         "progress": 3134,
      //         "name": "William R. Garn...",
      //         "percentage": 38.78712871287129,
      //         "id": "53f45930dabfaeecd69f5bca"
      //       },
      //       {
      //         "progress": 3132,
      //         "name": "William E. Rose...",
      //         "percentage": 38.76237623762376,
      //         "id": "53f433eadabfaec09f164f8f"
      //       },
      //       {
      //         "progress": 3119,
      //         "name": "B. Stugu",
      //         "percentage": 38.601485148514854,
      //         "id": "54855a31dabfaed7b5fa20ad"
      //       },
      //       {
      //         "progress": 3113,
      //         "name": "Xiaojun Li",
      //         "percentage": 38.52722772277228,
      //         "id": "53f45411dabfaee2a1d6b03f"
      //       },
      //       {
      //         "progress": 3018,
      //         "name": "Saudi Arabia",
      //         "percentage": 37.351485148514854,
      //         "id": "54851fcedabfae9b4013339e"
      //       },
      //       {
      //         "progress": 3004,
      //         "name": "Wei Wang",
      //         "percentage": 37.17821782178218,
      //         "id": "542992e2dabfaec88b4d13ff"
      //       },
      //       {
      //         "progress": 3000,
      //         "name": "Seik Weng Ng",
      //         "percentage": 37.12871287128713,
      //         "id": "53f46ddddabfaeecd6a29a7e"
      //       }
      //     ];
      //     this.ShowAuthors=this.TopAuthors.slice(0,10)
      //     for(i=0;i<this.TopAuthors.length;i++){
      //       if(this.TopAuthors[i].name.length>15){
      //         this.TopAuthors[i].name=this.TopAuthors[i].name.slice(0,15)+"..."
      //       }
      //     }
      //
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });
    },
    getAffiliations(){
      this.TopAffiliations=[
        {
          "progress": 9915,
          "name": "Angelo Rodrigue...",
          "percentage": 100,
          "id": "5f0c137dfaabae14decd659f"
        },
        {
          "progress": 9865,
          "name": "Oblate School o...",
          "percentage": 99.4957135653051,
          "id": "5f0c1374faabae14decd618d"
        },
        {
          "progress": 9836,
          "name": "FHB Mortgage Ba...",
          "percentage": 99.20322743318205,
          "id": "5f0c1374faabae14decd6194"
        },
        {
          "progress": 9758,
          "name": "ING Bank Śląski",
          "percentage": 98.416540595058,
          "id": "5f0c1372faabae14decd614d"
        },
        {
          "progress": 9710,
          "name": "China Hualu Gro...",
          "percentage": 97.93242561775088,
          "id": "5f0c137dfaabae14decd6593"
        },
        {
          "progress": 9668,
          "name": "Friends of Wome...",
          "percentage": 97.50882501260716,
          "id": "5f0c1377faabae14decd630e"
        },
        {
          "progress": 9615,
          "name": "Melco",
          "percentage": 96.97428139183056,
          "id": "5f0c1380faabae14decd6740"
        },
        {
          "progress": 9608,
          "name": "Kewego",
          "percentage": 96.90368129097328,
          "id": "5f0c1358faabae14decd608d"
        },
        {
          "progress": 9532,
          "name": "Alberni Distric...",
          "percentage": 96.13716591023702,
          "id": "5f0c1376faabae14decd62c3"
        },
        {
          "progress": 9438,
          "name": "BOSCO-Uganda",
          "percentage": 95.18910741301059,
          "id": "5f0c1374faabae14decd61d0"
        },
        {
          "progress": 9070,
          "name": "Miramichi Valle...",
          "percentage": 91.47755925365607,
          "id": "5f0c1372faabae14decd60e7"
        },
        {
          "progress": 8961,
          "name": "InterOil Explor...",
          "percentage": 90.37821482602118,
          "id": "5f0c1374faabae14decd61bd"
        },
        {
          "progress": 8839,
          "name": "Scandinavian Bu...",
          "percentage": 89.14775592536562,
          "id": "5f0c137dfaabae14decd65ac"
        },
        {
          "progress": 8733,
          "name": "Bergenshalvøens...",
          "percentage": 88.0786686838124,
          "id": "5f0c1378faabae14decd637a"
        },
        {
          "progress": 8725,
          "name": "Base One Intern...",
          "percentage": 87.99798285426122,
          "id": "5f0c1374faabae14decd61a7"
        },
        {
          "progress": 8655,
          "name": "Intermountain I...",
          "percentage": 87.29198184568835,
          "id": "5f0c1376faabae14decd62e9"
        },
        {
          "progress": 8631,
          "name": "Behr GmbH & Co....",
          "percentage": 87.0499243570348,
          "id": "5f0c1372faabae14decd60e3"
        },
        {
          "progress": 8532,
          "name": "CERGE-EI",
          "percentage": 86.05143721633888,
          "id": "5f0c1381faabae14decd6795"
        },
        {
          "progress": 8494,
          "name": "CASA de Marylan...",
          "percentage": 85.66817952597076,
          "id": "5f0c1375faabae14decd6209"
        },
        {
          "progress": 8144,
          "name": "Verso Corporati...",
          "percentage": 82.13817448310641,
          "id": "5f0c137efaabae14decd6670"
        },
        {
          "progress": 8100,
          "name": "Madeira Brewery",
          "percentage": 81.69440242057489,
          "id": "5f0c1380faabae14decd672e"
        },
        {
          "progress": 8099,
          "name": "CIB Bank",
          "percentage": 81.68431669188098,
          "id": "5f0c1374faabae14decd61c0"
        },
        {
          "progress": 8093,
          "name": "Little Chute Hi...",
          "percentage": 81.6238023197176,
          "id": "5f0c1374faabae14decd6192"
        },
        {
          "progress": 8072,
          "name": "Tealeaf",
          "percentage": 81.41200201714574,
          "id": "5f0c1378faabae14decd63af"
        },
        {
          "progress": 8047,
          "name": "Assuranceforeni...",
          "percentage": 81.15985879979829,
          "id": "5f0c137bfaabae14decd6519"
        },
        {
          "progress": 8011,
          "name": "Lucile Packard ...",
          "percentage": 80.79677256681795,
          "id": "5f0c1372faabae14decd6112"
        },
        {
          "progress": 7992,
          "name": "Johnston Senior...",
          "percentage": 80.6051437216339,
          "id": "5f0c137efaabae14decd664c"
        },
        {
          "progress": 7988,
          "name": "Good Times Burg...",
          "percentage": 80.5648008068583,
          "id": "5f0c137dfaabae14decd65c4"
        },
        {
          "progress": 7887,
          "name": "Sherman High Sc...",
          "percentage": 79.54614220877458,
          "id": "5f0c1372faabae14decd60de"
        },
        {
          "progress": 7706,
          "name": "Smart & Final",
          "percentage": 77.72062531517902,
          "id": "5f0c1373faabae14decd6176"
        },
        {
          "progress": 7577,
          "name": "Smorgon Steel",
          "percentage": 76.41956631366617,
          "id": "5f0c1380faabae14decd670d"
        },
        {
          "progress": 7566,
          "name": "Faktor Eiendom",
          "percentage": 76.30862329803328,
          "id": "5f0c137afaabae14decd648c"
        },
        {
          "progress": 7337,
          "name": "Prestonsburg Hi...",
          "percentage": 73.9989914271306,
          "id": "5f0c137efaabae14decd6671"
        },
        {
          "progress": 7250,
          "name": "Bath Local Scho...",
          "percentage": 73.12153303076147,
          "id": "5f0c1372faabae14decd616c"
        },
        {
          "progress": 7119,
          "name": "Larry Flynt Pub...",
          "percentage": 71.80030257186083,
          "id": "5f0c1372faabae14decd60fb"
        },
        {
          "progress": 7040,
          "name": "Apollo Global M...",
          "percentage": 71.00353000504288,
          "id": "5f0c1381faabae14decd67a5"
        },
        {
          "progress": 6802,
          "name": "Harris Academy ...",
          "percentage": 68.60312657589512,
          "id": "5f0c137afaabae14decd645c"
        },
        {
          "progress": 6794,
          "name": "Data Respons",
          "percentage": 68.52244074634393,
          "id": "5f0c137afaabae14decd649f"
        },
        {
          "progress": 6645,
          "name": "St. Gerard Cath...",
          "percentage": 67.0196671709531,
          "id": "5f0c1374faabae14decd618a"
        },
        {
          "progress": 6582,
          "name": "Apollo Global M...",
          "percentage": 66.38426626323752,
          "id": "5f0c1381faabae14decd67a3"
        }
      ];
      this.ShowAffiliations=this.TopAffiliations.slice(0,10)
      for(let i=0;i<this.TopAffiliations.length;i++){
        if(this.TopAffiliations[i].name.length>15){
          this.TopAffiliations[i].name=this.TopAffiliations[i].name.slice(0,15)+"..."
        }
      }
      // let data=new FormData();
      // let i=0
      // data.append('count','40')
      //  request('POST', "/api/PortalManager/getTopAffiliation/",data)
      //   .then(response => {
      //     console.log("affil", response)
      //     this.TopAffiliations=[
      //       {
      //         "progress": 9915,
      //         "name": "Angelo Rodrigue...",
      //         "percentage": 100,
      //         "id": "5f0c137dfaabae14decd659f"
      //       },
      //       {
      //         "progress": 9865,
      //         "name": "Oblate School o...",
      //         "percentage": 99.4957135653051,
      //         "id": "5f0c1374faabae14decd618d"
      //       },
      //       {
      //         "progress": 9836,
      //         "name": "FHB Mortgage Ba...",
      //         "percentage": 99.20322743318205,
      //         "id": "5f0c1374faabae14decd6194"
      //       },
      //       {
      //         "progress": 9758,
      //         "name": "ING Bank Śląski",
      //         "percentage": 98.416540595058,
      //         "id": "5f0c1372faabae14decd614d"
      //       },
      //       {
      //         "progress": 9710,
      //         "name": "China Hualu Gro...",
      //         "percentage": 97.93242561775088,
      //         "id": "5f0c137dfaabae14decd6593"
      //       },
      //       {
      //         "progress": 9668,
      //         "name": "Friends of Wome...",
      //         "percentage": 97.50882501260716,
      //         "id": "5f0c1377faabae14decd630e"
      //       },
      //       {
      //         "progress": 9615,
      //         "name": "Melco",
      //         "percentage": 96.97428139183056,
      //         "id": "5f0c1380faabae14decd6740"
      //       },
      //       {
      //         "progress": 9608,
      //         "name": "Kewego",
      //         "percentage": 96.90368129097328,
      //         "id": "5f0c1358faabae14decd608d"
      //       },
      //       {
      //         "progress": 9532,
      //         "name": "Alberni Distric...",
      //         "percentage": 96.13716591023702,
      //         "id": "5f0c1376faabae14decd62c3"
      //       },
      //       {
      //         "progress": 9438,
      //         "name": "BOSCO-Uganda",
      //         "percentage": 95.18910741301059,
      //         "id": "5f0c1374faabae14decd61d0"
      //       },
      //       {
      //         "progress": 9070,
      //         "name": "Miramichi Valle...",
      //         "percentage": 91.47755925365607,
      //         "id": "5f0c1372faabae14decd60e7"
      //       },
      //       {
      //         "progress": 8961,
      //         "name": "InterOil Explor...",
      //         "percentage": 90.37821482602118,
      //         "id": "5f0c1374faabae14decd61bd"
      //       },
      //       {
      //         "progress": 8839,
      //         "name": "Scandinavian Bu...",
      //         "percentage": 89.14775592536562,
      //         "id": "5f0c137dfaabae14decd65ac"
      //       },
      //       {
      //         "progress": 8733,
      //         "name": "Bergenshalvøens...",
      //         "percentage": 88.0786686838124,
      //         "id": "5f0c1378faabae14decd637a"
      //       },
      //       {
      //         "progress": 8725,
      //         "name": "Base One Intern...",
      //         "percentage": 87.99798285426122,
      //         "id": "5f0c1374faabae14decd61a7"
      //       },
      //       {
      //         "progress": 8655,
      //         "name": "Intermountain I...",
      //         "percentage": 87.29198184568835,
      //         "id": "5f0c1376faabae14decd62e9"
      //       },
      //       {
      //         "progress": 8631,
      //         "name": "Behr GmbH & Co....",
      //         "percentage": 87.0499243570348,
      //         "id": "5f0c1372faabae14decd60e3"
      //       },
      //       {
      //         "progress": 8532,
      //         "name": "CERGE-EI",
      //         "percentage": 86.05143721633888,
      //         "id": "5f0c1381faabae14decd6795"
      //       },
      //       {
      //         "progress": 8494,
      //         "name": "CASA de Marylan...",
      //         "percentage": 85.66817952597076,
      //         "id": "5f0c1375faabae14decd6209"
      //       },
      //       {
      //         "progress": 8144,
      //         "name": "Verso Corporati...",
      //         "percentage": 82.13817448310641,
      //         "id": "5f0c137efaabae14decd6670"
      //       },
      //       {
      //         "progress": 8100,
      //         "name": "Madeira Brewery",
      //         "percentage": 81.69440242057489,
      //         "id": "5f0c1380faabae14decd672e"
      //       },
      //       {
      //         "progress": 8099,
      //         "name": "CIB Bank",
      //         "percentage": 81.68431669188098,
      //         "id": "5f0c1374faabae14decd61c0"
      //       },
      //       {
      //         "progress": 8093,
      //         "name": "Little Chute Hi...",
      //         "percentage": 81.6238023197176,
      //         "id": "5f0c1374faabae14decd6192"
      //       },
      //       {
      //         "progress": 8072,
      //         "name": "Tealeaf",
      //         "percentage": 81.41200201714574,
      //         "id": "5f0c1378faabae14decd63af"
      //       },
      //       {
      //         "progress": 8047,
      //         "name": "Assuranceforeni...",
      //         "percentage": 81.15985879979829,
      //         "id": "5f0c137bfaabae14decd6519"
      //       },
      //       {
      //         "progress": 8011,
      //         "name": "Lucile Packard ...",
      //         "percentage": 80.79677256681795,
      //         "id": "5f0c1372faabae14decd6112"
      //       },
      //       {
      //         "progress": 7992,
      //         "name": "Johnston Senior...",
      //         "percentage": 80.6051437216339,
      //         "id": "5f0c137efaabae14decd664c"
      //       },
      //       {
      //         "progress": 7988,
      //         "name": "Good Times Burg...",
      //         "percentage": 80.5648008068583,
      //         "id": "5f0c137dfaabae14decd65c4"
      //       },
      //       {
      //         "progress": 7887,
      //         "name": "Sherman High Sc...",
      //         "percentage": 79.54614220877458,
      //         "id": "5f0c1372faabae14decd60de"
      //       },
      //       {
      //         "progress": 7706,
      //         "name": "Smart & Final",
      //         "percentage": 77.72062531517902,
      //         "id": "5f0c1373faabae14decd6176"
      //       },
      //       {
      //         "progress": 7577,
      //         "name": "Smorgon Steel",
      //         "percentage": 76.41956631366617,
      //         "id": "5f0c1380faabae14decd670d"
      //       },
      //       {
      //         "progress": 7566,
      //         "name": "Faktor Eiendom",
      //         "percentage": 76.30862329803328,
      //         "id": "5f0c137afaabae14decd648c"
      //       },
      //       {
      //         "progress": 7337,
      //         "name": "Prestonsburg Hi...",
      //         "percentage": 73.9989914271306,
      //         "id": "5f0c137efaabae14decd6671"
      //       },
      //       {
      //         "progress": 7250,
      //         "name": "Bath Local Scho...",
      //         "percentage": 73.12153303076147,
      //         "id": "5f0c1372faabae14decd616c"
      //       },
      //       {
      //         "progress": 7119,
      //         "name": "Larry Flynt Pub...",
      //         "percentage": 71.80030257186083,
      //         "id": "5f0c1372faabae14decd60fb"
      //       },
      //       {
      //         "progress": 7040,
      //         "name": "Apollo Global M...",
      //         "percentage": 71.00353000504288,
      //         "id": "5f0c1381faabae14decd67a5"
      //       },
      //       {
      //         "progress": 6802,
      //         "name": "Harris Academy ...",
      //         "percentage": 68.60312657589512,
      //         "id": "5f0c137afaabae14decd645c"
      //       },
      //       {
      //         "progress": 6794,
      //         "name": "Data Respons",
      //         "percentage": 68.52244074634393,
      //         "id": "5f0c137afaabae14decd649f"
      //       },
      //       {
      //         "progress": 6645,
      //         "name": "St. Gerard Cath...",
      //         "percentage": 67.0196671709531,
      //         "id": "5f0c1374faabae14decd618a"
      //       },
      //       {
      //         "progress": 6582,
      //         "name": "Apollo Global M...",
      //         "percentage": 66.38426626323752,
      //         "id": "5f0c1381faabae14decd67a3"
      //       }
      //     ];
      //     this.ShowAffiliations=this.TopAffiliations.slice(0,10)
      //     for(i=0;i<this.TopAffiliations.length;i++){
      //       if(this.TopAffiliations[i].name.length>15){
      //         this.TopAffiliations[i].name=this.TopAffiliations[i].name.slice(0,15)+"..."
      //       }
      //     }
      //
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });
    },
    getJournals(){
      this.TopJournals=[
        {
          "progress": 49427,
          "name": "Yugoslav Journa...",
          "percentage": 100,
          "id": "5451a5cae0cf0b02b5f3c669"
        },
        {
          "progress": 49030,
          "name": "Facta Universit...",
          "percentage": 98.06196123922479,
          "id": "5451a5cae0cf0b02b5f3c66a"
        },
        {
          "progress": 47871,
          "name": "Journal of Agri...",
          "percentage": 95.74391487829756,
          "id": "5451a5cae0cf0b02b5f3c61a"
        },
        {
          "progress": 47378,
          "name": "Quarterly Journ...",
          "percentage": 94.75789515790316,
          "id": "5451a5cae0cf0b02b5f3c644"
        },
        {
          "progress": 47173,
          "name": "Teion Kogaku (j...",
          "percentage": 94.34788695773916,
          "id": "5451a5cae0cf0b02b5f3c660"
        },
        {
          "progress": 46972,
          "name": "California Jour...",
          "percentage": 93.94587891757836,
          "id": "5451a5cae0cf0b02b5f3c632"
        },
        {
          "progress": 46779,
          "name": "Archive of Onco...",
          "percentage": 93.55987119742394,
          "id": "5451a5cae0cf0b02b5f3c662"
        },
        {
          "progress": 46514,
          "name": "Doboku Gakkai R...",
          "percentage": 93.02986059721195,
          "id": "5451a5cae0cf0b02b5f3c64a"
        },
        {
          "progress": 46460,
          "name": "Interventional ...",
          "percentage": 92.92185843716875,
          "id": "5451a5cae0cf0b02b5f3c65d"
        },
        {
          "progress": 46366,
          "name": "Zbornik Institu...",
          "percentage": 92.73385467709355,
          "id": "5451a5cae0cf0b02b5f3c664"
        },
        {
          "progress": 45891,
          "name": "International J...",
          "percentage": 91.78383567671354,
          "id": "5451a5cae0cf0b02b5f3c60c"
        },
        {
          "progress": 45661,
          "name": "Future Hiv Ther...",
          "percentage": 91.32382647652953,
          "id": "5451a5cae0cf0b02b5f3c657"
        },
        {
          "progress": 45285,
          "name": "Women's Health",
          "percentage": 90.57181143622873,
          "id": "5451a5cae0cf0b02b5f3c656"
        },
        {
          "progress": 44961,
          "name": "Future Cardiolo...",
          "percentage": 89.92379847596952,
          "id": "5451a5cae0cf0b02b5f3c652"
        },
        {
          "progress": 44772,
          "name": "Hiv Therapy",
          "percentage": 89.54579091581832,
          "id": "5451a5cae0cf0b02b5f3c659"
        },
        {
          "progress": 44578,
          "name": "Epigenomics",
          "percentage": 89.15778315566311,
          "id": "5451a5cae0cf0b02b5f3c65b"
        },
        {
          "progress": 44381,
          "name": "Therapy",
          "percentage": 88.76377527550551,
          "id": "5451a5cae0cf0b02b5f3c651"
        },
        {
          "progress": 43874,
          "name": "Global Jurist",
          "percentage": 87.7497549950999,
          "id": "5451a5cae0cf0b02b5f3c627"
        },
        {
          "progress": 43768,
          "name": "World Political...",
          "percentage": 87.5377507550151,
          "id": "5451a5cae0cf0b02b5f3c62b"
        },
        {
          "progress": 43725,
          "name": "Doboku Gakkai R...",
          "percentage": 87.4517490349807,
          "id": "5451a5cae0cf0b02b5f3c649"
        },
        {
          "progress": 43620,
          "name": "Contributions i...",
          "percentage": 87.24174483489669,
          "id": "5451a5cae0cf0b02b5f3c613"
        },
        {
          "progress": 42904,
          "name": "Frontiers in Ma...",
          "percentage": 85.80971619432388,
          "id": "5451a5cae0cf0b02b5f3c614"
        },
        {
          "progress": 42756,
          "name": "Topics in Macro...",
          "percentage": 85.51371027420548,
          "id": "5451a5cae0cf0b02b5f3c615"
        },
        {
          "progress": 42141,
          "name": "Journal of Drug...",
          "percentage": 84.28368567371348,
          "id": "5451a5cae0cf0b02b5f3c630"
        },
        {
          "progress": 41912,
          "name": "Studies in Ethi...",
          "percentage": 83.82567651353027,
          "id": "5451a5cae0cf0b02b5f3c62d"
        },
        {
          "progress": 41407,
          "name": "Uirusu",
          "percentage": 82.81565631312627,
          "id": "5451a5cae0cf0b02b5f3c661"
        },
        {
          "progress": 41407,
          "name": "Ekonomski Anali",
          "percentage": 82.81565631312627,
          "id": "5451a5cae0cf0b02b5f3c667"
        },
        {
          "progress": 41017,
          "name": "Peace Economics...",
          "percentage": 82.03564071281426,
          "id": "5451a5cae0cf0b02b5f3c626"
        },
        {
          "progress": 40952,
          "name": "Global Economy ...",
          "percentage": 81.90563811276226,
          "id": "5451a5cae0cf0b02b5f3c61c"
        },
        {
          "progress": 40852,
          "name": "World Medical &...",
          "percentage": 81.70563411268226,
          "id": "5451a5cae0cf0b02b5f3c639"
        },
        {
          "progress": 40712,
          "name": "Poverty & Publi...",
          "percentage": 81.42562851257024,
          "id": "5451a5cae0cf0b02b5f3c634"
        },
        {
          "progress": 40553,
          "name": "Doboku Gakkai R...",
          "percentage": 81.10762215244304,
          "id": "5451a5cae0cf0b02b5f3c648"
        },
        {
          "progress": 39814,
          "name": "Doboku Gakkai R...",
          "percentage": 79.62959259185183,
          "id": "5451a5cae0cf0b02b5f3c64c"
        },
        {
          "progress": 38710,
          "name": "The Bulletin of...",
          "percentage": 77.42154843096863,
          "id": "5451a5cae0cf0b02b5f3c64e"
        },
        {
          "progress": 38514,
          "name": "Medicinski Preg...",
          "percentage": 77.02954059081182,
          "id": "5451a5cae0cf0b02b5f3c668"
        },
        {
          "progress": 38316,
          "name": "Asia-pacific Jo...",
          "percentage": 76.63353267065341,
          "id": "5451a5cae0cf0b02b5f3c637"
        },
        {
          "progress": 37518,
          "name": "The Forum",
          "percentage": 75.037500750015,
          "id": "5451a5cae0cf0b02b5f3c621"
        },
        {
          "progress": 36876,
          "name": "Global Jurist T...",
          "percentage": 73.75347506950139,
          "id": "5451a5cae0cf0b02b5f3c60f"
        },
        {
          "progress": 36801,
          "name": "Statistical Com...",
          "percentage": 73.6034720694414,
          "id": "5451a5cae0cf0b02b5f3c636"
        },
        {
          "progress": 36779,
          "name": "The Economists'...",
          "percentage": 73.55947118942379,
          "id": "5451a5cae0cf0b02b5f3c61d"
        }
      ];
      this.ShowJournals=this.TopJournals.slice(0,10)
      for(let i=0;i<this.TopJournals.length;i++){
        if(this.TopJournals[i].name.length>15){
          this.TopJournals[i].name=this.TopJournals[i].name.slice(0,15)+"..."
        }
      }
      // let data=new FormData();
      // let i=0
      // data.append('count','40')
      //  request('POST', "/api/PaperBrowser/getTopVenue/",data)
      //   .then(response => {
      //     console.log("journal", response)
      //
      //     this.TopJournals=[
      //       {
      //         "progress": 49999,
      //         "name": "Yugoslav Journa...",
      //         "percentage": 100,
      //         "id": "5451a5cae0cf0b02b5f3c669"
      //       },
      //       {
      //         "progress": 49030,
      //         "name": "Facta Universit...",
      //         "percentage": 98.06196123922479,
      //         "id": "5451a5cae0cf0b02b5f3c66a"
      //       },
      //       {
      //         "progress": 47871,
      //         "name": "Journal of Agri...",
      //         "percentage": 95.74391487829756,
      //         "id": "5451a5cae0cf0b02b5f3c61a"
      //       },
      //       {
      //         "progress": 47378,
      //         "name": "Quarterly Journ...",
      //         "percentage": 94.75789515790316,
      //         "id": "5451a5cae0cf0b02b5f3c644"
      //       },
      //       {
      //         "progress": 47173,
      //         "name": "Teion Kogaku (j...",
      //         "percentage": 94.34788695773916,
      //         "id": "5451a5cae0cf0b02b5f3c660"
      //       },
      //       {
      //         "progress": 46972,
      //         "name": "California Jour...",
      //         "percentage": 93.94587891757836,
      //         "id": "5451a5cae0cf0b02b5f3c632"
      //       },
      //       {
      //         "progress": 46779,
      //         "name": "Archive of Onco...",
      //         "percentage": 93.55987119742394,
      //         "id": "5451a5cae0cf0b02b5f3c662"
      //       },
      //       {
      //         "progress": 46514,
      //         "name": "Doboku Gakkai R...",
      //         "percentage": 93.02986059721195,
      //         "id": "5451a5cae0cf0b02b5f3c64a"
      //       },
      //       {
      //         "progress": 46460,
      //         "name": "Interventional ...",
      //         "percentage": 92.92185843716875,
      //         "id": "5451a5cae0cf0b02b5f3c65d"
      //       },
      //       {
      //         "progress": 46366,
      //         "name": "Zbornik Institu...",
      //         "percentage": 92.73385467709355,
      //         "id": "5451a5cae0cf0b02b5f3c664"
      //       },
      //       {
      //         "progress": 45891,
      //         "name": "International J...",
      //         "percentage": 91.78383567671354,
      //         "id": "5451a5cae0cf0b02b5f3c60c"
      //       },
      //       {
      //         "progress": 45661,
      //         "name": "Future Hiv Ther...",
      //         "percentage": 91.32382647652953,
      //         "id": "5451a5cae0cf0b02b5f3c657"
      //       },
      //       {
      //         "progress": 45285,
      //         "name": "Women's Health",
      //         "percentage": 90.57181143622873,
      //         "id": "5451a5cae0cf0b02b5f3c656"
      //       },
      //       {
      //         "progress": 44961,
      //         "name": "Future Cardiolo...",
      //         "percentage": 89.92379847596952,
      //         "id": "5451a5cae0cf0b02b5f3c652"
      //       },
      //       {
      //         "progress": 44772,
      //         "name": "Hiv Therapy",
      //         "percentage": 89.54579091581832,
      //         "id": "5451a5cae0cf0b02b5f3c659"
      //       },
      //       {
      //         "progress": 44578,
      //         "name": "Epigenomics",
      //         "percentage": 89.15778315566311,
      //         "id": "5451a5cae0cf0b02b5f3c65b"
      //       },
      //       {
      //         "progress": 44381,
      //         "name": "Therapy",
      //         "percentage": 88.76377527550551,
      //         "id": "5451a5cae0cf0b02b5f3c651"
      //       },
      //       {
      //         "progress": 43874,
      //         "name": "Global Jurist",
      //         "percentage": 87.7497549950999,
      //         "id": "5451a5cae0cf0b02b5f3c627"
      //       },
      //       {
      //         "progress": 43768,
      //         "name": "World Political...",
      //         "percentage": 87.5377507550151,
      //         "id": "5451a5cae0cf0b02b5f3c62b"
      //       },
      //       {
      //         "progress": 43725,
      //         "name": "Doboku Gakkai R...",
      //         "percentage": 87.4517490349807,
      //         "id": "5451a5cae0cf0b02b5f3c649"
      //       },
      //       {
      //         "progress": 43620,
      //         "name": "Contributions i...",
      //         "percentage": 87.24174483489669,
      //         "id": "5451a5cae0cf0b02b5f3c613"
      //       },
      //       {
      //         "progress": 42904,
      //         "name": "Frontiers in Ma...",
      //         "percentage": 85.80971619432388,
      //         "id": "5451a5cae0cf0b02b5f3c614"
      //       },
      //       {
      //         "progress": 42756,
      //         "name": "Topics in Macro...",
      //         "percentage": 85.51371027420548,
      //         "id": "5451a5cae0cf0b02b5f3c615"
      //       },
      //       {
      //         "progress": 42141,
      //         "name": "Journal of Drug...",
      //         "percentage": 84.28368567371348,
      //         "id": "5451a5cae0cf0b02b5f3c630"
      //       },
      //       {
      //         "progress": 41912,
      //         "name": "Studies in Ethi...",
      //         "percentage": 83.82567651353027,
      //         "id": "5451a5cae0cf0b02b5f3c62d"
      //       },
      //       {
      //         "progress": 41407,
      //         "name": "Uirusu",
      //         "percentage": 82.81565631312627,
      //         "id": "5451a5cae0cf0b02b5f3c661"
      //       },
      //       {
      //         "progress": 41407,
      //         "name": "Ekonomski Anali",
      //         "percentage": 82.81565631312627,
      //         "id": "5451a5cae0cf0b02b5f3c667"
      //       },
      //       {
      //         "progress": 41017,
      //         "name": "Peace Economics...",
      //         "percentage": 82.03564071281426,
      //         "id": "5451a5cae0cf0b02b5f3c626"
      //       },
      //       {
      //         "progress": 40952,
      //         "name": "Global Economy ...",
      //         "percentage": 81.90563811276226,
      //         "id": "5451a5cae0cf0b02b5f3c61c"
      //       },
      //       {
      //         "progress": 40852,
      //         "name": "World Medical &...",
      //         "percentage": 81.70563411268226,
      //         "id": "5451a5cae0cf0b02b5f3c639"
      //       },
      //       {
      //         "progress": 40712,
      //         "name": "Poverty & Publi...",
      //         "percentage": 81.42562851257024,
      //         "id": "5451a5cae0cf0b02b5f3c634"
      //       },
      //       {
      //         "progress": 40553,
      //         "name": "Doboku Gakkai R...",
      //         "percentage": 81.10762215244304,
      //         "id": "5451a5cae0cf0b02b5f3c648"
      //       },
      //       {
      //         "progress": 39814,
      //         "name": "Doboku Gakkai R...",
      //         "percentage": 79.62959259185183,
      //         "id": "5451a5cae0cf0b02b5f3c64c"
      //       },
      //       {
      //         "progress": 38710,
      //         "name": "The Bulletin of...",
      //         "percentage": 77.42154843096863,
      //         "id": "5451a5cae0cf0b02b5f3c64e"
      //       },
      //       {
      //         "progress": 38514,
      //         "name": "Medicinski Preg...",
      //         "percentage": 77.02954059081182,
      //         "id": "5451a5cae0cf0b02b5f3c668"
      //       },
      //       {
      //         "progress": 38316,
      //         "name": "Asia-pacific Jo...",
      //         "percentage": 76.63353267065341,
      //         "id": "5451a5cae0cf0b02b5f3c637"
      //       },
      //       {
      //         "progress": 37518,
      //         "name": "The Forum",
      //         "percentage": 75.037500750015,
      //         "id": "5451a5cae0cf0b02b5f3c621"
      //       },
      //       {
      //         "progress": 36876,
      //         "name": "Global Jurist T...",
      //         "percentage": 73.75347506950139,
      //         "id": "5451a5cae0cf0b02b5f3c60f"
      //       },
      //       {
      //         "progress": 36801,
      //         "name": "Statistical Com...",
      //         "percentage": 73.6034720694414,
      //         "id": "5451a5cae0cf0b02b5f3c636"
      //       },
      //       {
      //         "progress": 36779,
      //         "name": "The Economists'...",
      //         "percentage": 73.55947118942379,
      //         "id": "5451a5cae0cf0b02b5f3c61d"
      //       }
      //     ];
      //     this.ShowJournals=this.TopJournals.slice(0,10)
      //     for(i=0;i<this.TopJournals.length;i++){
      //       if(this.TopJournals[i].name.length>15){
      //         this.TopJournals[i].name=this.TopJournals[i].name.slice(0,15)+"..."
      //       }
      //     }
      //
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });
    },

    changeShowAuthor(page1){
      this.ShowAuthors=this.TopAuthors.slice((page1-1)*10,page1*10)
    },
    changeShowAffiliation(page1){
      this.ShowAffiliations=this.TopAffiliations.slice((page1-1)*10,page1*10)
    },
    changeShowJournal(page1){
      this.ShowJournals=this.TopJournals.slice((page1-1)*10,page1*10)
    },

    },
  watch: {
    search:'inputHandle',
    page1:'changeShowAuthor',
    page2:'changeShowAffiliation',
    page3:'changeShowJournal',
  },
  created(){
    this.getAll()
    this.getAuthors()
    this.getAffiliations()
    this.getJournals()
    const userInfo = user.getters.getUser(user.state());
    if (userInfo)
    {
        this.userId=userInfo.user.userId;
        console.log(this.userId)
    }

  }
};
</script>
<style scoped>
.bgimg {
  background-image: url("../assets/bg-2.png");
  background-size: cover;
}
.span-line:hover{
  text-decoration:underline;
}
</style>>
