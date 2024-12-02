<template>
  <div class="container">
    <div class="sellect">
      <el-row class="title" type="flex" align="middle">
        <el-col :span="4">
          <el-select
            v-model="dtz"
            placeholder="台账"
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="item in tz"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" :style="{ marginLeft: '10px' }">
          <el-select
            v-model="formData.type"
            placeholder="统计类型"
            :style="{ width: '100%' }"
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
            v-model="jscName"
            placeholder="计算池"
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="item in jsc"
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
        <!-- <el-col :span="3" :style="{ marginLeft: '10px' }">
          <el-date-picker
            v-model="timedata"
            type="date"
            placeholder="选择日期"
            @change="handleDateChange"
          >
          </el-date-picker>
        </el-col> -->
        <el-col :span="1" :style="{ marginLeft: '10px' }">
          <el-button type="primary" @click="findAlllist">计算</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="warning" @click="findAquan">生成全省比例</el-button>
        </el-col>
        <!-- <el-col :span="1" :style="{ marginLeft: '10px' }">
          <el-button type="warning" @click="listrorrow">生成报告</el-button>
        </el-col> -->
      </el-row>
    </div>
    <div class="title-cui">
      <div
        v-for="(item, index) in listComboBox"
        :key="index"
        class="title-item"
        :class="{ selected: isSelected(item) }"
        @click="toggleSelection(item)"
      >
        <div class="item-title">{{ item }}</div>
      </div>
    </div>
    <div class="office-exce" ref="targetDiv">
      <vue-office-excel
        v-if="officerow"
        :src="previewUrl"
        style="width: 100%; height: 100%"
      />
    </div>
    <div class="bottom-rou">
      <el-col
        :span="1"
        :style="{ marginLeft: '10px' }"
        v-if="permissions['当前清单列表'] === 0"
      >
        <el-button type="primary" @click="listrorrow">报告清单</el-button>
      </el-col>
    </div>
    <div class="pole">
      <el-dialog
        title="报告清单下载"
        append-to-body
        :visible.sync="fullscreenVisible"
        modal-append-to-body
        :width="'1100px'"
        class="nuiop"
      >
        <div>
          <el-table
            :data="paginatedData"
            style="width: 100%"
            height="500px"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column type="index" align="center" label="序号">
            </el-table-column>
            <el-table-column
              prop="downloadName"
              label="文件名称"
              align="center"
              width="250"
            >
            </el-table-column>
            <el-table-column
              prop="downloadType"
              label="统计类型"
              align="center"
              width="250"
            >
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="生成时间"
              align="center"
              width="250"
            >
            </el-table-column>
            <el-table-column label="操作" align="center">
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
        <div
          style="
            display: flex;
            justify-content: space-evenly;
            align-items: center;
          "
        >
          <div style="width: 50%">
            <el-button type="primary" @click="shanliop">删除</el-button>
          </div>
          <div style="width: 50%">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[50, 100, 150, 200]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
  
  <script>
