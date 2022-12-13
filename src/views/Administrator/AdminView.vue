<template>
  <div class="admin">
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
            item-key="name"
            show-select
            class="elevation-1"
        >
          <template v-slot:[`item.pass`]>
            <v-btn outlined small color="primary">通过</v-btn>
          </template>
          <template v-slot:[`item.reject`]>
            <v-btn outlined small color="error">拒绝</v-btn>
          </template>
          <template v-slot:top>
            <v-btn color="primary" class="pass-btn">一键通过</v-btn>
            <v-btn color="error" class="pass-btn">一键拒绝</v-btn>
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
export default {
  name: "AdminView",
  data() {
    return {
      showVerifyTab: true,
      showScholarTab: false,
      selected: [],
      applyHeaders: [
        {text: '姓名', sortable: false, value: 'name' },
        { text: '邮箱', sortable: false, value: 'mail' },
        { text: '所在机构', sortable: false, value: 'institution' },
        { text: '申请时间', sortable: false, value: 'time' },
        { text: '通过', sortable: false, value: `pass` },
        { text: '拒绝', sortable: false, value: 'reject' },
      ],
      applications: [
        {
          name: 'Frozen Yogurt',
          mail: '123456@buaa.edu.cn',
          institution: '北京航空航天大学',
          time: '2020-01-01',
        },
        {
          name: 'Froz12en Yogurt',
          mail: '123456@buaa.edu.cn',
          institution: '北京航空航天大学',
          time: '2020-01-01',
        },
        {
          name: 'Fro23zen Yogurt',
          mail: '123456@buaa.edu.cn',
          institution: '北京航空航天大学',
          time: '2020-01-01',
        },
        {
          name: 'Fro123zen Yogurt',
          mail: '123456@buaa.edu.cn',
          institution: '北京航空航天大学',
          time: '2020-01-01',
        },{
          name: 'Froze34n Yogurt',
          mail: '123456@buaa.edu.cn',
          institution: '北京航空航天大学',
          time: '2020-01-01',
        },
        {
          name: 'Fro5zen Yogurt',
          mail: '123456@buaa.edu.cn',
          institution: '北京航空航天大学',
          time: '2020-01-01',
        },
        {
          name: 'Frozen Yogurt',
          mail: '123456@buaa.edu.cn',
          institution: '北京航空航天大学',
          time: '2020-01-01',
        },
        {
          name: 'Frozen Yogurt',
          mail: '123456@buaa.edu.cn',
          institution: '北京航空航天大学',
          time: '2020-01-01',
        },
        {
          name: 'Frozen Yogurt',
          mail: '123456@buaa.edu.cn',
          institution: '北京航空航天大学',
          time: '2020-01-01',
        },
        {
          name: 'Frozen Yogurt',
          mail: '123456@buaa.edu.cn',
          institution: '北京航空航天大学',
          time: '2020-01-01',
        },{
          name: 'Frozen Yogurt',
          mail: '123456@buaa.edu.cn',
          institution: '北京航空航天大学',
          time: '2020-01-01',
        },{
          name: 'Frozen Yogurt',
          mail: '123456@buaa.edu.cn',
          institution: '北京航空航天大学',
          time: '2020-01-01',
        },
      ],
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