<template>
  <div ref="chart" style="width: 900px; height: 700px"></div>
</template>

<script>
import * as echarts from "echarts";
import { EventBus } from "./eventBus.js";
export default {
  name: "ChartComponent",
  data() {
    return {
      myChart: null,
      fieldNameForHfmj: "",
      fieldNameForHftb: "",
      fieldNameForHfbili: "",
    };
  },
  mounted() {
    this.initChart();
    EventBus.$on("rowdataUploaded2", (uploadedData) => {
      console.log(uploadedData, "uploadedData");
      const data = JSON.parse(JSON.stringify(uploadedData.data));

      const getCityData = (data, index) => {
        if (data["市"] && Array.isArray(data["市"])) {
          return data["市"].length > index ? data["市"][index] : data["市"][0];
        }
        return null;
      };

      if (uploadedData.clickedButton === "面积") {
        const cityData = getCityData(data, 1);
        if (cityData) {
          this.fieldNameForHfmj = "总体合法面积";
          this.fieldNameForHftb = "总体违法面积";
          const countyNames = [cityData.city];
          const hfmjData = [cityData["总体合法面积"]];
          const hftbData = [cityData["总体违法面积"]];
          this.updateChartData(countyNames, hfmjData, hftbData);
        } else {
          console.error("数据结构不符合预期或‘市’数据不存在");
        }
      } else if (uploadedData.clickedButton === "比例") {
        const cityData = getCityData(data, 1);
        if (cityData) {
          this.fieldNameForHfmj = "总体合法比例";
          this.fieldNameForHftb = "总体违法比例";
          const countyNames = [cityData.city];
          const hfmjData = [this.parsePercentage(cityData["总体合法比例"])];
          const hftbData = [this.parsePercentage(cityData["总体违法比例"])];
          this.updateChartData(countyNames, hfmjData, hftbData);
        } else {
          console.error("数据结构不符合预期或‘市’数据不存在");
        }
      } else if (uploadedData.clickedButton === "图斑数") {
        const cityData = getCityData(data, 1);
        if (cityData) {
          this.fieldNameForHfmj = "总体违法图斑数";
          this.fieldNameForHftb = "总体合法图斑数";
          const countyNames = [cityData.city];
          const hfmjData = [this.parsePercentage(cityData["总体违法图斑数"])];
          const hftbData = [this.parsePercentage(cityData["总体合法图斑数"])];
          this.updateChartData(countyNames, hfmjData, hftbData);
        } else {
          console.error("数据结构不符合预期或‘市’数据不存在");
        }
      }
    });
  },
  methods: {
    parsePercentage(percentageString) {
      if (typeof percentageString === "string") {
        return parseFloat(percentageString.replace("%", ""));
      }
      return percentageString;
    },
    updateChartData(countyNames, hfmjData, hftbData) {
      const pieSeriesData = [
        {
          value: hfmjData,
          name: this.fieldNameForHfmj,
        },
        {
          value: hftbData,
          name: this.fieldNameForHftb,
        },
      ];

      // 更新饼图数据
      this.myChart.setOption({
        legend: {
          // 更新图例数据
          data: pieSeriesData.map((item) => item.name),
        },
        series: [
          {
            name: countyNames,
            type: "pie",
            radius: "50%",
            data: pieSeriesData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
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
            data: [],
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