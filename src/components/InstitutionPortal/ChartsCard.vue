<template>
  <div class="institution-chart-card">
    <v-card height="45vh" width="30vw"  elevation="2" @click="nani">
      <div>{{ title }}</div>
      <div :id='"charts-"+ id' style="height: 100%; width: 100%; cursor: pointer"></div>
    </v-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'


export default {
  name: "ChartsCard",
  props: {
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
    data: {
      type: Array,
      default (){
        return []
      }
    }
  },

  mounted() {
    this.initEcharts()
  },

  methods: {
    nani() {
      console.log("114514")
    },
    initEcharts() {
      console.log("fuck")
      let chartDom = document.getElementById('charts-' + this.id);
      let myChart = echarts.init(chartDom);
      let option;
      let x = this.xAxis
      let d = this.data

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
  margin-top: 2vh;
  cursor: pointer;
}

</style>
