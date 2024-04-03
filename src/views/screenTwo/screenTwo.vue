<template>
  <el-popover placement="right" width="350" trigger="manual" v-model="visible">
    <div style="height: 400px; overflow-y: auto; overflow-x: hidden">
      <form-create
        v-model="fApi"
        :rule="rule"
        :option="option"
        :value.sync="value"
        @submit="onSubmit"
      ></form-create>
    </div>
    <el-button slot="reference" type="primary" @click="visible = !visible">
      条件筛选
    </el-button>
  </el-popover>
</template>

<script>
import CufreckleInfractionFarmlandMinInput from "../freckleInfractionFarmlandMin/freckleInfractionFarmlandMin.vue";
import { options } from "../../api/document/index";
export default {
  components: {
    CufreckleInfractionFarmlandMinInput,
  },
  data() {
    return {
      visible: false,
      fApi: {},
      freckleCategory: [],
      freckleType: [],
      kjlx: [],
      wflx: [],
      pdlx: [],
      hcfs: [],
      SHYJ: [],
      sfwttb: [],
      tabloList: [],
      checkDetermineResult: "",
      cancelStatus: [],
      change: [],
      specialArea: [],
      landType: [],
      landWriteTypes: [],
      qtjtqx: [],
      //表单生成规则
      rule: [],
      //组件参数配置
      option: {
        resetBtn: {
          show: true,
          innerText: "重置",
        },
        submitBtn: {
          innerText: "确定",
          show: true,
        },

        form: {
          hideRequiredMark: false,
          layout: "horizontal", //inline
          labelAlign: "left",
        },
      },
      value: {},
    };
  },
  mounted() {
    this.getData();
    document.addEventListener("click", this.handleOutsideClick);
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
      formData["deductionType"] = formData["deductionType"].join(",");
      formData["illegalityType"] = formData["illegalityType"].join(",");
      formData["cancelStatus"] = formData["cancelStatus"].join(",");
      formData["pdlx"] = formData["pdlx"].join(",");
      formData["checkDetermineResult"] =
        formData["checkDetermineResult"].join(",");
      formData["checkMethod"] = formData["checkMethod"].join(",");
      formData["tabloList"] = formData["tabloList"].join(",");
      formData["SHYJ"] = formData["SHYJ"].join(",");
      formData["qtjtqx"] = formData["qtjtqx"].join(",");
      formData["sfwttb"] = formData["sfwttb"].join(",");
      this.$emit("getData", formData);
      this.visible = false;
    },
    getData() {
      options().then((res) => {
        if (res.code == 200) {
          res.data.WFLX.forEach((ele) => {
            this.wflx.push({ value: ele, label: ele });
          });
          res.data.KJLX.forEach((ele) => {
            this.kjlx.push({ value: ele, label: ele });
          });
          res.data.QTJTQX.forEach((ele) => {
            this.qtjtqx.push({ value: ele, label: ele });
          });
          res.data.XHZT.forEach((ele) => {
            this.cancelStatus.push({ value: ele, label: ele });
          });
          res.data.PDJG.forEach((ele) => {
            this.pdlx.push({ value: ele, label: ele });
          });
          res.data.HCFS.forEach((ele) => {
            // const value = ele === "空" ? "" : ele;
            this.hcfs.push({ value: ele, label: ele });
          });
          res.data.SHYJ.forEach((ele) => {
            this.SHYJ.push({ value: ele, label: ele });
          });
          res.data.SMZQJD.forEach((ele) => {
            this.tabloList.push({ value: ele, label: ele });
          });
          res.data.SFWTTB.forEach((ele) => {
            this.sfwttb.push({ value: ele, label: ele });
          });
          this.rule = [
            {
              type: "select",
              field: "sfwttb",
              title: "是否问题图斑",
              col: {
                // span: 12,
              },
              options: this.sfwttb,
              props: {
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
            },
            {
              type: "select",
              field: "cancelStatus",
              title: "销号状态",
              col: {
                // span: 12,
              },
              options: this.cancelStatus,
              props: {
                placeholder: "销号状态",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
            },
            {
              type: "select",
              field: "pdlx",
              title: "原判定类型",
              col: {
                // span: 12,
              },
              options: this.pdlx,
              props: {
                placeholder: "系统填报判定类型",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
            },
            {
              type: "select",
              field: "checkDetermineResult",
              title: "核查后判定类型",
              col: {
                // span: 12,
              },
              options: this.pdlx,
              props: {
                placeholder: "核查后判定类型",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
            },
            {
              type: "select",
              field: "checkMethod",
              title: "核查方式",
              col: {
                // span: 12,
              },
              options: this.hcfs,
              props: {
                placeholder: "核查方式",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
            },
            {
              type: "select",
              field: "deductionType",
              title: "扣减类型",
              col: {
                // span: 12,
              },
              options: this.kjlx,
              props: {
                placeholder: "扣减类型",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
            },
            {
              type: "select",
              field: "illegalityType",
              title: "违法类型",
              col: {
                // span: 12,
              },
              options: this.wflx,
              props: {
                placeholder: "违法类型",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
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
            },
            {
              type: "select",
              field: "SHYJ",
              title: "省级审核意见",
              col: {
                // span: 12,
              },
              options: this.SHYJ,
              props: {
                placeholder: "省级审核意见",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
            },
            {
              type: "select",
              field: "tabloList",
              title: "当前生命周期节点",
              col: {
                // span: 12,
              },
              options: this.tabloList,
              props: {
                placeholder: "当前生命周期节点",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
            },
          ];
        }
      });
    },
  },
};
</script>
<style lang='less' scoped>
/deep/ .el-input--medium .el-input__inner {
  height: 32px;
  line-height: 36px;
}
</style>