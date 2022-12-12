<template>
  <div class="userCenter">
    <page-header :show-search="true"></page-header>
    <div class="main-body">
      <v-row class="header">
        <span @click="backToUserCenter">个人图书馆</span>
      </v-row>
      <div class="title-line">
        <div style="width: 28vw;font-size:16px; margin-top:10px;color: #A0A0A0">筛选</div>
        <div style="font-size:16px; margin-top:10px;color: #A0A0A0">收藏论文 ({{articles.length}})</div>
      </div>
      <div class="show-box">
        <div class="left-side">
          <div class="select-card">
            <v-card elevation="2">
              <div class="select-card-item">
            <span style="display: flex;
             text-align: left;
             font-size: 17px;
             margin-bottom: 20px;
             margin-left: 30px;margin-top: 40px;">标签</span>
                <div class="tag-line" :key="reloadKey">
                  <v-chip
                      class="ma-2"
                      color=#546E7A
                      label
                      text-color="white"
                      style="display: flex; cursor: pointer;"
                      :key="tag.collectID"
                      v-for="tag in tagData"
                      @click="handleChangeTag(tag)"
                  >
                    {{tag.tag_name}}
                    <div class="close-btn-style" @click.prevent="handleClose(tag)">
                      <v-icon class="material-symbols-outlined" size="15px" style="margin-left: 2px">close</v-icon>
                    </div>
                  </v-chip>
                  <v-dialog
                      max-width="600"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-chip
                          class="ma-2"
                          color=#546E7A
                          label
                          text-color="white"
                          style="display: flex;cursor: pointer"
                          v-bind="attrs"
                          v-on="on"
                      >
                        <v-icon class="material-symbols-outlined" size="17px" style="left: -2px">add</v-icon>
                        New Tag
                      </v-chip>
                    </template>
                    <template v-slot:default="dialog">
                      <v-card>
                        <v-toolbar
                            color="primary"
                            dark
                        >创建新的标签</v-toolbar>
                        <v-card-text>
                          <v-text-field
                              label="标签名"
                              v-model="newTagName"
                              style="margin-top: 30px"
                          ></v-text-field>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                          <v-btn
                              text
                              @click="dialog.value = false"
                          >关闭</v-btn>
                          <v-btn
                              text
                              @click="handleNewTag"
                          >确定</v-btn>
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                </div>
                <v-divider style="width: 70% ;margin-left: 30px"></v-divider>
                <div style="display: flex;
             text-align: left;
             font-size: 17px;
             margin-bottom: 20px;
             margin-left: 30px;margin-top: 40px;">
                  <span >设置发表年份范围</span>
                  <v-btn
                  small
                  style="margin-left: 45px;"
                  @click="handleYearSelect"
                  >
                    开始筛选
                  </v-btn>
                </div>
                <v-row class="date-select">
                  <v-col cols="12" sm="6">
                    <v-text-field
                        label="开始年份"
                        v-model="start_year"
                        clearable
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-text-field
                        label="结束年份"
                        v-model="end_year"
                        clearable
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </div>
          <div class="follow-user">

            <v-card
                class="mx-auto"
                max-width="400"
            >
              <v-toolbar>
                <v-toolbar-title>关注学者</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-list :key="reloadKey2">
                <v-list-item
                    v-for="item in follow_list"
                    :key="item.authorID"
                    @click="show(item.authorID,$event);"
                >
                  <v-list-item-avatar>
                    <v-img src="@/assets/scholar-avatar.png"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-text="item.authorName"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
            <v-menu
                v-model="showMenu"
                :position-x="x"
                :position-y="y"
                absolute
                offset-y
            >
                <v-dialog
                    v-model="not_follow"
                    persistent
                    max-width="290"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-list>
                      <v-list-item @click="toScholar()">前往门户</v-list-item>
                      <v-list-item v-bind="attrs" v-on="on">取消关注</v-list-item>
                    </v-list>
                  </template>
                  <v-card>
                    <v-card-title class="text-h5">
                      确定不再关注？
                    </v-card-title>
                    <v-card-text>取消关注后，此学者将从您关注的学者列表中移除。</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                          color="green darken-1"
                          text
                          @click="not_follow = false;showMenu = false"
                      >
                        我再想想
                      </v-btn>
                      <v-btn
                          color="red darken-1"
                          text
                          @click="handleNotFollow"
                      >
                        取消关注
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
<!--                </v-list-item>-->
<!--              </v-list>-->
            </v-menu>
          </div>
        </div>
        <div class="page-select-box">
          <ArticleBlocks v-if="userdata.length>0"
                         :articles="userdata"
                         :tagID="thisTagId"
                         :key="reloadKey3"
                         flag="schLib"></ArticleBlocks>

          <div class="text-center">
            <v-pagination
                circle
                :value="pageIdx"
                v-model="page"
                :length="pageLength"
                :total-visible="size"
                @input="handleCurrentChange"
            ></v-pagination>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import ArticleBlocks from "@/components/UserCenter/ArticleBlocks";
