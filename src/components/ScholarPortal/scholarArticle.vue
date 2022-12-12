<template>
  <div>
    <div style="margin-top: 20px;font-size: 18px;">
      <div style="margin-left: 20px;float: left;margin-top: 10px">学者文献共<span style="font-size: 30px">{{Num}}</span>篇</div>
      <div style="float: right;margin-right: 20px;">
        <v-select
            :items="selects"
            label="排序方式"
            v-model="selectMethod"

        ></v-select></div>
    </div>
    <v-card
        width="1000px"
        style="float: left;box-shadow: none; background-color: #fcfcfc"
    >

      <v-overlay
          :absolute="absolute"
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

      <v-list-item
          v-for="(item, i) in this.CurrentPageData"
          :key="i"
          three-line
      >

        <v-card
            style="width: 100%;margin-bottom: 20px;"

        >
          <v-list-item-content style="margin-left: 10px;">

            <v-list-item-title class="headline mb-2" v-text="item.title" @click="toDocument(item.title, item.id)">
            </v-list-item-title>


            <v-list-item-subtitle style="color: #1E88E5;">

                <span

                    class="focusChange"
                    v-for="(author_item, j) in item.authors" :key="j"
                    v-on:click="toscholar(author_item.id)"

                >
                {{author_item.name}},
                </span>
            </v-list-item-subtitle>
            <!-- 摘要 -->
            <div v-text="item.abstract" class="text-ellipsis-two" style="font-weight: 350;"

            >
            </div>
            <!-- 关键词 -->


            <v-list-item-action-text v-show="item.haskeywords">
              关键词：

              <v-chip  outlined
                       v-for="(type, i) in item.keywords"
                       :key="i"
                       @click="searchkeyword(type)"

                       :ripple="false"
                       class="ma-2"
                       label
              >
                {{type}}
              </v-chip>
            </v-list-item-action-text>

            <div>
              <div style="margin-top: 10px;float: left;">
                <h5 style="float: left;">被引用数:{{item.n_citation}}</h5>
                <!-- <h5 style="float: left;margin-left: 30px;">收藏数:{{item.collections}}</h5> -->
                <h5 style="float: left; margin-left: 30px;">发表时间:{{item.year}}</h5>
              </div>
              <div style="float: right;">

                <v-btn style="background-color: transparent;box-shadow: none;font-weight: 300;" >收藏<v-icon color="#64B5F6">mdi-star-plus-outline</v-icon></v-btn>
                <v-btn style="background-color: transparent;box-shadow: none;font-weight: 300;" @click=cite(item)>引用<v-icon color="#64B5F6"> mdi-format-quote-close-outline</v-icon></v-btn>
                <v-btn style="background-color: transparent;box-shadow: none;font-weight: 300;" @click="pdf(item.pdf)" v-show="item.haspdf">下载<v-icon color="#64B5F6">mdi-download</v-icon></v-btn>
                <v-btn style="background-color: transparent;box-shadow: none;font-weight: 300;" @click="toDocument(item.title, item.id)">详情<v-icon color="#64B5F6">mdi-link-variant</v-icon></v-btn>

              </div>
            </div>
          </v-list-item-content>
        </v-card>
      </v-list-item>


      <v-pagination
          v-model="page"
          :length="this.pageNum"
          :total-visible="7"
          circle
      ></v-pagination>
    </v-card>
  </div>
</template>
<script>
import request from '@/utils/request';
import axios from 'axios';

