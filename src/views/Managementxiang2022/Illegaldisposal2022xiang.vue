<template>
  <div class="htmlheight">
    <div class="Header-box">
      <el-collapse v-model="activeNames" @change="handlebnsdgb">
        <el-collapse-item
          class="landCode"
          name="listlandCode"
          style="pointer-events: none"
        >
          <template #title>
            <el-button-group>
              <el-button
                type="primary"
                size="small"
                icon="el-icon-arrow-left"
                @click="close"
                style="pointer-events: auto"
                >返回列表</el-button
              >
            </el-button-group>
            <div class="rpouttr" v-show="activeSteprow">
              <el-steps
                class="activesss"
                :active="activeStep"
                finish-status="success"
                simple
              >
                <el-step
                  v-for="(step, index) in steps"
                  :key="step + index"
                  :title="step.stepName"
                  :status="
                    step.stepState == '1'
                      ? 'success'
                      : step.stepState == '0'
                      ? 'wait'
                      : 'wait'
                  "
                  :description="horizontal"
                >
                  <template #icon>
                    <i
                      class="el-icon-check custom-icon"
                      :status="
                        step.stepState == '1'
                          ? 'success'
                          : step.stepState == '0'
                          ? 'wait'
                          : 'error'
                      "
                    ></i>
                  </template>
                </el-step>
              </el-steps>
            </div>
            <!-- <span class="title-text">图斑编辑(地块编号: {{ landCode }})</span> -->
          </template>
        </el-collapse-item>
      </el-collapse>
    </div>

    <main class="main-content">
      <div class="left-column" v-loading="loadingmap">
        <Map ref="map" class="map"></Map>
      </div>

      <div class="right-column">
        <el-tabs
          type="border-card"
          v-model="activeName"
          @tab-click="handleClick"
          class="sticky-tabs-header"
        >
          <el-tab-pane label="违法图斑" name="landCodeList">
            <div class="scrollable-tab-content">
              <div class="landCodeList-top">
                <div
                  v-for="(item, index) in landCodeList"
                  :key="index"
                  class="liet-item"
                  @click="handleLandCodeClick(item)"
                  :class="{ selected: selectedItem === item }"
                >
                  <div class="list-title">{{ item }}</div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="违法行为信息" name="first">
            <div class="scrollable-tab-content">
              <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="违法行为信息" name="wan">
                  <el-descriptions
                    class="ellipsis"
                    title=""
                    :column="3"
                    :size="size"
                    border
                  >
                    <template slot="extra">
                      <!-- <el-button type="primary" size="small">操作</el-button> -->
                    </template>
                    <el-descriptions-item
                      v-for="(value, key) in filteredData"
                      :key="key"
                    >
                      <template slot="label">
                        <div
                          :title="labels[key] || key"
                          :class="{
                            'blue-text':
                              key === 'sfcfdw' ||
                              key === 'tbsfla' ||
                              key === 'hcjgczjy' ||
                              key === 'tbsfzglsdw' ||
                              key === 'wftbhc' ||
                              key === 'wfczjg',
                          }"
                        >
                          {{ formatText(labels[key]) || key }}
                        </div>
                      </template>
                      <span :title="value">{{
                        formatText(value) || "无"
                      }}</span>
                    </el-descriptions-item>
                  </el-descriptions>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </main>
  </div>
</template>
        
        <script>
import Map from "../mapTwo.vue";
import { loadMap, loadPhotoMap, MapInit } from "../../api/map/loadMap";

