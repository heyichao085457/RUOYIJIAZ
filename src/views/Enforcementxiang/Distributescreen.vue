<template>
  <el-popover
    placement="right"
    width="383"
    trigger="manual"
    v-model="visible"
    class="custom-popover"
  >
    <div style="height: 400px; overflow-y: auto; overflow-x: hidden">
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
import { DropdownBoxXftb } from "../../api/document/index";
export default {
  components: {
    CufreckleInfractionFarmlandMinInput,
  },
  data() {
    return {
      jzzt: [],
      hcpcjsj: [],
      wfzl: [],
      hchlxx: [],
      initialValue: "",
      receivedValue: "",
      selectedCondition: "",
      visible: false,
      fApi: {},
      freckleCategory: [],
      freckleType: [],
      tbhcjd: [],
      wyzt: [],
      wyhcCancelStatus: [],
      SHENGJIDXJG: [],
      wyhcSfnrwfjs: [],
      tblx: [],
      tabloList: [],
      checkDetermineResult: "",
      zzyj: [],
      change: [],
      specialArea: [],
      landType: [],
      landWriteTypes: [],
      hczt: [],
      cxbhlx: [],
      xftblx: [],
      sfcf: [],
      tbfl: [],
      wyzt: [],
      hcjd: [],
      hczt: [],
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
    };
  },
  mounted() {
    this.getData();
    document.addEventListener("click", this.handleOutsideClick);
    this.$nextTick(() => {
      const popover = document.querySelector(".custom-popover .el-popover");
      if (popover) {
        popover.style.height = "400px";
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
      formData["cxbhlx"] = Array.isArray(formData["cxbhlx"])
        ? formData["cxbhlx"].join(",")
        : "";
      formData["sfcf"] = Array.isArray(formData["sfcf"])
        ? formData["sfcf"].join(",")
        : "";
      formData["xftblx"] = Array.isArray(formData["xftblx"])
        ? formData["xftblx"].join(",")
        : "";
      formData["tbfl"] = Array.isArray(formData["tbfl"])
        ? formData["tbfl"].join(",")
        : "";
      formData["wyzt"] = Array.isArray(formData["wyzt"])
        ? formData["wyzt"].join(",")
        : "";
      formData["hcjd"] = Array.isArray(formData["hcjd"])
        ? formData["hcjd"].join(",")
        : "";
      formData["hczt"] = Array.isArray(formData["hczt"])
        ? formData["hczt"].join(",")
        : "";
      this.$emit("getData", formData);
      this.visible = false;
    },
    submitForm() {
      this.fApi.submit((formData) => {
        this.onSubmit(formData);
      });
    },
    getData() {
      DropdownBoxXftb().then((res) => {
        // console.log(res, "res");
        if (res.code == 200) {
          res.data.CXBHLX.forEach((ele) => {
            this.cxbhlx.push({ value: ele, label: ele });
          });

          res.data.XFTBLX.forEach((ele) => {
            this.xftblx.push({ value: ele, label: ele });
          });
          res.data.SFCF.forEach((ele) => {
            this.sfcf.push({ value: ele, label: ele });
          });

          res.data.TBFL.forEach((ele) => {
            this.tbfl.push({ value: ele, label: ele });
          });
          res.data.WYZT.forEach((ele) => {
            this.wyzt.push({ value: ele, label: ele });
          });
          res.data.HCJD.forEach((ele) => {
            this.hcjd.push({ value: ele, label: ele });
          });
          res.data.HCZT.forEach((ele) => {
            this.hczt.push({ value: ele, label: ele });
          });

          this.rule = [
            {
              type: "select",
              field: "cxbhlx",
              title: "持续变化类型",
              col: {
                // span: 12,
              },
              options: this.cxbhlx,
              props: {
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "xftblx",
              title: "下发图斑类型",
              col: {
                // span: 12,
              },
              options: this.xftblx,
              props: {
                placeholder: "下发图斑类型",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "sfcf",
              title: "是否拆分",
              col: {
                // span: 12,
              },
              options: this.sfcf,
              props: {
                placeholder: "是否拆分",
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
              field: "wyzt",
              title: "外业状态",
              col: {
                // span: 12,
              },
              options: this.wyzt,
              props: {
                placeholder: "外业状态",
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
              field: "hczt",
              title: "核查状态",
              col: {
                // span: 12,
              },
              options: this.hczt,
              props: {
                placeholder: "核查状态",
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