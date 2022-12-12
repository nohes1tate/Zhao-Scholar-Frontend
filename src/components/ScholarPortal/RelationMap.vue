<template>
  <div class="relation-map-box">
    <div ref="myChart" style="width: 100%; height: 100%" @click="displayChart"></div>
    <v-dialog
        v-model="showDialog"
        width="60vw"
        height="90vh"
        style="overflow: hidden"
    >
      <v-card style="height: 80vh">
        <div ref="bigChart" style="height: 75vh; width: 55vw; cursor: pointer"></div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>



import request from "@/utils/request";

export default {
  name: "RelationMap",
  mounted() {
    let data = new FormData();
    data.append("scholarID", this.$route.query.id);
    request("POST", "/api/PortalManager/getScholarMap/", data)
      .then((res) => {
        console.log("relation map", res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.setChart(this.$refs.myChart)
  },
  methods: {
    setChart(chart) {
      let myChart = this.$echarts.init(chart)
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
    displayChart() {
      this.showDialog = true
      setTimeout(() => {
        this.setChart(this.$refs.bigChart)
      },50)
    },
  },
  data() {
    return {
      graph:{
        "nodes": [
          {
            "id": 0,
            "name": "Li ZZ",
            "symbolSize": 50,
            "category": 0,
            "scholarID": 10
          },
          {
            "id": 1,
            "name": "Li ZZz",
            "symbolSize": 30,
            "category": 1,
            "scholarID": 20
          },
          {
            "id": 2,
            "name": "Li ZZzz",
            "symbolSize": 10,
            "category": 2,
            "scholarID": 33
          },
          {
            "id": 3,
            "name": "Li ZZzzz",
            "symbolSize": 10,
            "category": 2,
            "scholarID": 24
          }
        ],
        "links": [
          {
            "source": 0,
            "target": 1
          },
          {
            "source": 0,
            "target": 2
          },
          {
            "source": 0,
            "target": 3
          },
          {
            "source": 1,
            "target": 2
          }
        ],
        "categories": [
          {},
          {},
          {}
        ]
      },
      showDialog: false,
    };
  },
}
</script>

<style scoped>
.relation-map-box {
  background-color: #ffffff;
  width: 80vh;
  height: 45vh;
  box-shadow: 0 2px 10px rgb(0 0 0 / 10%);
  border-radius: 4px;
  margin-left: 10vh;
}
</style>
