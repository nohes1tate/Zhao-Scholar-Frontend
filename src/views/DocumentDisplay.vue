<template>
  <!-- <h1>文献展示页面</h1> -->
  <div class="root">
   
      <!-- <v-input persistant-hint="输入你想了解的论文" absolute right>input</v-input> -->
      <v-btn  @click="jump2login" tile color="indigo" dark absolute right>登录/注册</v-btn>
 
      <div id="allcontent">

  
      <!-- <v-breadcrumbs :items="items" large></v-breadcrumbs> -->

      <div id="article" class="mt-4">
          <p >DOI:<span class="blue--text text--lighten-2">{{DOI}}</span></p>
          <h2>{{title}}</h2>
          <p class="mt-2">{{paperConference}}</p>
          <p class="blue--text text--lighten-2 mt-0">{{author}}
          </p>
        
            <v-btn color="primary" dark >阅读<v-icon class="ml-2">mdi-eye</v-icon></v-btn>
          
            <v-btn color="primary" dark outlined class="ml-4">收藏<v-icon class="ml-2">mdi-star-plus-outline</v-icon></v-btn>

            <v-btn color="primary" dark text class="ml-4">引用</v-btn>
            <!-- 找一个引号图标放到引用后面 -->

            <v-btn color="primary" dark text class="ml-4">分享<v-icon>mdi-arrow-top-right-bold-box-outline</v-icon></v-btn>
            

         

      </div>
     
      <div id="cards-left" class="mt-8">
        <v-card
        class="mx=auto"
        float:left
        width = "full"
      >
        <v-card-text>
          <p class="card-title" >
           摘要
          </p>
          <p>abstract</p>
          <div class="text--primary" id="abstract">
            {{abstract}}
           </div>
        </v-card-text>
       
      </v-card>
      
      <v-card
        class="mt-8"
        float:left
        width = "full"
      >
        <v-card-text>
          <p class="card-title">
           图表提取
          </p>

         <v-item-group>
          <v-item
              v-for="[
                num,src
              ] in photos"
              :key="num"
            >
            <v-card class="d-inline-block mx-3">
            <v-container>
              <v-row justify="space-between">
                <v-col cols="auto">
                  <v-img
                    height="150"
                    width="150"
                    :src="src"
                  ></v-img>
                </v-col>
                     
              </v-row>
            </v-container>
            <v-card-text class="text--primary">
                <div>figure {{num}}</div>
              </v-card-text>
           </v-card>
          </v-item>
        </v-item-group>

        </v-card-text>
       
      </v-card>

      <v-card
        class="mt-8"
        float:left
        width = "full"
      >
        <v-card-text>
          <!-- <p class="display-1 text--primary">
            参考文献
          </p> -->
          <v-tabs>
            <v-tab>引用文献</v-tab>
            <v-tab>参考文献</v-tab>
            <v-tab>相似文献</v-tab>

            <v-tab-item
              v-for="i in tabs"
              :key="i"
              :value="'tab-' + i"
            >
              <v-card
                flat
                tile
              >
                <v-card-text>
                  <div class="text--primary">
                    <v-item-group>
                      <v-item
                        v-for="[
                          text
                        ] in references"
                        :key="text"
                      >
                      <p>[1] {{text}}</p>
                      </v-item>
                    </v-item-group>
                  </div>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>

          
        </v-card-text>
       
      </v-card>
      </div>

      <div id="cards-right">
        <v-card
        class="ml-10 mt-8"
        float:right    
        padding:10px
        >
          <v-card-text>
            <p class="card-title">
              相关信息
            </p>
            <div class="d-inline-block">
                <div  class="d-inline-block ">
                  <div class="text-h4 green--text text--darken-2 font-weight-medium">{{stars}}</div><div class="ml-0">收藏量</div>
                </div>
                <div  class="d-inline-block ml-5">
                  <div class="text-h4 amber--text text--darken-4 font-weight-medium" >{{reads}}</div><div class="ml-2">阅读数</div>
                </div>
            </div>
          </v-card-text>

          <v-card-text>
            <p class="card-title">
              关键词
            </p>
          <v-item-group>
            <v-item
              v-for="[
                text
              ] in keywords"
              :key="text"
            >
            <p>- {{text}}</p>
            </v-item>
          </v-item-group>
          </v-card-text>
        
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'DocumentDisplay',
    data: () => ({
      DOI:"10.1109/cvprw50498.2020.0002",
      title:"TimeTraveler: Reinforcement Learning for Temporal Knowledge Graph Forecasting",
      paperConference:"CCF-A",
      author:"Haofan WangZifan WangMengnan DuFan YangZijian ZhangSirui DingPiotr MardzielXia Hu",
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          href: 'breadcrumbs_dashboard',//跳转到的链接
        },
        {
          text: 'Link 1',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
      stars:"36",
      reads:"108",
      keywords:[
        ['computer science'],
        ['cv'],
        ['Object Detection'],
      ],
      abstract:'well meaning and kindly."a benevolent smile"well meaning and kindly.well meand kindly."a benevolent smile"well meaning and kindly.well meand kindly."a benevolent smile"well meaning and kindly.well meand kindly."a benevolent smile"well meaning and kindly.well mean',
      references:[
        ['computer scienc45e'],
        ['cv'],
        ['Object Detec5tionr'],
        ['computer science'],
        ['c3v'],
        ['Object Detectionrrrr'],['computer science1'],
        ['c2v'],
        
        ['cv34'],
        ['Object Detection'],
      ],
      photos:[
        [1,'https://cdn.vuetifyjs.com/images/cards/store.jpg'],
        [2,'https://cdn.vuetifyjs.com/images/cards/store.jpg'],
        [3,'https://cdn.vuetifyjs.com/images/cards/store.jpg'],
        [4,'https://cdn.vuetifyjs.com/images/cards/store.jpg'],
        
      ]
    }),
    created(){
      var title = this.$route.query.Title
      var id=this.$route.query.Id
      console.log("进入详情页")
      console.log(title)
      console.log(id)

      this.get_paper_info()

    },
    methods:{
      jump2login(){
        this.$router.push('/login');
      },
      get_paper_info(){
        console.log("get paper info")
      }
    }
  }
</script>

<style>
.root{
  background-color:#fcfcfc;
}
.p{
  font-family: Tahoma,fantasy;
}
#article{
  width: 66.7%;
  font-family: Tahoma,fantasy;
  font-size: large;

}
#cards-left{
  /* position:absolute; */
  width: 66.7%;
  display: inline-block;
  /* margin:auto; */
  /* float:left;
  padding: 20%; */
}
#cards-right{
  position:absolute;
/* 设置了绝对位置以后，宽度就是相对于根节点 */
  width:25%;
  /* float:left;
  padding: 20%; */
  display:inline-block;
  /* top: -20px; */

}
#allcontent{
  width: 80%;
  margin: auto;
}
.card-title{
  font-family: Tahoma,fantasy;
  font-weight: bolder;
  font-size:1.5em;
  color: #000;
}
#abstract{
  text-align: justify;
  /* padding: 16px 16px 6px 16px;
  font-size: 15px;
  line-height: 24px; */
  font-family: Georgia, fantasy;
}
</style>
