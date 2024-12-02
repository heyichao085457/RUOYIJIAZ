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
import { DropdownBoXContent } from "../../api/document/index";
export default {
  components: {
    CufreckleInfractionFarmlandMinInput,
  },
  data() {
    return {
      cancelStatus: [],
      SFXH: [],
      jzjzZzyj: [],
      jzjzSfnrwfjs: [],
      initialValue: "",
      receivedValue: "",
      selectedCondition: "",
      visible: false,
      fApi: {},
      freckleCategory: [],
      freckleType: [],
      wtlx: [],
      wyzt: [],
      jzjd: [],
      wyhcCancelStatus: [],
      SHENGJIDXJG: [],
      wyhcSfnrwfjs: [],
      jzjzPdlx: [],
      tabloList: [],
      checkDetermineResult: "",
      zzyj: [],
      change: [],
      specialArea: [],
      landType: [],
      landWriteTypes: [],
      jzjzHchlx: [],
      hcrwmc: [],
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
        popover.style.height = "450px";
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

      formData["checkMethod"] = Array.isArray(formData["checkMethod"])
        ? formData["checkMethod"].join(",")
        : "";
      formData["illegalityType"] = Array.isArray(formData["illegalityType"])
        ? formData["illegalityType"].join(",")
        : "";
      formData["jzjzSfnrwfjs"] = Array.isArray(formData["jzjzSfnrwfjs"])
        ? formData["jzjzSfnrwfjs"].join(",")
        : "";
      formData["jzjzPdlx"] = Array.isArray(formData["jzjzPdlx"])
        ? formData["jzjzPdlx"].join(",")
        : "";
      formData["qbtbCancelstatus"] = Array.isArray(formData["qbtbCancelstatus"])
        ? formData["qbtbCancelstatus"].join(",")
        : "";

      formData["jzjzZzyj"] = Array.isArray(formData["jzjzZzyj"])
        ? formData["jzjzZzyj"].join(",")
        : "";
      formData["cancelStatus"] = Array.isArray(formData["cancelStatus"])
        ? formData["cancelStatus"].join(",")
        : "";
      formData["jzjzHchlx"] = Array.isArray(formData["jzjzHchlx"])
        ? formData["jzjzHchlx"].join(",")
        : "";
      formData["wtlx"] = Array.isArray(formData["wtlx"])
        ? formData["wtlx"].join(",")
        : "";
      formData["wyhcCancelStatus"] = Array.isArray(formData["wyhcCancelStatus"])
        ? formData["wyhcCancelStatus"].join(",")
        : "";
      formData["zzyj"] = Array.isArray(formData["zzyj"])
        ? formData["zzyj"].join(",")
        : "";
      formData["wyhcSfnrwfjs"] = Array.isArray(formData["wyhcSfnrwfjs"])
        ? formData["wyhcSfnrwfjs"].join(",")
        : "";
      formData["hcrwmc"] = Array.isArray(formData["hcrwmc"])
        ? formData["hcrwmc"].join(",")
        : "";
      formData["SFXH"] = Array.isArray(formData["SFXH"])
        ? formData["SFXH"].join(",")
        : "";
      formData["jzjd"] = Array.isArray(formData["jzjd"])
        ? formData["jzjd"].join(",")
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
      DropdownBoXContent().then((res) => {
        // console.log(res, "res");
        if (res.code == 200) {
          res.data.WTLX.forEach((ele) => {
            this.wtlx.push({ value: ele, label: ele });
          });

          res.data.ZZYJ.forEach((ele) => {
            this.jzjzZzyj.push({ value: ele, label: ele });
          });

          res.data.SFNRWFJS.forEach((ele) => {
            this.jzjzSfnrwfjs.push({ value: ele, label: ele });
          });

          res.data.PDLX.forEach((ele) => {
            this.jzjzPdlx.push({ value: ele, label: ele });
          });
          res.data.HCRWMC.forEach((ele) => {
            this.hcrwmc.push({ value: ele, label: ele });
          });
          res.data.HCHLX.forEach((ele) => {
            this.jzjzHchlx.push({ value: ele, label: ele });
          });

          res.data.XHZT.forEach((ele) => {
            this.cancelStatus.push({ value: ele, label: ele });
          });
          res.data.SFXH.forEach((ele) => {
            this.SFXH.push({ value: ele, label: ele });
          });
          res.data.JZJD.forEach((ele) => {
            this.jzjd.push({ value: ele, label: ele });
          });
          this.rule = [
            {
              type: "select",
              field: "jzjzPdlx",
              title: "判定类型",
              col: {
                // span: 12,
              },
              options: this.jzjzPdlx,
              props: {
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "hcrwmc",
              title: "核查批次及时间",
              col: {
                // span: 12,
              },
              options: this.hcrwmc,
              props: {
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "wtlx",
              title: "问题类型",
              col: {
                // span: 12,
              },
              options: this.wtlx,
              props: {
                placeholder: "问题类型",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "jzjzHchlx",
              title: "核查后类型",
              col: {
                // span: 12,
              },
              options: this.jzjzHchlx,
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
              field: "cancelStatus",
              title: "销号状态",
              col: {
                // span: 12,
              },
              options: this.cancelStatus,
              props: {
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "jzjzSfnrwfjs",
              title: "纳入违法计算",
              col: {
                // span: 12,
              },
              options: this.jzjzSfnrwfjs,
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
              field: "jzjzZzyj",
              title: "最终意见",
              col: {
                // span: 12,
              },
              options: this.jzjzZzyj,
              props: {
                placeholder: "最终意见",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "SFXH",
              title: "是否销号",
              col: {
                // span: 12,
              },
              options: this.SFXH,
              props: {
                placeholder: "是否销号",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "jzjd",
              title: "举证阶段",
              col: {
                // span: 12,
              },
              options: this.jzjd,
              props: {
                placeholder: "举证阶段",
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