<template>
  <v-overlay
      :absolute="absolute"
      :value="dialogVisible"
      :opacity="opacity"
  >
    <v-card style="width: 700px;height: 160px;margin-top: 150px;background-color: #2d94d4" >
      <div class="tag-line" :key="reloadKey">
          <v-checkbox
              :key="tag.collectID"
              v-for="tag in tagData"
              v-model="selected"
              :label="tag.tag_name"
              :value="tag.collectID"
              style="margin-right: 10px;"
          ></v-checkbox>
      </div>
      <div style="float: left;margin-bottom: 40px;">
        <v-dialog
            max-width="600"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-chip
                class="ma-2"
                color=#2d94d4
                label
                text-color="white"
                style="cursor: pointer;"
                v-bind="attrs"
                v-on="on"
            >
              <v-icon class="material-symbols-outlined" size="17px" style="left: -2px">add</v-icon>
              新建标签
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
      <div style="float: right;margin-bottom: 15px;margin-right: 15px">
        <v-btn color="white" style="color: black;margin-right: 15px" @click="closeDialog">
          取消
        </v-btn>
        <v-btn
            color="primary"
            @click="handleAddToTag"
        >
          确定
        </v-btn>
      </div>
    </v-card>
  </v-overlay>
</template>

<script>
import user from "@/store/user";

export default {
  name: "collectDialog",
  props: ['collectShow','paperID'],
  watch: {
    collectShow(newVal, oldVal) {
      this.dialogVisible = newVal;
      if (this.dialogVisible === true) {
        // 收藏 - 获取tags，打开dialog，供用户选择
        this.getAllTags();
      }
    }
  },
  data:()=>({
    selected: [],
    reloadKey:false,
    newTagName:'',
    tab:null,
    dialogVisible:false,
    absolute: false,
    opacity: 0.5,//透明度
    tagData:[],
  }),
  methods:{
    handleAddToTag(){
      let i=0;
      const userInfo = user.getters.getUser(user.state);
      const self = this;
      for(i=0;i<this.selected.length;i++){
        let formData=new FormData
        formData.append("authorization", userInfo.user.Authorization)
        formData.append("userID", userInfo.user.userId)
        formData.append("collectID", this.selected[i])
        console.log(this.selected[i])
        console.log(this.paperID)
        formData.append("paperID", this.paperID)
        self.$axios({
          method: 'post',
          url: 'api/UserManager/collectPaper/',
          data: formData,
        })
            .then(res => {
              if(res.data.error===0){
                this.$message.success("成功添加到收藏夹！");
              }
            })
            .catch(err => {
              console.log(err);
            })
      }
    },
    closeDialog() {
      this.$emit('closeChildDialog');
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
          })
          .catch(err => {
            console.log(err);
          })
    },
  }
}
</script>

<style scoped>
.tag-line{
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  margin-bottom: 50px;
  margin-left: 20px;
}
</style>