import {
  options,
  XzjsydComboBox,
  listdownload,
  DropdownBoXContent,
  exportList2024,
  computeListjsc2024,
  exportXttb2024,
  deleteId,
  generateProvince,
  nysh2024,
  deleteId02,
  glq2024report,
} from "../../api/document/index";
import moment from "moment";
//引入VueOfficeExcel组件
import VueOfficeExcel from "@vue-office/excel";
//引入相关样式
import "@vue-office/excel/lib/index.css";
export default {
  components: {
    VueOfficeExcel,
  },
  data() {
    return {
      permissions: {},
      idrowp: [],
      timedata: "",
      selectedItems: [],
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
      },
      bg: null,
      officerow: "false",
      isexcel: false,
      previewUrl: "",
      loadingData: null,
      DataListrow: [],
      listComboBox: [
        "未供即用违法图斑",
        "已补办完善用地手续违法图斑",
        "已补办手续(农转用)违法图斑",
        "已补办手续(设农或临时用地)违法图斑",
        "省级重点工程用地违法图斑",
        "已经拆除复耕到位违法图斑",
        "未整改图斑情况",
      ],
      tz: [],
      jsc: [],
      dtz: "",
      jscName: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      snapdateTime: "",
    };
  },
  created() {
    const storedPermissions = localStorage.getItem("permissions");
    if (storedPermissions !== null) {
      this.permissions = JSON.parse(storedPermissions);
    }
  },
  mounted() {
    this.XzjsydComboBo();
    this.getType();
    this.selectedItems = [...this.listComboBox];
  },
  computed: {
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.DataListrow.slice(start, end);
    },
  },
  methods: {
    handleSelectionChange(val) {
      const ids = val.map((item) => item.id);
      this.idrowp = ids;
    },
    shanliop() {
      let ids = this.idrowp.slice();

      deleteId02(ids).then((ok) => {
        if (ok.code == 200) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
        }
        this.listdownlo();
      });
    },
    handleDateChange(date) {
      if (date) {
        const formattedDate = moment(date).format("YYYY-MM-DD");
        this.snapdateTime = formattedDate;
      } else {
        this.snapdateTime = "";
      }
    },
    findAquan() {
      let params = {
        snapdateTime: this.snapdateTime,
        option: this.selectedItems.join(","),
      };
      generateProvince(params).then((ok) => {
        if (ok.code == 200) {
          this.listdownlo();
          this.$message({
            message: "生成完成",
            type: "success",
          });
        }
      });
    },
    printNumber(value) {
      deleteId(value).then((ok) => {
        if (ok.code == 200) {
          this.getType();
        }
      });
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.listdownlo();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.listdownlo();
    },

    toggleSelection(item) {
      const index = this.selectedItems.indexOf(item);
      if (index > -1) {
        this.selectedItems.splice(index, 1);
      } else {
        this.selectedItems.push(item);
      }
    },
    isSelected(item) {
      return this.selectedItems.includes(item);
    },

    XzjsydComboBo() {
      XzjsydComboBox().then((ok) => {
        this.listComboBox = ok.data;
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
    handleEdit(index, row) {
      const url = row.downloadUrl;
      // console.log(url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    listrorrow() {
      this.fullscreenVisible = true;
    },

    findAlllist() {
      if (this.dtz === "融合台账") {
        this.uploadFile();
      } else if (this.dtz === "原始数据") {
        this.uploadFile();
      } else if (
        this.dtz === "内业审核(融合)" ||
        this.dtz === "内业审核(原始)"
      ) {
        this.uploadFile();
      } else if (
        this.dtz === "管理区(融合)" ||
        this.dtz === "管理区(原始)" ||
        this.dtz === "持续变化(融合)" ||
        this.dtz === "持续变化(原始)"
      ) {
        this.uploadFile();
      }
      this.listdownlo();
    },

    uploadFile() {
      this.loadingData = this.$loading({
        lock: true,
        text: "努力加载中",
        spinner: "el-icon-loading",
        background: "#fff",
        target: this.$refs.targetDiv,
      });

      let params = {
        reportName: this.formData.type,
        option: this.selectedItems.join(","),
        jscName: this.jscName,
      };
      if (this.dtz === "融合台账") {
        exportList2024(params)
          .then((res) => {
            const baseUrl = process.env.NODE_ENV === "production" ? "" : "/img";
            const parts = res.msg.split(":8084/");
            const path = parts[1];
            if (res.code === 200) {
              this.listdownlo();
              this.$nextTick(() => {
                this.loadingData.close();
              });
              this.officerow = true;
              this.previewUrl = `${baseUrl}/${path}`;
              // console.log(this.previewUrl);
            }
          })
          .catch((error) => {
            this.loadingData.close();
          });
      } else if (this.dtz === "原始数据") {
        exportXttb2024(params)
          .then((res) => {
            const baseUrl = process.env.NODE_ENV === "production" ? "" : "/img";
            const parts = res.msg.split(":8084/");
            const path = parts[1];
            if (res.code === 200) {
              this.listdownlo();
              this.$nextTick(() => {
                this.loadingData.close();
              });
              this.officerow = true;
              this.previewUrl = `${baseUrl}/${path}`;
              // console.log(this.previewUrl);
            }
          })
          .catch((error) => {
            this.loadingData.close();
          });
      } else if (
        this.dtz === "内业审核(融合)" ||
        this.dtz === "内业审核(原始)"
      ) {
        let paramst = {
          dataSources: this.dtz,
          option: this.selectedItems.join(","),
          options: this.formData.type,
          jscName: this.jscName,
          reportName: this.formData.type,
        };
        nysh2024(paramst)
          .then((res) => {
            const baseUrl = process.env.NODE_ENV === "production" ? "" : "/img";
            const parts = res.msg.split(":8084/");
            const path = parts[1];
            if (res.code === 200) {
              this.listdownlo();
              this.$nextTick(() => {
                this.loadingData.close();
              });
              this.officerow = true;
              this.previewUrl = `${baseUrl}/${path}`;
            }
          })
          .catch((error) => {
            this.loadingData.close();
          });
      } else if (
        this.dtz === "管理区(融合)" ||
        this.dtz === "管理区(原始)" ||
        this.dtz === "持续变化(融合)" ||
        this.dtz === "持续变化(原始)"
      ) {
        let params = {
          dataSources: this.dtz,
          option: this.selectedItems.join(","),
          jscName: this.jscName,
        };
        glq2024report(params)
          .then((ok) => {
            const baseUrl = process.env.NODE_ENV === "production" ? "" : "/img";
            const parts = res.msg.split(":8084/");
            const path = parts[1];
            if (ok.code === 200) {
              this.listdownlo();
              this.$nextTick(() => {
                this.loadingData.close();
              });
              this.officerow = true;
              this.previewUrl = `${baseUrl}/${path}`;
            }
          })
          .catch((error) => {
            this.loadingData.close();
          });
      }
    },

    getType() {
      this.listdownlo();
      options().then((ok) => {
        if (ok.code == 200) {
          this.problemTypes = ok.data.TJLX.map((item) => ({
            label: item,
            value: item,
          }));
        }
      });
      DropdownBoXContent().then((ok) => {
        this.tz = ok.data.TZ.map((item) => ({
          label: item,
          value: item,
        }));
      });
      computeListjsc2024().then((ok) => {
        this.jsc = ok.data.map((item) => ({
          label: item.remarks,
          value: item.remarks,
        }));
      });
    },
    listdownlo() {
      listdownload().then((ok) => {
        this.DataListrow = ok.data;
        this.total = this.DataListrow.length;
      });
    },
  },
};
</script>
  
  <style  scoped>
.container {
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
}
.sellect {
  height: 5%;
}
.title-cui {
  display: flex;
  justify-content: space-between;
  height: 5%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.office-exce {
  width: 100%;

  display: flex;
  justify-content: space-between;
  position: relative;
  height: 85%;
}
.bottom-rou {
  height: 5%;
  display: flex;
  align-items: center;
}
.office-exce >>> .x-spreadsheet-table {
  width: 100% !important;
}
.office-exce >>> .x-spreadsheet-sheet {
  width: 100% !important;
}
.line {
  text-align: end;
  width: 100%;
  height: 1px;
  background: #eff2f5;
}
.line1 {
  width: 100%;
  height: 139.5%;
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

/* .nuiop >>> .el-dialog__header {
  background: #0078d7 !important; 
  color: #fff;
} */
.address-cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}

.title-item {
  width: 240px;
  height: 30px;
  /* border-radius: 50%; */
  border: 1px solid #000;
}
.item-title {
  text-align: center;
  line-height: 30px;
  font-size: 14px;
}
.title-item.selected {
  background-color: lightgreen;
}
</style>