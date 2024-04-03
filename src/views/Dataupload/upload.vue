<template>
  <div class="container">
    <div class="sellect">
      <el-form ref="form" :model="formData" label-width="80px">
        <div>
          <el-row class="title" type="flex" align="middle">
            <el-col :span="3">
              <el-cascader
                ref="cascader"
                clearable
                v-model="selectXZQ"
                :options="xzq"
                :style="{ width: '100%' }"
                :props="{
                  multiple: true,
                }"
                collapse-tags
                @change="handleChangeXzq"
                placeholder="请选择行政区"
              ></el-cascader>
            </el-col>
            <el-col :span="4">
              <el-form-item label="统计类型:" :style="{ marginLeft: '30px' }">
                <el-select v-model="formData.type" :style="{ width: '100%' }">
                  <el-option
                    v-for="item in problemTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    placeholder="统计类型"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="统计类型:" :style="{ marginLeft: '30px' }">
                <el-select v-model="formData.idrow" :style="{ width: '100%' }">
                  <el-option
                    v-for="item in idrow"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="findAlllist">查询</el-button>
              <el-button type="primary" @click="listrorrow">生成报告</el-button>
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
        :width="'1200px'"
        class="nuiop"
      >
        <div>
          <el-button-group>
            <el-button type="primary">开始打包生成</el-button>
            <el-button type="primary">刷新</el-button>
          </el-button-group>
        </div>
        <div>
          <el-table :data="DataListrow" style="width: 100%" height="500px">
            <el-table-column type="index" label="序号" width="200">
            </el-table-column>
            <el-table-column prop="downloadType" label="文件类型" width="200">
            </el-table-column>
            <el-table-column prop="downloadName" label="文件名称" width="200">
              <template slot-scope="scope">
                <el-tooltip
                  :content="scope.row.downloadName"
                  placement="top"
                  effect="dark"
                >
                  <div class="address-cell">
                    {{ scope.row.downloadName }}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="downloadBy" label="下载人" width="200">
            </el-table-column>
            <el-table-column prop="downloadTime" label="下载时间" width="200">
            </el-table-column>
            <el-table-column prop="" label="下载地址" width="200">
              <template slot-scope="scope">
                <el-tooltip
                  :content="scope.row.downloadUrl"
                  placement="top"
                  effect="dark"
                >
                  <div class="address-cell">
                    {{ scope.row.downloadUrl }}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="200">
            </el-table-column>
            <el-table-column prop="remark" label="备注" width="200">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >下载</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>
    <div class="echeckop">
      <div style="width: 49%">
        <el-tabs type="border-card">
          <el-tab-pane label="总体情况">
            <div class="echartsi">
              <echartsio />
            </div>
          </el-tab-pane>
          <el-tab-pane label="区域统计">
            <div class="echarshe">
              <div><el-button size="small" round>面积</el-button></div>
              <div><el-button size="small" round>图斑数</el-button></div>
              <div><el-button size="small" round>比例</el-button></div>
            </div>
            <div class="echartsi">
              <ChartComponent />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div style="width: 49%">
        <el-tabs type="border-card">
          <el-tab-pane label="总体情况">
            <div class="echartsi">
              <echartsiotow />
            </div>
          </el-tab-pane>
          <el-tab-pane label="区域统计"> </el-tab-pane>
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
import config from "../../../public/config/config";
import axios from "axios";
import { generateReport } from "../../api/document/index";
import VueOfficeDocx from "@vue-office/docx";
import "@vue-office/docx/lib/index.css";
import VueOfficeExcel from "@vue-office/excel";
import "@vue-office/excel/lib/index.css";
import echartsio from "./echatr.vue";
import echartsiotow from "./echatrtow.vue";
import ChartComponent from "./columnar.vue";

export default {
  components: {
    VueOfficeExcel,
    screen,
    VueOfficeDocx,
    echartsio,
    echartsiotow,
    ChartComponent,
  },
  data() {
    return {
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

        // 只有在新的结束日期不等于当前结束日期时才更新
        if (formattedNewEndDate !== newValue[1]) {
          this.time = [newValue[0], formattedNewEndDate];
        }
      }
    },
  },
  created() {},
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
  },
  methods: {
    handleClose(done) {
      this.previewUrl = "";
      done();
    },
    handscope(index, row) {
      this.previewUrl = row.downloadUrl;

      this.dialogVisible = true;
    },
    download() {
      axios.get(config.url.download).then((res) => {
        this.DataListrow = res.data.data;
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
      axios.get(config.url.tree).then((res) => {
        if (res.data.code === 200) {
          const rawData = res.data.data;

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
      axios.get(config.url.options).then((res) => {
        if (res.data.code == 200) {
          this.problemTypes = res.data.data.TJLX.map((item) => ({
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
        console.log(ok.msg, "ok");
        this.previewUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
          ok.msg
        )}&embedded=true`;
        this.isdocx = true;
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

.line1 {
  width: 100%;
  height: 139.5%;
}

.title >>> .el-col {
  height: 34px;
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
  margin-top: 10px;
}
.echartsi {
  position: relative;
}
.echarshe {
  width: 400px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  right: 0;
  left: 0;
  margin: auto;
  z-index: 9999;
}
</style>