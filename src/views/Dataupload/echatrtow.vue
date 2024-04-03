<template>
    <div ref="chart" style="width: 800px; height: 800px"></div>
  </template>
  
  <script>
  import * as echarts from "echarts";
  export default {
    name: "ChartComponent",
    data() {
      return {
        myChart: null, // 用于存储图表实例
      };
    },
    mounted() {
      this.initChart();
    },
    methods: {
      initChart() {
        this.myChart = echarts.init(this.$refs.chart);
        const option = {
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
                { value: 735, name: "Direct" },
                { value: 580, name: "Email" },
                { value: 484, name: "Union Ads" },
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
        this.myChart.setOption(option);
      },
    },
    beforeDestroy() {
      if (this.myChart) {
        this.myChart.dispose();
      }
    },
  };
  </script>
  
  <style>
  </style>