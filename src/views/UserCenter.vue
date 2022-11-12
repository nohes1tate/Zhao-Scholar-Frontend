<template>
  <div class="schLib">
    <div class="main-body">
      <v-row class="header">
        <span style="float:left; font-size: 22px; color: #2c3e50; cursor: pointer" @click="backToUserCenter">
          个人图书馆
        </span>
      </v-row>

      <div class="content-select-result">
        <v-row :gutter="0" v-if="articles.length!==0">
          <v-col :span="7"><div class="grid-content bg-purple" style="margin-right:50px">
            <span style="display:flex; margin-bottom:24px; margin-top:10px; font-size:16px; color: #A0A0A0">筛选</span>
            <v-card class="box-card">

              <div class="article-tags sub-block">
                <div class="check-box-title">
                  <span>标签</span>
                </div>
                <div style="text-align: left; margin-bottom: 50px">
                  <v-chip
                      class="ma-2"
                      color="secondary"
                      :key="tag"
                      v-for="tag in tagData"
                      closable
                      :disable-transitions="false"
                      style="margin-top: 10px; cursor: pointer"
                  >
                    {{tag.tag_name}}
                  </v-chip>
                  <v-chip
                      class="ma-2"
                      color="secondary"
                      closable
                      :disable-transitions="false"
                      style="margin-top: 10px; cursor: pointer"
                  >
                    <v-button class="button-new-tag" size="small" @click="showInput">+ New Tag</v-button>
                  </v-chip>

                </div>
              </div>

              <v-divider></v-divider>

              <div class="publish-year sub-block">
                <div class="check-box-title">
                  <span>发表年份</span>
                </div>
                <div style="text-align: left; font-size: 13px">
                  <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
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
                              v-model="date"
                              label="Picker without buttons"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="date"
                            @input="menu2 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-spacer></v-spacer>
                  </v-row>
                </div>
              </div>

            </v-card>
          </div>
          </v-col>

          <v-col :span="16"><div class="grid-content bg-purple">
            <div>
              <v-row>
                <v-col span="17">
                  <span style="display:flex; font-size:16px; margin-top:10px;color: #A0A0A0">收藏论文 ({{articles.length}})</span>
                </v-col>
              </v-row>
            </div>

<!--            <ArticleBlocks v-if="userdata.length>0"-->
<!--                           :articles="userdata"-->
<!--                           @delArticle="delArticle"-->
<!--                           flag="schLib"></ArticleBlocks>-->

            <div>
              <v-row>
                <v-col :span="5" style="text-align:right">
                  <div >
                    <span>每页</span>
                    <el-input-number style="width:100px; margin: 22px 15px 15px;" el-input-number v-model="size" controls-position="right" @change="handleSizeChange" :min="1" :max="20"></el-input-number>
                    <!-- height:34px; -->
                    <span>条</span>
                  </div>
                </v-col>
                <v-col :span="15">
                  <v-pagination layout="prev, pager, next, jumper"
                                 background
                                 :current-page="pageIdx"
                                 :page-size="size"
                                 :total="articles.length"
                                 @size-change="handleSizeChange"
                                 @current-change="handleCurrentChange"
                                 style="margin: 20px">
                  </v-pagination>
                </v-col>
              </v-row>
            </div>

          </div></v-col>
        </v-row>
      </div>

    </div>
    <v-row>
      <v-col
          cols="12"
          sm="6"
          md="4"
      >
        <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="date"
                label="Picker in menu"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="date"
              no-title
              scrollable
          >
            <v-spacer></v-spacer>
            <v-btn
                text
                color="primary"
                @click="menu = false"
            >
              Cancel
            </v-btn>
            <v-btn
                text
                color="primary"
                @click="$refs.menu.save(date)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-spacer></v-spacer>
      <v-col
          cols="12"
          sm="6"
          md="4"
      >
        <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="date"
                label="Picker in dialog"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="date"
              scrollable
          >
            <v-spacer></v-spacer>
            <v-btn
                text
                color="primary"
                @click="modal = false"
            >
              Cancel
            </v-btn>
            <v-btn
                text
                color="primary"
                @click="$refs.dialog.save(date)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-col>
      <v-col
          cols="12"
          sm="6"
          md="4"
      >
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
                v-model="date"
                label="Picker without buttons"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="date"
              @input="menu2 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </div>


</template>

<script>


export default {
  name: "UserCenter",
  components: { },
  data:() => ({

      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      pageIdx: 1,
      size: 5,

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
        }
      ]
  }),
  created() {
  },
  methods: {
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
    handleCurrentChange(val) {
      this.pageIdx = val;
    },

    delArticleInLists(paper_id) {
      let i;
      for (i = 0; i < this.articles.length; i++)
        if (this.articles[i].paper_id === paper_id)
          break;
      this.articles.splice(i,1);
    },
    backToSchLib() {
      let routeUrl = this.$router.resolve({
        path: '/user',
      });
      window.open(routeUrl .href, "_self");
    }
  },
  computed: {
    userdata: function(){
      return this.articles.slice((this.pageIdx-1)*this.size,this.pageIdx*this.size);
    }
  }
}
</script>

<style scoped>

.schLib .main-body {
  padding: 30px 40px 20px 80px;
}

.schLib .header {
  margin-bottom: 30px;
}

.schLib >>> .el-pagination .btn-prev .el-icon{
  font-size: 15px;
  margin: 15px;
}

.schLib >>> .el-pagination__jump{
  font-size: 15px;
}

.schLib >>> .el-pagination .btn-next .el-icon{
  font-size: 15px;
  margin: 15px;
}

.schLib >>> .el-pager li{
  width:40px;
  height:40px;
  padding: 7px;
}

.schLib .box-card {
  padding: 20px;
}

.schLib .box-card .sub-block {
  margin-bottom: 20px;
}

.schLib .box-card .check-box-title {
  text-align: left;
  font-size: 17px;
  margin-bottom: 20px;
}

.schLib >>> .el-pagination__editor.el-input .el-input__inner {
  height: 40px;
}

.schLib .el-tag {
  margin-right: 10px;
}

.schLib .button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.schLib .input-new-tag {
  margin-top: 10px;
  width: 90px;
  vertical-align: bottom;
}

.schLib .year-input >>> .el-input--mini .el-input__inner {
  font-size: 13px;
  color: #0274B3;
}

.schLib .year-input >>> .el-input__inner {
  padding-left: 5px;
  padding-right: 5px;
  text-align: center;
}

.schLib .year-input >>> .el-input--mini {
  width: 45px;
  text-align: center;
}

</style>
