<template>
    <div width="250px">
      <div style="font-size: 18px; height: 80px;">
        <span style="float:left; text-align:right;margin-top: 20px;color: grey;font-size: 15px;margin-left: 0px;">
            筛选
        </span>
      </div>
    <v-card 
    width="100%"
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
    <!-- <v-subheader>会议</v-subheader>
        <v-list-item
                v-for="(item, i) in Conference"
                :key="i"
            >
            <v-list-item-content>
                  <v-list-item-title >{{item.abbr}}  ({{item.count}})</v-list-item-title>
                </v-list-item-content>
  
                <v-list-item-action>
                  <v-checkbox
                    v-model="item.status"
                    color="#039BE5"
                    @click="ChooseConference(item.name, item.status)"
                  ></v-checkbox>
                </v-list-item-action>
        </v-list-item> -->
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
    }),
    //接受父组件传值
    props:{
      keyword:String
    },
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
        }
        
        
    },
    created(){
        console.log("select Banner:"+this.keyword)
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

    }
}
</script>