import {
  freckleCode2022,
  smzqjd2022,
  offencemap2022,
} from "../../api/document/index";
import elImageViewer from "element-ui/packages/image/src/image-viewer.vue";
//引入VueOfficeDocx组件
import VueOfficeDocx from "@vue-office/docx";
import "@vue-office/docx/lib/index.css";
//引入VueOfficeExcel组件
import VueOfficeExcel from "@vue-office/excel";
//引入相关样式
import "@vue-office/excel/lib/index.css";
export default {
  data() {
    return {
      loadingmap: false,
      fjgldata: [],
      freckleDatalisto: {},
      filteredData: {},
      labels: {
        freckleCode: "图斑编号",
        offenceCode: "违法行为编号",
        wfzwms: "违法行为描述",
        wfzrzt: "违法责任主体",
        sxwfdsr: "涉嫌违法当事人",
        sxwfmj: "涉嫌违法面积",
        qzgdmj: "其中耕地面积",
        qzjbntmj: "其中基本农田面积",
        hcjgczjy: "核查结果处置建议",
        bylasm: "不予立案说明",
        xmmc: "项目名称",
        wfxz: "违法性质",
        tbsfla: "填报是否已结案",
        ajjl: "案件结论",
        sfcfdw: "是否处罚到位",
        tbsfzglsdw: "填报是否整改落实到位",
        year: "年度",
        sfsqfyqzzx: "是否申请人民法院强制执行",
        wfxwfsd: "违法行为发生地",
        jsxz: "建设现状",
        sjyt: "实际用途",
        wflx: "违法类型",
        wftbhc: "违法图斑核查",
        wfczjg: "违法处置结果",
        landCode: "违法图斑编号",
        cancelStatus: "销号状态",
        cancelDate: "销号时间",
        cancelBy: "销号人",
        cancelReason: "销号原因",
        tblx: "图斑类型",
        sfjgwyhc: "是否外业核查",
      },
      activeSteprow: true,
      responseData: {},
      tabListtbbh: [],
      SpecklePattern: [],
      tabListtwolisttwo: [],
      tabListtwolist: [],
      tabListwan: [],
      tabListtwo: [],
      actList: ["1", "2", "3", "4", "5", "6", "7"],
      tabList: [],
      name: localStorage.getItem("name"),
      id: "",
      snapdate: null,
      editData: [],
      horizontal: null,
      currentFileUrl: "",
      // isPdf: false,
      leftWidth: 40,
      rightWidth: 50,
      isResizing: false,
      resData: {},
      size: "",
      loadingData: null,
      show: true,
      forliadd: "",
      activeName: "landCodeList",
      fieldslist: [],
      imgshou: [],
      showviewer: false,
      urlList: [],
      tableData: [],
      azimuthlist: false,
      current: null,
      activeNamesfrist: ["1", "2", "3"],
      activeNamestwo: ["1"],
      activeNamesthree: ["1"],
      activeNames: ["wan"],
      centerDialogVisible: false,
      direction: "btt",
      numberOfPhotos: 0,
      currentarr: false,
      textarea1: "",
      textarea2: "",
      fileList: [], //上传文件的集合
      parentMessage: "Hello from parent",
      landCode: "",
      rules: {
        textarea1: [
          { required: true, message: "请输入文件名称", trigger: "change" },
        ],
        textarea2: [
          { required: true, message: "请输入文件说明", trigger: "change" },
        ],
      },
      ruleForm: {
        textarea1: "",
        textarea2: "",
      },
      isEditing: false,
      originalValues: {},
      fullscreenVisible: false,
      currentImageUrl: [],
      initialIndex: 0,
      perviewBottom: {},
      isdocx: false,
      isexcel: false,
      ispdf: false,
      isImage: false,
      previewUrl: "", //预览属性
      dkbh_or_tbbh: null,
      activeStep: 0, // 设置默认激活的步骤
      submitIntervalId: null,
      hasShownWarning: false, // 添加标志变量
      jdmcp: [],
      steps: [],
      freckleCode: "",
      listrow: "",
      container: null,
      landCodelist: [],
      land: "",
      selectedItem: null,
    };
  },

  mounted() {
    this.id = this.$route.query.id;
    this.land = this.$route.query.land;
    this.landCode = this.$route.query.landCode;
    if (this.$route.query) {
      this.landCodeList = this.$route.query.landCode
        .split(";")
        .filter((code) => code.trim() !== "");
    } else {
      this.landCodeList = [];
    }
    document.querySelector(".right-column").style.overflow = "hidden";

    this.freckleCod();
    this.listrowl();
    MapInit(this); //地图关联初始化
  },

  components: {
    Map,
    elImageViewer,
    VueOfficeDocx,
    VueOfficeExcel,
    // VueOfficePdf,
  },
  computed: {
    isSidebarOpened() {
      return this.$store.state.app.sidebar.opened;
    },
  },
  directives: {
    tooltip: function (el, binding) {
      el.setAttribute("title", binding.value);
    },
  },
  methods: {
    handleLandCodeClick(landCode) {
      this.selectedItem = landCode;
      this.loadingmap = true;
      let params = {
        wfxwbh: landCode,
      };

      offencemap2022(params).then((ok) => {
        if (ok.code == 200) {
          loadMap(ok.data);
          this.loadingmap = false;
        }
      });
    },
    formatText(text) {
      return text && text.length > 9 ? text.substring(0, 9) + "..." : text;
    },
    freckleCod() {
      let params = {
        freckleCode: this.land,
      };

      freckleCode2022(params).then((ok) => {
        // console.log(ok, "ppppppp");
        this.filteredData = ok.data;
      });
    },

    listrowl() {
      let params = {
        freckleCode: this.land,
      };
      smzqjd2022(params).then((ok) => {
        let stepObj = [
          { stepName: "核查结果处置建议", stepType: "核查结果处置建议" },
          { stepName: "填报是否已结案", stepType: "填报是否已结案" },
          { stepName: "是否处罚到位", stepType: "是否处罚到位" },
          {
            stepName: "填报是否整改落实到位",
            stepType: "填报是否整改落实到位",
          },
          {
            stepName: "是否申请人民法院强制执行",
            stepType: "是否申请人民法院强制执行",
          },
        ];
        let arr = [];
        let responseData = ok.data;
        for (let i in responseData) {
          arr.push({ [i]: responseData[i] });
        }

        let stepArr = [];
        stepObj.map((item, index) => {
          let obj = {};
          obj.stepName = item.stepName;
          obj.stepType = item.stepType;
          arr.map((itm, ind) => {
            if (item.stepType == Object.keys(itm)) {
              obj.stepState = Object.values(itm).join("");
            }
            if (
              this.jdmcp &&
              this.jdmcp.length > 0 &&
              item.stepName === this.jdmcp[0].jdmc
            ) {
              this.activeStep = stepObj.indexOf(item) + 1;
              obj.stepState = "2";
            }
          });
          stepArr.push(obj);
        });
        this.steps = stepArr;
      });
    },

    rehgub() {
      this.activeSteprow = !this.activeSteprow;
    },

    dran() {
      this.centerDialogVisible = true;
    },

    startResize() {
      this.isResizing = true;
      window.addEventListener("mousemove", this.resize);
      window.addEventListener("mouseup", this.stopResize);
    },

    closeviewer() {
      this.showviewer = false;
      loadPhotoMap(null);
    },

    resize(e) {
      if (this.isResizing) {
        const containerWidth = this.$el.clientWidth;
        const minLeftWidth = 100; // 最小左侧宽度（以像素为单位）
        const maxLeftWidth = containerWidth - 100; // 最大左侧宽度（以像素为单位）
        const mouseX = e.clientX;

        if (mouseX >= minLeftWidth && mouseX <= maxLeftWidth) {
          const leftWidthPercent = (mouseX / containerWidth) * 100; // 计算左侧宽度的百分比
          const rightWidthPercent = 100 - leftWidthPercent; // 计算右侧宽度的百分比
          this.leftWidth = `${leftWidthPercent}`; // 使用vw单位设置左侧宽度
          this.rightWidth = `${rightWidthPercent}`; // 使用vw单位设置右侧宽度
        }
      }
    },
    stopResize() {
      this.isResizing = false;
      window.removeEventListener("mousemove", this.resize);
      window.removeEventListener("mouseup", this.stopResize);
    },
    close() {
      this.$router.back();
    },

    handlebnsdgb(newActiveNames) {
      if (newActiveNames.includes("listlandCode")) {
        this.$nextTick(() => {
          const index = this.activeNames.indexOf("listlandCode");
          if (index > -1) {
            this.activeNames.splice(index, 1);
          }
        });
      }
    },
    onSubmit(item) {
      this.showReminder();
      this.submitIntervalId = setInterval(() => {
        this.showReminder();
      }, 5 * 60 * 1000);
      item.fApi.submit((formData, fApi) => {
        Object.entries(formData).forEach(function ([key, value]) {
          if (Array.isArray(value)) {
            // 判断是否为数组
            if (Array.isArray(arr[0])) {
              if (value != undefined) {
                var data = [];
                value.forEach((ele) => {
                  data.push(ele[1]);
                });
                value = data.join(",");
              }
            } else {
              return (value = value.join(","));
            }
          }
        });
        formData.id = item.id;
        axios.put(item.url, formData).then((res) => {
          // 关闭loading
          if (res.data.code == 200) {
            this.$message(res.data.msg);
          } else {
            // this.$message(res.data.msg);
          }
        });
      });
    },
  },
};
</script>
      <style>
