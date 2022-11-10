<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-btn color="primary">hello</v-btn>
    <div mx-auto>
      <div id="echarts" :style="{ width: '60vw', height: '40vh' }" class="mx-auto"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    name: 'AboutView',  
    data(){
      return{
      }
    },
    methods:{
      initEcharts(){
        var chartDom = document.getElementById('echarts');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [120, 200, 150, 80, 70, 110, 130],
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              }
            }
          ]
        };

        option && myChart.setOption(option);
},

},
mounted(){
  this.initEcharts();
  
}
  }
</script>