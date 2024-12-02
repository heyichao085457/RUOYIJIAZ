<template>
  <div class="container">
    <div class="sellect">
      <el-form ref="form" :model="formData" label-width="80px">
        <div>
          <el-row class="title" type="flex" align="middle">
            <el-col :span="4">
              <el-select
                v-model="formData.type"
                clearable
                :style="{ width: '100%' }"
                placeholder="统计类型"
              >
                <el-option
                  v-for="item in problemTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4" :style="{ marginLeft: '10px' }">
              <el-select
                v-model="formData.idrow"
                clearable
                :style="{ width: '100%' }"
                placeholder="计算池对象名称"
              >
                <el-option
                  v-for="item in idrow"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  <span style="float: left">{{ item.label }}</span>
                  <span
                    style="float: right; color: red; cursor: pointer"
                    @click.stop="printNumber(item.value)"
                  >
                    X
                  </span>
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="1" :style="{ marginLeft: '10px' }">
              <el-button type="primary" @click="findAlllist">查询</el-button>
              <!-- <el-button type="primary" >生成报告</el-button> -->
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item>
                <div class="block">
                  <el-date-picker
                    v-model="time"
                    type="monthrange"
                    range-separator="至"
                    start-placeholder="开始月份"
                    end-placeholder="结束月份"
                  >
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col> -->
            <!-- <el-col :span="1">
              <el-button type="primary" @click="findAll2">查询</el-button>
            </el-col>
            <el-col :span="4">
              <el-select
                v-model="formData.type2"
                clearable
                :style="{ width: '100%' }"
                placeholder="统计类型"
              >
                <el-option
                  v-for="item in problemTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4" :style="{ marginLeft: '10px' }">
              <el-select
                v-model="formData.idrow2"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="item in idrow"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  <span style="float: left">{{ item.label }}</span>
                  <span
                    style="float: right; color: red; cursor: pointer"
                    @click.stop="printNumber(item.value)"
                  >
                    X
                  </span>
                </el-option>
              </el-select>
            </el-col> -->
          </el-row>
        </div>
      </el-form>
    </div>
    <div class="pole">
      <el-dialog
        title="项目清单下载"
        append-to-body
        :visible.sync="fullscreenVisible"
        modal-append-to-body
        :width="'90%'"
        class="nuiop"
      >
        <div class="table-container">
          <el-table
            class="multipleTableheight"
            ref="multipleTable"
            :data="tableData"
            height="650px"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            >
            <el-table-column type="selection"> </el-table-column>
            <el-table-column
              align="center"
              label="备注"
              prop="remarks"
              width="105"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="市名称"
              prop="city"
              width="105"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="county"
              label="县名称"
              width="105"
            >
              <template slot-scope="scope">
                <el-tooltip
                  :content="scope.row.county"
                  placement="top"
                  effect="dark"
                >
                  <div class="address-cell">
                    {{ scope.row.county }}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="startDate"
              label="开始时间"
              width="105"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="结束时间"
              prop="endDate"
              width="105"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="snapdate"
              label="数据时点日期"
              width="105"
            >
            </el-table-column>
            <el-table-column
              width="105"
              align="center"
              prop="checkJobName"
              label="核查工作名称"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="销号状态"
              prop="cancelStatus"
              width="105"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="pdlx"
              label="原判定类型"
              width="105"
            >
            </el-table-column>
            <el-table-column
              width="105"
              align="center"
              prop="checkDetermineResult"
              label="核查后判定类型"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="核查方式"
              prop="checkMethod"
              width="105"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="deductionType"
              label="扣减类型"
              width="105"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="illegalityType"
              label="违法类型"
              width="105"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="其他具体情形"
              prop="qtjtqx "
              width="105"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="最大地块面积"
              prop="freckleInfractionAreaMax "
              width="105"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="最小地块面积"
              prop="freckleInfractionAreaMin "
              width="105"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="最大耕地面积"
              prop="freckleInfractionArableMax "
              width="105"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="最小耕地面积"
              prop="freckleInfractionArableMin "
              width="105"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="最大农田面积"
              prop="freckleInfractionFarmlandMax "
              width="105"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="最小农田面积"
              prop="freckleInfractionFarmlandMin "
              width="105"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="生命周期节点"
              prop="smzqjd"
              width="105"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="审核意见"
              prop="shyj"
              width="105"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="是否问题图斑"
              prop="sfwttb"
              width="105"
            >
            </el-table-column>
            <!-- <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
                >下载</el-button
              >
            </template>
          </el-table-column> -->
          </el-table>
        </div>
        <div style="display: flex">
          <div style="width: 50%">
            <el-row class="title" type="flex" align="middle">
              <div :style="{ marginLeft: '10px' }">
                <el-button type="primary" @click="exportData"
                  ><span class="iconfont">&#xe65e;</span> 数 据 导 出</el-button
                >
              </div>
            </el-row>
          </div>
        </div>
      </el-dialog>
    </div>
    <div class="echeckop">
      <div style="width: 49%">
        <el-tabs type="border-card">
          <el-tab-pane label="总体情况">
            <div class="echarshe">
              <div @click="handleAreaClick" class="smallop">
                <el-button size="small">面积</el-button>
              </div>
              <div @click="tubanshu" class="smallop">
                <el-button size="small">图斑数</el-button>
              </div>
              <div @click="handleRatioClick" class="smallop">
                <el-button size="small">比例</el-button>
              </div>
            </div>
            <!-- <div class="Inventory">
              <el-button type="primary" @click="listrorrow"
                >计算池清单</el-button
              >
              <el-button type="primary">报告下载</el-button>
            </div> -->
            <div class="echartsi">
              <echartsio :chartData="echartsioi" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="区域统计">
            <div class="">
              <ChartComponent :chartData="fetchedDa" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div style="width: 49%">
        <el-tabs type="border-card">
          <el-tab-pane label="总体情况">
            <div class="Main" v-loading="loading">
              <vue-office-excel :src="previewUrl" @rendered="rendered" />
            </div>
            <!-- <div class="echarshe">
              <div @click="handleAreaClick2" class="smallop">
                <el-button size="small">面积</el-button>
              </div>
              <div @click="tubanshu2" class="smallop">
                <el-button size="small">图斑数</el-button>
              </div>
              <div @click="handleRatioClick2" class="smallop">
                <el-button size="small">比例</el-button>
              </div>
            </div>
            <div class="">
              <echartsiotow :chartData="ztjktwo" />
            </div> -->
          </el-tab-pane>
          <!-- <el-tab-pane label="区域统计">
            <twoeree :chartData="qytjtwo" />
          </el-tab-pane> -->
        </el-tabs>
      </div>
    </div>
    <!-- <div class="office-word" ref="targetDiv">
      <iframe
        v-if="isdocx"
        :src="previewUrl"
        style="width: 100%; height: 100%"
        frameborder="0"
      ></iframe>
    </div> -->
  </div>