export default{

  data:()=>({
    tab:null,
    page: 1,
    pageSize:10,
    pageNum:'1',
    Num:1,
    CurrentPageData:[],
    selects:["默认","出版年份", "引用数"],
    selectMethod:"推荐排序",
    paperInfo:[],
    orderBy:"default",
    overlay:false,
    absolute: false,
    opacity: 0.5,//透明度
    citeStyle:[{name:"引用类型", text:"引用文本"}],
    TypeNum:[],

  }),
  methods:{
    toscholar(id){
      if(id){
        this.$router.push({path:"/scholar", query:{id:id}})
      } else {
        this.$message.error('没有该学者信息');
      }
    },
    searchkeyword(keyword){
      this.$router.push({path:"/search", query:{keyword:keyword}})
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
    cite(item){
      this.citeStyle = item.cite
      console.log(item.cite)
      console.log(this.citeStyle)
      this.overlay = !this.overlay
      // this.content=this.citeStyle(0).text
    },
    toDocument(title, id){
      console.log(title)
      this.$router.push({path:"/document", query:{Title:title, Id:id}})
    },
    getCurrentPageData(){
      let url = '/api/PortalManager/getScholarPapers/'
      var formdata = new FormData();
      formdata.append("page", this.page);
      formdata.append("pageSize", this.pageSize);
      formdata.append("scholarID", this.$route.query.id);
      formdata.append("sortBy", 0);
      request("POST", url, formdata).then(res=>{
        console.log("scholar paperInfo")
        console.log(res)
          this.Num = res.Num
          this.pageNum = Math.ceil(this.Num/this.pageSize)
          this.CurrentPageData = res.articles_list
          let i=0
          let j=0
          //对数据逐个进行处理
          for(i=0;i<this.CurrentPageData.length;i++) {
            let Author = this.CurrentPageData[i].authors
            let j = 0;
            let str = "作者："
            str = Author[0].name
            for (j = 1; j < Author.length; j++) {
              str = str + ", " + Author[j].name

            }
            this.CurrentPageData[i].author = str
            // if(this.CurrentPageData[i])
            if ("pdf" in this.CurrentPageData[i]) {
              this.CurrentPageData[i].haspdf = 1
            } else {
              this.CurrentPageData[i].haspdf = 0
            }
            if ("keywords" in this.CurrentPageData[i]) {
              this.CurrentPageData[i].haskeywords = true;
            } else {
              this.CurrentPageData[i].haskeywords = false;
            }
            // if("vuenue" in )
            let cite = []
            if ("venue" in this.CurrentPageData[i]) {
              let GBT = this.GBTgenerateCitation(this.CurrentPageData[i].title, this.CurrentPageData[i].authors, this.CurrentPageData[i].year, this.CurrentPageData[i].venue.name)
              cite.push({name: "GB/T", text: GBT})
            }
            let MLA = this.MLAgenerateCitation(this.CurrentPageData[i].title, this.CurrentPageData[i].author, this.CurrentPageData[i].year)
            cite.push({name: "MLA", text: MLA})
            let BIBTEX = this.BIBTEXgenerateCitation(this.CurrentPageData[i])
            cite.push({name: "BIBTEX", text: BIBTEX})
            this.CurrentPageData[i].cite = cite
          }
      })

    },
    pdf(url){
      window.open(url, "_blank")
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




  },
  created(){
    this.Num = this.paperInfo.length;
    this.pageNum =  Math.ceil(this.Num/this.pageSize);
    console.log("page:"+this.pageNum)
    this.getCurrentPageData()
  },
  //监听page的变化
  watch:{
    page(){
      console.log("page:"+this.page)
      this.getCurrentPageData()
    },
    selectMethod(){
      let selectIndex=1
      if(this.selectMethod=="出版年份"){
        selectIndex="time"
      }else if(this.selectMethod=="引用数"){
        selectIndex="citation"
      }else{
        selectIndex = "default"
      }
      console.log("selectMethod:"+this.selectMethod+"**id:"+selectIndex)
      this.orderBy = selectIndex
      this.getCurrentPageData()
    },
    $route(to, from){
      console.log(to)
      this.keyword = to.query.keyword
      console.log(this.keyword)
      console.log("更新页面")
      this.getCurrentPageData()
    }
  }
}
</script>
<style>
.text-ellipsis-two {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.focusChange:hover{
  text-decoration: underline;
  color:#006064 ;
}
</style>