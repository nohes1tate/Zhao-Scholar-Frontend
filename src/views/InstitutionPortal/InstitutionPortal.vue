<template>
  <div>
    <page-header :show-search="false" style="z-index: 50"></page-header>
    <div class="institution-top">
      <div class="top-left">
        <v-card class="institution-info-card" elevation="2">
          <v-row>
            <v-col cols="2" style="margin-left: 2vw">
              <v-img width="20vh" height="20vh" :src="institutionLogo">

              </v-img>
            </v-col>
            <v-col style="margin-left: 2vw">
              <v-row>
                <div class="institution-name">`
                  {{ institutionName }}
                </div>
              </v-row>
              <v-row>
                <div class="institution-description">{{ institutionDescription }}</div>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn color="primary" @click="toWebsite"> 官方网站</v-btn>
                </v-col>

              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </div>
      <div class="top-right">
        <v-card class="institution-info-card" elevation="2">
          <div style="margin-left: 1vw">
            <v-row>
              <span class="institution-statistic">
                <span class="tab-name"><v-icon>mdi-note-edit-outline</v-icon> 论文数</span>
                <span class="tab-data">{{ papersNum }}</span>
              </span>
            </v-row>
            <v-row>
              <span class="institution-statistic">
                <span class="tab-name"><v-icon>mdi-account-edit-outline</v-icon>学者数</span>
                <span class="tab-data">{{ authorsNum }}</span>
              </span>
            </v-row>
            <v-row>
              <span class="institution-statistic">
                <span class="tab-name"><v-icon>mdi-format-quote-open-outline</v-icon> 被引数</span>
                <span class="tab-data">{{ citationsNum }}</span>
              </span>
            </v-row>
          </div>
        </v-card>
      </div>
    </div>
    <div class="institution-charts">
      <div v-for="(item, index) in charts" v-bind:key="index">
        <ChartsCard :title="item.title"
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
              <v-data-table
                  :headers="headers"
                  :items="institutionData"
                  hide-default-footer
              >
                <template v-slot:[`header.name`]="{ header }">
                  <div style="font-size: 20px">{{ header.text }}</div>
                </template>
                <template v-slot:[`header.papers`]="{ header }">
                  <div style="font-size: 20px">{{ header.text }}</div>
                </template>
                <template v-slot:[`header.citation`]="{ header }">
                  <div style="font-size: 20px">{{ header.text }}</div>
                </template>
                <template v-slot:[`header.H_index`]="{ header }">
                  <div style="font-size: 20px">{{ header.text }}</div>
                </template>
                <template v-slot:[`item.name`]="{ item }">
                  <div style="font-size: 18px;font-weight: bold">{{ item.name }}</div>
                </template>
                <template v-slot:[`item.papers`]="{ item }">
                  <div style="font-size: 18px">{{ item.papers }}</div>
                </template>
                <template v-slot:[`item.citation`]="{ item }">
                  <div style="font-size: 18px">{{ item.citation }}</div>
                </template>
                <template v-slot:[`item.H_index`]="{ item }">
                  <div style="font-size: 18px">{{ item.H_index }}</div>
                </template>
              </v-data-table>
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
      {
        type: 1,
        title: "New Citation from Top 30 Scholar Statistics",
        xAxis: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
        data: [1100, 1200, 1250, 1255, 1276, 1305, 2350, 1358, 3422, 4321, 108]
      },
      {
        type: 2,
        title: "学者关系网络",
        graph: {
          "nodes": [
            {
              "id": "0",
              "name": "Myriel",
              "symbolSize": 19.12381,
              "x": -266.82776,
              "y": 299.6904,
              "value": 28.685715,
              "category": 0
            },
            {
              "id": "1",
              "name": "Napoleon",
              "symbolSize": 2.6666666666666665,
              "x": -418.08344,
              "y": 446.8853,
              "value": 4,
              "category": 0
            },
            {
              "id": "2",
              "name": "MlleBaptistine",
              "symbolSize": 6.323809333333333,
              "x": -212.76357,
              "y": 245.29176,
              "value": 9.485714,
              "category": 1
            },
            {
              "id": "3",
              "name": "MmeMagloire",
              "symbolSize": 6.323809333333333,
              "x": -242.82404,
              "y": 235.26283,
              "value": 9.485714,
              "category": 1
            },
            {
              "id": "4",
              "name": "CountessDeLo",
              "symbolSize": 2.6666666666666665,
              "x": -379.30386,
              "y": 429.06424,
              "value": 4,
              "category": 0
            },
            {
              "id": "5",
              "name": "Geborand",
              "symbolSize": 2.6666666666666665,
              "x": -417.26337,
              "y": 406.03506,
              "value": 4,
              "category": 0
            },
            {
              "id": "6",
              "name": "Champtercier",
              "symbolSize": 2.6666666666666665,
              "x": -332.6012,
              "y": 485.16974,
              "value": 4,
              "category": 0
            },
            {
              "id": "7",
              "name": "Cravatte",
              "symbolSize": 2.6666666666666665,
              "x": -382.69568,
              "y": 475.09113,
              "value": 4,
              "category": 0
            },
            {
              "id": "8",
              "name": "Count",
              "symbolSize": 2.6666666666666665,
              "x": -320.384,
              "y": 387.17325,
              "value": 4,
              "category": 0
            },
            {
              "id": "9",
              "name": "OldMan",
              "symbolSize": 2.6666666666666665,
              "x": -344.39832,
              "y": 451.16772,
              "value": 4,
              "category": 0
            },
            {
              "id": "10",
              "name": "Labarre",
              "symbolSize": 2.6666666666666665,
              "x": -89.34107,
              "y": 234.56128,
              "value": 4,
              "category": 1
            },
            {
              "id": "11",
              "name": "Valjean",
              "symbolSize": 66.66666666666667,
              "x": -87.93029,
              "y": -6.8120565,
              "value": 100,
              "category": 1
            },
            {
              "id": "12",
              "name": "Marguerite",
              "symbolSize": 4.495239333333333,
              "x": -339.77908,
              "y": -184.69139,
              "value": 6.742859,
              "category": 1
            },
            {
              "id": "13",
              "name": "MmeDeR",
              "symbolSize": 2.6666666666666665,
              "x": -194.31313,
              "y": 178.55301,
              "value": 4,
              "category": 1
            },
            {
              "id": "14",
              "name": "Isabeau",
              "symbolSize": 2.6666666666666665,
              "x": -158.05168,
              "y": 201.99768,
              "value": 4,
              "category": 1
            },
            {
              "id": "15",
              "name": "Gervais",
              "symbolSize": 2.6666666666666665,
              "x": -127.701546,
              "y": 242.55057,
              "value": 4,
              "category": 1
            },
            {
              "id": "16",
              "name": "Tholomyes",
              "symbolSize": 17.295237333333333,
              "x": -385.2226,
              "y": -393.5572,
              "value": 25.942856,
              "category": 2
            },
            {
              "id": "17",
              "name": "Listolier",
              "symbolSize": 13.638097333333334,
              "x": -516.55884,
              "y": -393.98975,
              "value": 20.457146,
              "category": 2
            },
            {
              "id": "18",
              "name": "Fameuil",
              "symbolSize": 13.638097333333334,
              "x": -464.79382,
              "y": -493.57944,
              "value": 20.457146,
              "category": 2
            },
            {
              "id": "19",
              "name": "Blacheville",
              "symbolSize": 13.638097333333334,
              "x": -515.1624,
              "y": -456.9891,
              "value": 20.457146,
              "category": 2
            },
            {
              "id": "20",
              "name": "Favourite",
              "symbolSize": 13.638097333333334,
              "x": -408.12122,
              "y": -464.5048,
              "value": 20.457146,
              "category": 2
            },
            {
              "id": "21",
              "name": "Dahlia",
              "symbolSize": 13.638097333333334,
              "x": -456.44113,
              "y": -425.13303,
              "value": 20.457146,
              "category": 2
            },
            {
              "id": "22",
              "name": "Zephine",
              "symbolSize": 13.638097333333334,
              "x": -459.1107,
              "y": -362.5133,
              "value": 20.457146,
              "category": 2
            },
            {
              "id": "23",
              "name": "Fantine",
              "symbolSize": 28.266666666666666,
              "x": -313.42786,
              "y": -289.44803,
              "value": 42.4,
              "category": 2
            },
            {
              "id": "24",
              "name": "MmeThenardier",
              "symbolSize": 20.95238266666667,
              "x": 4.6313396,
              "y": -273.8517,
              "value": 31.428574,
              "category": 7
            },
            {
              "id": "25",
              "name": "Thenardier",
              "symbolSize": 30.095235333333335,
              "x": 82.80825,
              "y": -203.1144,
              "value": 45.142853,
              "category": 7
            },
            {
              "id": "26",
              "name": "Cosette",
              "symbolSize": 20.95238266666667,
              "x": 78.64646,
              "y": -31.512747,
              "value": 31.428574,
              "category": 6
            },
            {
              "id": "27",
              "name": "Javert",
              "symbolSize": 31.923806666666668,
              "x": -81.46074,
              "y": -204.20204,
              "value": 47.88571,
              "category": 7
            },
            {
              "id": "28",
              "name": "Fauchelevent",
              "symbolSize": 8.152382000000001,
              "x": -225.73984,
              "y": 82.41631,
              "value": 12.228573,
              "category": 4
            },
            {
              "id": "29",
              "name": "Bamatabois",
              "symbolSize": 15.466666666666667,
              "x": -385.6842,
              "y": -20.206686,
              "value": 23.2,
              "category": 3
            },
            {
              "id": "30",
              "name": "Perpetue",
              "symbolSize": 4.495239333333333,
              "x": -403.92447,
              "y": -197.69823,
              "value": 6.742859,
              "category": 2
            },
            {
              "id": "31",
              "name": "Simplice",
              "symbolSize": 8.152382000000001,
              "x": -281.4253,
              "y": -158.45137,
              "value": 12.228573,
              "category": 2
            },
            {
              "id": "32",
              "name": "Scaufflaire",
              "symbolSize": 2.6666666666666665,
              "x": -122.41348,
              "y": 210.37503,
              "value": 4,
              "category": 1
            },
            {
              "id": "33",
              "name": "Woman1",
              "symbolSize": 4.495239333333333,
              "x": -234.6001,
              "y": -113.15067,
              "value": 6.742859,
              "category": 1
            },
            {
              "id": "34",
              "name": "Judge",
              "symbolSize": 11.809524666666666,
              "x": -387.84915,
              "y": 58.7059,
              "value": 17.714287,
              "category": 3
            },
            {
              "id": "35",
              "name": "Champmathieu",
              "symbolSize": 11.809524666666666,
              "x": -338.2307,
              "y": 87.48405,
              "value": 17.714287,
              "category": 3
            },
            {
              "id": "36",
              "name": "Brevet",
              "symbolSize": 11.809524666666666,
              "x": -453.26874,
              "y": 58.94648,
              "value": 17.714287,
              "category": 3
            },
            {
              "id": "37",
              "name": "Chenildieu",
              "symbolSize": 11.809524666666666,
              "x": -386.44904,
              "y": 140.05937,
              "value": 17.714287,
              "category": 3
            },
            {
              "id": "38",
              "name": "Cochepaille",
              "symbolSize": 11.809524666666666,
              "x": -446.7876,
              "y": 123.38005,
              "value": 17.714287,
              "category": 3
            },
            {
              "id": "39",
              "name": "Pontmercy",
              "symbolSize": 6.323809333333333,
              "x": 336.49738,
              "y": -269.55914,
              "value": 9.485714,
              "category": 6
            },
            {
              "id": "40",
              "name": "Boulatruelle",
              "symbolSize": 2.6666666666666665,
              "x": 29.187843,
              "y": -460.13132,
              "value": 4,
              "category": 7
            },
            {
              "id": "41",
              "name": "Eponine",
              "symbolSize": 20.95238266666667,
              "x": 238.36697,
              "y": -210.00926,
              "value": 31.428574,
              "category": 7
            },
            {
              "id": "42",
              "name": "Anzelma",
              "symbolSize": 6.323809333333333,
              "x": 189.69513,
              "y": -346.50662,
              "value": 9.485714,
              "category": 7
            },
            {
              "id": "43",
              "name": "Woman2",
              "symbolSize": 6.323809333333333,
              "x": -187.00418,
              "y": -145.02663,
              "value": 9.485714,
              "category": 6
            },
            {
              "id": "44",
              "name": "MotherInnocent",
              "symbolSize": 4.495239333333333,
              "x": -252.99521,
              "y": 129.87549,
              "value": 6.742859,
              "category": 4
            },
            {
              "id": "45",
              "name": "Gribier",
              "symbolSize": 2.6666666666666665,
              "x": -296.07935,
              "y": 163.11964,
              "value": 4,
              "category": 4
            },
            {
              "id": "46",
              "name": "Jondrette",
              "symbolSize": 2.6666666666666665,
              "x": 550.3201,
              "y": 522.4031,
              "value": 4,
              "category": 5
            },
            {
              "id": "47",
              "name": "MmeBurgon",
              "symbolSize": 4.495239333333333,
              "x": 488.13535,
              "y": 356.8573,
              "value": 6.742859,
              "category": 5
            },
            {
              "id": "48",
              "name": "Gavroche",
              "symbolSize": 41.06667066666667,
              "x": 387.89572,
              "y": 110.462326,
              "value": 61.600006,
              "category": 8
            },
            {
              "id": "49",
              "name": "Gillenormand",
              "symbolSize": 13.638097333333334,
              "x": 126.4831,
              "y": 68.10622,
              "value": 20.457146,
              "category": 6
            },
            {
              "id": "50",
              "name": "Magnon",
              "symbolSize": 4.495239333333333,
              "x": 127.07365,
              "y": -113.05923,
              "value": 6.742859,
              "category": 6
            },
            {
              "id": "51",
              "name": "MlleGillenormand",
              "symbolSize": 13.638097333333334,
              "x": 162.63559,
              "y": 117.6565,
              "value": 20.457146,
              "category": 6
            },
            {
              "id": "52",
              "name": "MmePontmercy",
              "symbolSize": 4.495239333333333,
              "x": 353.66415,
              "y": -205.89165,
              "value": 6.742859,
              "category": 6
            },
            {
              "id": "53",
              "name": "MlleVaubois",
              "symbolSize": 2.6666666666666665,
              "x": 165.43939,
              "y": 339.7736,
              "value": 4,
              "category": 6
            },
            {
              "id": "54",
              "name": "LtGillenormand",
              "symbolSize": 8.152382000000001,
              "x": 137.69348,
              "y": 196.1069,
              "value": 12.228573,
              "category": 6
            },
            {
              "id": "55",
              "name": "Marius",
              "symbolSize": 35.58095333333333,
              "x": 206.44687,
              "y": -13.805411,
              "value": 53.37143,
              "category": 6
            },
            {
              "id": "56",
              "name": "BaronessT",
              "symbolSize": 4.495239333333333,
              "x": 194.82993,
              "y": 224.78036,
              "value": 6.742859,
              "category": 6
            },
            {
              "id": "57",
              "name": "Mabeuf",
              "symbolSize": 20.95238266666667,
              "x": 597.6618,
              "y": 135.18481,
              "value": 31.428574,
              "category": 8
            },
            {
              "id": "58",
              "name": "Enjolras",
              "symbolSize": 28.266666666666666,
              "x": 355.78366,
              "y": -74.882454,
              "value": 42.4,
              "category": 8
            },
            {
              "id": "59",
              "name": "Combeferre",
              "symbolSize": 20.95238266666667,
              "x": 515.2961,
              "y": -46.167564,
              "value": 31.428574,
              "category": 8
            },
            {
              "id": "60",
              "name": "Prouvaire",
              "symbolSize": 17.295237333333333,
              "x": 614.29285,
              "y": -69.3104,
              "value": 25.942856,
              "category": 8
            },
            {
              "id": "61",
              "name": "Feuilly",
              "symbolSize": 20.95238266666667,
              "x": 550.1917,
              "y": -128.17537,
              "value": 31.428574,
              "category": 8
            },
            {
              "id": "62",
              "name": "Courfeyrac",
              "symbolSize": 24.609526666666667,
              "x": 436.17184,
              "y": -12.7286825,
              "value": 36.91429,
              "category": 8
            },
            {
              "id": "63",
              "name": "Bahorel",
              "symbolSize": 22.780953333333333,
              "x": 602.55225,
              "y": 16.421427,
              "value": 34.17143,
              "category": 8
            },
            {
              "id": "64",
              "name": "Bossuet",
              "symbolSize": 24.609526666666667,
              "x": 455.81955,
              "y": -115.45826,
              "value": 36.91429,
              "category": 8
            },
            {
              "id": "65",
              "name": "Joly",
              "symbolSize": 22.780953333333333,
              "x": 516.40784,
              "y": 47.242233,
              "value": 34.17143,
              "category": 8
            },
            {
              "id": "66",
              "name": "Grantaire",
              "symbolSize": 19.12381,
              "x": 646.4313,
              "y": -151.06331,
              "value": 28.685715,
              "category": 8
            },
            {
              "id": "67",
              "name": "MotherPlutarch",
              "symbolSize": 2.6666666666666665,
              "x": 668.9568,
              "y": 204.65488,
              "value": 4,
              "category": 8
            },
            {
              "id": "68",
              "name": "Gueulemer",
              "symbolSize": 19.12381,
              "x": 78.4799,
              "y": -347.15146,
              "value": 28.685715,
              "category": 7
            },
            {
              "id": "69",
              "name": "Babet",
              "symbolSize": 19.12381,
              "x": 150.35959,
              "y": -298.50797,
              "value": 28.685715,
              "category": 7
            },
            {
              "id": "70",
              "name": "Claquesous",
              "symbolSize": 19.12381,
              "x": 137.3717,
              "y": -410.2809,
              "value": 28.685715,
              "category": 7
            },
            {
              "id": "71",
              "name": "Montparnasse",
              "symbolSize": 17.295237333333333,
              "x": 234.87747,
              "y": -400.85983,
              "value": 25.942856,
              "category": 7
            },
            {
              "id": "72",
              "name": "Toussaint",
              "symbolSize": 6.323809333333333,
              "x": 40.942253,
              "y": 113.78272,
              "value": 9.485714,
              "category": 1
            },
            {
              "id": "73",
              "name": "Child1",
              "symbolSize": 4.495239333333333,
              "x": 437.939,
              "y": 291.58234,
              "value": 6.742859,
              "category": 8
            },
            {
              "id": "74",
              "name": "Child2",
              "symbolSize": 4.495239333333333,
              "x": 466.04922,
              "y": 283.3606,
              "value": 6.742859,
              "category": 8
            },
            {
              "id": "75",
              "name": "Brujon",
              "symbolSize": 13.638097333333334,
              "x": 238.79364,
              "y": -314.06345,
              "value": 20.457146,
              "category": 7
            },
            {
              "id": "76",
              "name": "MmeHucheloup",
              "symbolSize": 13.638097333333334,
              "x": 712.18353,
              "y": 4.8131495,
              "value": 20.457146,
              "category": 8
            }
          ],
          "links": [
            {
              "source": "1",
              "target": "0"
            },
            {
              "source": "2",
              "target": "0"
            },
            {
              "source": "3",
              "target": "0"
            },
            {
              "source": "3",
              "target": "2"
            },
            {
              "source": "4",
              "target": "0"
            },
            {
              "source": "5",
              "target": "0"
            },
            {
              "source": "6",
              "target": "0"
            },
            {
              "source": "7",
              "target": "0"
            },
            {
              "source": "8",
              "target": "0"
            },
            {
              "source": "9",
              "target": "0"
            },
            {
              "source": "11",
              "target": "0"
            },
            {
              "source": "11",
              "target": "2"
            },
            {
              "source": "11",
              "target": "3"
            },
            {
              "source": "11",
              "target": "10"
            },
            {
              "source": "12",
              "target": "11"
            },
            {
              "source": "13",
              "target": "11"
            },
            {
              "source": "14",
              "target": "11"
            },
            {
              "source": "15",
              "target": "11"
            },
            {
              "source": "17",
              "target": "16"
            },
            {
              "source": "18",
              "target": "16"
            },
            {
              "source": "18",
              "target": "17"
            },
            {
              "source": "19",
              "target": "16"
            },
            {
              "source": "19",
              "target": "17"
            },
            {
              "source": "19",
              "target": "18"
            },
            {
              "source": "20",
              "target": "16"
            },
            {
              "source": "20",
              "target": "17"
            },
            {
              "source": "20",
              "target": "18"
            },
            {
              "source": "20",
              "target": "19"
            },
            {
              "source": "21",
              "target": "16"
            },
            {
              "source": "21",
              "target": "17"
            },
            {
              "source": "21",
              "target": "18"
            },
            {
              "source": "21",
              "target": "19"
            },
            {
              "source": "21",
              "target": "20"
            },
            {
              "source": "22",
              "target": "16"
            },
            {
              "source": "22",
              "target": "17"
            },
            {
              "source": "22",
              "target": "18"
            },
            {
              "source": "22",
              "target": "19"
            },
            {
              "source": "22",
              "target": "20"
            },
            {
              "source": "22",
              "target": "21"
            },
            {
              "source": "23",
              "target": "11"
            },
            {
              "source": "23",
              "target": "12"
            },
            {
              "source": "23",
              "target": "16"
            },
            {
              "source": "23",
              "target": "17"
            },
            {
              "source": "23",
              "target": "18"
            },
            {
              "source": "23",
              "target": "19"
            },
            {
              "source": "23",
              "target": "20"
            },
            {
              "source": "23",
              "target": "21"
            },
            {
              "source": "23",
              "target": "22"
            },
            {
              "source": "24",
              "target": "11"
            },
            {
              "source": "24",
              "target": "23"
            },
            {
              "source": "25",
              "target": "11"
            },
            {
              "source": "25",
              "target": "23"
            },
            {
              "source": "25",
              "target": "24"
            },
            {
              "source": "26",
              "target": "11"
            },
            {
              "source": "26",
              "target": "16"
            },
            {
              "source": "26",
              "target": "24"
            },
            {
              "source": "26",
              "target": "25"
            },
            {
              "source": "27",
              "target": "11"
            },
            {
              "source": "27",
              "target": "23"
            },
            {
              "source": "27",
              "target": "24"
            },
            {
              "source": "27",
              "target": "25"
            },
            {
              "source": "27",
              "target": "26"
            },
            {
              "source": "28",
              "target": "11"
            },
            {
              "source": "28",
              "target": "27"
            },
            {
              "source": "29",
              "target": "11"
            },
            {
              "source": "29",
              "target": "23"
            },
            {
              "source": "29",
              "target": "27"
            },
            {
              "source": "30",
              "target": "23"
            },
            {
              "source": "31",
              "target": "11"
            },
            {
              "source": "31",
              "target": "23"
            },
            {
              "source": "31",
              "target": "27"
            },
            {
              "source": "31",
              "target": "30"
            },
            {
              "source": "32",
              "target": "11"
            },
            {
              "source": "33",
              "target": "11"
            },
            {
              "source": "33",
              "target": "27"
            },
            {
              "source": "34",
              "target": "11"
            },
            {
              "source": "34",
              "target": "29"
            },
            {
              "source": "35",
              "target": "11"
            },
            {
              "source": "35",
              "target": "29"
            },
            {
              "source": "35",
              "target": "34"
            },
            {
              "source": "36",
              "target": "11"
            },
            {
              "source": "36",
              "target": "29"
            },
            {
              "source": "36",
              "target": "34"
            },
            {
              "source": "36",
              "target": "35"
            },
            {
              "source": "37",
              "target": "11"
            },
            {
              "source": "37",
              "target": "29"
            },
            {
              "source": "37",
              "target": "34"
            },
            {
              "source": "37",
              "target": "35"
            },
            {
              "source": "37",
              "target": "36"
            },
            {
              "source": "38",
              "target": "11"
            },
            {
              "source": "38",
              "target": "29"
            },
            {
              "source": "38",
              "target": "34"
            },
            {
              "source": "38",
              "target": "35"
            },
            {
              "source": "38",
              "target": "36"
            },
            {
              "source": "38",
              "target": "37"
            },
            {
              "source": "39",
              "target": "25"
            },
            {
              "source": "40",
              "target": "25"
            },
            {
              "source": "41",
              "target": "24"
            },
            {
              "source": "41",
              "target": "25"
            },
            {
              "source": "42",
              "target": "24"
            },
            {
              "source": "42",
              "target": "25"
            },
            {
              "source": "42",
              "target": "41"
            },
            {
              "source": "43",
              "target": "11"
            },
            {
              "source": "43",
              "target": "26"
            },
            {
              "source": "43",
              "target": "27"
            },
            {
              "source": "44",
              "target": "11"
            },
            {
              "source": "44",
              "target": "28"
            },
            {
              "source": "45",
              "target": "28"
            },
            {
              "source": "47",
              "target": "46"
            },
            {
              "source": "48",
              "target": "11"
            },
            {
              "source": "48",
              "target": "25"
            },
            {
              "source": "48",
              "target": "27"
            },
            {
              "source": "48",
              "target": "47"
            },
            {
              "source": "49",
              "target": "11"
            },
            {
              "source": "49",
              "target": "26"
            },
            {
              "source": "50",
              "target": "24"
            },
            {
              "source": "50",
              "target": "49"
            },
            {
              "source": "51",
              "target": "11"
            },
            {
              "source": "51",
              "target": "26"
            },
            {
              "source": "51",
              "target": "49"
            },
            {
              "source": "52",
              "target": "39"
            },
            {
              "source": "52",
              "target": "51"
            },
            {
              "source": "53",
              "target": "51"
            },
            {
              "source": "54",
              "target": "26"
            },
            {
              "source": "54",
              "target": "49"
            },
            {
              "source": "54",
              "target": "51"
            },
            {
              "source": "55",
              "target": "11"
            },
            {
              "source": "55",
              "target": "16"
            },
            {
              "source": "55",
              "target": "25"
            },
            {
              "source": "55",
              "target": "26"
            },
            {
              "source": "55",
              "target": "39"
            },
            {
              "source": "55",
              "target": "41"
            },
            {
              "source": "55",
              "target": "48"
            },
            {
              "source": "55",
              "target": "49"
            },
            {
              "source": "55",
              "target": "51"
            },
            {
              "source": "55",
              "target": "54"
            },
            {
              "source": "56",
              "target": "49"
            },
            {
              "source": "56",
              "target": "55"
            },
            {
              "source": "57",
              "target": "41"
            },
            {
              "source": "57",
              "target": "48"
            },
            {
              "source": "57",
              "target": "55"
            },
            {
              "source": "58",
              "target": "11"
            },
            {
              "source": "58",
              "target": "27"
            },
            {
              "source": "58",
              "target": "48"
            },
            {
              "source": "58",
              "target": "55"
            },
            {
              "source": "58",
              "target": "57"
            },
            {
              "source": "59",
              "target": "48"
            },
            {
              "source": "59",
              "target": "55"
            },
            {
              "source": "59",
              "target": "57"
            },
            {
              "source": "59",
              "target": "58"
            },
            {
              "source": "60",
              "target": "48"
            },
            {
              "source": "60",
              "target": "58"
            },
            {
              "source": "60",
              "target": "59"
            },
            {
              "source": "61",
              "target": "48"
            },
            {
              "source": "61",
              "target": "55"
            },
            {
              "source": "61",
              "target": "57"
            },
            {
              "source": "61",
              "target": "58"
            },
            {
              "source": "61",
              "target": "59"
            },
            {
              "source": "61",
              "target": "60"
            },
            {
              "source": "62",
              "target": "41"
            },
            {
              "source": "62",
              "target": "48"
            },
            {
              "source": "62",
              "target": "55"
            },
            {
              "source": "62",
              "target": "57"
            },
            {
              "source": "62",
              "target": "58"
            },
            {
              "source": "62",
              "target": "59"
            },
            {
              "source": "62",
              "target": "60"
            },
            {
              "source": "62",
              "target": "61"
            },
            {
              "source": "63",
              "target": "48"
            },
            {
              "source": "63",
              "target": "55"
            },
            {
              "source": "63",
              "target": "57"
            },
            {
              "source": "63",
              "target": "58"
            },
            {
              "source": "63",
              "target": "59"
            },
            {
              "source": "63",
              "target": "60"
            },
            {
              "source": "63",
              "target": "61"
            },
            {
              "source": "63",
              "target": "62"
            },
            {
              "source": "64",
              "target": "11"
            },
            {
              "source": "64",
              "target": "48"
            },
            {
              "source": "64",
              "target": "55"
            },
            {
              "source": "64",
              "target": "57"
            },
            {
              "source": "64",
              "target": "58"
            },
            {
              "source": "64",
              "target": "59"
            },
            {
              "source": "64",
              "target": "60"
            },
            {
              "source": "64",
              "target": "61"
            },
            {
              "source": "64",
              "target": "62"
            },
            {
              "source": "64",
              "target": "63"
            },
            {
              "source": "65",
              "target": "48"
            },
            {
              "source": "65",
              "target": "55"
            },
            {
              "source": "65",
              "target": "57"
            },
            {
              "source": "65",
              "target": "58"
            },
            {
              "source": "65",
              "target": "59"
            },
            {
              "source": "65",
              "target": "60"
            },
            {
              "source": "65",
              "target": "61"
            },
            {
              "source": "65",
              "target": "62"
            },
            {
              "source": "65",
              "target": "63"
            },
            {
              "source": "65",
              "target": "64"
            },
            {
              "source": "66",
              "target": "48"
            },
            {
              "source": "66",
              "target": "58"
            },
            {
              "source": "66",
              "target": "59"
            },
            {
              "source": "66",
              "target": "60"
            },
            {
              "source": "66",
              "target": "61"
            },
            {
              "source": "66",
              "target": "62"
            },
            {
              "source": "66",
              "target": "63"
            },
            {
              "source": "66",
              "target": "64"
            },
            {
              "source": "66",
              "target": "65"
            },
            {
              "source": "67",
              "target": "57"
            },
            {
              "source": "68",
              "target": "11"
            },
            {
              "source": "68",
              "target": "24"
            },
            {
              "source": "68",
              "target": "25"
            },
            {
              "source": "68",
              "target": "27"
            },
            {
              "source": "68",
              "target": "41"
            },
            {
              "source": "68",
              "target": "48"
            },
            {
              "source": "69",
              "target": "11"
            },
            {
              "source": "69",
              "target": "24"
            },
            {
              "source": "69",
              "target": "25"
            },
            {
              "source": "69",
              "target": "27"
            },
            {
              "source": "69",
              "target": "41"
            },
            {
              "source": "69",
              "target": "48"
            },
            {
              "source": "69",
              "target": "68"
            },
            {
              "source": "70",
              "target": "11"
            },
            {
              "source": "70",
              "target": "24"
            },
            {
              "source": "70",
              "target": "25"
            },
            {
              "source": "70",
              "target": "27"
            },
            {
              "source": "70",
              "target": "41"
            },
            {
              "source": "70",
              "target": "58"
            },
            {
              "source": "70",
              "target": "68"
            },
            {
              "source": "70",
              "target": "69"
            },
            {
              "source": "71",
              "target": "11"
            },
            {
              "source": "71",
              "target": "25"
            },
            {
              "source": "71",
              "target": "27"
            },
            {
              "source": "71",
              "target": "41"
            },
            {
              "source": "71",
              "target": "48"
            },
            {
              "source": "71",
              "target": "68"
            },
            {
              "source": "71",
              "target": "69"
            },
            {
              "source": "71",
              "target": "70"
            },
            {
              "source": "72",
              "target": "11"
            },
            {
              "source": "72",
              "target": "26"
            },
            {
              "source": "72",
              "target": "27"
            },
            {
              "source": "73",
              "target": "48"
            },
            {
              "source": "74",
              "target": "48"
            },
            {
              "source": "74",
              "target": "73"
            },
            {
              "source": "75",
              "target": "25"
            },
            {
              "source": "75",
              "target": "41"
            },
            {
              "source": "75",
              "target": "48"
            },
            {
              "source": "75",
              "target": "68"
            },
            {
              "source": "75",
              "target": "69"
            },
            {
              "source": "75",
              "target": "70"
            },
            {
              "source": "75",
              "target": "71"
            },
            {
              "source": "76",
              "target": "48"
            },
            {
              "source": "76",
              "target": "58"
            },
            {
              "source": "76",
              "target": "62"
            },
            {
              "source": "76",
              "target": "63"
            },
            {
              "source": "76",
              "target": "64"
            },
            {
              "source": "76",
              "target": "65"
            },
            {
              "source": "76",
              "target": "66"
            }
          ],
          "categories": [
            {
              "name": "A"
            },
            {
              "name": "B"
            },
            {
              "name": "C"
            },
            {
              "name": "D"
            },
            {
              "name": "E"
            },
            {
              "name": "F"
            },
            {
              "name": "G"
            },
            {
              "name": "H"
            },
            {
              "name": "I"
            }
          ]
        }
      }
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
        console.log('chart:',res)
        this.charts = res.charts
      })
    },
    initDetailInfo() {
      console.log('initDetail:')
      const data = new FormData()
      let institutionID = this.$route.params.institutionID
      data.append("institutionId", institutionID);
      data.append("scholarNum", 50)
      request('POST', "/api/PortalManager/detailInfo/",data)
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
      this.$router.push({path:'/scholar', query: {id: id}})
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
      console.log("display:",graph)
      this.graphDialog = true
      this.chartTitle = title
      setTimeout(() => {
        var myChart = this.$echarts.init(this.$refs.graphchart)
        let option = {
          tooltip: {
          },
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
}

.top-right {
  z-index: 0;
  margin-top: 10vh;
  margin-left: 2vw;
  width: 30vw;
}

.institution-name {
  font-size: 32px;
  font-weight: bold;
}

.institution-charts {
  display: flex;
  flex-wrap: wrap;
  margin-top: 5vh;
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
  margin-top: 6vh;
  font-size: 24px;
  width: 100%;
  height: 53px;
  line-height: 53px;
  display: flex;
  justify-content: center;
}

.institution-info-card {
  height: 50vh;
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
  font-size: 34px;
  text-align: center;
}

.tab-name .v-icon {
  font-size: 40px;
}

.tab-data {
  width: 58%;
  color: #0274b3;
  font-size: 34px;
  text-align: center;
}
</style>
