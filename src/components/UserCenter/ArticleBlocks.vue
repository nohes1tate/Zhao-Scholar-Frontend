<template>
  <div>
    <div style="margin-top: 20px;font-size: 18px;">
    <div
        width="1000px"
        style="float: left;box-shadow: none;"
    >

        <v-list-item
            v-for="item in articles"
            :key="item"
            three-line
        >
          <v-card
              style="width: 100%;margin-bottom: 20px;"

          >
            <v-list-item-content style="margin-left: 30px;margin-right: 30px;margin-top: 20px">

              <v-list-item-title class="headline mb-2" v-text="item.paper_title" style="cursor: pointer" @click="toDocument">
              </v-list-item-title>
              <div style="display: flex; flex-direction: row">
                <div v-for="(j,index) in item.authors" :key="j" style="color: #1E88E5;display: flex;flex-direction: row">
                  <div style="cursor: pointer" @click="toAuthor">{{j.author_name}}</div>
                  <div v-show="index!==(item.authors.length-1)">,</div>
                </div>
              </div>
              <div v-text="item.year" style="color: grey;font-size: 14px"></div>
              <div v-text="item.abstract" class="text-ellipsis-two" style="font-weight: 350;margin-bottom: 10px;">
              </div>
              <div>
                <v-dialog
                    transition="dialog-top-transition"
                    max-width="600"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" style="background-color: transparent;box-shadow: none;font-weight: 300;float:left; text-align:left;" @click="changePaperID(item)">
                      <v-icon color="#64B5F6"> mdi-format-quote-close-outline</v-icon>引用
                    </v-btn>
                  </template>
                  <template v-slot:default="dialog">
                    <v-card>
                      <v-toolbar
                          color="primary"
                          dark
                      >
                        <v-toolbar-title>引用</v-toolbar-title>
                        <template v-slot:extension>
                          <v-tabs
                              v-model="tab"
                              align-with-title
                          >
                            <v-tabs-slider color="yellow"></v-tabs-slider>

                            <v-tab
                                v-for="cite in citation_msg"
                                :key="cite.id"
                            >
                              {{ cite.name }}
                            </v-tab>
                          </v-tabs>
                        </template>
                      </v-toolbar>
                      <v-tabs-items v-model="tab">
                        <v-tab-item
                            v-for="citeContent in citation_msg"
                            :key="citeContent.id"
                        >
                          <v-card flat>
                            <v-card-text v-text="citeContent.content"></v-card-text>
                          </v-card>
                        </v-tab-item>
                      </v-tabs-items>
                      <v-card-actions class="justify-end">
                        <v-btn
                            text
                            @click="dialog.value = false"
                        >关闭</v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
                <v-btn style="background-color: transparent;box-shadow: none;font-weight: 300;float:left; text-align:left;">
                  <v-icon color="#64B5F6" >mdi-trash-can-outline</v-icon>删除
                </v-btn>
                <span style="float:right; text-align:right;margin-top: 8px;color: grey;font-size: 15px;">
                被引次数：
                <span style="color: #2d94d4;">
                  {{item.citation_count.toLocaleString()}}
                </span>
                </span>
              </div>

            </v-list-item-content>
          </v-card>
        </v-list-item>

    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "ArticleBlocks",
  props: ['articles'],
  data() {
    return {

      tab:null,
      articlesItems:1,
      // 引用
      quote_paperId: "1231",
      showQuote: true,
      showCollect: false,

      isShowTip: false,
      input: '',
      dialogVisible: false,

      curPaper: '',

      inputVisible: false,
      inputValue: '',
      tagData: [
        // {
        //   tag_id: 1,
        //   tag_name: "默认",
        //   user_id: 2,
        //   username: "",
        //   create_time: "2021-11-18T17:22:27+08:00",
        //   tagState:"plain",
        // },
        // {
        //   tag_id: 2,
        //   tag_name: "CV",
        //   user_id: 2,
        //   username: "",
        //   create_time: "2021-11-18T17:22:27+08:00",
        //   tagState:"plain",
        // }
      ],
      citation_msg: [
        {
          id: 1,
          name: "GB/T 7714",
          content: "Victoriano Perruca AlbadalejoLos peligros de atentado relativos al tráfico bélico rodado[M].Consejo General del Poder Judicial,2006:417-440."
        },
        {
          id: 2,
          name: "APA",
          content: "Victoriano Perruca AlbadalejoLos peligros de atentado relativos al tráfico bélico rodado[M].Consejo General del Poder Judicial,2006:417-440."
        }
      ]
    }
  },
  methods:{
    changePaperID(item) {
      this.quote_paperId = item.paper_id;
      // console.log(this.quote_paperId);
      this.getCita();
    },
    closeChildDialog() {
      this.showQuote = false;
      this.showCollect = false;
    },
    toDocument(){
      this.$router.push({path:"/document"} )
    },
    toAuthor(){
      this.$router.push({path:"/scholar"})
    },
    getCita() {
      this.$axios({
        method: 'post',
        url: '/scholar/cite_paper',
        // data: qs.stringify({
        //   paper_id: this.a
        // })

      })
          .then(res => {
            if (res.data.success) {
              this.citation_msg = res.data.detail;
            } else {
              this.$message.error("获取失败！");
              this.dialogVisible = false;
            }
          })
          .catch(err => {
            console.log(err);
          })
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
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
