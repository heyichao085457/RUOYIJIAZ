<template>
  <div id="main" style="width: 1100px; height: 300px"></div>
</template>

<script>
import * as echarts from "echarts";
import { EventBus } from "../Dataupload/eventBus";
export default {
  name: "MyChart",
  data() {
    return {
      myChart: null,
      Datashul: [],
      names: [],
      quanb: "",
    };
  },
  mounted() {
    this.initChart();
  },
  created() {
    EventBus.$on("dataEvent", (data) => {
      // console.log(data, "data222");
      this.updateChartData(data);
    });
  },
  beforeDestroy() {
    EventBus.$off("dataEvent"); // 清除事件监听器
    if (this.myChart) {
      this.myChart.dispose(); // 销毁图表实例
    }
  },
  methods: {
    updateChartData(data) {
      this.quanb = [];
      this.names = [];
      if (data.item == "") {
        let shul = data.cardsert3.数量;
        this.Datashul = [
          {
            value: parseFloat(shul.hcjgczjy),
            name: "处置建议",
          },
          {
            value: parseFloat(shul.sfbcdw),
            name: "补偿到位",
          },
          {
            value: parseFloat(shul.sfcfdw),
            name: "处罚到位",
          },
          {
            value: parseFloat(shul.sfdc),
            name: "是否调查",
          },
          {
            value: parseFloat(shul.sffhgjcyzc),
            name: "国家产业政策",
          },
          {
            value: parseFloat(shul.sfja),
            name: "是否结案",
          },

          {
            value: parseFloat(shul.sflsgdzbph),
            name: "耕地占卜平衡",
          },
          {
            value: parseFloat(shul.sflszgdw),
            name: "整改到位",
          },
          {
            value: parseFloat(shul.sfmsgc),
            name: "民生工程",
          },
          {
            value: parseFloat(shul.sfsqrmfyqzzx),
            name: "法院强制执行",
          },
          {
            value: parseFloat(shul.wfxwsl),
            name: "违法行为",
          },
        ];
        this.names = this.Datashul.map((item) => item.name);
        this.quanb = this.Datashul;
      }
      if (data.item == "数量") {
        let shul = data.cardsert3[data.item];
        this.Datashul = [
          {
            value: parseFloat(shul.hcjgczjy),
            name: "处置建议",
          },
          {
            value: parseFloat(shul.sfbcdw),
            name: "补偿到位",
          },
          {
            value: parseFloat(shul.sfcfdw),
            name: "处罚到位",
          },
          {
            value: parseFloat(shul.sfdc),
            name: "是否调查",
          },
          {
            value: parseFloat(shul.sffhgjcyzc),
            name: "国家产业政策",
          },
          {
            value: parseFloat(shul.sfja),
            name: "是否结案",
          },

          {
            value: parseFloat(shul.sflsgdzbph),
            name: "耕地占卜平衡",
          },
          {
            value: parseFloat(shul.sflszgdw),
            name: "整改到位",
          },
          {
            value: parseFloat(shul.sfmsgc),
            name: "民生工程",
          },
          {
            value: parseFloat(shul.sfsqrmfyqzzx),
            name: "法院强制执行",
          },
          {
            value: parseFloat(shul.wfxwsl),
            name: "违法行为",
          },
        ];
        this.names = this.Datashul.map((item) => item.name);
        this.quanb = this.Datashul;
      } else if (data.item == "数量比例") {
        let shul = data.cardsert3[data.item];

        let Databili = [
          {
            value: parseFloat(shul.hcjgczjybl),
            name: "处置建议比例",
          },
          {
            value: parseFloat(shul.sfbcdwbl),
            name: "补偿到位比例",
          },
          {
            value: parseFloat(shul.sfcfdwbl),
            name: "处罚到位比例",
          },
          {
            value: parseFloat(shul.sfdcbl),
            name: "是否调查比例",
          },
          {
            value: parseFloat(shul.sffhgjcyzcbl),
            name: "国家产业政策比例",
          },
          {
            value: parseFloat(shul.sfjabl),
            name: "是否结案比例",
          },

          {
            value: parseFloat(shul.sflsgdzbphbl),
            name: "耕地占卜平衡比例",
          },
          {
            value: parseFloat(shul.sflszgdwbl),
            name: "整改到位比例",
          },
          {
            value: parseFloat(shul.sfmsgcbl),
            name: "民生工程比例",
          },
          {
            value: parseFloat(shul.sfsqrmfyqzzxbl),
            name: "法院强制执行比例",
          },
        ];
        this.names = Databili.map((item) => item.name);
        this.quanb = Databili;
      } else if (data.item == "涉嫌面积") {
        let shul = data.cardsert3[data.item];
        let Datashexian = [
          {
            value: parseFloat(shul.hcjgczjysxmj),
            name: "处置建议",
          },
          {
            value: parseFloat(shul.sfmsgcsxmj),
            name: "民生工程",
          },
          {
            value: parseFloat(shul.sflsgdzbphsxmj),
            name: "耕地占卜平衡",
          },
          {
            value: parseFloat(shul.sfbcdwsxmj),
            name: "补偿到位",
          },
          {
            value: parseFloat(shul.sffhgjcyzcsxmj),
            name: "国家产业政策",
          },
          {
            value: parseFloat(shul.sfdcsxmj),
            name: "是否调查",
          },

          {
            value: parseFloat(shul.sfsqrmfyqzzxsxmj),
            name: "法院强制执行",
          },
          {
            value: parseFloat(shul.sfjasxmj),
            name: "是否结案",
          },
          {
            value: parseFloat(shul.sfcfdwsxmj),
            name: "处罚到位",
          },
          {
            value: parseFloat(shul.sflszgdwsxmj),
            name: "整改到位",
          },
        ];
        this.names = Datashexian.map((item) => item.name);
        this.quanb = Datashexian;
      } else if (data.item == "涉嫌面积比例") {
        let shul = data.cardsert3[data.item];
        let Datashexianbili = [
          {
            value: parseFloat(shul.hcjgczjysxmjbl),
            name: "处置建议比例",
          },
          {
            value: parseFloat(shul.sfmsgcsxmjbl),
            name: "民生工程比例",
          },
          {
            value: parseFloat(shul.sflsgdzbphsxmjbl),
            name: "耕地占卜平衡比例",
          },
          {
            value: parseFloat(shul.sfbcdwsxmjbl),
            name: "补偿到位比例",
          },
          {
            value: parseFloat(shul.sffhgjcyzcsxmjbl),
            name: "国家产业政策比例",
          },
          {
            value: parseFloat(shul.sfdcsxmjbl),
            name: "是否调查比例",
          },

          {
            value: parseFloat(shul.sfsqrmfyqzzxsxmjbl),
            name: "法院强制执行比例",
          },
          {
            value: parseFloat(shul.sfjasxmjbl),
            name: "是否结案比例",
          },
          {
            value: parseFloat(shul.sfcfdwsxmjbl),
            name: "处罚到位比例",
          },
          {
            value: parseFloat(shul.sflszgdwsxmjbl),
            name: "整改到位比例",
          },
        ];
        this.names = Datashexianbili.map((item) => item.name);
        this.quanb = Datashexianbili;
      } else if (data.item == "耕地面积") {
        let shul = data.cardsert3[data.item];
        let Datagengdi = [
          {
            value: parseFloat(shul.hcjgczjyGDmj),
            name: "处置建议",
          },
          {
            value: parseFloat(shul.sfmsgcGDmj),
            name: "民生工程",
          },
          {
            value: parseFloat(shul.sflsgdzbphGDmj),
            name: "耕地占卜平衡",
          },
          {
            value: parseFloat(shul.sfbcdwGDmj),
            name: "补偿到位",
          },
          {
            value: parseFloat(shul.sffhgjcyzcGDmj),
            name: "国家产业政策",
          },
          {
            value: parseFloat(shul.sfdcGDmj),
            name: "是否调查",
          },

          {
            value: parseFloat(shul.sfsqrmfyqzzxGDmj),
            name: "法院强制执行",
          },
          {
            value: parseFloat(shul.sfjaDdmj),
            name: "是否结案",
          },
          {
            value: parseFloat(shul.sfcfdwGDmj),
            name: "处罚到位",
          },
          {
            value: parseFloat(shul.sflszgdwGDmj),
            name: "整改到位",
          },
        ];
        this.names = Datagengdi.map((item) => item.name);
        this.quanb = Datagengdi;
      } else if (data.item == "耕地面积比例") {
        let shul = data.cardsert3[data.item];
        let Datagengdibili = [
          {
            value: parseFloat(shul.hcjgczjyGdmjbl),
            name: "处置建议比例",
          },
          {
            value: parseFloat(shul.sfmsgcGdmjbl),
            name: "民生工程比例",
          },
          {
            value: parseFloat(shul.sflsgdzbphGdmjbl),
            name: "耕地占卜平衡比例",
          },
          {
            value: parseFloat(shul.sfbcdwGdmjbl),
            name: "补偿到位比例",
          },
          {
            value: parseFloat(shul.sffhgjcyzcGdmjbl),
            name: "国家产业政策比例",
          },
          {
            value: parseFloat(shul.sfdcGdmjbl),
            name: "是否调查比例",
          },

          {
            value: parseFloat(shul.sfsqrmfyqzzxGdmjbl),
            name: "法院强制执行比例",
          },
          {
            value: parseFloat(shul.sfjaGdmjbl),
            name: "是否结案比例",
          },
          {
            value: parseFloat(shul.sfcfdwGdmjbl),
            name: "处罚到位比例",
          },
          {
            value: parseFloat(shul.sflszgdwGdmjbl),
            name: "整改到位比例",
          },
        ];
        this.names = Datagengdibili.map((item) => item.name);
        this.quanb = Datagengdibili;
      }

      this.myChart.setOption({
        series: [
          {
            data: this.quanb,
            type: "line",
            name: this.names,
          },
        ],
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.names, // 预设的类别数据
          },
        ],
      });
    },
    initChart() {
      var chartDom = document.getElementById("main");
      this.myChart = echarts.init(chartDom);
      var option = {
        title: { text: "" },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "cross", label: { backgroundColor: "#6a7985" } },
        },
        legend: { data: ["Some Name"] }, // 添加图例名称
        toolbox: { feature: { saveAsImage: {} } },
        grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [], // 预设的类别数据
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              rotate: 45, // 轴标签旋转角度
            },
          },
        ],
        series: [
          {
            name: "Some Name", // 确保这个名称与 legend 和 updateChartData 中的一致
            type: "bar", // 初始不设置数据
            data: [],
            label: {
              show: true, // 显示标签
              position: "left", // 标签的位置，例如 'top'，'left'，'right'，'bottom'
              formatter: "{c}", // 标签内容格式器，'{c}' 代表当前数据值
            },
          },
        ],
      };
      this.myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
/* 你可以在这里添加一些 CSS 样式 */
</style>