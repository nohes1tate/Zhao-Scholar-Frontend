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
          <template v-for="(n,index) in steps">
            <v-stepper-step
              :key="index"
              :complete="now>n.value"
              :step="n.value"
            >
              {{ n.content }}
            </v-stepper-step>
            <v-divider
              v-if="n.value !== steps.length"
              :key="index"
            ></v-divider>
          </template>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content
            v-for="(n,index) in steps"
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
              <v-container fluid v-for="(n,index) in allAchievements" :key="index" >
                <v-checkbox
                  v-model="selectedAchievements"
                  :label="n.name"
                  :value="n.name"
                ></v-checkbox>
                <div v-for="(s,index) in n.content" :key="index">
                    <v-row>
                      {{s.title}}

                    </v-row>
                    <v-row>
                      {{s.abstract}}
                      
                    </v-row>
                     <v-row>
                      {{s.team}}
                      
                    </v-row>
                </div>
              </v-container>
              <v-btn @click="test()"></v-btn>
            </v-card>

            <v-card
              v-show="now == 3"
              class="mb-12"
              min-height="300px"
              elevation="0"
            >
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
        <div :style="{ margin: '20px' }">
          <div class="d-flex justify-start">
            <v-btn
              color="primary"
              v-show="now != 1"
              @click="lastStep(now)"
              class="align-left"
            >
              Undo
            </v-btn>
          </div>
          <div class="d-flex justify-end">
            <v-btn
              color="primary"
              v-show="now != 3"
              @click="nextStep(now)"
              class="align-right"
            >
              Continue
            </v-btn>
          </div>
        </div>
      </template>
    </v-stepper>
  </div>
</template>

<script>
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
      form1:{
        name:"",
        workplace:"",
        email:"",
        field:"",
        homepage:""
      },
      allAchievements:[
        {name:'a',content:[
          {title:'a1',abstract:'a1',team:'a1'},
          {title:'a2',abstract:'a2',team:'a2'},
          {title:'a3',abstract:'a3',team:'a3'},
        ]},
        {name:'b',content:[
          {title:'b1',abstract:'b1',team:'b1'},
          {title:'b2',abstract:'b2',team:'b2'},
          {title:'b3',abstract:'b3',team:'b3'},
        ]},
        {name:'c',content:[
          {title:'c1',abstract:'c1',team:'c1'},
          {title:'c2',abstract:'c2',team:'c2'},
          {title:'c3',abstract:'c3',team:'c3'},
        ]},
      ],
      selectedAchievements:[]
    };
  },
  methods: {
    nextStep(n) {
      if (n == 3) {
        return;
      }
      this.now = n + 1;
    },
    lastStep(n) {
      if (n == 1) {
        return;
      }
      this.now = n - 1;
    },
    test(){
      console.log(this.selectedAchievements)
    }
  },

  mounted() {},
};
</script>