</template>
  
  <script>
import {
  generateReport,
  jscList,
  tree,
  downloadlist,
  options,
  exportList,
  exportSjyt,
  computeList,
  jscId,
  deleteId2023,
} from "../../api/document/index";

import VueOfficeDocx from "@vue-office/docx";
import "@vue-office/docx/lib/index.css";
import VueOfficeExcel from "@vue-office/excel";
import "@vue-office/excel/lib/index.css";
import echartsio from "./echatr.vue";
import echartsiotow from "./echatrtow.vue";
import ChartComponent from "./columnar.vue";
import { EventBus } from "./eventBus.js";
import twoeree from "./columnartwo.vue";
export default {
  components: {
    VueOfficeExcel,
    screen,
    VueOfficeDocx,
    echartsio,
    echartsiotow,
    ChartComponent,
    twoeree,
  },
  data() {
    return {
      loading: false,
      tableData: [],
      selectedRows: [],
      ztjktwo: null,
      qytjtwo: null,
      fetchedDa: null,
      echartsioi: null,
      dialogVisible: false,
      isShow: false,
      time: [],
      xzq: [],
      selectXZQ: [],
      problemTypes: [],
      fullscreenVisible: false,
      formData: {
        type: "",
        citys: "",
        countys: "",
        endDate: "",
        startDate: "",
        idrow: "",
        type2: "",
        idrow2: "",
      },
      disabledDate: (time) => {
        if (this.selectDate == null) {
          return false;
        } else {
          return this.selectDate.getFullYear() != time.getFullYear();
        }
      },
      bg: null,
      isdocx: "false",
      isexcel: false,
      previewUrl: "",
      loadingData: null,
      DataListrow: [],
      idrow: [],
    };
  },
  watch: {
    time(newValue, oldValue) {
      if (newValue && newValue[1]) {
        let newEndDate = new Date(newValue[1]);
        newEndDate = new Date(
          newEndDate.getFullYear(),
          newEndDate.getMonth() + 1,
          0
        );
        const formattedNewEndDate = this.formatDate(newEndDate);
        if (formattedNewEndDate !== newValue[1]) {
          this.time = [newValue[0], formattedNewEndDate];
        }
      }
    },
  },
  activated() {
    this.Addlist();
  },
  mounted() {
    this.time = [
      new Date().getFullYear() + "-01-01",
      new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        new Date().getDate().toString().padStart(2, "0"),
    ];
    this.getType();
    this.getXzqhh();
    this.download();
    this.uploadFile();
    this.generateRepor();
    this.jscLis();
    this.listpsms();
    this.reportName();
    this.Addlist();
  },
  methods: {
    Addlist() {
      computeList().then((ok) => {
        this.tableData = ok.data;
      });
    },
    handleSelectionChange(selected) {
      this.selectedRows = selected;
    },
    exportData() {
      if (this.selectedRows.length === 0) {
        this.$message.warning("请至少选择一行数据进行导出");
        return;
      }
      const load = this.$loading({
        background: "rgba(0, 0, 0, 0.8)",
        lock: true,
        text: "正在下载数据请稍等...",
        target: document.querySelector(".el-main"),
      });
      const selectedIdsString = this.selectedRows
        .map((row) => row.id)
        .join(",");

      let paramse = { id: selectedIdsString };
      jscId(paramse).then((ok) => {
        let { msg, code } = ok;
        if (code === 200) {
          let link = document.createElement("a");
          link.href = msg;
          link.download = "your_filename.xlsx";
          link.setAttribute("target", "_blank");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          load.close();
        }
      });
    },
    printNumber(value) {
      deleteId2023(value).then((ok) => {
        if (ok.code == 200) {
          this.jscLis();
        }
      });
    },
    handleClose(done) {
      this.previewUrl = "";
      done();
    },
    handscope(index, row) {
      this.previewUrl = row.downloadUrl;
      this.dialogVisible = true;
    },
    download() {
      downloadlist().then((ok) => {
        this.DataListrow = ok.data;
      });
    },
    handleEdit(index, rows) {
      let link = document.createElement("a");
      link.href = rows.downloadUrl;
      link.download = "your_filename.xlsx";
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    listrorrow() {
      console.log(11111);
      this.fullscreenVisible = true;
    },
    formatDate(date) {
      return date ? this.formatDateToCustomString(new Date(date)) : "";
    },
    getLastDayOfMonth(date) {
      if (!date) return "";
      const currentDate = date instanceof Date ? date : new Date(date);
      const lastDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );
      return this.formatDateToCustomString(lastDay);
    },
    formatDateToCustomString(date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    tubanshu() {
      let params = {
        reportName: this.formData.type,
        jscName: this.formData.idrow,
      };
      if (this.formData.type === "实际用途统计表") {
        this.listpsms2(params, "图斑数", this.formData.type);
      } else {
        this.listpsms(params, "图斑数");
      }
    },
    tubanshu2() {
      let params = {
        reportName: this.formData.type2,
        jscName: this.formData.idrow2,
      };
      if (this.formData.type2 === "实际用途统计表") {
        this.reportName2(params, "图斑数", this.formData.type2);
      } else {
        this.reportName(params, "图斑数");
      }
    },
    handleAreaClick() {
      let params = {
        reportName: this.formData.type,
        jscName: this.formData.idrow,
      };
      if (this.formData.type === "实际用途统计表") {
        this.listpsms2(params, "面积", this.formData.type);
      } else {
        this.listpsms(params, "面积");
      }
    },
    handleAreaClick2() {
      let params = {
        reportName: this.formData.type2,
        jscName: this.formData.idrow2,
      };
      if (this.formData.type2 === "实际用途统计表") {
        this.reportName2(params, "面积", this.formData.type2);
      } else {
        this.reportName(params, "面积");
      }
    },
    handleRatioClick() {
      let params = {
        reportName: this.formData.type,
        jscName: this.formData.idrow,
      };
      if (this.formData.type === "实际用途统计表") {
        this.listpsms2(params, "比例", this.formData.type);
      } else {
        this.listpsms(params, "比例");
      }
    },
    handleRatioClick2() {
      let params = {
        reportName: this.formData.type2,
        jscName: this.formData.idrow2,
      };
      if (this.formData.type2 === "实际用途统计表") {
        this.reportName2(params, "比例", this.formData.type2);
      } else {
        this.reportName(params, "比例");
      }
    },
    findAlllist() {
      this.formData.startDate =
        this.time.length > 0 ? this.formatDate(this.time[0]) : "";
      this.formData.endDate =
        this.time.length > 1 ? this.getLastDayOfMonth(this.time[1]) : "";
      function formatDateToCustomString(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
      }
      this.formData.startDate =
        this.time.length > 0
          ? formatDateToCustomString(new Date(this.time[0]))
          : "";
      this.formData.endDate =
        this.time.length > 1
          ? formatDateToCustomString(new Date(this.time[1]))
          : "";
      this.uploadFile();
      this.download();
      console.log(this.formData.type, this.formData.idrow);
      let params = {
        reportName: this.formData.type,
        jscName: this.formData.idrow,
      };
      if (this.formData.type === "实际用途统计表") {
        this.listpsms2(params);
      } else {
        this.listpsms(params);
      }
    },
    findAll2() {
      console.log(this.formData.type2, this.formData.idrow2);
      let params = {
        reportName: this.formData.type2,
        jscName: this.formData.idrow2,
      };
      if (this.formData.type2 === "实际用途统计表") {
        this.reportName2(params);
      } else {
        this.reportName(params);
      }
    },
    reportName(
      params = { reportName: "", jscName: "" },
      clickedButton = "面积"
    ) {
      this.loading = true;
      exportList(params).then((ok) => {
        this.qytjtwo = ok.data;
        this.ztjktwo = ok.data;
        this.sendDatarow(this.qytjtwo, clickedButton);
        this.sendDatarow2(this.ztjktwo, clickedButton);

        const baseUrl =
          process.env.NODE_ENV === "production"
            ? "http://124.114.203.222:8084"
            : "http://192.168.1.103";
        const parts = ok.data.url.split(":8084/");
        const path = parts[1];
        if (ok.code == 200) {
          this.loading = false;
          this.previewUrl = `${baseUrl}/${path}`;
          EventBus.$emit("dataUploaded2", ok.data);
        }
      });
    },
    reportName2(params, clickedButton = "面积", row) {
      exportSjyt(params).then((ok) => {
        this.qytjtwo = ok.data;
        this.ztjktwo = ok.data;
        row = this.formData.type2;
        this.sendDatarow(this.qytjtwo, clickedButton, row);
        this.sendDatarow2(this.ztjktwo, clickedButton);
      });
    },
    sendDatarow(data, clickedButton, row) {
      EventBus.$emit("rowdataUploaded", { data, clickedButton, row });
    },
    sendDatarow2(data, clickedButton) {
      EventBus.$emit("rowdataUploaded2", { data, clickedButton });
    },
    listpsms(params = { reportName: "", jscName: "" }, clickedButton = "面积") {
      this.loading = true;
      exportList(params).then((ok) => {
        this.fetchedDa = ok.data;
        this.echartsioi = ok.data;
        this.sendData(this.fetchedDa, clickedButton);
        this.sendData2(this.echartsioi, clickedButton);
        const baseUrl =
          process.env.NODE_ENV === "production"
            ? "http://124.114.203.222:8084"
            : "http://192.168.1.103";
        const parts = ok.data.url.split(":8084/");
        const path = parts[1];
        if (ok.code == 200) {
          this.loading = false;
          this.previewUrl = `${baseUrl}/${path}`;
          EventBus.$emit("dataUploaded2", ok.data);
        }
      });
    },
    listpsms2(params, clickedButton = "面积", row) {
      exportSjyt(params).then((ok) => {
        this.fetchedDa = ok.data;
        this.echartsioi = ok.data;
        row = this.formData.type;
        this.sendData(this.fetchedDa, clickedButton, row);
        this.sendData2(this.echartsioi, clickedButton);
      });
    },
    sendData(data, clickedButton, row) {
      EventBus.$emit("dataUploaded", { data, clickedButton, row });
    },
    sendData2(data, clickedButton) {
      EventBus.$emit("dataUploaded2", { data, clickedButton });
    },

    getFrom(data) {
      console.log(data, "==================>是的");
    },

    uploadFile() {
      // this.previewUrl = "";
      // this.loadingData = this.$loading({
      //   lock: true,
      //   text: "努力加载中",
      //   spinner: "el-icon-loading",
      //   background: "rgba(0, 0, 0, 0.7)",
      //   target: this.$refs.targetDiv,
      // });
      // let params = {
      //   xzqx: this.formData.countys,
      //   reportName: this.formData.type,
      // };
      // axios
      //   .get(config.url.export, { params: params })
      //   .then((res) => {
      //     let { msg, code } = res.data;
      //     // // 判断请求是否成功
      //     if (code === 200) {
      //       this.$nextTick(() => {
      //         this.loadingData.close();
      //       });
      //       this.officerow = true;
      //       this.previewUrl = msg;
      //     } else if (code === 500) {
      //       this.$nextTick(() => {
      //         this.loadingData.close();
      //       });
      //     }
      //     this.download();
      //   })
      //   .catch((error) => {
      //     this.loadingData.close();
      //   });
    },
    handleChangeXzq(value) {
      if (value.length) {
        const textArr = [];
        value.map((item, index) => {
          let type = this.arrayToObject(item);
          textArr.push(type);
        });
        const city = [];
        const county = [];
        textArr.map((m, n) => {
          city.push(m["0"]);
          county.push(m["1"]);
        });
        const arr = [];
        city.map((k, i) => {
          if (!arr.includes(k)) {
            arr.push(k);
          }
        });
        this.formData.citys = arr.join(",");
        this.formData.countys = county.join(",");
      }
    },
    //数组转对象
    arrayToObject(arr) {
      let obj = {};
      arr.forEach((item, index) => {
        obj[index] = item;
      });
      return obj;
    },
    getXzqhh() {
      tree().then((ok) => {
        if (ok.code === 200) {
          const rawData = ok.data;
          this.xzq = rawData.map((item) => ({
            value: item.dictType,
            label: item.dictType,
            children: item.xzqx.map((area) => ({
              value: area,
              label: area,
            })),
          }));
        }
      });
    },
    getType() {
      options().then((ok) => {
        if (ok.code == 200) {
          this.problemTypes = ok.data.TJLX.map((item) => ({
            label: item,
            value: item,
          }));
        }
      });
    },
    findAll() {
      this.citys = [];
      this.countys = [];
      if (this.selectXZQ.length == 0) {
        this.$message("请选择行政区");
        return;
      }
      if (this.time.length == 0) {
        this.$message("请选择时间");
        return;
      }

      this.formData.startDate = this.time.length > 0 ? this.time[0] : "";
      this.formData.endDate = this.time.length > 1 ? this.time[1] : "";

      this.selectXZQ.forEach((ele) => {
        if (ele.length == 1) {
          this.citys.push(ele);
        } else if (ele.length == 2) {
          this.countys.push(ele[1]);
        }
      });
      this.formData.citys = this.citys + "";
      this.formData.countys = this.countys + "";
      const load = this.$loading({
        background: "rgba(0, 0, 0, 0.8)", //遮罩层颜色
        lock: true,
        text: "正在获取...",
        target: document.querySelector(".el-main"),
      });
    },
    generateRepor() {
      generateReport().then((ok) => {
        this.previewUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
          ok.msg
        )}&embedded=true`;
        this.isdocx = true;
      });
    },
    jscLis() {
      jscList().then((ok) => {
        this.idrow = ok.data.map((item) => ({
          label: item,
          value: item,
        }));
      });
    },
  },
};
</script>
  
<style  scoped>
.container {
  width: 100%;
  height: 100%;
}
.sellect {
  padding: 12px 10px 10px 10px;
}

.line1 {
  width: 100%;
  height: 139.5%;
}

.title {
  /* justify-content: space-between; */
}
.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 0px;
}

.el-pagination {
  margin-top: 10px;
  text-align: end;
  margin-right: 10px;
}
.iconfont {
  display: inline-block;
  transform: rotate(180deg);
}
.word {
  width: 100%;
  height: 100%;
}
.word_bt {
  width: 100%;
  background: black;
  height: 30px;
  text-align: end;
  padding-right: 10px;
}
.el-col {
  text-align: end;
}
.targetDiv >>> .x-spreadsheet-sheet {
  width: 100% !important;
}

.nuiop >>> .el-dialog__header {
  background: #0078d7 !important; /* 设置为蓝色 */
  color: #fff;
}
.address-cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}
.echeckop {
  height: calc(100% - 45px);
  display: flex;
  justify-content: space-between;
}
.echartsi {
  position: relative;
}
.Inventory {
  position: absolute;
  bottom: 0;
  width: 200px;
  display: flex;
  justify-content: space-between;
  z-index: 777;
}
.echarshe {
  display: flex;
  justify-content: space-evenly;
  width: 400px;
  position: absolute;
  right: 0;
  margin: auto;
  z-index: 777;
}
.Main {
  height: 700px;
  width: 100%;
}
</style>