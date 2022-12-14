<template>

<div>
  <div style="float: left;width:250px;margin-left: 150px;margin-right: 20px;">
      <div style="font-size: 18px; height: 80px;">
        <span style="float:left; text-align:right;margin-top: 20px;color: grey;font-size: 15px;margin-left: 0px;">
            筛选方式
        </span>
      </div>
    <v-card 
    width=""
    height=""
    >
    <v-subheader>时间</v-subheader>
    <v-select
        v-model="maxyear"
        :items="year"
        style="margin-top: 0%;width: 150px;margin-left: 30px;"
        label="最晚年份"
        
        ></v-select>
        <v-select
        v-model="minyear"
        :items="year"
        style="margin-top: 0%;width: 150px;margin-left: 30px;"
        label="最早年份"
       
        ></v-select>
    <v-divider></v-divider>
    
    <v-subheader>期刊</v-subheader>
    <v-text-field
          class="material-symbols-outlined"
          append-icon="search"
          @click:append="choosejournal"
        
          hide-details
        
          v-model="pickjournal"
          style="width: 200px;margin-left: 20px;"
      >
      </v-text-field>
    <v-list-item
                v-for="item in journalList"
                :key=item.name
            >
            <v-list-item-content>
                  <v-list-item-title >
                    <span @click="ChooseType(item.name, item.status)" class="clickchange">{{item.name}}</span>
                    </v-list-item-title>
                </v-list-item-content>
  
        
        </v-list-item>
    <!-- <v-subheader>时间选择</v-subheader>
    <v-list-item
                v-for="item in Time"
                :key="item"
            >
            <v-list-item-action>
                <v-btn style="background-color: transparent;" @click="TimeSelect(item)">{{item}}</v-btn>
            </v-list-item-action>
    </v-list-item> -->
    <v-divider></v-divider>
    <v-subheader>作者</v-subheader>



      
 
    <v-list-item
                v-for="item in authorList"
                :key=item.name
               
            >
            <v-list-item-content>
                  <v-list-item-title >
                    <span @click="ChooseAuthor(item.name, item.status, item.id)" class="clickchange">{{item.name}} </span> </v-list-item-title>
                </v-list-item-content>
               
        </v-list-item>
      <v-divider></v-divider>


    </v-card>
  </div>
   <div style="float: left;">
            <CollectDialog
                :collect-show="collectShow"
                :paperID="paperID"
                :isCollect="isCollect"
                :taglist="tag_list"
                @closeChildDialog="closeChildDialog"></CollectDialog>
    <div style="font-size: 18px; height: 80px;">
        <span style="float:left; text-align:right;margin-top: 20px;color: grey;font-size: 15px;margin-left: 18px;">
            找到{{Num}}条结果
        </span>
        <span style="float:left; text-align:right;margin-top: 20px;color: grey;font-size: 15px;margin-left: 30px;">
            第{{page}}页
        </span>
        
        
        <v-select
            :items="selects"
            label="排序方式"
            v-model="selectMethod"
            style="float:right;margin-top: 0%;"
          ></v-select> 
          <!-- <v-select
        v-model="maxyear"
        :items="year"
        style="float:right;margin-top: 0%;"
        label="最晚年份"
        
        ></v-select>
        <v-select
        v-model="minyear"
        :items="year"
        style="float:right;margin-top: 0%;"
        label="最早年份"
       
        ></v-select> -->
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

            <v-list-item-title class="paper-title headline mb-2" v-text="item.title" @click="toDocument(item.title, item.id)">
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

                <v-btn style="background-color: transparent;box-shadow: none;font-weight: 300;float:left; text-align:left;" @click=cite(item)>
                    引用<v-icon color="#64B5F6"> mdi-format-quote-close-outline</v-icon>
                </v-btn>
                <v-btn style="background-color: transparent;box-shadow: none;font-weight: 300;float:left; text-align:left;" @click="toDocument(item.title, item.id)">
                    详情<v-icon color="#64B5F6">mdi-link-variant</v-icon>
                </v-btn>
                  <v-btn
                      style="background-color: transparent;box-shadow: none;font-weight: 300;float:left; text-align:left;"
                      @click="changeCollectIconToTrue(item.id)">
                    收藏<v-icon color="#64B5F6">mdi-star</v-icon>
                  </v-btn>

                <v-btn style="background-color: transparent;box-shadow: none;font-weight: 300;float:left; text-align:left;" @click="pdf(item.pdf)" v-show="item.haspdf">
                    下载<v-icon color="#64B5F6">mdi-download</v-icon>
                </v-btn>
                <span style="float:right; text-align:right;margin-top: 8px;color: grey;font-size: 15px;margin-right: 150px;">
                被引次数：
                <span style="color: #2d94d4;">
                  {{item.n_citation}}
                </span>
                </span>

                <span style="float:right; text-align:right;margin-top: 8px;color: grey;font-size: 15px;margin-right: 50px;">
                发表时间：
                <span style="color: #2d94d4;">
                  {{item.year}}
                </span>
                </span>

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

