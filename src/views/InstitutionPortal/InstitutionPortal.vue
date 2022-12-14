<template>
  <div>
    <page-header :show-search="false" style="z-index: 50"></page-header>
    <div class="institution-top">
      <div class="top-left">
        <v-card class="institution-info-card" elevation="2">
          <v-row>
            <v-col style="margin-left: 2vw">
              <v-row>
                <v-col cols="2">
                  <v-avatar size="80">
                    <img src="@/assets/institution.png" alt="scholar avatar">
                  </v-avatar>
                </v-col>
                <div class="institution-name" @click="toWebsite">
                  {{ institutionName }}
                  <v-btn @click="toWebsite" color="primary" style="margin-left: 3vw;width: 10vw;height: 6vh">官方网站</v-btn>
                </div>
              </v-row>
              <v-row>
                <v-col>
              <span class="institution-statistic">
                <span class="tab-name"><v-icon>mdi-note-edit-outline</v-icon> 论文数</span>
                <span class="tab-data">{{ papersNum }}</span>
              </span>
                </v-col>
                <v-col>
              <span class="institution-statistic">
                <span class="tab-name"><v-icon>mdi-account-edit-outline</v-icon>学者数</span>
                <span class="tab-data">{{ authorsNum }}</span>
              </span>
                </v-col>
                <v-col>
              <span class="institution-statistic">
                <span class="tab-name"><v-icon>mdi-format-quote-open-outline</v-icon> 被引数</span>
                <span class="tab-data">{{ citationsNum }}</span>
              </span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </div>
      <div>
        <ChartsCard style="margin-top: 9vh;margin-left: 2vw; width: 30vw;height: 35vh;"
                    :title="scholarGraph.title"
                    :id="441"
                    :chart-type="scholarGraph.type"
                    :graph="scholarGraph.graph"
                    @showGraph="displayGraph"></ChartsCard>
      </div>
    </div>
    <div class="institution-charts">
      <div v-for="(item, index) in charts" v-bind:key="index">
        <ChartsCard
            style="margin-top: 3vh;margin-left: 2vw"
            v-if="item.type === 1"
            :title="item.title"
            :id="index"
            :x-axis="item.xAxis"
            :y-data="item.data"
            :chart-type="item.type"
            :graph="item.graph"
            @showGraph="displayGraph"
            @showChart="displayChart"></ChartsCard>
      </div>
    </div>
    <div class="institution-detail">
      <v-row>
        <v-col>
          <v-card elevation="2" class="institution-detail-info">
            <div>
<!--              <v-data-table-->
<!--                  :headers="headers"-->
<!--                  :items="institutionData"-->
<!--                  hide-default-footer-->
<!--              >-->
<!--                <template v-slot:[`header.name`]="{ header }">-->
<!--                  <div style="font-size: 20px">{{ header.text }}</div>-->
<!--                </template>-->
<!--                <template v-slot:[`header.papers`]="{ header }">-->
<!--                  <div style="font-size: 20px">{{ header.text }}</div>-->
<!--                </template>-->
<!--                <template v-slot:[`header.citation`]="{ header }">-->
<!--                  <div style="font-size: 20px">{{ header.text }}</div>-->
<!--                </template>-->
<!--                <template v-slot:[`header.H_index`]="{ header }">-->
<!--                  <div style="font-size: 20px">{{ header.text }}</div>-->
<!--                </template>-->
<!--                <template v-slot:[`item.name`]="{ item }">-->
<!--                  <div style="font-size: 18px;font-weight: bold">{{ item.name }}</div>-->
<!--                </template>-->
<!--                <template v-slot:[`item.papers`]="{ item }">-->
<!--                  <div style="font-size: 18px">{{ item.papers }}</div>-->
<!--                </template>-->
<!--                <template v-slot:[`item.citation`]="{ item }">-->
<!--                  <div style="font-size: 18px">{{ item.citation }}</div>-->
<!--                </template>-->
<!--                <template v-slot:[`item.H_index`]="{ item }">-->
<!--                  <div style="font-size: 18px">{{ item.H_index }}</div>-->
<!--                </template>-->
<!--              </v-data-table>-->
              <v-row>
                <v-col>
                  <div id="paperInfo" style="width: 80%;height: 50vh;margin-left: 10%">
                  </div>
                </v-col>
                <!--                <v-col>-->
                <!--                  <div id="achievementInfo" style="width: 100%;height: 40vh">-->
                <!--                  </div>-->
                <!--                </v-col>-->
              </v-row>
              <v-data-table
                  :headers="authorHeaders"
                  :items="authorData"
                  :items-per-page="5"
                  class="author-table"
              >
                <template v-slot:[`item.name`]="{ item }">
                  <v-btn
                      class="ma-1"
                      plain
                      @click="toAuthorCenter(item.id)"
                  >
                    {{ item.name }}
                  </v-btn>
                </template>
              </v-data-table>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-dialog
        v-model="chartDialog"
        width="60vw"
        height="90vh"
        @input="closeDialog"
        style="overflow: hidden"
    >

      <v-card style="height: 80vh">
        <div id="showchart" style="height: 75vh; width: 55vw; cursor: pointer"></div>
      </v-card>
    </v-dialog>
    <v-dialog
        v-model="graphDialog"
        width="60vw"
        height="90vh"
        @input="closeGraphDialog"
        style="overflow: hidden"
    >

      <v-card style="height: 80vh">
        <div ref="graphchart" style="height: 75vh; width: 55vw; cursor: pointer"></div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
