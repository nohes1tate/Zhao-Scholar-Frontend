<template>
  <div class="institution-chart-card">
    <v-card height="45vh" width="30vw" elevation="2" @click="showChart" v-if="chartType === 1">
      <div>{{ title }}</div>
      <div :id='"charts-"+ id' style="height: 100%; width: 100%; cursor: pointer"></div>
    </v-card>
    <v-card height="45vh" width="30vw" elevation="2" v-else>
      <div>{{ title }}</div>
      <div ref="insRelation" style="width: 100%; height: 40vh; cursor: pointer"></div>
    </v-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'


export default {
  name: "ChartsCard",
  props: {
    chartType: {
      type: Number,
      default: 1
    },
    title: {
      type: String,
      default: ""
    },
    id: {
      type: Number,
      default: -1
    },
    xAxis: {
      type: Array,
      default (){
        return []
      }
    },
    yData: {
      type: Array,
      default (){
        return []
      }
    },
    graph: {
      type: Object,
      default () {
        return null
      }
    }
  },

  mounted() {
    if (this.chartType===1)
      this.initEcharts()
    else {
      this.initRelation()
    }
  },

  methods: {
    showChart() {
      this.$emit("showChart",this.xAxis, this.yData, this.title)
    },
    initRelation() {
      var myChart = this.$echarts.init(this.$refs.insRelation)
      var option = {
        tooltip: {},
        legend: [
          {
            data: this.graph.categories.map(function (a) {
              return a.name;
            })
          }
        ],
        series: [
          {
            type: 'graph',
            layout: 'none',
            data: this.graph.nodes,
            links: this.graph.links,
            categories: this.graph.categories,
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
    },
    initEcharts() {
      let chartDom = document.getElementById('charts-' + this.id);
      let myChart = echarts.init(chartDom);
      let option;
      let x = this.xAxis
      let d = this.yData

      option = {
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
        ]
      };

      option && myChart.setOption(option);
    }
  }
}
</script>

<style scoped>
.institution-chart-card {
  margin-left: 2vw;
  margin-top: 3vh;
  cursor: pointer;
}

</style>
