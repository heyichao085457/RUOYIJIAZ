<template>
  <div ref="chart" style="width: 800px; height: 700px"></div>
</template>
  
<script>
import * as echarts from "echarts";
import { EventBus } from "./eventBus.js";
export default {
  name: "MyChart",
  mounted() {
    this.initChart();
    EventBus.$on("dataUploaded2", (uploadedData) => {
      console.log(uploadedData);
    });
  },

  methods: {
    initChart() {
      var chartDom = this.$refs.chart;
      var myChart = echarts.init(chartDom);
      var option = {
        title: {
          text: "Referer of a Website",
          subtext: "Fake Data",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      myChart.setOption(option);
    },
  },
};
</script>