import PageHeader from "@/components/UserCenter/PageHeader";
import user from "@/store/user";
import request from "@/utils/request";

export default {
  name: "UserCenter",
  components: {PageHeader ,ArticleBlocks},
  data:() => ({
      reloadKey3:false,
      reloadKey2:false,
      reloadKey:false,
      userId:"",
      not_follow:false,
      current_follow_id:0,
      showMenu: false,
      x: 0,
      y: 0,
      isLogin:false,
      from_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      to_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      pageIdx: 1,
      size: 5,
      page:1,
      queue: ["匹配程度","发表时间","引用次数"],
      value2: "匹配程度",
      follow_list: [
      { authorName: 'Jason Oner', authorID: 1 },
      { authorName: 'Ranee Carlson', authorID: 2 },
      { authorName: 'Cindy Baker', authorID: 3 },
      { authorName: 'Ali Connors', authorID: 4 },
      ],

      articles: [
        {
          authors: [
            {
              name: "John Lee",
              id:1,
            },
            {
              name: "Zuo_zuo",
              id:2
            },
          ],
          id: "4cd223df721b722b1c40689caa52932a41fcc223",
          title: "Computer-assisted composition of Chinese couplets",
          abstract: "Recent research effort in poem composition has focused on the use of automatic language generation to produce a polished poem. A less explored question is how effectively a computer can serve as an interactive assistant to a poet. For this purpose, we built a web application that combines rich linguistic knowledge from classical Chinese philology with statistical natural language processing techniques. The application assists users in composing a ‘couplet’—a pair of lines in a traditional Chinese poem—by making suggestions for the next and corresponding characters. A couplet must meet a complicated set of requirements on phonology, syntax, and parallelism, which are challenging for an amateur poet to master. The application checks conformance to these requirements and makes suggestions for characters based on lexical, syntactic, and semantic properties. A distinguishing feature of the application is its extensive use of linguistic knowledge, enabling it to inform users of specific phonological principles in detail, and to explicitly model semantic parallelism, an essential characteristic of Chinese poetry. We evaluate the quality of poems composed solely with characters suggested by the application, and the coverage of its character suggestions.",
          n_citation: 3288,
          year:2021,
        },
      ],

      newTagInputVisible: true,
      newTagName: '',
      thisTagName: '',
      thisTagId:'',
      tagData: [
        {
          collectID: 1,
          tag_name: "默认",
          collectNum:2,
        },
        {
          collectID: 2,
          tag_name: "CV",
          collectNum:3,
        },
      ],
      start_year:"",
      end_year:"",
  }),
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },
  mounted() {
    const userInfo = user.getters.getUser(user.state());
    if (!userInfo)
    {
      this.$message.warning("请先登录！");
      setTimeout(() => {
        this.$router.push('/login');
      }, 500);
      return;
    }
      this.isLogin = true;
      this.userId=userInfo.user.userId;
      this.getAllTags();
      this.getFollowAuthor();
  },
  methods: {
    setDefaultTagData(){
      this.reloadKey=!this.reloadKey;
      this.thisTagId=this.tagData[0].collectID;
      console.log(this.tagData)
      this.thisTagName=this.tagData[0].tag_name;
      this.getDefaultArticle();
    },
    getArticleCite(){
      let i=0;
      for(i=0;i<this.articles.length;i++){
        let Author = this.articles[i].authors
        let j=0;
        let str="作者："
        str=Author[0].name
        for(j=1;j<Author.length;j++){
          str =  str+", "+Author[j].name

        }
        this.articles[i].author = str
        if("pdf" in this.articles[i]){
          this.articles[i].haspdf=1
        }else{
          this.articles[i].haspdf=0
        }
        if("keywords" in this.articles[i]){
          this.articles[i].haskeywords=true;
        }else{
          this.articles[i].haskeywords=false;
        }
        // if("vuenue" in )
        let cite = []
        if("venue" in this.articles[i]){
          let GBT = this.GBTgenerateCitation(this.articles[i].title, this.articles[i].authors, this.articles[i].year, this.articles[i].venue.name)
          cite.push({name:"GB/T", text:GBT})
        }
        let MLA = this.MLAgenerateCitation(this.articles[i].title, this.articles[i].author, this.articles[i].year)
        cite.push({name:"MLA", text:MLA})
        let BIBTEX  = this.BIBTEXgenerateCitation(this.articles[i])
        cite.push({name:"BIBTEX", text:BIBTEX})
        this.articles[i].cite = cite
      }
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
    },
    getFollowAuthor(){
      const userInfo = user.getters.getUser(user.state);
      const formData = new FormData();
      const self = this;
      formData.append("authorization", userInfo.user.Authorization)
      formData.append("userID", userInfo.user.userId)
      self.$axios({
        method: 'post',
        url: 'api/UserManager/getFollowInfo/',
        data: formData,
      })
          .then(res => {
            if(res.data.error===0){
              this.follow_list=res.data.follow_list;
              this.reloadKey2=!this.reloadKey2;
            }
            else
              this.$message.warning(res.data.msg);
          })
          .catch(err => {
            console.log(err);
          })
    },
    handleYearSelect(){
      const userInfo = user.getters.getUser(user.state);
      const formData = new FormData();
      const self = this;
      formData.append("authorization", userInfo.user.Authorization)
      formData.append("user_id", userInfo.user.userId)
      formData.append("tag_name", this.thisTagName)
      formData.append("min_year", this.start_year)
      formData.append("max_year", this.end_year)
      self.$axios({
        method: 'post',
        url: 'api/UserManager/getCollectPapersByTime/',
        data: formData,
      })
          .then(res => {
            if(res.data.error===0){
              this.articles=res.data.articles_list;
              this.getArticleCite();
            }
            else
              this.$message.warning(res.data.msg);
          })
          .catch(err => {
            console.log(err);
          })
    },
    handleChangeTag(tag){
      this.thisTagName=tag.tag_name
      this.thisTagId=tag.collectID
      const userInfo = user.getters.getUser(user.state);
      const formData = new FormData();
      const self = this;
      formData.append("authorization", userInfo.user.Authorization)
      formData.append("user_id", userInfo.user.userId)
      formData.append("tag_name", this.thisTagName)
      self.$axios({
        method: 'post',
        url: 'api/UserManager/getCollectPapers/',
        data: formData,
      })
          .then(res => {
            this.articles=res.data.articles_list;
            this.getArticleCite();
          })
          .catch(err => {
            console.log(err);
          })
    },
    getAllTags(){
      const userInfo = user.getters.getUser(user.state);
      const formData = new FormData();
      const self = this;
      formData.append("authorization", userInfo.user.Authorization)
      formData.append("userID", userInfo.user.userId)
      self.$axios({
        method: 'post',
        url: 'api/UserManager/getCollectInfo/',
        data: formData,
      })
          .then(res => {
              this.tagData=res.data.tagData;
            this.reloadKey=!this.reloadKey;
            this.setDefaultTagData();
          })
          .catch(err => {
            console.log(err);
          })
    },
    handleNotFollow(){
      const userInfo = user.getters.getUser(user.state);
      this.not_follow=false;
      this.showMenu=false;
      const self = this;
      const formData = new FormData();
      formData.append("username", userInfo.user.username)
      formData.append("authorization", userInfo.user.Authorization)
      formData.append("userID", userInfo.user.userId)
      formData.append("authorID",this.current_follow_id)

      self.$axios({
        method: 'post',
        url: 'api/UserManager/disfollow/',
        data: formData,
      })
          .then(res => {
            console.log(res.data.error)
            console.log(res.data.msg)
            this.getFollowAuthor();
            this.reloadKey2=!this.reloadKey2;
          })
          .catch(err => {
            console.log(err);
          })
    },
    toScholar(){
      let ID=this.current_follow_id
      this.$router.push({path:'/scholar', query: {id: ID}})
    },
    show (ID,e) {
      this.current_follow_id=ID
      e.preventDefault()
      this.showMenu = false
      this.x = e.clientX
      this.y = e.clientY
      this.$nextTick(() => {
        this.showMenu = true
      })
    },
    handleCurrentChange(val) {
      this.pageIdx = val;
    },
    backToUserCenter() {
      let routeUrl = this.$router.resolve({
        path: '/user',
      });
      window.open(routeUrl .href, "_self");
    },
    handleNewTag(){
      if(this.newTagName) {
        if(this.newTagName==='默认'){
          this.$message.warning("无法创建默认收藏夹！");
          return;
        }
        const userInfo = user.getters.getUser(user.state);
        const formData = new FormData();
        formData.append("userID", userInfo.user.userId);
        formData.append("authorization", userInfo.user.Authorization)
        formData.append("name", this.newTagName)
        this.$axios({
          method: 'post',
          url: 'api/UserManager/createCollect/',
          data: formData,
        })
            .then(res => {
              if(res.data.error=== 0){
                this.$message.success("成功创建收藏夹");
                this.getAllTags();
                this.reloadKey=!this.reloadKey;
              }
            })
            .catch(err => {
              console.log(err);
            })
      }
      else
        this.$message.warning("收藏夹名称不能为空！");
    },
    handleClose(tag) {
      if (tag.tag_name === '默认') {
        this.$message.error("无法删除默认收藏夹！");
        return;
      }
        const userInfo = user.getters.getUser(user.state);
        const formData = new FormData();
        formData.append("userID", userInfo.user.userId);
        formData.append("authorization", userInfo.user.Authorization)
        formData.append("collectID", tag.collectID)
        this.$axios({
          method: 'post',
          url: 'api/UserManager/deleteCollect/',
          data: formData,
        })
            .then(res => {
              if(res.data.error=== 0){
                this.$message.success("成功删除收藏夹");
                this.getAllTags();
                this.reloadKey=!this.reloadKey;
              }
            })
            .catch(err => {
              console.log(err);
            })
    },
    getDefaultArticle(){
      const userInfo = user.getters.getUser(user.state);
      const formData = new FormData();
      const self = this;
      formData.append("authorization", userInfo.user.Authorization)
      formData.append("user_id", userInfo.user.userId)
      formData.append("tag_name", this.thisTagName)
      self.$axios({
        method: 'post',
        url: 'api/UserManager/getCollectPapers/',
        data: formData,
      })
          .then(res => {
            this.articles=res.data.articles_list;
            this.getArticleCite();
            this.reloadKey3=!this.reloadKey3;
          })
          .catch(err => {
            console.log(err);
          })
    },

  },
  computed: {
    pageLength: function (){
      return Math.ceil(this.articles.length/this.size);
    },
    userdata: function(){
      return this.articles.slice((this.pageIdx-1)*this.size,this.pageIdx*this.size);
    }
  },
}
</script>

<style scoped>
.userCenter{
  background-color: #fcfcfc;
  height: 100%;
}
.header{
  margin-top: 5px;
  width: 20%;
  text-align: left;
  margin-left: 0;
}
.header span{
  float:left;
  font-size: 22px;
  color: #2c3e50;
  cursor: pointer;
}
.main-body{
  padding: 30px 40px 20px 80px;
}
.left-side{
  margin-top: 20px;
  width: 24vw;
  display: flex;
  flex-direction: column;
}
.follow-user{
  margin-top: 40px;
}
.select-card-item{
  display: flex;
  flex-direction: column;
}
.tag-line{
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  margin-bottom: 50px;
  margin-left: 20px;
}
.title-line{
  display: flex;
  flex-direction: row;
  margin-top:30px;
}
.date-select{
  display: flex;
  flex-direction: row;
  width: 80%;
  margin-left: 20px;
}
.text-center{
}
.show-box{
  display: flex;
  flex-direction: row;
}
.page-select-box{
  display: flex;
  flex-direction: column;
  margin-left: 2vw;
  width: 60vw;
}
.close-btn-style{
  border-radius:100px;
  float: right;
  width: 20px;
  margin-left: 10px;
}
.close-btn-style:hover{
  background-color: black;
}
</style>
