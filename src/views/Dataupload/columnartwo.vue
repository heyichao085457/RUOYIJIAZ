<template>
  <div ref="chart" style="width: 900px; height: 700px"></div>
</template>
  
  <script>
import * as echarts from "echarts";
import { EventBus } from "./eventBus.js";
export default {
  name: "BarChart",
  props: ["fetchedData"],
  data() {
    return {
      chart: null,
      counties: [],
      hfmjData: [],
      hftbData: [],
      hfmjDatali: [],
      hfmjDatawzg: [],
      fieldNameForHfmj: "",
      fieldNameForHftb: "",
      fieldNamehfmjDatali: "",
      fieldNameli: "",
      wzg: "",
      wfz: "",
      wfzy: "",
      hfmjDataliwfz: [],
      hfmjDataliwfzy: [],
      fieldNameForHftbgg: "",
      gghftbData: [],
      gghftbDataqt: [],
      gghftbDatasf: [],
      gghftbDatagk: [],
      gghftbDatasy: [],
      wfzyt: "",
    };
  },
  mounted() {
    this.createChart();
    EventBus.$on("rowdataUploaded", (uploadedData) => {
      const data = JSON.parse(JSON.stringify(uploadedData.data));
      console.log(uploadedData, "999");
      if (
        uploadedData.row == "实际用途统计表" &&
        uploadedData.clickedButton == "比例"
      ) {
        this.fieldNameForHfmj = [];
        this.fieldNameForHftb = [];
        this.fieldNameli = [];
        this.wzg = [];
        this.wfz = [];
        this.wfzy = [];
        const countyNames = data["区县"].map((item) => item.county);
        const hfmjData = data["区县"].map((item) =>
          this.parsePercentage(item.交通运输用地耕地面积比例)
        );
        const hftbData = data["区县"].map((item) =>
          this.parsePercentage(item.住宅用地耕地面积比例)
        );

        const gghftbData = data["区县"].map((item) =>
          this.parsePercentage(item.公共管理与公共服务用地耕地面积比例)
        );
        const gghftbDataqt = data["区县"].map((item) =>
          this.parsePercentage(item.水域及水利设施用地耕地面积比例)
        );
        const gghftbDatasf = data["区县"].map((item) =>
          this.parsePercentage(item.商服用地耕地面积比例)
        );
        const gghftbDatagk = data["区县"].map((item) =>
          this.parsePercentage(item.工矿仓储用地耕地面积比例)
        );

        this.fieldNameForHfmj = "交通运输用地";
        this.fieldNameForHftb = "住宅用地耕";
        this.fieldNameli = "公共管理与公共服务用地";
        this.wzg = "水域及水利设施用地";
        this.wfz = "商服用地";
        this.wfzy = "工矿仓储用地";

        this.updateChartData(
          countyNames,
          hfmjData,
          hftbData,
          gghftbData,
          gghftbDataqt,
          gghftbDatasf,
          gghftbDatagk
        );
      } else if (
        uploadedData.row == "实际用途统计表" &&
        uploadedData.clickedButton == "面积"
      ) {
        this.fieldNameForHfmj = [];
        this.fieldNameForHftb = [];
        this.fieldNameli = [];
        this.wzg = [];
        this.wfz = [];
        this.wfzy = [];
        const countyNames = data["区县"].map((item) => item.county);
        const hfmjData = data["区县"].map((item) => item.交通运输用地耕地面积);
        const hftbData = data["区县"].map((item) => item.住宅用地耕地面积);
        const gghftbData = data["区县"].map(
          (item) => item.公共管理与公共服务用地耕地面积
        );
        const gghftbDataqt = data["区县"].map(
          (item) => item.水域及水利设施用地耕地面积
        );
        const gghftbDatasf = data["区县"].map((item) => item.商服用地耕地面积);
        const gghftbDatagk = data["区县"].map(
          (item) => item.工矿仓储用地耕地面积
        );

        this.fieldNameForHfmj = "交通运输用地耕地面积";
        this.fieldNameForHftb = "住宅用地耕地面积";
        this.fieldNameli = "公共管理与公共服务用地";
        this.wzg = "水域及水利设施用地";
        this.wfz = "商服用地耕地面积";
        this.wfzy = "工矿仓储用地";

        this.updateChartData(
          countyNames,
          hfmjData,
          hftbData,
          gghftbData,
          gghftbDataqt,
          gghftbDatasf,
          gghftbDatagk
        );
      } else if (
        uploadedData.row === "实际用途统计表" &&
        uploadedData.clickedButton === "图斑数"
      ) {
        this.fieldNameForHfmj = [];
        this.fieldNameForHftb = [];
        this.fieldNameli = [];
        this.wzg = [];
        this.wfz = [];
        this.wfzy = [];
        const countyNames = data["区县"].map((item) => item.county);
        const hfmjData = data["区县"].map((item) => item.交通运输用地图斑数);
        const hftbData = data["区县"].map((item) => item.住宅用地图斑数);
        const gghftbData = data["区县"].map(
          (item) => item.公共管理与公共服务用地图斑数
        );
        const gghftbDataqt = data["区县"].map(
          (item) => item.水域及水利设施用地图斑数
        );
        const gghftbDatasf = data["区县"].map((item) => item.商服用地图斑数);
        const gghftbDatagk = data["区县"].map(
          (item) => item.工矿仓储用地图斑数
        );

        this.fieldNameForHfmj = "交通运输图斑数";
        this.fieldNameForHftb = "住宅用地";
        this.fieldNameli = "公共管理与公共服务";
        this.wzg = "水域及水利设施";
        this.wfz = "商服用地";
        this.wfzy = "工矿仓储用地";

        this.updateChartData(
          countyNames,
          hfmjData,
          hftbData,
          gghftbData,
          gghftbDataqt,
          gghftbDatasf,
          gghftbDatagk
        );
      } else {
        if (uploadedData.clickedButton === "面积") {
          this.fieldNameForHfmj = [];
          this.fieldNameForHftb = [];
          this.fieldNameli = [];
          this.wzg = [];
          this.wfz = [];
          this.wfzy = [];
          if (data["区县"] && Array.isArray(data["区县"])) {
            const countyNames = data["区县"].map((item) => item.county);
            const hfmjData = data["区县"].map((item) => item.合法面积);
            const hftbData = data["区县"].map((item) => item.违法面积);
            this.fieldNameForHfmj = "合法面积";
            this.fieldNameForHftb = "违法面积";
            this.updateChartData(countyNames, hfmjData, hftbData);
          } else {
            console.error("数据结构不符合预期或‘区县’数据不存在");
          }
        } else if (uploadedData.clickedButton === "图斑数") {
          this.fieldNameForHfmj = [];
          this.fieldNameForHftb = [];
          this.fieldNameli = [];
          this.wzg = [];
          this.wfz = [];
          this.wfzy = [];
          if (data["区县"] && Array.isArray(data["区县"])) {
            const countyNames = data["区县"].map((item) => item.county);
            const hfmjData = data["区县"].map((item) => item.合法图斑数);
            const hftbData = data["区县"].map((item) => item.违法图斑数);
            console.log(hfmjData, hftbData);
            this.fieldNameForHfmj = "合法图斑数";
            this.fieldNameForHftb = "违法图斑数";
            this.updateChartData(countyNames, hfmjData, hftbData);
          } else {
            console.error("数据结构不符合预期或‘区县’数据不存在");
          }
        } else if (uploadedData.clickedButton === "比例") {
          this.fieldNameForHfmj = [];
          this.fieldNameForHftb = [];
          this.fieldNameli = [];
          this.wzg = [];
          this.wfz = [];
          this.wfzy = [];
          if (data["区县"] && Array.isArray(data["区县"])) {
            const countyNames = data["区县"].map((item) => item.county);
            const hfmjData = data["区县"].map((item) =>
              this.parsePercentage(
                item.扣减后违法占用耕地面积占新增建设用地占用耕地面积比例
              )
            );
            const hftbData = data["区县"].map((item) =>
              this.parsePercentage(
                item.扣减后违法占用面积占新增建设用地占用面积比例
              )
            );
            const hfmjDatali = data["区县"].map((item) =>
              this.parsePercentage(item.未整改监测面积占违法监测面积比例)
            );
            const hfmjDatawzg = data["区县"].map((item) =>
              this.parsePercentage(item.未整改耕地面积占违法耕地面积比例)
            );
            const hfmjDataliwfz = data["区县"].map((item) =>
              this.parsePercentage(
                item.违法占地面积占新增建设用地占用面积的比例
              )
            );
            const hfmjDataliwfzy = data["区县"].map((item) =>
              this.parsePercentage(
                item.违法占用耕地面积占新增建设用地占用耕地面积比例
              )
            );

            this.fieldNameForHfmj =
              "扣减后违法占用耕地面积占新增建设用地占用耕地面积比例";
            this.fieldNameForHftb =
              "扣减后违法占用面积占新增建设用地占用面积比例";
            this.fieldNameli = "未整改监测面积占违法监测面积比例";
            this.wzg = "未整改耕地面积占违法耕地面积比例";
            this.wfz = "违法占地面积占新增建设用地占用面积的比例";
            this.wfzy = "违法占用耕地面积占新增建设用地占用耕地面积比例";

            this.updateChartData(
              countyNames,
              hfmjData,
              hftbData,
              hfmjDatali,
              hfmjDatawzg,
              hfmjDataliwfz,
              hfmjDataliwfzy
            );
          } else {
            console.error("数据结构不符合预期或‘区县’数据不存在");
          }
        }
      }
    });
  },
  beforeDestroy() {
    EventBus.$off("dataUploaded");
  },
  methods: {
    getShortName(name) {
      return name.length > 8 ? `${name.substring(0, 8)}...` : name;
    },
    parsePercentage(percentageStrings) {
      if (typeof percentageStrings === "string") {
        const parsedValue = parseFloat(percentageStrings.replace("%", ""));
        return parsedValue;
      }
      return percentageStrings;
    },
    updateChartData(
      data,
      hfmjData,
      hftbData,
      hfmjDatali,
      hfmjDatawzg,
      hfmjDataliwfz,
      hfmjDataliwfzy,
      gghftbData,
      gghftbDataqt,
      gghftbDatasf,
      gghftbDatagk
    ) {
      this.counties = data;
      this.hfmjData = hfmjData;
      this.hftbData = hftbData;
      this.hfmjDatali = hfmjDatali;
      this.hfmjDatawzg = hfmjDatawzg;
      this.hfmjDataliwfz = hfmjDataliwfz;
      this.hfmjDataliwfzy = hfmjDataliwfzy;
      this.gghftbData = gghftbData;
      this.gghftbDataqt = gghftbDataqt;
      this.gghftbDatasf = gghftbDatasf;
      this.gghftbDatagk = gghftbDatagk;
      // this.gghftbDatasy = gghftbDatasy;
      if (this.chart) {
        this.chart.setOption(
          {
            xAxis: {
              data: this.counties,
            },

            series: [
              {
                name: this.getShortName(this.fieldNameForHfmj),
                type: "bar",
                data: this.hfmjData,
              },
              {
                name: this.getShortName(this.fieldNameForHftb),
                type: "bar",
                data: this.hftbData,
              },
              {
                name: this.getShortName(this.fieldNameli),
                type: "bar",
                data: hfmjDatali,
              },
              {
                name: this.getShortName(this.wzg),
                type: "bar",
                data: this.hfmjDatawzg,
              },
              {
                name: this.getShortName(this.wfz),
                type: "bar",
                data: this.hfmjDataliwfz,
              },
              {
                name: this.getShortName(this.wfzy),
                type: "bar",
                data: this.hfmjDataliwfzy,
              },
              {
                name: this.getShortName(this.fieldNameli),
                type: "bar",
                data: this.gghftbData,
              },
              {
                name: this.getShortName(this.wzg),
                type: "bar",
                data: this.gghftbDataqt,
              },
              {
                name: this.getShortName(this.wfz),
                type: "bar",
                data: this.gghftbDatasf,
              },
              {
                name: this.getShortName(this.wfzy),
                type: "bar",
                data: this.gghftbDatagk,
              },
            ],
          },
          true
        );
      } else {
        this.createChart();
      }
    },

    createChart() {
      const chartDom = this.$refs.chart;
      const myChart = echarts.init(chartDom);
      const rawData = [
        [100, 302, 301, 334, 390, 330, 320],
        [320, 132, 101, 134, 90, 230, 210],
        [220, 182, 191, 234, 290, 330, 310],
        [150, 212, 201, 154, 190, 330, 410],
        [820, 832, 901, 934, 1290, 1330, 1320],
      ];

      const totalData = [];
      for (let i = 0; i < rawData[0].length; ++i) {
        let sum = 0;
        for (let j = 0; j < rawData.length; ++j) {
          sum += rawData[j][i];
        }
        totalData.push(sum);
      }

      const grid = {
        left: 100,
        right: 100,
        top: 50,
        bottom: 50,
      };

      // const series = ["Direct", "Affiliate"].map((name, sid) => {
      //   return {
      //     name,
      //     type: "bar",
      //     stack: "total",
      //     barWidth: "60%",
      //     label: {
      //       show: true,
      //       formatter: (params) => Math.round(params.value * 1000) / 10 + "%",
      //     },
      //     data: rawData[sid].map((d, did) =>
      //       totalData[did] <= 0 ? 0 : d / totalData[did]
      //     ),
      //   };
      // });

      const option = {
        legend: {
          selectedMode: false,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: function (params) {
            let result = params[0].name + "<br>";
            params.forEach(function (item) {
              const color = item.color;
              result +=
                '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:' +
                color +
                ';"></span>' +
                '<span style="color:' +
                color +
                ';">' +
                item.seriesName +
                ": " +
                " (" +
                Math.round(item.value) +
                ")</span><br>";
            });
            return result;
          },
        },
        grid,

        yAxis: {
          type: "value",
        },
        xAxis: {
          type: "category",
          data: this.counties,
        },
        series: [
          {
            name: this.getShortName(this.fieldNameForHfmj),
            type: "bar",
            data: this.hfmjData,
            stack: "总量",
          },
          {
            name: this.getShortName(this.fieldNameForHftb),
            type: "bar",
            data: this.hftbData,
            stack: "总量",
          },
          {
            name: this.getShortName(this.fieldNameli),
            type: "bar",
            data: this.hfmjDatali,
            stack: "总量",
          },
          {
            name: this.getShortName(this.wzg),
            type: "bar",
            data: this.hfmjDatawzg,
            stack: "总量",
          },
          {
            name: this.getShortName(this.wfz),
            type: "bar",
            data: this.hfmjDataliwfz,
            stack: "总量",
          },
          {
            name: this.getShortName(this.wfzy),
            type: "bar",
            data: this.hfmjDataliwfzy,
            stack: "总量",
          },
          {
            name: this.getShortName(this.fieldNameForHftbgg),
            type: "bar",
            data: this.gghftbData,
            stack: "总量",
          },
        ],
      };
      option && myChart.setOption(option);
    },
  },
};
</script>
  
<style>
</style>
  
  
  