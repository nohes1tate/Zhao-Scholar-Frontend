<template>
    <div>
        <v-card
        width=100%
        height="120px"
        style="box-shadow: none;"
        >
        <img src="../../assets/logo.png" style="float: left;height: 80px;margin-left: 100px;margin-top: 10px;">
        <v-text-field
              label="搜索"
              style="margin-top: 20px; float: left;width: 700px;margin-left: 150px;"
              filled
         ></v-text-field>
         <v-btn icon style="margin-top: 25px;" x-large><v-icon>mdi-magnify</v-icon></v-btn>

         <v-btn icon style="margin-top: 25px;margin-left: 0px;" x-large @click="toAdvance"><v-icon></v-icon>高级检索</v-btn>

         <v-btn icon style="margin-top: 25px;margin-left: 30px;" x-large><v-icon></v-icon>主页</v-btn>
         <v-btn icon style="margin-top: 25px;margin-left: 30px;" x-large><v-icon></v-icon>学者门户</v-btn>
         <v-btn icon style="margin-top: 25px;margin-left: 60px;" x-large><v-icon></v-icon>我的图书馆</v-btn>
        </v-card>
    </div>
</template>
<script>
export default{
    methods:{
        toAdvance(){
            this.$router.push('./searchAdvance')
        }
    }
}
</script>