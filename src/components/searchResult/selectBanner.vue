<template>
    <div style="">
      <div style="font-size: 18px; height: 80px;">
        <span style="float:left; text-align:right;margin-top: 20px;color: grey;font-size: 15px;margin-left: 0px;">
            筛选
        </span>
      </div>
    <v-card 
    width=""
    height=""
    >
    <v-subheader>期刊</v-subheader>
    <v-list-item
                v-for="item in journalList"
                :key=item.name
            >
            <v-list-item-content>
                  <v-list-item-title >{{item.name}}</v-list-item-title>
                </v-list-item-content>
  
                <v-list-item-action>
                  <v-checkbox
                    v-model="item.status"
                    color="#039BE5"
                    @click="ChooseType(item.name, item.status)"
                  ></v-checkbox>
                </v-list-item-action>
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
                  <v-list-item-title >{{item.name}}  </v-list-item-title>
                </v-list-item-content>
  
                 <v-list-item-action>
                  <v-checkbox
                   v-model="item.status"
                   color="#039BE5"
                   @click="ChooseAuthor(item.name, item.status, item.id)"
                 ></v-checkbox>
                </v-list-item-action>
               
        </v-list-item>

    <v-divider></v-divider>
    
    <v-divider></v-divider>
    
    <v-divider></v-divider>
    </v-card>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'


export default {

    data:()=>({
        minyear:"",
        maxyear:"",
        Conference:[{name:"CLEO", count:123},{name:"CVPR", count:123},{name:"CLEO", count:123},{name:"DRC", count:123} ],
        Type:[{name:"All", count:123},{name:"Journal", count:123},{name:"Book", count:123},{name:"Other", count:123} ],
        authorList:[],
        journalList:[],
        keyword:"",
        formdata:{},
    }),
    //接受父组件传值
    
    methods:{
      //会议选择
        ChooseConference(name, status){
            console.log("选择会议："+name)
            console.log('状态：'+status)//每点击一次 该item的status会发生改变
        },
        //类型选择----变更为期刊选择
        ChooseType(name, status){
            console.log("选择期刊："+name)
            console.log("状态："+status)
        },
        //时间选择
        TimeSelect(time){
          console.log("时间选择："+time)
        },
        //作者选择
        ChooseAuthor(name, status, id){
          console.log("选择作者："+name)
          console.log("状态："+status)
          console.log(this.formdata)
          this.$router.push({path:'/search', query:{url:this.posturl, formdata:this.formdata}},{})
        },
        getCurrentPageData(){
                this.authorList=[]
                this.journalList=[]
                console.log("开始请求")
                if("keyword" in this.$route.query){
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
                }else if("formdata" in this.$route.query){
                  console.log("高级检索")
                  console.log()
                  this.formdata = this.$route.query.formdata
                  
                  this.posturl = this.$route.query.url
                }else{
                  return
                }
                this.formdata.page = 0
                this.formdata.pagesize = 10
                this.formdata.orderby = "citation"
                this.formdata.author=""
                this.formdata.journal=""
                this.formdata.author_filter="no"
                this.formdata.journal_filter="no"
                console.log(this.formdata)
                //获取我们自己的数据
                // this.orderBy = JSON.stringify(this.orderBy)
                // let url = 'api/PaperBrowser/searchPaper/'
                console.log("左侧请求路径")
                console.log(this.posturl)
                axios({
                    method:"post",
                    url:this.posturl,
                    data:this.formdata
                }).then(res=>{
                    console.log(this.formdata)
                    console.log(res.data)
                    this.Num = res.data.total
                    this.pageNum = Math.ceil(this.Num/this.pageSize)
                    let CurrentPageData = res.data.articles_list
                    let i=0
                    let j=0
                    //对数据逐个进行处理
                    for(i=0;i<CurrentPageData.length;i++){
                        if("venue" in CurrentPageData[i]){
                          var e = CurrentPageData[i].venue
                          var has=0
                          for(j=0;j<this.journalList.length;j++){
                            if(this.journalList[j].name===e.name){
                              has=1
                              console.log("重复"+e.name+" "+has)
                              
                            }
                          }
                          if(has===0){
                            this.journalList.push(CurrentPageData[i].venue)
                          }
                          
                        }
                        if("authors" in CurrentPageData[i]){
                          e = CurrentPageData[i].venue
                          has=0
                          for(j=0;j<this.authorList.length;j++){
                            if(this.authorList[j].name===e.name){
                              has=1
                            }
                          }
                          if(has===0){
                            this.authorList.push(CurrentPageData[i].authors[0])
                          }
                          
                        }
                    }
                    this.journalList.forEach((item, index)=> {
                        Vue.set(item, 'status', false)
                    })
                    this.authorList.forEach((item, index)=> {
                        Vue.set(item, 'status', false)
                    })
                    console.log(this.authorList)
                    console.log(this.journalList)
                })


            },
        
        
    },
    created(){
        console.log("select Banner:")
        if("authorList" in this.$route.query){

          return
        }else{
          this.getCurrentPageData()
        }
        // let url="https://www.acemap.info/api/v2/search/aggs?keyword="
        // url += this.keyword
        // axios.get(url).then((response)=>{
        //   response = response.data
        //   console.log(response)
        //   this.Author = response.author
        //   this.Type = response.doctype
        //   this.Conference = response.conference
        // }).catch((error)=>{
        //   console.log(error)
        // })

    },
    watch:{
      $route(to, from){
                console.log(to)
                // this.keyword=to.query.keyword
                console.log("更新页面"+this.keyword)
                this.getCurrentPageData()
            }
    }
}
</script>