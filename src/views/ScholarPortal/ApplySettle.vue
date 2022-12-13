<template>
  <div class="about">
    <v-stepper
      v-model="now"
      class="mx-auto"
      width="80vw"
      value="3"
      :style="{ 'margin-top': '100px' }"
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
                        placeholder="Name"
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
                        placeholder="Workplace"
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
                        placeholder="email"
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
                        placeholder="Field"
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
                        placeholder="Homepage"
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
              <v-radio-group v-model="selectedId" :style="{'margin-left':'10px'}">
                <div v-for="(n, index) in allAchievements" :key="index">
                  <v-radio :label="n.name" :value="n.id"></v-radio>
                  <div v-for="(s, index) in n.content" :key="index">
                    <v-row :style="{ 'margin-left': '50px' }">
                      <v-col cols="12" md="12" sm="12">
                        <h2>{{ s.title }}</h2>
                        <h4>{{ s.abstract }}</h4>
                        <h4>{{ s.team }}</h4>
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
                <h1>添加成功！</h1>
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
              v-show="now != 3"
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
              下一步
            </v-btn>
          </div>
        </div>
      </template>
    </v-stepper>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "ApplySettle",
  data() {
    return {
      steps: [
        { value: 1, content: "个人信息", icon: "cross" },
        { value: 2, content: "选择学术成果", icon: "cross" },
        { value: 3, content: "完成", icon: "cross" },
      ],
      now: 1,
      selectedId: "",
      form1: {
        name: "",
        workplace: "",
        email: "",
        field: "",
        homepage: "",
      },
      allAchievements: [
        {
          name: "11",
          id: "122",
          content: [
            { title: "a1", abstract: "a1", team: "a1" },
            { title: "a2", abstract: "a2", team: "a2" },
            { title: "a3", abstract: "a3", team: "a3" },
          ],
        },
        {
          name: "33",
          id: "333",
          content: [
            { title: "a1", abstract: "a1", team: "a1" },
            { title: "a2", abstract: "a2", team: "a2" },
            { title: "a3", abstract: "a3", team: "a3" },
          ],
        },
        {
          name: "44",
          id: "555",
          content: [
            { title: "a1", abstract: "a1", team: "a1" },
            { title: "a2", abstract: "a2", team: "a2" },
            { title: "a3", abstract: "a3", team: "a3" },
          ],
        },
      ],
      selectedAchievements: [],
    };
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
      this.now = n + 1;
    },
    lastStep(n) {
      if (n == 1) {
        return;
      }
      this.now = n - 1;
    },
    applySettle1() {
      let data = new FormData();
      data.append("name", this.form1.name);
      request("POST", "/api/PortalManager/SubmitApplication/", data)
        .then((response) => {
          console.log(response);
          this.allAchievements=response.allAchievements;
        })
        .catch((error) => {
          console.error(error);
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
      data.append("id", this.selectedId);
      console.log(this.selectedId+"sss");
      request('POST', "/api/PortalManager/ConfirmSubmit/",data)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.error(error);
        });
    },
    test() {
      console.log(this.selectedAchievements);
    },
    finish() {},
  },

  mounted() {},
};
</script>