.viewer-right {
  width: 300px;
  display: flex;
  flex-direction: column;
  position: relative;
}
.custom-viewer {
  position: relative;
}
.img-updab {
  width: 100%;
  height: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  z-index: 9999;
  position: absolute;
  bottom: 0;
}
.img-updaby {
  display: flex;
  justify-content: space-between;
  width: 98%;
  height: 40px;
  margin: auto;
  background-color: #fff;
  color: #3b3bca;
  /* border: 1px solid #0078d7; */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  line-height: 25px;
  padding: 9px;
  flex-grow: 0;
}
.isSide {
  position: absolute !important;
  top: 210px !important;
  left: 1050px !important;
  /* width: 42% !important; */
  max-height: 600px !important;
  overflow: hidden;
}
</style>
      
      
        <style scoped>
@import url("../../api/map/mapbox-gl/mapbox-gl.css");
.viewer-right {
  width: 300px;
  display: flex;
  flex-direction: column;
  position: relative;
}
.custom-viewer {
  position: relative;
}
.img-updab {
  width: 100%;
  height: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  z-index: 9999;
  position: absolute;
  bottom: 0;
}
.img-updaby {
  display: flex;
  justify-content: space-between;
  width: 98%;
  height: 40px;
  margin: auto;
  background-color: #fff;
  color: #3b3bca;
  /* border: 1px solid #0078d7; */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  line-height: 25px;
  padding: 9px;
  flex-grow: 0;
}
.isSide {
  position: absolute !important;
  top: 210px !important;
  left: 1050px !important;
  /* width: 42% !important; */
  max-height: 600px !important;
  overflow: hidden;
}
</style>
      
      
        <style scoped>
