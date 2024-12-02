<template>
  <div class="container">
    <div class="first-child">
      <el-form ref="form" :model="formData" label-width="55px">
        <div>
          <el-row class="title" align="middle">
            <el-col :span="4">
              <el-form-item label="行政区">
                <el-cascader
                  ref="cascader"
                  clearable
                  v-model="selectXZQ"
                  :options="xzq"
                  :style="{ width: '100%' }"
                  :props="{
                    multiple: false,
                  }"
                  collapse-tags
                  @change="handleChangeXzq"
                  placeholder="请选择行政区"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="4" :style="{ marginLeft: '10px' }">
              <el-select
                v-model="idrows"
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
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4" :style="{ marginLeft: '10px' }">
              <el-date-picker
                v-model="time"
                type="monthrange"
                range-separator="至"
                :picker-options="pickerOptions0"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
                @change="handleDateChange"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="1" :style="{ marginLeft: '30px' }">
              <el-button type="primary" @click="findAlllist">查询</el-button>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <div class="second-child">
      <div class="left">
        <el-tabs type="border-card">
          <el-tab-pane label="用户管理">
            <Histogram />
          </el-tab-pane>
          <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        </el-tabs>
      </div>
      <div class="reight">
        <el-tabs type="border-card">
          <el-tab-pane label="用户管理">
            <div class="Main" v-loading="loading">
              <vue-office-excel :src="previewUrl" @rendered="rendered" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { tree, options, areaWorkList } from "../../api/document/index";
import Histogram from "./Histogram.vue";
import VueOfficeExcel from "@vue-office/excel";
import "@vue-office/excel/lib/index.css";
import { EventBus } from "./eventBus.js";
export default {
  components: {
    Histogram,
    VueOfficeExcel,
  },
  data() {
    return {
      previewUrl: "", //预览属性
      loading: false,
      selectXZQ: [],
      xzq: [],
      citys: "",
      countys: "",
      idrow: [],
      idrows: "",
      time: [],
      startDate: "",
      endDate: "",
      pickerOptions0: {
        onPick: ({ maxDate, minDate }) => {
          if (maxDate) {
            const endOfMonth = new Date(
              maxDate.getFullYear(),
              maxDate.getMonth() + 1,
              0
            );
            this.time = [minDate, endOfMonth];
          }
        },
      },
    };
  },

  mounted() {
    this.getXzqhh();
  },
  methods: {
    handleDateChange(value) {
      const formattedDates = this.formatDateRange(value);
      this.startDate = formattedDates[0];
      this.endDate = formattedDates[1];
    },
    formatDateRange(dates) {
      if (dates.length === 2) {
        const startDate = dates[0];
        const endDate = dates[1];
        const formattedStartDate = `${startDate.getFullYear()}-${
          startDate.getMonth() + 1
        }-${startDate.getDate()}`;

        const endOfMonthDate = new Date(
          endDate.getFullYear(),
          endDate.getMonth() + 1,
          0
        );
        const formattedEndDate = `${endOfMonthDate.getFullYear()}-${
          endOfMonthDate.getMonth() + 1
        }-${endOfMonthDate.getDate()}`;

        return [formattedStartDate, formattedEndDate];
      }
      return [];
    },

    getXzqhh() {
      tree().then((ok) => {
        console.log(ok.data);
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

      options().then((ok) => {
        if (ok.code == 200) {
          this.idrow = ok.data.TJLX.map((item) => ({
            label: item,
            value: item,
          }));
        }
      });
    },
    handleChangeXzq(value) {
      this.citys = value[0];
      this.countys = value[1];
    },
    findAlllist() {
      let params = {
        reportName: this.idrows,
        city: this.citys,
        county: this.countys,
        startTime: this.startDate,
        endDate: this.endDate,
      };
      this.loading = true;
      areaWorkList(params).then((ok) => {
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
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.first-child {
  padding: 12px 10px 10px 10px;
}
.second-child {
  flex: 1;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.left-zuo {
  width: 20px;
  height: 20px;
  position: absolute;
}

.left,
.reight {
  width: 49%;
}
.vue-office-excel {
  height: 100%;
  width: 100%;
}
.vue-office-excel >>> .x-spreadsheet-sheet {
  width: 100% !important;
}
.vue-office-excel >>> .x-spreadsheet-table {
  width: 100% !important;
}
.Main {
  height: 700px;
  width: 100%;
}
</style>