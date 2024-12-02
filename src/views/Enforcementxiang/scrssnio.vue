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
import { DropdownTb } from "../../api/document/index";
export default {
  components: {
    CufreckleInfractionFarmlandMinInput,
  },
  data() {
    return {
      HFPDXJG: [],
      TBLX: [],
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
      // console.log(formData, "formData");

      formData["HFPDXJG"] = Array.isArray(formData["HFPDXJG"])
        ? formData["HFPDXJG"].join(",")
        : "";
      formData["TBLX"] = Array.isArray(formData["TBLX"])
        ? formData["TBLX"].join(",")
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
      DropdownTb().then((res) => {
        // console.log(res, "res");
        if (res.code == 200) {
          res.data.HFPDXJG.forEach((ele) => {
            this.HFPDXJG.push({ value: ele, label: ele });
          });
          res.data.TBLX.forEach((ele) => {
            this.TBLX.push({ value: ele, label: ele });
          });

          this.rule = [
            {
              type: "select",
              field: "HFPDXJG",
              title: "合法性判定结果",
              col: {
                // span: 12,
              },
              options: this.HFPDXJG,
              props: {
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "TBLX",
              title: "图斑类型",
              col: {
                // span: 12,
              },
              options: this.TBLX,
              props: {
                placeholder: "图斑类型",
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