html,
body {
  height: 100%;
  margin: 0;
}
.map {
  position: relative;
}
.mapboxgl-ctrl-logo {
  display: none !important;
}
.custom-title-style {
  /* font-size: 12px; 设置字体大小 */
  font-weight: bold; /* 设置字体粗体 */
  color: #0078d7; /* 设置字体颜色 */
}
.custom-collapse-item >>> .el-collapse-item__header {
  font-size: 16px;
  font-weight: bold;
  color: #0078d7;
}

.htmlheight {
  width: 100%;
  height: calc(100% - 45px);
}
.container {
  width: 100%;
  height: 90%;
  background: white;
}
.main-content {
  width: 100%;
  display: flex;
  align-items: center;
  height: 95%;
  background-color: #ffff;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  justify-content: space-around;
  margin: auto;
}

.left-column {
  width: 50%;
  height: 98%;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
}
.left-column >>> .el-tabs__content {
  height: 691px !important;
}
.left-column >>> .mapboxgl-canvas {
  width: 100% !important;
  height: 100% !important;
}
.right-column {
  width: 48%;
  height: 98%;
  background-color: #fff;
  overflow: auto;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  position: relative;
}
.block {
  height: 18px;
  width: 4px;
  background: #2e83f0;
}
.resizer {
  width: 15px;
  cursor: col-resize;
  background-color: #eee;
  cursor: pointer;
}
.from {
  margin: 10px;
}
.tj {
  text-align: right;
}

.img-container {
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(146px, 1fr));
  gap: 10px;
  overflow-y: auto;
  position: relative;
}
.item-list {
  min-height: 111px;
}
.img-row {
  min-height: 111px;
  position: relative;
}
.img-row > img {
  width: 100%;
  height: 111px;
  object-fit: cover;
  border-radius: 5% 5% 5% 5%;
}

.img-text {
  width: 100%;
  position: absolute;
  bottom: 7px;
  background-color: #363636;
  color: #f0f0f0;
  text-align: center;
  border-radius: 0 0 16% 16%;
  opacity: 0.7;
}
.el-table {
  text-align: center !important;
}
.address-cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}
/* .viewer-right {
        width: 200px;
        height: 100px;
        display: flex;
        flex-direction: column;
        position: relative;
      } */