</div>
</template>
<script>
import request from '@/utils/request';
import axios from 'axios';
import collectDialog from "@/components/UserCenter/collectDialog";
import CollectDialog from "@/components/UserCenter/collectDialog";
import PageHeader from "@/components/UserCenter/PageHeader";
import user from "@/store/user";
import selectBannerVue from './selectBanner.vue';
import Vue from 'vue'
    export default{
      components: {CollectDialog},
        data:()=>({
            collectShow:false,
            tab:null,
            page: 0,
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
            keyword:null,
            TypeNum:[],
            tagData:[],
            posturl:"gan",
            formdata:{},
            paperID:'',
            isCollect:false,
            tag_list:'',
            authorList:[],
        journalList:[],
            new:0,
            journal:"",
            author:"",
            minyear:"",
            maxyear:"",
            year:[],
            pickauthor:"",
            pickjournal:"",
            

        }),
        methods:{
          chooseminyear(){
            window.alert(this.minyear)
          },
          choosemaxyear(){
            console.log(this.maxyear)
          },
          //刷新authorlist
          newselect(){
                    //对数据逐个进行处理
                    console.log("开始更新左侧")
                  
                    console.log(this.CurrentPageData)
                    var i=0
                    var j=0
                    for(i=0;i<this.CurrentPageData.length;i++){
                        if("venue" in this.CurrentPageData[i] ){
                          if("name" in this.CurrentPageData[i].venue){
                            var e = this.CurrentPageData[i].venue
                          var has=0
                          for(j=0;j<this.journalList.length;j++){
                            if(this.journalList[j].name===e.name){
                              has=1
                              console.log("重复"+e.name+" "+has)
                              
                            }
                          }
                          if(has===0){
                            this.journalList.push(this.CurrentPageData[i].venue)
                          }
                          }
                          
                        }
                        if("authors" in this.CurrentPageData[i]){
                          if(this.CurrentPageData[i].authors.length>0){
                            e = this.CurrentPageData[i].authors[0]
                          has=0
                          for(j=0;j<this.authorList.length;j++){
                            if(this.authorList[j].id===e.id){
                              has=1
                            }
                          }
                          if(has===0){
                            this.authorList.push(this.CurrentPageData[i].authors[0])
                          }
                          }
                          
                        }
                    }
                    
                    this.journalList.forEach((item, index)=> {
                        Vue.set(item, 'status', false)
                    })
                    this.authorList.forEach((item, index)=> {
                        Vue.set(item, 'status', false)
                    })
                    console.log("筛选栏结果")
                    console.log(this.authorList)
                    console.log(this.journalList)
          },

                //会议选择
        ChooseConference(name, status){
            console.log("选择会议："+name)
            console.log('状态：'+status)//每点击一次 该item的status会发生改变
        },
        choosejournal(){
          // window.alert(this.pickjournal)
          var has=0
          for(var i=0;i<this.formdata.keyword.length;i++){{
            if("journal" in this.formdata.keyword[i]){
              has=1
              this.formdata.keyword[i].keyword=this.pickjournal
            }
          }
        }
        if(has==0){
          this.formdata.keyword.push({keyword:this.pickjournal, op:"and", method:"term", type:"venue.name",journal:true})        
        }
        this.getCurrentPageData()
        },
        //类型选择----变更为期刊选择
        ChooseType(name, status){
          // this.formdata.keyword.push({keyword:"[A & A case reports', 'XML a Primer: A Primer]", op:"and", method:"term", type:"venue.name.keyword"})
            console.log("选择期刊："+name)
            console.log("状态："+status)
            // var has=0
            // var hasjournal=0
            // for(var i=0;i<this.formdata.keyword.length;i++){
            //   if(this.formdata.keyword[i].keyword.type=="venue.name"||this.formdata.keyword[i].keyword.type=="venue.name.keyword"){
            //     hasjournal=1
            //   }
            //   if(this.formdata.keyword[i].keyword==name){
            //     has=1
            //     if(status===false){
            //       this.formdata.keyword[i].op='or'
            //     }else{
            //       this.formdata.keyword[i].op='and'
            //     }
            //   }
            // }
            // if(has==0){
            //   this.formdata.keyword.push({keyword:name, op:"and", method:"fuzzy", type:"venue.name.keyword"})
            // }
            this.formdata.journal_filter="yes"
            this.formdata.journal=name
            this.formdata.author_filter="no"
            this.getCurrentPageData()

        },
        //时间选择
        TimeSelect(time){
          console.log("时间选择："+time)
        },
        //作者选择
        ChooseAuthor(name, status, id){
          console.log("选择作者："+name)
          console.log("状态："+status)
   
          // var has=0
          //   for(var i=0;i<this.formdata.keyword.length;i++){
          //     if(this.formdata.keyword[i].keyword==name){
          //       has=1
          //       if(status===false){
          //         this.formdata.keyword[i].op='or'
          //       }else{
          //         this.formdata.keyword[i].op='and'
          //       }
          //     }
          //   }
          //   if(has==0){
          //     this.formdata.keyword.push({keyword:name+'a a zevin', op:"and", method:"fuzzy", type:"authors.name.keyword"})
          //   }
          this.formdata.author_filter="yes"
          this.formdata.journal_filter="no"
          this.formdata.author=id
          console.log("作者筛选----")
          console.log(this.formdata)
            this.getCurrentPageData()
           this.getCurrentPageData()
        },


          closeChildDialog() {
            this.collectShow = false;
          },
          getCollectInfo(){
            const userInfo = user.getters.getUser(user.state);
            const formData = new FormData();
            formData.append("userID", userInfo.user.userId);
            formData.append("authorization", userInfo.user.Authorization)
            formData.append("paperID", this.paperID)
            this.$axios({
              method: 'post',
              url: 'api/UserManager/isCollect/',
              data: formData,
            })
                .then(res => {
                  if(res.data.error=== 0){
                    this.isCollect=res.data.isCollect;
                    if(this.isCollect)
                      this.tag_list=res.data.tag_list;
                  }
                })
                .catch(err => {
                  console.log(err);
                })
          },
          changeCollectIconToTrue(ID){
            this.collectShow=true;
            this.paperID=ID;
            this.getCollectInfo();
          },
          toscholar(id){
            if(id){
              this.$router.push({path:"/scholar", query:{id:id}})
            } else {
              this.$message.error('没有该学者信息');
            }
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
                console.log("开始请求")
                if("keyword" in this.$route.query && this.new==0){
                // this.keyword = this.$route.query.keyword
                // this.formdata = new FormData();
                // this.formdata.append("page", 1);
                // this.formdata.append("pagesize", 10);
                // this.formdata.append("keyword", this.keyword);
                // this.formdata.append("orderby", "citation");
                this.formdata.keyword=[]
                this.formdata.keyword.push({keyword:this.$route.query.keyword, method:"match", op:"and",type:"title"})
                this.formdata.minyear=0
                this.formdata.maxyear=2022
                this.posturl="/api/PaperBrowser/superSearch/"
                }else if("formdata" in this.$route.query && this.new==0){
                  console.log("高级检索")
                  console.log()
                  this.formdata = this.$route.query.formdata
                  
                  this.posturl = this.$route.query.url
                }
                this.formdata.page = this.page
                this.formdata.pagesize = this.pageSize
                this.formdata.orderby = this.orderBy
                if(!("author" in this.formdata)){
                  this.formdata.author=""
                  this.formdata.author_filter="no"
                }
                if(!("journal" in this.formdata)){
                  this.formdata.journal=""
                  this.formdata.journal_filter="no"
                }
                if(!("author_filter" in this.formdata)){
                  this.formdata.author_filter="no"
                }
                if(!("journal_filter" in this.formdata)){
                  this.formdata.journal_filter="no"
                }
                
                //获取我们自己的数据
                // this.orderBy = JSON.stringify(this.orderBy)
                // let url = 'api/PaperBrowser/searchPaper/'
                console.log("请求路径")
                console.log(this.posturl)
                console.log(this.formdata)
                axios({
                    method:"post",
                    url:this.posturl,
                    data:this.formdata
                }).then(res=>{
                    console.log(this.formdata)
                    console.log(res.data)
                    this.Num = res.data.total
                    this.pageNum = Math.ceil(this.Num/this.pageSize)
                    this.CurrentPageData = res.data.articles_list
                    let i=0
                    let j=0
                    //对数据逐个进行处理
                    for(i=0;i<this.CurrentPageData.length;i++){
                        let Author = this.CurrentPageData[i].authors
                        let j=0;
                        let str="作者："
                        if(Author.length!==0){
                          str=Author[0].name
                          for(j=1;j<Author.length;j++){
                            str =  str+", "+Author[j].name

                          }
                        }
                        this.CurrentPageData[i].author = str
                        // if(this.CurrentPageData[i])
                        if("pdf" in this.CurrentPageData[i]){
                            this.CurrentPageData[i].haspdf=1
                        }else{
                            this.CurrentPageData[i].haspdf=0
                        }
                        if("keywords" in this.CurrentPageData[i]){
                            this.CurrentPageData[i].haskeywords=true;
                        }else{
                            this.CurrentPageData[i].haskeywords=false;
                        }
                        // if("vuenue" in )
                        let cite = []
                        if("venue" in this.CurrentPageData[i]){
                            let GBT = this.GBTgenerateCitation(this.CurrentPageData[i].title, this.CurrentPageData[i].authors, this.CurrentPageData[i].year, this.CurrentPageData[i].venue.name)
                            cite.push({name:"GB/T", text:GBT})
                        }
                        let MLA = this.MLAgenerateCitation(this.CurrentPageData[i].title, this.CurrentPageData[i].author, this.CurrentPageData[i].year)
                        cite.push({name:"MLA", text:MLA})
                        let BIBTEX  = this.BIBTEXgenerateCitation(this.CurrentPageData[i])
                        cite.push({name:"BIBTEX", text:BIBTEX})
                        this.CurrentPageData[i].cite = cite
                        if(this.new==0){
                          this.newselect()
                          this.new=1
                        }

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
          this.new=0
          this.authorList=[]
          this.journalList=[]
            console.log("刷新页面")
            this.Num = this.paperInfo.length;
            this.pageNum =  Math.ceil(this.Num/this.pageSize);
            console.log("page:"+this.pageNum)

            console.log("当前携带参数:")
            console.log(this.$route.query.formdata)
            this.getCurrentPageData()
            for(var i=0;i<300;i++){
            var j=2022-i
            this.year.push(j)
        }
          
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
                this.new=0
                this.authorList=[]
                this.journalList=[]
                console.log(to)
                // this.keyword=to.query.keyword
                console.log("更新页面"+this.keyword)
                this.getCurrentPageData()
               
            },
            minyear(){
              this.formdata.minyear = this.minyear
              this.getCurrentPageData()
            },
            maxyear(){
              this.formdata.maxyear = this.maxyear
              this.getCurrentPageData()
            }
        }
    }
</script>
<style scoped>
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
    cursor: pointer;
}
.paper-title:hover{
  cursor: pointer;
}
.clickchange:hover{
  text-decoration: underline;
    color:#006064 ;
    cursor: pointer;
}
</style>
