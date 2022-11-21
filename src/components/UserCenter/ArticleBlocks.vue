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
            <v-list-item-content style="margin-left: 10px;">

              <v-list-item-title class="headline mb-2" v-text="item.paper_title">
              </v-list-item-title>
              <div style="display: flex; flex-direction: row">
                <div v-for="(j,index) in item.authors" :key="j" style="color: #1E88E5;display: flex;flex-direction: row">
                  <div>{{j.author_name}}</div>
                  <div v-show="index!==(item.authors.length-1)">,</div>
                </div>
              </div>
              <div v-text="item.year" style="color: grey;font-size: 14px"></div>
              <div v-text="item.abstract" class="text-ellipsis-two" style="font-weight: 350;">
              </div>
              <v-divider></v-divider>
              <div>

                <v-divider></v-divider>
                <v-btn style="background-color: transparent;box-shadow: none;font-weight: 300;">引用<v-icon color="#64B5F6"> mdi-format-quote-close-outline</v-icon></v-btn>
                <v-btn style="background-color: transparent;box-shadow: none;font-weight: 300;">删除<v-icon color="#64B5F6">mdi-download</v-icon></v-btn>

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
      articlesItems:1,
      // 引用
      quote_paperId: "1231",
      showQuote: false,
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
      ]
    }
  },
  methods:{
    toDocument(title){
      console.log(title)
      this.$router.push({path:"/document", query:{Title:title, Id:123}})
    },
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
