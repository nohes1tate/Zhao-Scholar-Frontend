<template>
    <div>
    <v-card
        width="800px"
        style="border-radius: 20px;border:1px solid ;border-color: #01579B;box-shadow: none;"
    >
        <v-card
      width="800px"
      style="box-shadow: none;border: 1px;"
      outlined
    >
    <v-card-title>高级检索</v-card-title>
    <v-list>
        <v-list-item-group  color="primary">
          <v-list-item
            v-for="(searchItem, i) in SearchRequest"
            :key="i"
            style="margin-bottom: 0;"
          >
         
            <div>
            <v-select
            v-model="searchItem.select"
            :items="options"
            item-text="label"
            item-value="value"   
            persistent-hint
            return-object
            single-line
            outlined
            style="float: left;width: 150px;"
            height="30px"
          ></v-select>
          <v-text-field
          outlined
          label="搜索"
          v-model="searchItem.str"
          style="float: left;width: 300px;"
          height="30px"
          >
          </v-text-field>
          <v-select
            v-model="searchItem.relation"
            :items="relaOptions"
            item-text="label"
            item-value="value"   
            persistent-hint
            return-object
            single-line
            outlined
            style="float: left;width: 100px;"
          ></v-select>
          <v-btn 
          v-show="i"
           class="ma-2" tile large color="red" icon
           @click="Delete(i)"
           >
            <v-icon color="black">mdi-minus</v-icon>
         </v-btn>
          </div>
          
          
          
          </v-list-item>
        </v-list-item-group>
    </v-list>
        <v-card-actions>
            <v-btn @click="addStr" 
            class="ma-2" tile outlined color="indigo"
            >添加条件<v-icon>mdi-plus</v-icon></v-btn>
            <v-btn @click="Search()"  class="ma-2" tile outlined color="success">检索 <v-icon>mdi-magnify</v-icon></v-btn>
            
        </v-card-actions>

       
        </v-card>
        <v-divider></v-divider>
        <v-card
        width="800px"
        style="margin-top: 0px;box-shadow: none;"
        >
        <v-card-title>文献分类</v-card-title>
        <v-card-text>
            <v-chip-group
          v-model="TypeNum"
          column
          multiple
        >
        <v-chip filter outlined
        v-for="(type, i) in this.TypeCheck"
        :key="i"
        color="#039BE5"
        >
            {{type.v}}
        </v-chip>
        </v-chip-group>
        </v-card-text>
        </v-card>
        <v-divider></v-divider>
        <v-card
        width="500px"
        style="margin-top: 0px;box-shadow: none;"
        >
        <v-card-title>时间范围</v-card-title>
        <v-card-text>
            <v-radio-group v-model="TimeSelect" :mandatory="false">
                <v-radio label="所有时间段" value="0" ></v-radio>
                <v-radio label="过去12个月" value="1"></v-radio>
                <v-radio label="某一年" value="2"></v-radio>
                <v-radio label="时间范围" value="3"></v-radio>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field
                        label="开始时间"
                        v-model="stratTime"
                        clearable
                        hint="三种格式:2020/ 2020-01/ 2020-01-01"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-text-field
                        label="结束时间"
                        v-model="endTime"
                        clearable
                        hint="三种格式:2022/ 2022-01/ 2022-01-01"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-radio-group>
        </v-card-text>
        </v-card>
    </v-card>
    </div>
</template>
<script>

export default{
    data:()=>({
        lag:[{k:0, v:"中文"},{k:1, v:"外文"}],
        SearchRequest:[{select:{value:0, label:"主题"}, str:"",relation:{value:0, label:"AND"}},{select:{value:0, label:"zero"}, str:"",relation:{value:0, label:"AND"}}],
        TypeList:["主题", "关键词", "全文", "篇名", "第一作者", "通讯作者","摘要","参考文献", "文献来源", "DOI"],
        options:[{value:0, label:"主题"}, {value:1, label:"关键词"}, {value:2, label:"摘要"}, {value:3, label:"作者"}],
        relaOptions:[{value:0, label:"AND"}, {value:1, label:"OR"}, {value:2, label:"NOT"}],
        TypeCheck:[{k:"0", v:"基础科学"}, {k:"0", v:"工程科技"}, {k:0, v:"农业科技"}, {k:0, v:"农业卫生科技"}, {k:0, v:"医药卫生科技"}, {k:0, v:"哲学与人文科学"}, {k:0, v:"社会科学"}, {k:0, v:"消息科技"}, {k:0, v:"经济管理科学"}],
        TypeNum: [],
        TimeSelect:0,
        stratTime:"",
        endTime:"",
        Form:"高级搜索表单",
    }),
    methods:{
        Search(){
            // console.log(this.SearchRequest)
            // console.log(this.TypeNum)
            console.log(this.TimeSelect)
            console.log("开始时间"+this.stratTime+"结束时间"+this.endTime)
            this.$router.push({path:"/search", query:{form:this.Form}})
        },
        addStr(){
            this.SearchRequest.push({select:{value:0, label:"主题"}, str:"",relation:{value:0, label:"AND"}})
        },
        Delete(i){
            console.log("delete"+i)
            // this.SearchRequest = this.SearchRequest.slice(0, i-1)
            this.SearchRequest.splice(i, 1)
            
        }
    }
}
</script>