<template >
  <div class="about" :style="{'background-color':'#EEEEEE','height':'100%'}">
    <page-header :show-search="true" :is-login="true"></page-header>
    <v-stepper
      v-model="now"
      class="mx-auto"
      width="80vw"
      value="3"
      :style="{ 'margin-top': '40px','margin-bottom':'100px'}"
    >
      <template>
        <v-stepper-header
          :style="{
            'margin-left': '30px',
            'margin-right': '30px',
            'box-shadow': '0 0 0 0',
          }"
        >
          <template v-for="(n, index) in steps">
            <v-stepper-step
              :key="index"
              :complete="now > n.value"
              :step="n.value"
            >
              {{ n.content }}
            </v-stepper-step>
            <v-divider v-if="n.value !== steps.length" :key="index"></v-divider>
          </template>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content
            v-for="(n, index) in steps"
            :key="index"
            :step="n.value"
          >
            <v-card
              v-show="now == 1"
              class="mb-12"
              min-height="300px"
              elevation="0"
            >
              <v-row :style="{ 'margin-top': '20px' }">
                <v-col cols="12" md="1" sm="12" />
                <v-col cols="12" md="10" sm="12">
                  <v-row>
                    <v-col
                      cols="12"
                      md="2"
                      sm="12"
                      :style="{ 'padding-bottom': '0px', 'padding-top': '0px' }"
                    >
                      <h3 :style="{ 'margin-top': '8px' }">姓名</h3>
                    </v-col>
                    <v-col
                      cols="12"
                      md="10"
                      sm="12"
                      :style="{ 'padding-bottom': '0px', 'padding-top': '0px' }"
                    >
                      <v-text-field
                        v-model="form1.name"
                        placeholder="姓名"
                        outlined
                        clearable
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="2"
                      sm="12"
                      :style="{ 'padding-bottom': '0px', 'padding-top': '0px' }"
                    >
                      <h3 :style="{ 'margin-top': '8px' }">工作单位</h3>
                    </v-col>
                    <v-col
                      cols="12"
                      md="10"
                      sm="12"
                      :style="{ 'padding-bottom': '0px', 'padding-top': '0px' }"
                    >
                      <v-text-field
                        v-model="form1.workplace"
                        placeholder="工作单位"
                        outlined
                        clearable
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="2"
                      sm="12"
                      :style="{ 'padding-bottom': '0px', 'padding-top': '0px' }"
                    >
                      <h3 :style="{ 'margin-top': '8px' }">电子邮箱</h3>
                    </v-col>
                    <v-col
                      cols="12"
                      md="10"
                      sm="12"
                      :style="{ 'padding-bottom': '0px', 'padding-top': '0px' }"
                    >
                      <v-text-field
                        v-model="form1.email"
                        placeholder="电子邮箱"
                        outlined
                        clearable
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="2"
                      sm="12"
                      :style="{ 'padding-bottom': '0px', 'padding-top': '0px' }"
                    >
                      <h3 :style="{ 'margin-top': '8px' }">研究领域</h3>
                    </v-col>
                    <v-col
                      cols="12"
                      md="10"
                      sm="12"
                      :style="{ 'padding-bottom': '0px', 'padding-top': '0px' }"
                    >
                      <v-text-field
                        v-model="form1.field"
                        placeholder="研究领域"
                        outlined
                        clearable
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="2"
                      sm="12"
                      :style="{ 'padding-bottom': '0px', 'padding-top': '0px' }"
                    >
                      <h3 :style="{ 'margin-top': '8px' }">个人首页</h3>
                    </v-col>
                    <v-col
                      cols="12"
                      md="10"
                      sm="12"
                      :style="{ 'padding-bottom': '0px', 'padding-top': '0px' }"
                    >
                      <v-text-field
                        v-model="form1.homepage"
                        placeholder="个人首页（可选）"
                        outlined
                        clearable
                        dense
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" md="1" sm="12" />
              </v-row>
            </v-card>

            <v-card
              v-show="now == 2"
              class="mb-12"
              min-height="300px"
              elevation="0"
            >
            <div class="d-flex justify-center" v-if="show"><h1>请选择以下一项</h1></div>
            <div class="d-flex justify-center" v-else><h1>无法找到对应人员</h1></div>
              <v-radio-group v-model="selectedId" :style="{'margin-left':'10px'}">
                <div v-for="(n, index) in allAchievements" :key="index">
                  <v-radio :label="n.name" :value="n.id"></v-radio>
                  <div v-for="(s, index) in n.content" :key="index">
                    <v-row :style="{ 'margin-left': '50px' }">
                      <v-col cols="12" md="11" sm="12" >
                        <h2>· {{ s.title }}</h2>
                        <h5>{{s.abstract || null}}</h5>
                        <h4 :style="{color:'grey'}">{{ s.teams }}</h4>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </v-radio-group>
            </v-card>

            <v-card
              v-show="now == 3"
              class="mb-12"
              min-height="300px"
              elevation="0"
            >
              <v-container>
                <div class="d-flex justify-center"><h1>添加成功！</h1></div>
              </v-container>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
        <div :style="{ margin: '20px' }" class="d-flex justify-space-between">
          <div class="d-flex justify-start">
            <v-btn
              color="primary"
              v-show="now != 1"
              @click="lastStep(now)"
              class="align-left"
            >
              上一步
            </v-btn>
          </div>
          <div class="d-flex justify-end">
            <v-btn
              color="primary"
              v-show="(now==2&&show==true)||(now==1)"
              @click="nextStep(now)"
              class="align-right"
            >
              下一步
            </v-btn>
            <v-btn
              color="primary"
              v-show="now == 3"
              @click="finish()"
              class="align-right"
            >
              完成
            </v-btn>
          </div>
        </div>
      </template>
    </v-stepper>
  </div>
