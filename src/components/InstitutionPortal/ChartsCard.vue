<template>
  <div class="institution-chart-card">
    <v-card height="45vh" width="30vw" elevation="2" @click="showChart" v-if="chartType === 1">
      <div>{{ title }}{{chartType}}</div>
      <div :id='"charts-"+ id' style="height: 100%; width: 100%; cursor: pointer"></div>
    </v-card>
    <v-card height="45vh" width="30vw" elevation="2" @click="showGraph" v-else>
      <div ref="insRelation" style="width: 100%; height: 100%; cursor: pointer"></div>
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

  },
  watch: {
    graph(newVal, oldVal){
       console.log('update graph',newVal, oldVal)
         setTimeout(() => {
           this.initRelation()
         }, 500)
    },
    yData(newVal, oldVal){
      // console.log('update yData',newVal, oldVal)
        this.initEcharts()
    }
  },
  methods: {
    showGraph() {
      this.$emit("showGraph",this.graph,"学者关系网络")
    },
    showChart() {
      this.$emit("showChart",this.xAxis, this.yData, this.title)
    },
    initRelation() {
      let myChart = this.$echarts.init(this.$refs.insRelation)
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
