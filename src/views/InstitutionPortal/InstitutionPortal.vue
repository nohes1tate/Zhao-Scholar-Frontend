<template>
  <div>
    <div class="institution-top">
      <div class="top-left">
        <v-card class="institution-info-card" elevation="2">
          <v-row>
            <v-col cols="2">
              <v-img width="20vh" height="20vh" src="../../assets/InstitutionLogo/SESC.jpeg">

              </v-img>
            </v-col>
            <v-col>
              <v-row>
                <div class="institution-name">
                  中国科学院
                </div>
              </v-row>
              <v-row>
                <div class="institution-description">{{institutionDescription}}</div>
              </v-row>
              <v-row>
                <v-btn> button1 </v-btn>
                <v-btn> button2 </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </div>
      <div class="top-right" >
        <v-card class="institution-info-card" elevation="2">
          <div style="margin-left: 1vw">
            <v-row>
              论文数:<span class="institution-statistic">{{papersNum}}</span>
            </v-row>
            <v-row>
              学者数:{{authorsNum}}
            </v-row>
            <v-row>
              被引数:{{citationsNum}}
            </v-row>
          </div>
        </v-card>
      </div>
    </div>
    <div class="institution-charts">
      <div v-for="item in charts" v-bind:key="item.id">
        <ChartsCard :title="item.title"></ChartsCard>
      </div>
    </div>
  </div>
</template>

<script>
import ChartsCard from "@/components/InstitutionPortal/ChartsCard";
  export default {
    name: 'SearchResult',
    components: {ChartsCard},
    data: () => ( {
      charts: [{id: 1,value: 2,title: "12345678910"},
        {id: 2,value: 6, title: "65498491165"},
        {id: 3,value: 4, title: "498498818498"},
        {id: 4,value: 1, title: "48984121548956456"}],
      institutionLogo: "../../assets/InstitutionLogo/SESC.jpeg",
      institutionDescription: "中国科学院（英文名称：Chinese Academy of Sciences，简称中科院）成立于1949年11月，为中国自然科学最高学术机构、科学技术最高咨询机构、自然科学与高技术综合研究发展中心。 中国科学院提出了建设国家创新体系的构想，先后实施知识创新工程、“创新2020”、《“率先行动”计划暨全面深化改革纲要》，提出了《迎接知识经济时代，建设国家创新体系》《创新促进发展，科技引领未来》《创新2050：科学技术与中国的未来》《科技发展新态势与面向2020年的战略选择》等战略研究报告。 据2021年11月中国科学院官网显示，全院共拥有11个分院、100多家科研院所、3所大学（中国科学院大学、中国科学技术大学，与上海市共建上海科技大学）、130多个国家级重点实验室和工程中心、68个国家野外观测研究站、20个国家科技资源共享服务平台，承担30余项国家重大科技基础设施的建设与运行，正式职工6.9万余人，在学研究生7.9万余人；建成了完整的自然科学学科体系，物理、化学、材料科学、数学、环境与生态学、地球科学等学科整体水平已进入世界先进行列，一些领域方向也具备了进入世界第一方阵的良好态势。在解决关系国家全局和长远发展的重大问题上，已成为不可替代的国家战略科技力量。一批科学家在国家重大科技任务中发挥了关键和中坚作用，并作为我国科技界的代表活跃在国际科技前沿。 [1]  2019年9月，经党中央批准，十九届中央第四轮巡视将对中国科学院党组织开展常规巡视。 [2]",
      papersNum: 114,
      authorsNum: 514,
      citationsNum: 1919
    })
  }
</script>

<style scoped>
.institution-top {
  width: 90vw;
  margin-left: 5vw;
  display: flex;
}


.top-left {
  margin-top: 10vh;
  width: 60vw;
}

.top-right {
  margin-top: 10vh;
  margin-left: 2vw;
  width: 25vw;
}

.institution-name{
  font-size: 32px;
  font-weight: bold;
}

.institution-charts {
  display: flex;
  flex-wrap: wrap;
  margin-top: 5vh;
}

.institution-description {
  width: 50vw;
  max-height: 35vh;
  overflow-y: auto;
}

.institution-info-card {
  height: 50vh;
}
</style>
