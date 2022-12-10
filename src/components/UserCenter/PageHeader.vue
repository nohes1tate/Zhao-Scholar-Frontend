<template>
  <div class="pageHeader">
    <div class="logo-box" @click="goToHome">
      <img src="../../assets/HatchfulExport-All/logo_transparent.png" class="logo-img">
    </div>
    <div class="search-btn" @click="advanceSearch">
      <span>高级检索</span>
    </div>
    <div class="search-box">
      <v-text-field
          class="material-symbols-outlined"
          append-icon="search"
          @click:append="searchTag"
          @keyup.enter="searchTag"
          hide-details
          filled
          label="Search something"
          v-model="search"
          v-show="showSearch"
          style="margin-top: 1.5vh;"
      >
      </v-text-field>
    </div>
    <div v-show="isLogin" class="user-box" @mouseenter="hover=true" @mouseleave="hover=false">
      <v-icon style="font-size: 40px">mdi-account-outline</v-icon>
      <span>{{this.username}}</span>
      <div class="expand-more" :class="[hover?'go':'aa']" >
        <v-icon class="material-symbols-outlined" >expand_more</v-icon>
      </div>
    </div>
    <div class="login-btn" v-show="!isLogin">
      <span @click="goToLogin">登录</span>
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
import user from "@/store/user";

export default {
  name: "PageHeader",
  props: ['showSearch'],
  data(){
    return{
      isLogin:false,
      search: "",
      hover:false,
      selectedItem: -1,
      items: [
        { text: '个人图书馆',icon:'mdi-library'},
        { text: '我的门户', icon:'mdi-folder-account-outline' },
        {text: '退出',icon:'mdi-location-exit'},
      ],
      username:'username',
    }
  },
  methods:{
    goToHome(){
      this.$router.push('/')
    },
    searchTag() {
     
      if (this.search === "") return false;
      console.log("搜索："+this.search);
      // this.$router.push('/search')
      this.$router.push({path:'/search', query:{keyword:this.search}}, ()=>{})

    },
    goToLogin(){
      this.$router.push('/login')
    },
    advanceSearch(){
      this.$router.push('/searchAdvance')
    },
    goTo(i){
      if(i===0)
        this.$router.push('/user')
      else if(i===1)
        this.$router.push('/scholar')
      else if(i===2){
          this.$store.dispatch('clear');
          this.$message.success("退出成功！");
          setTimeout(() => {
            location.reload();
          }, 1000);
      }
    }
  },
  created() {
    const userInfo = user.getters.getUser(user.state());
    if (userInfo)
    {
      this.isLogin = true;
      this.username = userInfo.user.username;
    }
  },
}
</script>

<style scoped>
.logo-img{
  height: 100%;
  margin-top:auto;
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
  margin-right: 5vw;
  cursor: pointer;
}
.search-btn{
  text-align: center;
  line-height: 10vh;
  margin-right: 3vw;
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
  margin-left: 10vw;
  line-height: 10vh;
  display: flex;
  flex-direction: row;
  cursor: pointer;
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
  margin-left: 7vw;
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
.search-box{
  margin-left: 5vw;
  margin-right: 5vw;
  width: 40%;
}
</style>
