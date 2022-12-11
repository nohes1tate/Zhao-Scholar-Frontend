<template>
  <!-- <h1>文献展示页面</h1> -->
  <div class="root">
    <page-header :show-search="false"></page-header>
      <!-- <v-input persistant-hint="输入你想了解的论文" absolute right>input</v-input> -->
<!--      <v-btn  @click="jump2login" tile color="indigo" dark absolute right>登录/注册</v-btn>-->

      <div id="allcontent">


      <!-- <v-breadcrumbs :items="items" large></v-breadcrumbs> -->

      <div id="article" class="mt-4">
          <p >DOI:<span class="blue--text text--lighten-2">{{DOI}}</span></p>
          <h2>{{title}}</h2>
          <p class="mt-2">{{paperConference}}</p>
          <p class="blue--text text--lighten-2 mt-0">{{author}}
          </p>

            <v-btn color="primary" dark @click="read">阅读<v-icon class="ml-2">mdi-eye</v-icon></v-btn>

            <v-btn color="primary" dark outlined class="ml-4" @click="addStar">收藏<v-icon class="ml-2">mdi-star-plus-outline</v-icon></v-btn>

            <v-btn color="primary" dark text class="ml-4" @click="cite">引用</v-btn>
            <!-- 找一个引号图标放到引用后面 -->

            <v-btn color="primary" dark text class="ml-4" @click="share">分享<v-icon>mdi-arrow-top-right-bold-box-outline</v-icon></v-btn>




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
          <div class="text--primary" id="abstract">
            {{abstract}}
           </div>
        </v-card-text>

      </v-card>

      <!-- <v-card
        class="mt-8"
        float:left
        width = "full"
      > -->
        <!-- <v-card-text>
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

      </v-card> -->

      <v-card
        class="mt-8"
        float:left
        width = "full"
      >
        <!-- <v-card-text> -->
       
          <v-tabs v-model="tabpointer" height="50px">
            <v-tab
              v-for="i in tabs"
              :key="i.tab"
            >
            <p class="card-tab"> {{ i.tab }}</p>
             
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tabpointer">
            <v-tab-item
              v-for="i in tabs"
              :key="i.tab"
            >
              <v-card
                flat
                tile
              >
                <v-card-text>
                  <!-- <div class="text--primary"> -->
                    <p class="cite">
                  {{i.content}}
                    </p>
                  <!-- </div> -->
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>


        <!-- </v-card-text> -->

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
            <p class="cite"><span class="blue--text text--darken-1">{{text}}</span></p>
            </v-item>
          </v-item-group>
          </v-card-text>

        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
  import request from '@/utils/request';
  import PageHeader from "@/components/UserCenter/PageHeader";
  export default {
    name: 'DocumentDisplay',
    components: {PageHeader},
    data: () => ({
      id:'',
      DOI:"10.1109/cvprw50498.2020.0002",
      title:"TimeTraveler: Reinforcement Learning for Temporal Knowledge Graph Forecasting",
      paperConference:"CCF-A",
      author:"Haofan WangZifan WangMengnan DuFan YangZijian ZhangSirui DingPiotr MardzielXia Hu",
      url:"https://www.runoob.com",
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
        ["computer science"],
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

      ],
      tabs:[{tab:"引用文献",content:"[1] Arya, S. and Mount, D.M. 1993. Approximate nearest neighbor searching. In Proc. 4th Annual ACM-SIAM Symposium on Dis- crete Algorithms, pp. 271-280."},
            {tab:"参考文献",content:"cankao"},
            {tab:"相似文献",content:"xiangsi"}],
      tabpointer:null
    }),
    created(){
      var title = this.$route.query.Title
      var id=this.$route.query.Id
      console.log("进入详情页")
      console.log(title)
      console.log(id)
      this.id = id;
      this.title = title;

      this.get_paper_info()

    },
    methods:{
      jump2login(){
        this.$router.push('/login');
      },
      get_paper_info(){
        console.log("get paper info")
        const data = new FormData();
        // data.append("paperID",this.id);
        data.append("paperID","53e9ac48b7602d97036198e6");

        var sample_id = 249908020;
        const url = '/api/PaperBrowser/getPaperInfo/' ;
        request('POST', url, data)
        .then(data => {
          console.log(data);
          this.url = data.articles_list[0].url[0]
          this.title = data.articles_list[0].title
          this.abstract = data.articles_list[0].abstract
          this.DOI = data.articles_list[0].doi
          this.stars = data.stars
          var new_authors = data.articles_list[0].authors
          this.author = ""
          for(var i in new_authors){
            this.author += new_authors[i].name + "  " + new_authors[i].org + "; "
          }
          this.paperConference = data.articles_list[0].venue.name
          var new_keywords = data.articles_list[0].keywords
          for(var j in new_keywords){
            var this_keyword = []
            this_keyword[0] = new_keywords[j]
            this.keywords[j] = this_keyword
          }
        
        })
        .catch(error => {
          console.error(error);
        });
      },
      read(){
        console.log("read this paper");
        window.location.replace(this.url);
      },
      addStar(){
        console.log("star this paper")
      },
      share(){
        console.log("share this paper")
      },
      cite(){
        console.log("cite this paper")
      },
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
.card-tab{
  font-family: Tahoma,fantasy;
  font-weight: bolder;
  font-size:1em;
  color: rgb(61, 57, 57);
}
#abstract{
  text-align: justify;
  /* padding: 16px 16px 6px 16px;
  font-size: 15px;
  line-height: 24px; */
  font-family: Georgia, fantasy;
}
.cite{
  text-align: justify;
  font-family: Georgia, fantasy;
}
</style>