/* .viewer-updaby {
        width: 50%;
        height: 200px;
        display: flex;
      } */
/* .img-updaby {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        background-color: #e6f0e9;
        color: #3b3bca;
        border: 1px solid #0078d7;
        z-index: 9999;
        line-height: 20px;
        padding: 9px;
        flex-grow: 0;
      } */
/* .viewer-updaby {
        position: absolute;
      } */

.bottom-conter {
  width: 100px;
  display: flex;
  justify-content: space-between;
}

.lopp {
  width: 100px;
  position: absolute;
  right: 0;
}
.upload-demo {
  margin-left: 318px;
}
.teextarea {
  width: 350px;
  margin-top: 10px;
}
.teex {
  display: flex;
  margin: 0 auto;
  width: 67%;
  flex-wrap: wrap;
}

.textarea-rop {
  margin-top: 15px;
  padding-right: 10px;
}
.primarylistshow {
  margin-left: 680px;
  margin-top: 15px;
}
.sticky-tabs-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: white;
}

.scrollable-tab-content {
  height: 700px;
  overflow-y: auto;
}
.nuiop {
  height: 90%;
  display: flex;
  overflow: hidden;
  justify-content: space-evenly;
}
.contentk {
  height: 690px;
}
.nuiop >>> .el-dialog__header {
  background: #0078d7 !important; /* 设置为蓝色 */
  color: #fff;
}

.preview-container {
  width: 100%; /* 或者设置一个固定宽度 */
  max-height: 500px; /* 设置合适的高度 */
  overflow: auto; /* 允许滚动 */
  text-align: center; /* 文字居中，有助于图片居中 */
}

.centered-image {
  max-width: 100%;
  max-height: 80vh; /* 视口高度的 80% */
  object-fit: contain;
  display: block;
  margin: auto;
}
.Cycle {
  background-color: transparent;
  width: 100%;
  height: 760px;
}
.tabListname >>> .el-table__body-wrapper::-webkit-scrollbar {
  height: 8px !important;
}

.tabListname >>> .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #ccc !important; /* 使用 !important 提高优先级 */
  border-radius: 3px;
}

.tabListname >>> .el-table__body-wrapper::-webkit-scrollbar-track {
  background-color: #ccc !important;
}
/* .titleStepColor {
          color: red !important;
        } */
.landCoderowe {
  display: flex;
  font-size: 17px;
  width: 100%;
  height: 40px;
  line-height: 40px;
}
.rowpo {
  width: 5%;
  margin-top: 10px;
}
.container-rehgub {
  border-top: 1.1rem solid transparent;
  border-bottom: 1.1rem solid transparent;
  border-right: 1.25rem solid black;
}
.rehgublist {
  display: flex;
  justify-content: space-evenly;
}
.rpouttr {
  width: 100%;
}
.rpouttr >>> .el-steps {
  height: 20px;
}
.rpouttr >>> .el-step__main {
  white-space: nowrap;
}
.rpouttr >>> .el-steps--simple {
  background-color: #fff;
}
.landCode >>> .el-collapse-item__header {
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
}
.page-header {
  height: 40px;
  width: 100%;
}
.title-text {
  font-size: 16px;
  margin-left: 10px;
}
.image-viewerlo {
  height: 70%;
  width: 30%;
}
.margin-top >>> .el-descriptions__title {
  color: rgb(106, 106, 245);
}

.customcollapse >>> .el-collapse-item__header {
  color: white;
  font-size: 17px;
  background-color: #409eff !important;
  display: flex;
}
.my-label >>> .el-descriptions-item__label.is-bordered-label {
  background-color: #f3f9ff;
  color: #000;
  font-weight: bold;
  font-size: 13px;
  width: 207px;
}
.my-label >>> .el-descriptions__title {
  color: rgb(64, 158, 255);
  font-size: 14px;
}
.my-label >>> .el-descriptions-item__cell {
  width: 200px;
}
.el-wheader >>> .el-table__header {
  display: none !important;
}
.Header-box {
  width: 100%;
}

.liet-item {
  padding: 10px;

  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.liet-item.selected {
  background-color: blue;
  color: white;
}
.landCodeList-top {
  cursor: pointer;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px 15px;
}
</style>
        