<template>
  <div class="relation-map-box">
    <div ref="myChart" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script>

export default {
  name: "RelationMap",
  mounted() {
    this.setChart();
  },
  methods: {
    setChart() {
      var myChart = this.$echarts.init(this.$refs.myChart)
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
        }
      myChart.setOption(option);
    }
  }
}
</script>

<style scoped>
.relation-map-box {
  background-color: #ffffff;
  width: 80vh;
  height: 50vh;
  box-shadow: 0 2px 10px rgb(0 0 0 / 10%);
  border-radius: 4px;
  margin-left: 10vh;
}
</style>