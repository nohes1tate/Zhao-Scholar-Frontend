<template>
  <div class="pageHeader">
    <div class="logo-box">
      <img src="../../assets/logo.png" class="logo-img">
    </div>
    <div class="search-btn" @click="advanceSearch">
      <span>高级检索</span>
    </div>
    <div v-show="isLogin" class="user-box" @mouseenter="hover=true" @mouseleave="hover=false">
      <v-icon style="font-size: 40px">mdi-account-outline</v-icon>
      <span>{{this.username}}</span>
      <div class="expand-more" :class="[hover?'go':'aa']" >
        <v-icon class="material-symbols-outlined" >expand_more</v-icon>
      </div>
    </div>
    <div class="login-btn" v-show="!isLogin">
      <span>登录</span>
    </div>
    <div v-show="hover" class="select-box" @mouseenter="hover=true" @mouseleave="hover=false">
      <v-card
          class="mx-auto"
          max-width="6000"
          tile
      >
        <v-list dense>
          <v-list-item-group
              v-model="selectedItem"
              color="primary"
          >
            <v-list-item
                v-for="(item, i) in items"
                :key="i"
                @click="goTo(i)"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  data(){
    return{
      isLogin:true,
      hover:false,
      selectedItem: -1,
      items: [
        { text: '个人图书馆',icon:'mdi-library'},
        { text: '我的门户', icon:'mdi-folder-account-outline' },
        {text: '退出',icon:'mdi-location-exit'},
      ],
      username:'cyw777',
    }
  },
  methods:{
    advanceSearch(){
      this.$router.push('/searchAdvance')
    },
    goTo(i){
      if(i===0)
        this.$router.push('/user')
      else if(i===1)
        this.$router.push('/scholar')
      else if(i==2){
        this.isLogin=false;
        this.$router.push('/login')
      }

    }
  }
}
</script>

<style scoped>
.logo-img{
  height: 80%;
  margin: auto;
}
.pageHeader{
  background-color: white;
  height: 10vh;
  display: flex;
  flex-direction: row;
}
.logo-box{
  margin-left: 5vw;
  display: flex;
}
.search-btn{
  margin-left: 10vw;
  text-align: center;
  line-height: 10vh;
}
.search-btn span{
  cursor: pointer;
  font-size: 17px;
  transition: .3s;
}
.search-btn span:hover{
  color: dimgrey;
}
.login-btn{
  margin-left: 65vw;
  cursor: pointer;
  line-height: 10vh;
}
.login-btn span{
  cursor: pointer;
  font-size: 17px;
  transition: .3s;
}
.login-btn span:hover{
  color: dimgrey;
}
.user-box{
  margin-left: 60vw;
  line-height: 10vh;
  display: flex;
  flex-direction: row;
  cursor: pointer;
}
.aa{
  transition: all .3s;
  cursor: pointer;
}
.go{
  transform:rotate(-180deg);
  transition: all .3s;
  cursor: pointer;
}
.select-box{
  position: absolute;
  top:10vh;
  right: 1vw;
  width: 15%;
}
</style>
