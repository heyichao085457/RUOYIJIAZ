<template>
  <el-popover
    placement="right"
    width="383"
    trigger="manual"
    v-model="visible"
    class="custom-popover"
  >
    <div style="height: 600px; overflow-y: auto; overflow-x: hidden">
      <form-create
        v-model="fApi"
        :rule="rule"
        :option="option"
        :value.sync="value"
        @submit="onSubmit"
        class="from"
      >
      </form-create>
      <div class="listruo">
        <el-button class="flel" type="primary" @click="submitForm">
          确定
        </el-button>
        <el-button type="primary" @click="visible = false"> 取消 </el-button>
      </div>
    </div>
    <el-button slot="reference" type="primary" @click="visible = !visible">
      条件筛选
    </el-button>
  </el-popover>
</template>
  
  <script>
import CufreckleInfractionFarmlandMinInput from "../freckleInfractionFarmlandMin/freckleInfr.vue";
import { DropdownBoXContent } from "../../api/document/index";
export default {
  components: {
    CufreckleInfractionFarmlandMinInput,
  },
  data() {
    return {
      SFWYHC: [],
      tbfl: [],
      xhzt: [],
      tbly: [],
      hchlxx: [],
      initialValue: "",
      receivedValue: "",
      selectedCondition: "",
      visible: false,
      fApi: {},
      freckleCategory: [],
      freckleType: [],
      sfnrwfjs: [],
      wyzt: [],
      pdlx: [],
      SHENGJIDXJG: [],
      shijidxjg: [],
      sfwttb: [],
      tabloList: [],
      checkDetermineResult: "",
      hcjd: [],
      change: [],
      specialArea: [],
      landType: [],
      landWriteTypes: [],
      tblx: [],
      xmlx: [],
      zglsqk: [],
      WFZL: [],
      //表单生成规则
      rule: [],
      //组件参数配置
      option: {
        resetBtn: {
          show: false,
          innerText: "重置",
        },
        submitBtn: {
          innerText: "确定",
          show: false,
        },
        form: {
          hideRequiredMark: false,
          layout: "horizontal", //inline
          labelAlign: "left",
        },
      },
      value: {},
      qtjtqx: [],
      hfjtqx: [],
      sjyt: [],
      NESHWTLX: [],
      cxbhlx: [],
      sfcxbh: [],
      WTLY: [],
    };
  },
  mounted() {
    this.getData();
    document.addEventListener("click", this.handleOutsideClick);
    this.$nextTick(() => {
      const popover = document.querySelector(".custom-popover .el-popover");
      if (popover) {
        popover.style.height = "700px";
      }
    });
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleOutsideClick);
  },
  methods: {
    handleOutsideClick(event) {
      if (!this.$el.contains(event.target)) {
        this.visible = false;
      }
    },
    onSubmit(formData) {
      // console.log(formData, "formData");
      formData["wyzt"] = Array.isArray(formData["wyzt"])
        ? formData["wyzt"].join(",")
        : "";
      formData["deductionType"] = Array.isArray(formData["deductionType"])
        ? formData["deductionType"].join(",")
        : "";
      formData["tblx"] = Array.isArray(formData["tblx"])
        ? formData["tblx"].join(",")
        : "";
      formData["checkMethod"] = Array.isArray(formData["checkMethod"])
        ? formData["checkMethod"].join(",")
        : "";
      formData["illegalityType"] = Array.isArray(formData["illegalityType"])
        ? formData["illegalityType"].join(",")
        : "";
      formData["hchlxx"] = Array.isArray(formData["hchlxx"])
        ? formData["hchlxx"].join(",")
        : "";
      formData["sfwttb"] = Array.isArray(formData["sfwttb"])
        ? formData["sfwttb"].join(",")
        : "";
      formData["qbtbCancelstatus"] = Array.isArray(formData["qbtbCancelstatus"])
        ? formData["qbtbCancelstatus"].join(",")
        : "";
      formData["xhzt"] = Array.isArray(formData["xhzt"])
        ? formData["xhzt"].join(",")
        : "";
      formData["tbly"] = Array.isArray(formData["tbly"])
        ? formData["tbly"].join(",")
        : "";
      formData["tbfl"] = Array.isArray(formData["tbfl"])
        ? formData["tbfl"].join(",")
        : "";
      formData["hcjd"] = Array.isArray(formData["hcjd"])
        ? formData["hcjd"].join(",")
        : "";
      formData["xmlx"] = Array.isArray(formData["xmlx"])
        ? formData["xmlx"].join(",")
        : "";
      formData["zglsqk"] = Array.isArray(formData["zglsqk"])
        ? formData["zglsqk"].join(",")
        : "";
      formData["qtjtqx"] = Array.isArray(formData["qtjtqx"])
        ? formData["qtjtqx"].join(",")
        : "";
      formData["hfjtqx"] = Array.isArray(formData["hfjtqx"])
        ? formData["hfjtqx"].join(",")
        : "";
      formData["sjyt"] = Array.isArray(formData["sjyt"])
        ? formData["sjyt"].join(",")
        : "";
      formData["SFWYHC"] = Array.isArray(formData["SFWYHC"])
        ? formData["SFWYHC"].join(",")
        : "";
      formData["NESHWTLX"] = Array.isArray(formData["NESHWTLX"])
        ? formData["NESHWTLX"].join(",")
        : "";

      formData["WFZL"] = Array.isArray(formData["WFZL"])
        ? formData["WFZL"].join(",")
        : "";
      formData["cxbhlx"] = Array.isArray(formData["cxbhlx"])
        ? formData["cxbhlx"].join(",")
        : "";
      formData["sfcxbh"] = Array.isArray(formData["sfcxbh"])
        ? formData["sfcxbh"].join(",")
        : "";
        formData["WTLY"] = Array.isArray(formData["WTLY"])
        ? formData["WTLY"].join(",")
        : "";
      this.$emit("getData", formData);
      this.visible = false;
    },
    submitForm(formData1) {
      this.fApi.submit((formData) => {
        this.onSubmit(formData);
      });
    },
    getData() {
      DropdownBoXContent().then((res) => {
        // console.log(res, "res");
        if (res.code == 200) {
          res.data.NESHWTLX.forEach((ele) => {
            this.NESHWTLX.push({ value: ele, label: ele });
          });
          res.data.WYZT.forEach((ele) => {
            this.wyzt.push({ value: ele, label: ele });
          });
          res.data.SFNRWFJS.forEach((ele) => {
            this.sfnrwfjs.push({ value: ele, label: ele });
          });
          res.data.PDLX.forEach((ele) => {
            this.tblx.push({ value: ele, label: ele });
          });
          res.data.HCJD.forEach((ele) => {
            this.hcjd.push({ value: ele, label: ele });
          });
          res.data.PDLX.forEach((ele) => {
            this.pdlx.push({ value: ele, label: ele });
          });
          res.data.SHENGJIDXJG.forEach((ele) => {
            // const value = ele === "空" ? "" : ele;
            this.SHENGJIDXJG.push({ value: ele, label: ele });
          });
          res.data.SHIJIDXJG.forEach((ele) => {
            this.shijidxjg.push({ value: ele, label: ele });
          });
          res.data.HCHLX.forEach((ele) => {
            // console.log(ele);HCHLX
            this.hchlxx.push({ value: ele, label: ele });
          });
          res.data.SFWTTB.forEach((ele) => {
            this.sfwttb.push({ value: ele, label: ele });
          });
          res.data.TBLY.forEach((ele) => {
            this.tbly.push({ value: ele, label: ele });
          });
          res.data.XHZT.forEach((ele) => {
            this.xhzt.push({ value: ele, label: ele });
          });
          res.data.TBFL.forEach((ele) => {
            this.tbfl.push({ value: ele, label: ele });
          });
          res.data.XMLX.forEach((ele) => {
            this.xmlx.push({ value: ele, label: ele });
          });
          res.data.ZGLSQK.forEach((ele) => {
            this.zglsqk.push({ value: ele, label: ele });
          });
          res.data.QTJTQX.forEach((ele) => {
            this.qtjtqx.push({ value: ele, label: ele });
          });
          res.data.HFJTQX.forEach((ele) => {
            this.hfjtqx.push({ value: ele, label: ele });
          });
          res.data.SJYT.forEach((ele) => {
            this.sjyt.push({ value: ele, label: ele });
          });
          res.data.SFWYHC.forEach((ele) => {
            this.SFWYHC.push({ value: ele, label: ele });
          });

          res.data.WFZL.forEach((ele) => {
            this.WFZL.push({ value: ele, label: ele });
          });
          res.data.CXBHLX.forEach((ele) => {
            this.cxbhlx.push({ value: ele, label: ele });
          });
          res.data.SFCXBH.forEach((ele) => {
            this.sfcxbh.push({ value: ele, label: ele });
          });
          res.data.WTLY.forEach((ele) => {
            this.WTLY.push({ value: ele, label: ele });
          });
          this.rule = [
            {
              type: "select",
              field: "sfwttb",
              title: "问题图斑",
              col: {
                // span: 12,
              },
              options: this.sfwttb,
              props: {
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "deductionType",
              title: "纳入违法计算",
              col: {
                // span: 12,
              },
              options: this.sfnrwfjs,
              props: {
                placeholder: "纳入违法计算",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "tblx",
              title: "判定类型",
              col: {
                // span: 12,
              },
              options: this.tblx,
              props: {
                placeholder: "判定类型",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "tbfl",
              title: "图斑分类",
              col: {
                // span: 12,
              },
              options: this.tbfl,
              props: {
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "hchlxx",
              title: "核查后类型",
              col: {
                // span: 12,
              },
              options: this.hchlxx,
              props: {
                placeholder: "核查后类型",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "tbly",
              title: "图斑来源",
              col: {
                // span: 12,
              },
              options: this.tbly,
              props: {
                placeholder: "图斑来源",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "CufreckleInfractionFarmlandMinInput", // 自定义组件的名字
              field: "MinMax",
              title: "地块面积:",
              component: CufreckleInfractionFarmlandMinInput,
              value: "",
              col: {
                span: 24,
              },
              class: "form-item-spacing",
            },
            {
              type: "CufreckleInfractionFarmlandMinInput", // 自定义组件的名字
              field: "freck",
              title: "耕地面积:",
              component: CufreckleInfractionFarmlandMinInput,
              value: "",
              col: {
                span: 24,
              },
              class: "form-item-spacing",
            },
            {
              type: "CufreckleInfractionFarmlandMinInput", // 自定义组件的名字
              field: "Cufreck",
              title: "农田面积:",
              component: CufreckleInfractionFarmlandMinInput,
              value: "",
              col: {
                span: 24,
              },
              class: "form-item-spacing",
            },

            {
              type: "select",
              field: "illegalityType",
              title: "市级定性结果",
              col: {
                // span: 12,
              },
              options: this.shijidxjg,
              props: {
                placeholder: "市级定性结果",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "checkMethod",
              title: "省级定性结果",
              col: {
                // span: 12,
              },
              options: this.SHENGJIDXJG,
              props: {
                placeholder: "省级定性结果",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "qbtbCancelstatus",
              title: "销号状态",
              col: {
                // span: 12,
              },
              options: this.xhzt,
              props: {
                placeholder: "销号状态",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "hcjd",
              title: "核查阶段",
              col: {
                // span: 12,
              },
              options: this.hcjd,
              props: {
                placeholder: "核查阶段",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "xmlx",
              title: "项目类型",
              col: {
                // span: 12,
              },
              options: this.xmlx,
              props: {
                placeholder: "项目类型",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "zglsqk",
              title: "整改落实情况",
              col: {
                // span: 12,
              },
              options: this.zglsqk,
              props: {
                placeholder: "整改落实情况",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "qtjtqx",
              title: "其他具体情形",
              col: {
                // span: 12,
              },
              options: this.qtjtqx,
              props: {
                placeholder: "其他具体情形",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "hfjtqx",
              title: "合法具体情形",
              col: {
                // span: 12,
              },
              options: this.hfjtqx,
              props: {
                placeholder: "合法具体情形",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "sjyt",
              title: "实际用途",
              col: {
                // span: 12,
              },
              options: this.sjyt,
              props: {
                placeholder: "实际用途",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "SFWYHC",
              title: "是否外业核查",
              col: {
                // span: 12,
              },
              options: this.SFWYHC,
              props: {
                placeholder: "是否外业核查",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "NESHWTLX",
              title: "审核问题类型",
              col: {
                // span: 12,
              },
              options: this.NESHWTLX,
              props: {
                placeholder: "审核问题类型",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "WFZL",
              title: "违法子类",
              col: {
                // span: 12,
              },
              options: this.WFZL,
              props: {
                placeholder: "违法子类",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "cxbhlx",
              title: "持续变化类型",
              col: {
                // span: 12,
              },
              options: this.cxbhlx,
              props: {
                placeholder: "持续变化类型",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "sfcxbh",
              title: "是否持续变化",
              col: {
                // span: 12,
              },
              options: this.sfcxbh,
              props: {
                placeholder: "是否持续变化",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "WTLY",
              title: "问题来源",
              col: {
                // span: 12,
              },
              options: this.WTLY,
              props: {
                placeholder: "问题来源",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
          ];
        }
      });
    },
  },
};
</script>
  <style scoped>
/deep/ .el-input--medium .el-input__inner {
  height: 32px;
  line-height: 36px;
}
.from >>> .el-col-24 {
  height: 43px !important;
}
.listruo {
  width: 89%;
  height: 40px;
  background-color: #fff;
  display: flex;
  justify-content: space-evenly;
  position: absolute;
  bottom: 4px;
}
.flel {
  margin-left: 86px;
}
</style>