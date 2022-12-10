<template>
    <div>
    <div style="margin-top: 20px;font-size: 18px;">
    <div style="margin-left: 10px;float: left;">找到{{Num}}条结果</div>
    <div style="margin-left: 10px;float: left;">第{{page}}页</div>
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

            <v-list-item-title class="headline mb-2" v-text="item.title">
            </v-list-item-title>
            <v-list-item-subtitle v-text="item.Author" style="color: #1E88E5;">
            </v-list-item-subtitle>
            <div v-text="item.abstract" class="text-ellipsis-two" style="font-weight: 350;">
            </div>
            <v-divider></v-divider>
            <div>
            <div style="margin-top: 10px;float: left;">
                <h5 style="float: left;">被引用数:{{item.citation_count}}</h5>
                <!-- <h5 style="float: left;margin-left: 30px;">收藏数:{{item.collections}}</h5> -->
                <h5 style="float: left; margin-left: 30px;">发表时间:{{item.year}}</h5>
            </div>
            <div style="float: right;">

                <v-btn style="background-color: transparent;box-shadow: none;font-weight: 300;" >收藏<v-icon color="#64B5F6">mdi-star-plus-outline</v-icon></v-btn>
                <v-btn style="background-color: transparent;box-shadow: none;font-weight: 300;" @click=cite(item)>引用<v-icon color="#64B5F6"> mdi-format-quote-close-outline</v-icon></v-btn>
                <v-btn style="background-color: transparent;box-shadow: none;font-weight: 300;">下载<v-icon color="#64B5F6">mdi-download</v-icon></v-btn>
                <v-btn style="background-color: transparent;box-shadow: none;font-weight: 300;" @click="toDocument(item.title)">详情<v-icon color="#64B5F6">mdi-link-variant</v-icon></v-btn>

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
import axios from 'axios';

    export default{
       
        data:()=>({
            page: 1,
            pageSize:10,
            pageNum:'1',
            Num:1,
            CurrentPageData:[],
            selects:["推荐排序","最近发表", "最早发表", "最多引用"],
            selectMethod:"推荐排序",
            paperInfo:[],
            orderBy:1,
            overlay:false,
            absolute: false,
            opacity: 0.5,//透明度
            citeStyle:[{name:"引用类型", text:"引用文本"}],


            isActive: false,
            params:[],
            keyword:"gan",
            


        }),
        methods:{
            cite(item){
                this.citeStyle = item.cite
                console.log(this.citeStyle)
                this.overlay = !this.overlay
                
            },
            toDocument(title){
                console.log(title)
                this.$router.push({path:"/document", query:{Title:title, Id:123}})
            },
            getCurrentPageData(){
                let begin = (this.page - 1) * this.pageSize;
                let end = this.page * this.pageSize;
                this.CurrentPageData=this.paperInfo.slice(begin, end);
                console.log(this.page)
                let url="https://www.acemap.info/api/v2/search/result?keyword="
                url += this.keyword
                url= url+"&page="+this.page
                url= url+"&pagesize="+this.pageSize
                url= url+"&orderby="+this.orderBy
                console.log("url:"+url)
                axios.get(url).then((response)=>{
                    response = response.data
                    console.log(response)
                    this.Num = response.qcount
                     this.paperInfo = response.paper
                     let len=this.paperInfo.length
                     console.log("长度"+len)
                     let i=0;
                     
                     for(i=0;i<len;i++){
                        let Author = this.paperInfo[i].author
                        let j=0;
                        let str="作者："
                        str=Author[0].name
                        for(j=1;j<Author.length;j++){
                            str =  str+", "+Author[j].name
                            
                        }
                        this.paperInfo[i].Author = str
                     }
                     this.CurrentPageData = this.paperInfo
                     this.pageNum= Math.ceil(this.Num/this.pageSize)
                }).catch(function(error){
                    console.log(error)
                })
                
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
                if(this.selectMethod=="最近发表"){
                    selectIndex=2
                }else if(this.selectMethod=="最早发表"){
                    selectIndex=3
                }else if(this.selectMethod=="最多引用"){
                    selectIndex=4
                }
                console.log("selectMethod:"+this.selectMethod+"**id:"+selectIndex)
                this.orderBy = selectIndex
                this.getCurrentPageData()
            },
            $route(to, from){
                console.log(to)
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


</style>
