<template>
    <v-card 
    width="250px"
    height="1000px"
    >
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
                  <v-list-item-title >{{item.name}}  ({{item.num}})</v-list-item-title>
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
    <v-subheader>会议</v-subheader>
        <v-list-item
                v-for="(item, i) in Conference"
                :key="i"
            >
            <v-list-item-content>
                  <v-list-item-title >{{item.name}}  ({{item.num}})</v-list-item-title>
                </v-list-item-content>
  
                <v-list-item-action>
                  <v-checkbox
                    v-model="item.status"
                    color="#039BE5"
                    @click="ChooseConference(item.name, item.status)"
                  ></v-checkbox>
                </v-list-item-action>
        </v-list-item>
    <v-divider></v-divider>
    <v-subheader>类型</v-subheader>
    <v-list-item
                v-for="item in Type"
                :key="item.name"
            >
            <v-list-item-content>
                  <v-list-item-title >{{item.name}}  ({{item.num}})</v-list-item-title>
                </v-list-item-content>
  
                <v-list-item-action>
                  <v-checkbox
                    v-model="item.status"
                    color="#039BE5"
                    @click="ChooseType(item.name, item.status)"
                  ></v-checkbox>
                </v-list-item-action>
        </v-list-item>
    <v-divider></v-divider>
    </v-card>
</template>
<script>
import Vue from 'vue'
export default {
    data:()=>({
        Time:["2022以来", "2021以来", "2018以来"],
        Author:[{name:"K K Gan", num:"3944"}, {name:"H Kagan", num:"1234"}, {name:"G Eigen", time:"4567"}],
        Conference:[{name:"CLEO", num:123},{name:"CVPR", num:123},{name:"CLEO", num:123},{name:"DRC", num:123} ],
        Type:[{name:"All", num:123},{name:"Journal", num:123},{name:"Book", num:123},{name:"Other", num:123} ],
    }),
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
        this.Conference.forEach((item, index)=> {
            Vue.set(item, 'status', false)
        })
        this.Type.forEach((item, index)=> {
            Vue.set(item, 'status', false)
        })

    }
}
</script>