import PageHeader from "@/components/UserCenter/PageHeader";
import ChartsCard from "@/components/InstitutionPortal/ChartsCard";
import * as echarts from 'echarts'
import axios from "axios";

export default {
  components: {ChartsCard, PageHeader},
  data: () => ({
    chartDialog: false,
    graphDialog: false,
    chartTitle: "",
    selectedArea: [
      {
        id: 2,
        label: "NLP",
        num: 17,
      },
      {
        id: 3,
        label: "Deep Learning",
        num: 13,
      },
      {
        id: 5,
        label: "BUAA",
        num: 21,
      },
      {
        id: 6,
        label: "THU",
        num: 9,
      }],
    achievements: [
      {
        id: 0,
        label: "ALL",
        num: 60,
        children: [
          {
            id: 1,
            label: "AI",
            num: 30,
            children: [{
              id: 2,
              label: "NLP",
              num: 17,
            },
              {
                id: 3,
                label: "Deep Learning",
                num: 13,
              }]
          },
          {
            id: 4,
            label: "Software Engine",
            num: 30,
            children: [{
              id: 5,
              label: "BUAA",
              num: 21,
            },
              {
                id: 6,
                label: "THU",
                num: 9,
              }]
          }
        ]
      }
    ],
    scholarGraph: {},
    charts: [
      {
        type: 1,
        title: "H-index Statistics",
        xAxis: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
        data: [1100, 1200, 1250, 1255, 1276, 1305, 1350, 1358, 1422, 1530, 108]
      },
      {
        type: 1,
        title: "Paper Amount Statistics",
        xAxis: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
        data: [1000, 1100, 1150, 1255, 1276, 1605, 1350, 1358, 1947, 1422, 408]
      },
      {
        type: 1,
        title: "New Citation Amount Statistics",
        xAxis: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
        data: [2000, 1300, 1250, 1255, 1576, 1305, 1350, 2258, 1422, 1597, 108]
      },
    ],
    institutionPage: "https://www.buaa.edu.cn",
    institutionName: "中国科学院",
    institutionLogo: "http://www.zsdlw.com/uploadfiles/dxlogo/bj/zgkxydx.jpg",
    institutionDescription: "中国科学院（英文名称：Chinese Academy of Sciences，简称中科院）成立于1949年11月，为中国自然科学最高学术机构、科学技术最高咨询机构、自然科学与高技术综合研究发展中心。 中国科学院提出了建设国家创新体系的构想，先后实施知识创新工程、“创新2020”、《“率先行动”计划暨全面深化改革纲要》，提出了《迎接知识经济时代，建设国家创新体系》《创新促进发展，科技引领未来》《创新2050：科学技术与中国的未来》《科技发展新态势与面向2020年的战略选择》等战略研究报告。 据2021年11月中国科学院官网显示，全院共拥有11个分院、100多家科研院所、3所大学（中国科学院大学、中国科学技术大学，与上海市共建上海科技大学）、130多个国家级重点实验室和工程中心、68个国家野外观测研究站、20个国家科技资源共享服务平台，承担30余项国家重大科技基础设施的建设与运行，正式职工6.9万余人，在学研究生7.9万余人；建成了完整的自然科学学科体系，物理、化学、材料科学、数学、环境与生态学、地球科学等学科整体水平已进入世界先进行列，一些领域方向也具备了进入世界第一方阵的良好态势。在解决关系国家全局和长远发展的重大问题上，已成为不可替代的国家战略科技力量。一批科学家在国家重大科技任务中发挥了关键和中坚作用，并作为我国科技界的代表活跃在国际科技前沿。 [1]  2019年9月，经党中央批准，十九届中央第四轮巡视将对中国科学院党组织开展常规巡视。 [2]",
    papersNum: 114,
    authorsNum: 514,
    citationsNum: 1919,
    paperInfoXAxis: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
    paperInfoData: [1100, 1200, 1250, 1255, 1276, 1305, 1350, 1358, 1422, 1530, 108],
    selectedData: [],
    authorHeaders: [
      {
        text: '作者',
        align: 'start',
        sortable: false,
        value: 'name'
      },
      {text: '论文数', value: 'papers'},
      {text: '被引数', value: 'citation'},
      {text: 'H-index', value: 'H_index'},
    ],
    headers: [
      {
        text: '机构名',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      {text: '论文数', sortable: false, value: 'papers'},
      {text: '被引数', sortable: false, value: 'citation'},
      {text: 'H-index', sortable: false, value: 'H_index'},
    ],
    institutionData: [
      {
        name: '中国科学院',
        papers: 159,
        citation: 610,
        H_index: 24,
      },
    ],
    authorData: [
      {
        "id": 15,
        "name": "准说东入",
        "papers": 87,
        "firstPapers": 74,
        "citation": 83,
        "firstCitation": 2,
        "H_index": 73
      },
      {
        "id": 35,
        "name": "事术界小",
        "papers": 44,
        "firstPapers": 18,
        "citation": 93,
        "firstCitation": 70,
        "H_index": 93
      },
      {
        "id": 97,
        "name": "到直置花严律",
        "papers": 45,
        "firstPapers": 86,
        "citation": 73,
        "firstCitation": 53,
        "H_index": 95
      },
      {
        "id": 11,
        "name": "问然要事成和利",
        "papers": 87,
        "firstPapers": 48,
        "citation": 84,
        "firstCitation": 74,
        "H_index": 67
      },
      {
        "id": 22,
        "name": "他它可",
        "papers": 36,
        "firstPapers": 15,
        "citation": 63,
        "firstCitation": 84,
        "H_index": 71
      }
    ]
  }),
  mounted() {
    this.initInstitutionInfo()
    // this.searchInfo()
    // this.updateAchievementInfo()
    this.initChartInfo()

    this.initDetailInfo()
  },
  methods: {
    initChartInfo() {
      console.log('initChart:')
      const data = new FormData()
      let institutionID = this.$route.params.institutionID
      data.append("institutionId", institutionID);
      request('POST', "/api/PortalManager/getChartInfo/", data)
          .then(res => {
            console.log('chart:', res)
            this.charts = res.charts
            let length = this.charts.length
            console.log('last:', this.charts[length - 1])
            this.scholarGraph = this.charts[length - 1]
          })
    },
    initDetailInfo() {
      console.log('initDetail:')
      const data = new FormData()
      let institutionID = this.$route.params.institutionID
      data.append("institutionId", institutionID);
      data.append("scholarNum", 50)
      request('POST', "/api/PortalManager/detailInfo/", data)
          .then(res => {
            console.log('detailInfo:', res)
            this.authorData = res.authorData
            this.paperInfoXAxis = res.paperInfoXAxis
            this.paperInfoData = res.paperInfoData
            this.initPaperInfo()
            this.institutionData = []
            this.institutionData.push(res.institutionData)
            console.log(res.institutionData)
            console.log(this.institutionData)
          })
    },
    initInstitutionInfo() {
      console.log('initInfo:')
      const data = new FormData();
      let institutionID = this.$route.params.institutionID
      data.append("institutionId", institutionID);
      request('POST', "/api/PortalManager/getAffiliationInfo/", data)
          .then(data => {
            console.log("init info:", data);
            this.institutionPage = data.institutionPage
            this.institutionName = data.institutionName
            this.authorsNum = data.authorsNum
            this.citationsNum = data.citationsNum
            this.papersNum = data.papersNum
          })
          .catch(error => {
            console.error(error);
          });
    },
    toAuthorCenter(id) {
      this.$router.push({path: '/scholar', query: {id: id}})
    },
    closeGraphDialog() {

    },
    toWebsite() {
      window.open(this.institutionPage)
    },
    closeDialog() {
      let chartDom = document.getElementById('showchart');
      let myChart = echarts.init(chartDom);

      let option = {
        title: {
          text: '',
          x: 'center'
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
      };

      option && myChart.setOption(option);
    },
    handleData(data, node) {
      console.log("data:", data)
      console.log("node:", node)
    },
    updateAchievementInfo() {
      let chartDom = document.getElementById('achievementInfo');
      let myChart = echarts.init(chartDom);
      let AData = []
      let i
      for (i = 0; i < this.selectedData.length; i++) {
        let tmp = {value: 0, name: ''}
        tmp.value = this.selectedData[i].num
        tmp.name = this.selectedData[i].label
        AData.push(tmp)
      }
      let option = {
        title: {
          text: '研究领域分布',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: AData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      option && myChart.setOption(option);
    },
    initPaperInfo() {
      let chartDom = document.getElementById('paperInfo');
      let myChart = echarts.init(chartDom);
      let option;
      let x = this.paperInfoXAxis
      let d = this.paperInfoData

      option = {
        title: {
          text: '论文数统计',
          x: 'center'
        },
        xAxis: {
          type: 'category',
          data: x
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: d,
            type: 'bar'
          }
        ],
        tooltip: { // 鼠标悬浮提示框显示 X和Y 轴数据
          trigger: 'axis',
          backgroundColor: 'rgba(32, 33, 36,.7)',
          borderColor: 'rgba(32, 33, 36,0.20)',
          borderWidth: 1,
          textStyle: { // 文字提示样式
            color: '#fff',
            fontSize: '12'
          },

        }
      };

      option && myChart.setOption(option);
    },
    displayGraph(graph, title) {
      console.log("display:", graph)
      this.graphDialog = true
      this.chartTitle = title
      setTimeout(() => {
        var myChart = this.$echarts.init(this.$refs.graphchart)
        let option = {
          tooltip: {},
          title: {
            text: '学者关系网络',
            top: 'top',
            left: 'left'
          },
          legend: [
            {
              data: []
            }
          ],
          series: [
            {
              type: 'graph',
              layout: 'circular',
              data: graph.nodes,
              links: graph.links,
              categories: graph.categories,
              roam: true,
              label: {
                show: true,
                position: 'right',
                formatter: '{b}'
              },
              labelLayout: {
                hideOverlap: true
              },
              scaleLimit: {
                min: 0.4,
                max: 2
              },
              lineStyle: {
                color: 'source',
                curveness: 0.3
              }
            }
          ]
        };
        myChart.setOption(option);
      }, 50)
    },
    displayChart(chartXAxis, chartData, title) {
      this.chartDialog = true
      this.chartTitle = title

      setTimeout(() => {
        let chartDom = document.getElementById('showchart');
        let myChart = echarts.init(chartDom);
        let option;
        option = {
          title: {
            text: title,
            x: 'center'
          },
          xAxis: {
            type: 'category',
            data: chartXAxis
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: chartData,
              type: 'bar'
            }
          ],
          tooltip: { // 鼠标悬浮提示框显示 X和Y 轴数据
            trigger: 'axis',
            backgroundColor: 'rgba(32, 33, 36,.7)',
            borderColor: 'rgba(32, 33, 36,0.20)',
            borderWidth: 1,
            textStyle: { // 文字提示样式
              color: '#fff',
              fontSize: '12'
            },
          }
        };

        option && myChart.setOption(option);
      }, 50)

    }
  }
}
</script>


<style scoped>

.institution-top {
  z-index: -1;
  width: 100vw;
  margin-left: 2vw;
  display: flex;
}


.top-left {
  z-index: 0;
  margin-top: 10vh;
  width: 62vw;
  height: 40vh;
}

.top-right {
  z-index: 0;
  margin-top: 10vh;
  margin-left: 2vw;
  width: 30vw;
  height: 50vh;
}

.institution-name {
  margin-top: 2vh;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
}

.institution-name:hover {
  color: #1E88E5;
}

.institution-charts {
  display: flex;
  flex-wrap: wrap;
  margin-top: -2vh;
}

.institution-detail {
  margin-left: 2vw;
  margin-top: 5vh;
}

.institution-detail-filter {
  min-height: 60vh;
}

.institution-detail-info {
  min-height: 60vh;
  margin-right: 3vw;
}

.institution-description {
  width: 45vw;
  max-height: 30vh;
  overflow-y: auto;
}

.institution-statistic {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 7vw;
  margin-top: 4vh;
  margin-left: 9vh;
  margin-right: 9vh;
}

.institution-info-card {
  height: 35vh;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.author-table {
}

.tab-name {
  width: 40%;
  min-width: 120px;
  color: #595959;
  font-size: 24px;
  text-align: center;
}

.tab-name .v-icon {
  font-size: 40px;
}

.tab-data {
  width: 58%;
  color: #0274b3;
  font-size: 24px;
  text-align: center;
}

#iframeContain {
  width: 60vw;
  height: 40vh;
}
</style>
