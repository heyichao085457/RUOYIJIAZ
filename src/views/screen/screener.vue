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
import { DropWzgtb } from "../../api/document/index";
export default {
  data() {
    return {
      SFWYHC: [],
      sflacc: [],
      sffhsqsxhdcg: [],
      sfzglsdw: [],
      sfja: [],
      initialValue: "",
      receivedValue: "",
      selectedCondition: "",
      visible: false,
      fApi: {},
      freckleCategory: [],
      freckleType: [],
      sffzyq: [],
      wyzt: [],
      pdlx: [],
      sfjbbptj: [],
      sfnr: [],
      sfbzxajgcjs: [],
      tabloList: [],
      checkDetermineResult: "",
      sfynrcpkffa: [],
      change: [],
      specialArea: [],
      landType: [],
      landWriteTypes: [],
      sfmsgc: [],
      nccfg: [],
      year: [],
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
        popover.style.height = "360px";
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
      formData["sfmsgc"] = Array.isArray(formData["sfmsgc"])
        ? formData["sfmsgc"].join(",")
        : "";
      formData["checkMethod"] = Array.isArray(formData["checkMethod"])
        ? formData["checkMethod"].join(",")
        : "";
      formData["illegalityType"] = Array.isArray(formData["illegalityType"])
        ? formData["illegalityType"].join(",")
        : "";
      formData["sfja"] = Array.isArray(formData["sfja"])
        ? formData["sfja"].join(",")
        : "";
      formData["sfbzxajgcjs"] = Array.isArray(formData["sfbzxajgcjs"])
        ? formData["sfbzxajgcjs"].join(",")
        : "";
      formData["qbtbCancelstatus"] = Array.isArray(formData["qbtbCancelstatus"])
        ? formData["qbtbCancelstatus"].join(",")
        : "";
      formData["sffhsqsxhdcg"] = Array.isArray(formData["sffhsqsxhdcg"])
        ? formData["sffhsqsxhdcg"].join(",")
        : "";
      formData["sfzglsdw"] = Array.isArray(formData["sfzglsdw"])
        ? formData["sfzglsdw"].join(",")
        : "";
      formData["sflacc"] = Array.isArray(formData["sflacc"])
        ? formData["sflacc"].join(",")
        : "";
      formData["sfynrcpkffa"] = Array.isArray(formData["sfynrcpkffa"])
        ? formData["sfynrcpkffa"].join(",")
        : "";
      formData["nccfg"] = Array.isArray(formData["nccfg"])
        ? formData["nccfg"].join(",")
        : "";
      formData["year"] = Array.isArray(formData["year"])
        ? formData["year"].join(",")
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

      formData["sfjbbptj"] = Array.isArray(formData["sfjbbptj"])
        ? formData["sfjbbptj"].join(",")
        : "";
      formData["sffzyq"] = Array.isArray(formData["sffzyq"])
        ? formData["sffzyq"].join(",")
        : "";
      formData["sfnr"] = Array.isArray(formData["sfnr"])
        ? formData["sfnr"].join(",")
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
      DropWzgtb().then((res) => {
        if (res.code == 200) {
          res.data.实际用途.forEach((ele) => {
            this.sjyt.push({ value: ele, label: ele });
          });
          res.data.是否防治疫情.forEach((ele) => {
            this.sffzyq.push({ value: ele, label: ele });
          });
          res.data.是否民生工程.forEach((ele) => {
            this.sfmsgc.push({ value: ele, label: ele });
          });
          // res.data.是否已纳入成片开发方案.forEach((ele) => {
          //   this.sfynrcpkffa.push({ value: ele, label: ele });
          // });
          // res.data.是否具备报批条件.forEach((ele) => {
          //   this.sfjbbptj.push({ value: ele, label: ele });
          // });
          // res.data.是否纳入.forEach((ele) => {
          //   this.sfnr.push({ value: ele, label: ele });
          // });
          // res.data.是否结案.forEach((ele) => {
          //   this.sfja.push({ value: ele, label: ele });
          // });
          res.data.是否保障性安居工程建设.forEach((ele) => {
            this.sfbzxajgcjs.push({ value: ele, label: ele });
          });
          res.data.是否整改落实到位.forEach((ele) => {
            this.sfzglsdw.push({ value: ele, label: ele });
          });
          // res.data.是否符合三区三线划定成果.forEach((ele) => {
          //   this.sffhsqsxhdcg.push({ value: ele, label: ele });
          // });
          // res.data.是否立案查处.forEach((ele) => {
          //   this.sflacc.push({ value: ele, label: ele });
          // });
          // res.data.拟拆除复垦.forEach((ele) => {
          //   this.nccfg.push({ value: ele, label: ele });
          // });
          res.data.年度.forEach((ele) => {
            this.year.push({ value: ele, label: ele });
          });

          this.rule = [
            {
              type: "select",
              field: "sjyt",
              title: "实际用途",
              col: {
                // span: 12,
              },
              options: this.sjyt,
              props: {
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "sfbzxajgcjs",
              title: "是否工程建设",
              col: {
                // span: 12,
              },
              options: this.sfbzxajgcjs,
              props: {
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "sffzyq",
              title: "是否防治疫情",
              col: {
                // span: 12,
              },
              options: this.sffzyq,
              props: {
                placeholder: "是否防治疫情",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            {
              type: "select",
              field: "sfmsgc",
              title: "是否民生工程",
              col: {
                // span: 12,
              },
              options: this.sfmsgc,
              props: {
                placeholder: "是否民生工程",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },
            // {
            //   type: "select",
            //   field: "sflacc",
            //   title: "是否立案查处",
            //   col: {
            //     // span: 12,
            //   },
            //   options: this.sflacc,
            //   props: {
            //     clearable: true,
            //     multiple: true,
            //     collapseTags: true,
            //   },
            //   class: "form-item-spacing",
            // },
            // {
            //   type: "select",
            //   field: "sfja",
            //   title: "是否结案",
            //   col: {
            //     // span: 12,
            //   },
            //   options: this.sfja,
            //   props: {
            //     placeholder: "是否结案",
            //     clearable: true,
            //     multiple: true,
            //     collapseTags: true,
            //   },
            //   class: "form-item-spacing",
            // },
            {
              type: "select",
              field: "sfzglsdw",
              title: "是否整改落实到位",
              col: {
                // span: 12,
              },
              options: this.sfzglsdw,
              props: {
                placeholder: "是否整改落实到位",
                clearable: true,
                multiple: true,
                collapseTags: true,
              },
              class: "form-item-spacing",
            },

            // {
            //   type: "select",
            //   field: "sfnr",
            //   title: "是否纳入",
            //   col: {
            //     // span: 12,
            //   },
            //   options: this.sfnr,
            //   props: {
            //     placeholder: "是否纳入",
            //     clearable: true,
            //     multiple: true,
            //     collapseTags: true,
            //   },
            //   class: "form-item-spacing",
            // },
            // {
            //   type: "select",
            //   field: "sfjbbptj",
            //   title: "是否具备报批条件",
            //   col: {
            //     // span: 12,
            //   },
            //   options: this.sfjbbptj,
            //   props: {
            //     placeholder: "是否具备报批条件",
            //     clearable: true,
            //     multiple: true,
            //     collapseTags: true,
            //   },
            //   class: "form-item-spacing",
            // },
            // {
            //   type: "select",
            //   field: "sffhsqsxhdcg",
            //   title: "三区三线",
            //   col: {
            //     // span: 12,
            //   },
            //   options: this.sffhsqsxhdcg,
            //   props: {
            //     placeholder: "三区三线",
            //     clearable: true,
            //     multiple: true,
            //     collapseTags: true,
            //   },
            //   class: "form-item-spacing",
            // },
            // {
            //   type: "select",
            //   field: "sfynrcpkffa",
            //   title: "成片开发方案",
            //   col: {
            //     // span: 12,
            //   },
            //   options: this.sfynrcpkffa,
            //   props: {
            //     placeholder: "成片开发方案",
            //     clearable: true,
            //     multiple: true,
            //     collapseTags: true,
            //   },
            //   class: "form-item-spacing",
            // },
            // {
            //   type: "select",
            //   field: "nccfg",
            //   title: "拟拆除复垦",
            //   col: {
            //     // span: 12,
            //   },
            //   options: this.nccfg,
            //   props: {
            //     placeholder: "拟拆除复垦",
            //     clearable: true,
            //     multiple: true,
            //     collapseTags: true,
            //   },
            //   class: "form-item-spacing",
            // },
            {
              type: "select",
              field: "year",
              title: "年度",
              col: {
                // span: 12,
              },
              options: this.year,
              props: {
                placeholder: "年度",
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