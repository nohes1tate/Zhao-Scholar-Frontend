<template>
  <!-- <h1>文献展示页面</h1> -->
  <div class="root">
    <page-header :show-search="true"></page-header>
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

            <v-btn color="primary" dark text class="ml-4" @click="cite">引用<v-icon>mdi-format-quote-close-outline</v-icon></v-btn>
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
                  <div class="text-h4 amber--text text--darken-4 font-weight-medium" >{{n_citation}}</div><div class="ml-2">被引数</div>
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

      <v-overlay
           
            :value="overlay"
            :opacity="opacity"
          >
      <v-card style="width: 700px;background-color: white;margin-top: 150px;">
        <v-toolbar
            color="blue darken-1"
            dark
        >
          <v-toolbar-title>引用格式</v-toolbar-title>
                 <v-spacer>
                 </v-spacer>
                 <v-btn icon
                 @click="overlay = false"
                 >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
          <template v-slot:extension>
            <v-tabs
                v-model="tab"
                align-with-title
            >
              <v-tabs-slider color="yellow"></v-tabs-slider>

              <v-tab
                  v-for="cite in citeStyle"
                  :key="cite.name"
              >
                {{ cite.name }}
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
        <v-tabs-items v-model="tab">
          <v-tab-item
              v-for="citeContent in citeStyle"
              :key="citeContent.name"
          >
            <v-textarea
                :value=citeContent.text
                auto-grow
                row-height="15"
                readonly
            ></v-textarea>
            <v-btn
                depressed
                color="primary"
                @click="copyVal(citeContent.text)"
                style="width: 10%;float: right;margin-right: 10px;margin-bottom: 10px;"
            >复制</v-btn>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-overlay>

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
      url:"",
     
      stars:"36",
      n_citation:"108",
      keywords:[
        
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
      tabpointer:null,
      tab:null,
      citeStyle:[{name:"引用类型", text:"引用文本"}],
      overlay:false,
      opacity:0.5
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
        data.append("paperID",this.id);
        // data.append("paperID","53e9ac48b7602d97036198e6");

        const url = '/api/PaperBrowser/getPaperInfo/' ;
        request('POST', url, data)
        .then(data => {
          console.log(data);
          if(data.articles_list[0].url[0]){
             this.url = data.articles_list[0].url[0]
          }
           
          this.title = data.articles_list[0].title
          this.abstract = data.articles_list[0].abstract
          this.DOI = data.articles_list[0].doi
          this.stars = data.stars
          this.n_citation = data.articles_list[0].n_citation
          var new_authors = data.articles_list[0].authors
          this.author = ""
          for(var i in new_authors){
            this.author += new_authors[i].name 
            if(new_authors[i].org){
              this.author += "  " + new_authors[i].org 
            }
            this.author += "; "
          }
          this.paperConference = data.articles_list[0].venue.name
          var new_keywords = data.articles_list[0].keywords
          for(var j in new_keywords){
            var this_keyword = []
            this_keyword[0] = new_keywords[j]
            this.keywords[j] = this_keyword
          }
        
          let cite = []
            if("venue" in data.articles_list[0]){
              let GBT = this.GBTgenerateCitation(data.articles_list[0].title, data.articles_list[0].authors, data.articles_list[0].year, data.articles_list[0].venue.name)
              cite.push({name:"GB/T", text:GBT})
            }
            let MLA = this.MLAgenerateCitation(data.articles_list[0].title, data.articles_list[0].authors[0].name, data.articles_list[0].year)
            cite.push({name:"MLA", text:MLA})
            let BIBTEX  = this.BIBTEXgenerateCitation(data.articles_list[0])
            cite.push({name:"BIBTEX", text:BIBTEX})
            this.citeStyle = cite;
        })
        .catch(error => {
          console.error(error);
        });
      },
      read(){
        console.log("read this paper");
        // window.location.replace(this.url);
        if(this.url==""){
          this.$message.error("不存在原文链接");
        }else{
          window.open(this.url, "_blank")
        }
      },
      addStar(){
        console.log("star this paper")
      },
      share(){
        console.log("share this paper")
        const share = {
        title: this.title,
        desc: "描述",
        share_url: this.url
      };
      location.replace(
        "https://connect.qq.com/widget/shareqq/index.html?url=" +
          encodeURIComponent(share.share_url) +
          "&title=" +
          share.title +
          "&desc=" +
          share.desc
      );
      },
      cite(){
            this.overlay = !this.overlay
            console.log(this.citeStyle)
            // this.overlay = !this.overlay
                // this.content=this.citeStyle(0).text
      },
      copyVal(val) {
            let aux = document.createElement("input");
            aux.setAttribute("value", val);
            document.body.appendChild(aux);
            aux.select();
            document.execCommand("copy");
            document.body.removeChild(aux);
            if (val !== null) {
              this.$message.success("引用已复制至剪贴板");
            } else {
              this.$message.error("引用格式为空");
            }
          },
      GBTgenerateCitation(title, authors, year, publisher) {
                // 处理多个作者
                var authorInitials = "";
                for (var i = 0; i < authors.length; i++) {
                    var author = authors[i].name;
                    var initials = author.charAt(0);  // 获取作者姓氏首字母
                    authorInitials += initials;  // 拼接作者姓氏首字母
                }

                // 使用字符串拼接函数将论文信息组合成GB/T简略引用格式
                var citation = "[" + authorInitials + "] " + year + ". " + title + ". " + publisher + ".";
                // 返回GB/T简略引用格式
                return citation;
            },
            MLAgenerateCitation(title, authors, year){
                var citation = authors + ". " + title + ". " + year + ".";
                return citation
            },
            BIBTEXgenerateCitation(paper) {
            // 使用字符串拼接函数将论文信息组合成BIBTEX引用格式
            var citation = "@article{key,\n"
                        + "  title = {" + paper.title + "},\n"
                        + "  author = {" + paper.author + "},\n"
                        
            if("volume" in paper){
                citation +=  "  volume = {" + paper.volume + "},\n"
            }
            if("venue" in paper){
                citation +=  "  journal = {" + paper.venue.name + "},\n"
            }
            citation +=  "  year = {" + paper.year + "}\n"
            citation+= "}"
            // 返回BIBTEX引用格式
            return citation;
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
