<template>
  <div ref="chartContainer" style="width: 900px; height: 760px"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "MyEChartsComponent",
  data() {
    return {};
  },

  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      const chartDom = this.$refs.chartContainer;
      const myChart = echarts.init(chartDom);
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 200, 334, 390, 330, 220],
          },
        ],
      };

      myChart.setOption(option);
    },
  },
};
</script>

<style>
</style>