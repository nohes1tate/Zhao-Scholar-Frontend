<template>
  <div class="admin" v-title data-title='管理中心 - ZScholar'>
    <div class="left-tabs">
      <v-card>
        <v-tabs vertical>
          <v-tab @click="showVerify">
            <v-icon left>mdi-account-multiple-plus-outline</v-icon>
            审核入驻
          </v-tab>
          <v-tab @click="showScholar">
            <v-icon left>mdi-account-check</v-icon>
            入驻学者
          </v-tab>
        </v-tabs>
      </v-card>
    </div>
    <div class="right-info">
      <v-card v-if="showVerifyTab">
        <v-data-table
            v-model="selected"
            :headers="applyHeaders"
            :items="applications"
            item-key="submitID"
            show-select
            class="elevation-1"
        >

          <template v-slot:top>
            <v-btn color="primary" class="pass-btn" @click="pass(1)">一键通过</v-btn>
            <v-btn color="error" class="pass-btn" @click="pass(0)">一键拒绝</v-btn>
          </template>
        </v-data-table>
      </v-card>
      <v-card v-if="showScholarTab">
        <v-data-table
            :headers="scholarHeaders"
            :items="scholars"
            class="elevation-1"
        ></v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import axios from "axios";
import user from "@/store/user";

export default {
  name: "AdminView",
  mounted() {
    const userInfo = user.getters.getUser(user.state);
    if(userInfo.user.userId!==3){
      this.$message.warning("您不是管理员！");
      const history_pth = localStorage.getItem('preRoute');
      setTimeout(() => {
        if (history_pth == null || history_pth === '/login') {
          this.$router.push('/');
        } else {
          this.$router.push({ path: history_pth });
        }
      }, 1000);
    }
    let data = new FormData();
    request("GET", "/api/PortalManager/getExamineList/", data).then(res => {
      this.applications = res.scholars;
      console.log(res)
    });
    request("GET", "/api/PortalManager/getSettledAuthors/", data).then(res => {
      this.scholars = res.scholars
    });
  },
  data() {
    return {
      showVerifyTab: true,
      showScholarTab: false,
      selected: [],
      applyHeaders: [
        {text: '姓名', sortable: false, value: 'name' },
        { text: '邮箱', sortable: false, value: 'email' },
        { text: '所在机构', sortable: false, value: 'institution' },
        { text: '领域', sortable: false, value: 'field' },
        { text: '个人主页', sortable: false, value: 'homepage' },
        { text: '申请号', sortable: false, value: 'submitID' },
        // { text: '申请时间', sortable: false, value: 'time' },
        // { text: '通过', sortable: false, value: `pass` },
        // { text: '拒绝', sortable: false, value: 'reject' },
      ],
      applications: [],
      scholarHeaders: [
        {text: '姓名', sortable: false, value: 'name' },
        { text: '邮箱', sortable: false, value: 'mail' },
        { text: '所在机构', sortable: false, value: 'institution' },
        { text: '入驻时间', sortable: true, value: 'time' },
        { text: '发表文献', sortable: true, value: 'papers'}
      ],
      scholars: [
        {
          name: 'Frozen Yogurt',
          mail: '3123213',
          institution: '北京航空航天大学',
          time: '2020-01-01',
          papers: 12
        },
        {
          name: 'lzz',
          mail: '3123af213',
          institution: '北京航空航天大学',
          time: '2020-02-01',
          papers: 22
        },
      ]
    }
  },
  methods: {
    showVerify() {
      this.showVerifyTab = true;
      this.showScholarTab = false;
    },
    showScholar() {
      this.showVerifyTab = false;
      this.showScholarTab = true;
    },
    pass(yes) {
      let arr = [];
      for (let i = 0; i < this.selected.length; i++) {
        arr.push(this.selected[i].submitID)
      }
      let obj = {
        "idList": arr,
        "pass": yes
      };
      //console.log(obj);
      axios({
        method: "POST",
        url: "/api/PortalManager/examineSubmit/",
        data: obj
      }).then(response => {
        this.$message.success("操作成功");
        location.reload();
      }).catch(error => {
      })
    },
  },
}
</script>

<style scoped>
.admin{
  width: 100%;
  height: 100%;
  background-color: #fcfcfc;
  padding-left: 10vh;
  padding-top: 10vh;
}
.left-tabs{
  width: 15%;
  height: 100%;
  float: left;
}
.right-info{
  width: 60%;
  height: 100%;
  margin-left: 10%;
  float: left;
}
.pass-btn{
  margin-left: 20px;
  margin-top: 15px;
}
</style>
