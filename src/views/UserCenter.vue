<template>
  <div class="userCenter">
    <page-header :show-search="true" :is-login="isLogin"></page-header>
    <div class="main-body">
      <v-row class="header">
        <span @click="backToUserCenter">个人图书馆</span>
      </v-row>
      <div class="title-line">
        <div style="width: 28vw;font-size:16px; margin-top:10px;color: #A0A0A0">筛选</div>
        <div style="font-size:16px; margin-top:10px;color: #A0A0A0">收藏论文 ({{articles.length}})</div>
      </div>
      <div class="show-box">
        <div class="select-card">
          <v-card elevation="2">
            <div class="select-card-item">
            <span style="display: flex;
             text-align: left;
             font-size: 17px;
             margin-bottom: 20px;
             margin-left: 30px;margin-top: 40px;">标签</span>
              <div class="tag-line">
                <v-chip
                    class="ma-2"
                    color=#546E7A
                    label
                    text-color="white"
                    style="display: flex; cursor: pointer;"
                    :key="tag"
                    v-for="tag in tagData"
                >
                  {{tag.tag_name}}
                  <div class="close-btn-style" @click="handleClose(tag)">
                    <v-icon class="material-symbols-outlined" size="15px" style="margin-left: 2px">close</v-icon>
                  </div>
                </v-chip>
                <v-dialog
                    transition="dialog-top-transition"
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
                            @click="handleNewTag"
                        >确定</v-btn>
                        <v-btn
                            text
                            @click="dialog.value = false"
                        >关闭</v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </div>
              <v-divider style="width: 70% ;margin-left: 30px"></v-divider>
              <span style="display: flex;
             text-align: left;
             font-size: 17px;
             margin-bottom: 20px;
             margin-left: 30px;margin-top: 40px;">发表年份</span>
              <div class="date-select">
                <v-menu
                    v-model="menu1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="from_date"
                        label="Start Date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                      v-model="from_date"
                      @input="menu1 = false"
                  ></v-date-picker>
                </v-menu>
                <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="to_date"
                        label="End Date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                      v-model="to_date"
                      @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </div>
            </div>
          </v-card>
        </div>
        <div class="page-select-box">
          <ArticleBlocks v-if="userdata.length>0"
                         :articles="userdata"

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

