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
            <v-overlay
                :absolute="absolute"
                :value="dialogVisible"
                :opacity="opacity"
            >
              <v-card style="width: 700px;background-color: white;margin-top: 150px;">
                <v-toolbar
                    color="blue darken-1"
                    dark
                >
                  <v-toolbar-title>引用格式</v-toolbar-title>
                  <v-spacer>
                  </v-spacer>
                  <v-btn icon
                         @click="dialogVisible = false"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <template v-slot:extension>
                    <v-tabs
                        v-model="tab"
                        align-with-title
                    >
                      <v-tabs-slider color="yellow"></v-tabs-slider>

                      <v-tab
                          v-for="cite in citation_msg"
                          :key="cite.name"
                      >
                        {{ cite.name }}
                      </v-tab>
                    </v-tabs>
                  </template>
                </v-toolbar>
                <v-tabs-items v-model="tab">
                  <v-tab-item
                      v-for="citeContent in citation_msg"
                      :key="citeContent.name"
                  >
                    <v-textarea
                        :value=citeContent.content
                        auto-grow
                        row-height="15"
                        readonly
                    ></v-textarea>
                    <v-btn
                        depressed
                        color="primary"
                        @click="copyVal(citeContent.content)"
                        style="width: 10%;float: right;margin-right: 10px;margin-bottom: 10px;"
                    >复制</v-btn>
                  </v-tab-item>
                </v-tabs-items>
              </v-card>
            </v-overlay>
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
                <v-btn style="background-color: transparent;box-shadow: none;font-weight: 300;float:left; text-align:left;" @click="changePaperID(item)">
                  <v-icon color="#64B5F6"> mdi-format-quote-close-outline</v-icon>引用
                </v-btn>
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
      <CiteDialog
          :paper_id="quote_paperId"
          :showQuote="showQuote"
          @closeChildDialog="closeChildDialog"></CiteDialog>
  </div>
  </div>
</template>

<script>
export default {
  name: "ArticleBlocks",
  props: ['articles'],
  data() {
    return {
      absolute: false,
      opacity: 0.2,
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
    copyVal(val) {
      let aux = document.createElement("input");
      aux.setAttribute("value", val);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      if (val !== null) {
        this.$message.success("引用已复制至剪贴板");
      } else {
        this.$message.error("引用格式为空");
      }
    },
    changePaperID(item) {
      this.dialogVisible=true;
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