</template>

<script>
import request from "@/utils/request";
import PageHeader from "@/components/UserCenter/PageHeader";
import user from "@/store/user";
export default {
  name: "ApplySettle",
  components: {PageHeader},
  data() {
    return {
      steps: [
        { value: 1, content: "个人信息", icon: "cross" },
        { value: 2, content: "选择学术成果", icon: "cross" },
        { value: 3, content: "完成", icon: "cross" },
      ],
      now: 1,
      selectedId: "",
      show:false,
      form1: {
        name: "",
        workplace: "",
        email: "",
        field: "",
        homepage: "",
        authorId:'',
        userId:'',
      },
      allAchievements: [],
      selectedAchievements: [],
    };
  },
  created() {
    const userInfo = user.getters.getUser(user.state);
    if (!userInfo)
    {
      this.$message.warning("请先登录！");
      setTimeout(() => {
        this.$router.push('/login');
      }, 500);
      return;
    }
    this.authorId=userInfo.user.authorId;
    this.userId=userInfo.user.userId;
    if(this.authorId!==0){
      this.$message.warning("您已经是学者了，正在前往学者门户")
      this.$router.push({path:'/scholar', query: {id: this.authorId}})
    }
  },
  methods: {
    nextStep(n) {
      if (n == 3) {
        return;
      }
      if (n == 1) {
        this.applySettle1();
      }
      if (n == 2) {
        this.applySettle2();
      }
    },
    lastStep(n) {
      if (n == 1) {
        return;
      }
      this.now = n - 1;
    },
    applySettle1() {
      let data = new FormData();
      let i=0,j=0,k=0;
      if(this.form1.name.trim()==''){
        this.$message.error("请填写姓名");
        return;
      }
      if(this.form1.workplace.trim()==''){
        this.$message.error("请填写工作单位");
        return;
      }
      if(this.form1.email.trim()==''){
        this.$message.error("请填写电子邮箱");
        return;
      }
      if(this.form1.field.trim()==''){
        this.$message.error("请填写研究领域");
        return;
      }
      data.append("name", this.form1.name);
      this.now = this.now+1;
      request("POST", "/api/PortalManager/SubmitApplication/", data)
        .then((response) => {
          console.log(response);

          this.show=true;
          this.allAchievements=response.allAchievements;
          for(i=0;i<this.allAchievements.length;i++){
            for(j=0;j<this.allAchievements[i].content.length;j++){
              if(this.allAchievements[i].content[j].title.length>80){
                this.allAchievements[i].content[j].title=this.allAchievements[i].content[j].title.substring(0,80)+"...";
              }
              if(this.allAchievements[i].content[j].abstract.length>320){
                this.allAchievements[i].content[j].abstract=this.allAchievements[i].content[j].abstract.substring(0,320)+"...";
              }
              let teams="",num=0;
              for(k=0;k<this.allAchievements[i].content[j].team.length-1;k++){
                teams+=this.allAchievements[i].content[j].team[k].name+", ";
                num+=this.allAchievements[i].content[j].team[k].name.length+2;
                if(num>220){teams=teams+"...";break;}
              }
              if(k==this.allAchievements[i].content[j].team.length-1&&k!=0){
                teams+=this.allAchievements[i].content[j].team[k].name;
              }
              this.allAchievements[i].content[j].teams=teams
            }
          }
        })
        .catch((error) => {
          console.error(error);
          this.$message.error("找不到有关人员");
          this.show=false
        });
    },
    applySettle2() {
      let data = new FormData();
      data.append("workplace", this.form1.workplace);
      data.append("name", this.form1.name);
      data.append("email", this.form1.email);
      data.append("field", this.form1.field);
      if (this.form1.homepage.trim()!= "") {
        data.append("homepage", this.form1.homepage);
      }
      if(this.selectedId.length==0){
        this.$message.error("请选择一项");
        return;
      }
      data.append("id", this.selectedId);
      console.log(this.selectedId+"sss");
      request('POST', "/api/PortalManager/ConfirmSubmit/",data)
        .then(response => {
          this.now = this.now+1;
          console.log(response)
          this.$message.success("申请成功，请等待管理员审核");
        })
        .catch(error => {
          console.error(error);
        });
    },
    test() {
      console.log(this.selectedAchievements);
    },
    finish() {
      this.$router.go(-1)
    },
  },

  mounted() {},
};
</script>