export default {
  name: "UserCenter",
  components: {PageHeader ,ArticleBlocks},
  data:() => ({
      isLogin:true,
      from_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      to_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      pageIdx: 1,
      size: 5,
      page:1,
      queue: ["匹配程度","发表时间","引用次数"],
      value2: "匹配程度",

      articles: [
        {
          authors: [
            {
              author_name: "John Lee",
            },
            {
              author_name: "Zuo_zuo",
            },
          ],
          paper_id: "4cd223df721b722b1c40689caa52932a41fcc223",
          paper_title: "Computer-assisted composition of Chinese couplets",
          abstract: "Recent research effort in poem composition has focused on the use of automatic language generation to produce a polished poem. A less explored question is how effectively a computer can serve as an interactive assistant to a poet. For this purpose, we built a web application that combines rich linguistic knowledge from classical Chinese philology with statistical natural language processing techniques. The application assists users in composing a ‘couplet’—a pair of lines in a traditional Chinese poem—by making suggestions for the next and corresponding characters. A couplet must meet a complicated set of requirements on phonology, syntax, and parallelism, which are challenging for an amateur poet to master. The application checks conformance to these requirements and makes suggestions for characters based on lexical, syntactic, and semantic properties. A distinguishing feature of the application is its extensive use of linguistic knowledge, enabling it to inform users of specific phonological principles in detail, and to explicitly model semantic parallelism, an essential characteristic of Chinese poetry. We evaluate the quality of poems composed solely with characters suggested by the application, and the coverage of its character suggestions.",
          citation_count: 3288,
          comment_count: 5,
          year:2021,
          reference_count: 42,
          is_collect:true,
          // 是否收藏
        },
        {
          authors: [
            {
              author_name: "John Lee",
            },
            {
              author_name: "Zuo_zuo",
            },
          ],
          paper_id: "4cd223df721b722b1c40689caa52932a41fcc223",
          paper_title: "Knowledge-rich, computer-assisted composition of Chinese couplets",
          abstract: "Recent research effort in poem composition has focused on the use of automatic language generation to produce a polished poem. A less explored question is how effectively a computer can serve as an interactive assistant to a poet. For this purpose, we built a web application that combines rich linguistic knowledge from classical Chinese philology with statistical natural language processing techniques. The application assists users in composing a ‘couplet’—a pair of lines in a traditional Chinese poem—by making suggestions for the next and corresponding characters. A couplet must meet a complicated set of requirements on phonology, syntax, and parallelism, which are challenging for an amateur poet to master. The application checks conformance to these requirements and makes suggestions for characters based on lexical, syntactic, and semantic properties. A distinguishing feature of the application is its extensive use of linguistic knowledge, enabling it to inform users of specific phonological principles in detail, and to explicitly model semantic parallelism, an essential characteristic of Chinese poetry. We evaluate the quality of poems composed solely with characters suggested by the application, and the coverage of its character suggestions.",
          citation_count: 3288,
          comment_count: 5,
          year:2021,
          reference_count: 42,
          is_collect:true,
          // 是否收藏
        },
        {
          authors: [
            {
              author_name: "John Lee",
            },
            {
              author_name: "Zuo_zuo",
            },
          ],
          paper_id: "4cd223df721b722b1c40689caa52932a41fcc223",
          paper_title: "Knowledge-rich, computer-assisted composition of Chinese couplets",
          abstract: "Recent research effort in poem composition has focused on the use of automatic language generation to produce a polished poem. A less explored question is how effectively a computer can serve as an interactive assistant to a poet. For this purpose, we built a web application that combines rich linguistic knowledge from classical Chinese philology with statistical natural language processing techniques. The application assists users in composing a ‘couplet’—a pair of lines in a traditional Chinese poem—by making suggestions for the next and corresponding characters. A couplet must meet a complicated set of requirements on phonology, syntax, and parallelism, which are challenging for an amateur poet to master. The application checks conformance to these requirements and makes suggestions for characters based on lexical, syntactic, and semantic properties. A distinguishing feature of the application is its extensive use of linguistic knowledge, enabling it to inform users of specific phonological principles in detail, and to explicitly model semantic parallelism, an essential characteristic of Chinese poetry. We evaluate the quality of poems composed solely with characters suggested by the application, and the coverage of its character suggestions.",
          citation_count: 3288,
          comment_count: 5,
          year:2021,
          reference_count: 42,
          is_collect:true,
          // 是否收藏
        },
        {
          authors: [
            {
              author_name: "John Lee",
            },
            {
              author_name: "Zuo_zuo",
            },
          ],
          paper_id: "4cd223df721b722b1c40689caa52932a41fcc223",
          paper_title: "Knowledge-rich, computer-assisted composition of Chinese couplets",
          abstract: "Recent research effort in poem composition has focused on the use of automatic language generation to produce a polished poem. A less explored question is how effectively a computer can serve as an interactive assistant to a poet. For this purpose, we built a web application that combines rich linguistic knowledge from classical Chinese philology with statistical natural language processing techniques. The application assists users in composing a ‘couplet’—a pair of lines in a traditional Chinese poem—by making suggestions for the next and corresponding characters. A couplet must meet a complicated set of requirements on phonology, syntax, and parallelism, which are challenging for an amateur poet to master. The application checks conformance to these requirements and makes suggestions for characters based on lexical, syntactic, and semantic properties. A distinguishing feature of the application is its extensive use of linguistic knowledge, enabling it to inform users of specific phonological principles in detail, and to explicitly model semantic parallelism, an essential characteristic of Chinese poetry. We evaluate the quality of poems composed solely with characters suggested by the application, and the coverage of its character suggestions.",
          citation_count: 3288,
          comment_count: 5,
          year:2021,
          reference_count: 42,
          is_collect:true,
          // 是否收藏
        },
        {
          authors: [
            {
              author_name: "John Lee",
            },
            {
              author_name: "Zuo_zuo",
            },
          ],
          paper_id: "4cd223df721b722b1c40689caa52932a41fcc223",
          paper_title: "Knowledge-rich, computer-assisted composition of Chinese couplets",
          abstract: "Recent research effort in poem composition has focused on the use of automatic language generation to produce a polished poem. A less explored question is how effectively a computer can serve as an interactive assistant to a poet. For this purpose, we built a web application that combines rich linguistic knowledge from classical Chinese philology with statistical natural language processing techniques. The application assists users in composing a ‘couplet’—a pair of lines in a traditional Chinese poem—by making suggestions for the next and corresponding characters. A couplet must meet a complicated set of requirements on phonology, syntax, and parallelism, which are challenging for an amateur poet to master. The application checks conformance to these requirements and makes suggestions for characters based on lexical, syntactic, and semantic properties. A distinguishing feature of the application is its extensive use of linguistic knowledge, enabling it to inform users of specific phonological principles in detail, and to explicitly model semantic parallelism, an essential characteristic of Chinese poetry. We evaluate the quality of poems composed solely with characters suggested by the application, and the coverage of its character suggestions.",
          citation_count: 3288,
          comment_count: 5,
          year:2021,
          reference_count: 42,
          is_collect:true,
          // 是否收藏
        },
        {
          authors: [
            {
              author_name: "John Lee",
            },
            {
              author_name: "Zuo_zuo",
            },
          ],
          paper_id: "4cd223df721b722b1c40689caa52932a41fcc223",
          paper_title: "Knowledge-rich, computer-assisted composition of Chinese couplets",
          abstract: "Recent research effort in poem composition has focused on the use of automatic language generation to produce a polished poem. A less explored question is how effectively a computer can serve as an interactive assistant to a poet. For this purpose, we built a web application that combines rich linguistic knowledge from classical Chinese philology with statistical natural language processing techniques. The application assists users in composing a ‘couplet’—a pair of lines in a traditional Chinese poem—by making suggestions for the next and corresponding characters. A couplet must meet a complicated set of requirements on phonology, syntax, and parallelism, which are challenging for an amateur poet to master. The application checks conformance to these requirements and makes suggestions for characters based on lexical, syntactic, and semantic properties. A distinguishing feature of the application is its extensive use of linguistic knowledge, enabling it to inform users of specific phonological principles in detail, and to explicitly model semantic parallelism, an essential characteristic of Chinese poetry. We evaluate the quality of poems composed solely with characters suggested by the application, and the coverage of its character suggestions.",
          citation_count: 3288,
          comment_count: 5,
          year:2021,
          reference_count: 42,
          is_collect:true,
          // 是否收藏
        },
        {
          authors: [
            {
              author_name: "John Lee",
            },
            {
              author_name: "Zuo_zuo",
            },
          ],
          paper_id: "4cd223df721b722b1c40689caa52932a41fcc223",
          paper_title: "Knowledge-rich, computer-assisted composition of Chinese couplets",
          abstract: "Recent research effort in poem composition has focused on the use of automatic language generation to produce a polished poem. A less explored question is how effectively a computer can serve as an interactive assistant to a poet. For this purpose, we built a web application that combines rich linguistic knowledge from classical Chinese philology with statistical natural language processing techniques. The application assists users in composing a ‘couplet’—a pair of lines in a traditional Chinese poem—by making suggestions for the next and corresponding characters. A couplet must meet a complicated set of requirements on phonology, syntax, and parallelism, which are challenging for an amateur poet to master. The application checks conformance to these requirements and makes suggestions for characters based on lexical, syntactic, and semantic properties. A distinguishing feature of the application is its extensive use of linguistic knowledge, enabling it to inform users of specific phonological principles in detail, and to explicitly model semantic parallelism, an essential characteristic of Chinese poetry. We evaluate the quality of poems composed solely with characters suggested by the application, and the coverage of its character suggestions.",
          citation_count: 3288,
          comment_count: 5,
          year:2021,
          reference_count: 42,
          is_collect:true,
          // 是否收藏
        },
      ],

      newTagInputVisible: true,
      newTagName: '',
      thisTagName: '',
      tagData: [
        {
          tag_id: 1,
          tag_name: "默认",
          user_id: 2,
          username: "",
          create_time: "2021-11-18T17:22:27+08:00"
        },
        {
          tag_id: 2,
          tag_name: "CV",
          user_id: 2,
          username: "",
          create_time: "2021-11-18T17:22:27+08:00"
        },
        {
          tag_id: 1,
          tag_name: "默认",
          user_id: 2,
          username: "",
          create_time: "2021-11-18T17:22:27+08:00"
        },
        {
          tag_id: 2,
          tag_name: "CV",
          user_id: 2,
          username: "",
          create_time: "2021-11-18T17:22:27+08:00"
        }
      ]
  }),
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },
  created() {
  },
  methods: {
    handleCurrentChange(val) {
      this.pageIdx = val;
    },
    save (date) {
      this.$refs.menu.save(date)
    },
    updateTime() {
      let _min_year = 2022, _max_year = 0;
      for (let i = 0; i < this.articles.length; i++) {
        if (this.articles[i].year < _min_year)
          _min_year = this.articles[i].year;
        if (this.articles[i].year > _max_year)
          _max_year = this.articles[i].year;
      }
      this.year[0] = _min_year;
      this.year[1] = _max_year;
    },

    // 分页
    indexMethod(index) {
      return (this.pageIdx-1)*this.size+index;
    },
    handleSizeChange(val) {
      this.pageIdx = 1;
      this.size = val;
    },

    delArticleInLists(paper_id) {
      let i;
      for (i = 0; i < this.articles.length; i++)
        if (this.articles[i].paper_id === paper_id)
          break;
      this.articles.splice(i,1);
    },
    backToUserCenter() {
      let routeUrl = this.$router.resolve({
        path: '/user',
      });
      window.open(routeUrl .href, "_self");
    },
    handleNewTag(){
      location.reload();
    },
    handleClose(tag) {
      let tagName = tag.tag_name;
      if (tagName === '默认') {
        this.$message.error("无法删除默认收藏夹！");
        return;
      }
      if (tagName) {
        this.$axios({
          method: 'post',
          url: '/social/delete/tag',
          // data: qs.stringify({
          //   user_id: userInfo.user.userId,
          //   tag_name: tagName,
          // })
        })
            .then(res => {
              switch (res.data.status) {
                case 200:
                  this.tagData.splice(this.tagData.indexOf(tag), 1);
                  break;
                case 400:
                  this.$userNotFound();
                  break;
                case 403:
                  this.$message.error("标签不存在！");
                  break;
                case 404:
                  this.$userNotFound();
                  break;
              }
            })
            .catch(err => {
              console.log(err);
            })
      }
    },
  },
  computed: {
    pageLength: function (){
      return Math.ceil(this.articles.length/this.size);
    },
    userdata: function(){
      return this.articles.slice((this.pageIdx-1)*this.size,this.pageIdx*this.size);
    }
  }
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
.select-card{
  margin-top: 20px;
  width: 24vw;
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
