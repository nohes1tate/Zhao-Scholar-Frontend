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
    <v-subheader>类型</v-subheader>
    <v-list-item
                v-for="item in Type"
                :key="item.name"
            >
            <v-list-item-content>
                  <v-list-item-title >{{item.name}}  ({{item.count}})</v-list-item-title>
                </v-list-item-content>
  
                <v-list-item-action>
                  <v-checkbox
                    v-model="item.status"
                    color="#039BE5"
                    @click="ChooseType(item.name, item.status)"
                  ></v-checkbox>
                </v-list-item-action>
        </v-list-item>
    <v-subheader>时间选择</v-subheader>
    <v-list-item
                v-for="item in Time"
                :key="item"
            >
            <v-list-item-action>
                <v-btn style="background-color: transparent;" @click="TimeSelect(item)">{{item}}</v-btn>
            </v-list-item-action>
    </v-list-item>
    <v-divider></v-divider>
    <v-subheader>作者</v-subheader>
    <v-list-item
                v-for="item in Author"
                :key="item.name"
               
            >
            <v-list-item-content>
                  <v-list-item-title >{{item.name}}  ({{item.count}})</v-list-item-title>
                </v-list-item-content>
  
                <v-list-item-action>
                  <v-checkbox
                    v-model="item.status"
                    color="#039BE5"
                    @click="ChooseAuthor(item.name, item.status)"
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
        Time:["2022以来", "2021以来", "2018以来"],
        Author:[{name:"K K Gan", count:"3944"}, {name:"H Kagan", count:"1234"}, {name:"G Eigen", time:"4567"}],
        Conference:[{name:"CLEO", count:123},{name:"CVPR", count:123},{name:"CLEO", count:123},{name:"DRC", count:123} ],
        Type:[{name:"All", count:123},{name:"Journal", count:123},{name:"Book", count:123},{name:"Other", count:123} ],
        authorList:[],
        journalList:[],
        keyword:"",
    }),
    //接受父组件传值
    
    methods:{
      //会议选择
        ChooseConference(name, status){
            console.log("选择会议："+name)
            console.log('状态：'+status)//每点击一次 该item的status会发生改变
        },
        //类型选择
        ChooseType(name, status){
            console.log("选择类型："+name)
            console.log("状态："+status)
        },
        //时间选择
        TimeSelect(time){
          console.log("时间选择："+time)
        },
        //作者选择
        ChooseAuthor(name, status){
          console.log("选择作者："+name)
          console.log("状态："+status)
        },
        getCurrentPageData(){
                console.log("开始请求")
                if("keyword" in this.$route.query){
                this.keyword = this.$route.query.keyword
                this.formdata = new FormData();
                this.formdata.append("page", 1);
                this.formdata.append("pagesize", 10);
                this.formdata.append("keyword", this.keyword);
                this.formdata.append("orderby", "citation");
                this.posturl="/api/PaperBrowser/searchPaper/"
                }else if("formdata" in this.$route.query){
                  console.log("高级检索")
                  console.log()
                  this.formdata = this.$route.query.formdata
                  this.formdata.page = 1
                  this.formdata.pagesize = 10
                  this.formdata.orderby = "citation"
                  console.log(this.formdata)
                  this.posturl = this.$route.query.url
                }else{
                  return
                }
                //获取我们自己的数据
                // this.orderBy = JSON.stringify(this.orderBy)
                // let url = 'api/PaperBrowser/searchPaper/'
                console.log("请求路径")
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
                          this.journalList.push(CurrentPageData[i].venue)
                        }
                        if("authors" in CurrentPageData[i]){
                          this.authorList.push(CurrentPageData[i].authors[0])
                        }
                    }
                    console.log(this.authorList)
                    console.log(this.journalList)
                })


            },
        
        
    },
    created(){
        console.log("select Banner:")
        this.getCurrentPageData()
        this.Conference.forEach((item, index)=> {
            Vue.set(item, 'status', false)
        })
        this.Type.forEach((item, index)=> {
            Vue.set(item, 'status', false)
        })
        let url="https://www.acemap.info/api/v2/search/aggs?keyword="
        url += this.keyword
        axios.get(url).then((response)=>{
          response = response.data
          console.log(response)
          this.Author = response.author
          this.Type = response.doctype
          this.Conference = response.conference
        }).catch((error)=>{
          console.log(error)
        })

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