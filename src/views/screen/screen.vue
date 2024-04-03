<template>
  <el-popover placement="right" width="430" trigger="manual" v-model="visible">
    <div style="height: 400px; overflow-y: auto">
      <form-create
        v-model="fApi"
        :rule="rule"
        :option="option"
        :value.sync="value"
        @submit="onSubmit"
      ></form-create>
    </div>
    <el-button slot="reference" type="primary" @click="visible = !visible"
      >条件筛选</el-button
    >
  </el-popover>
</template>

<script>
import { freckleDict } from "../../api/login";
export default {
  data() {
    return {
      visible: false,
      rule: [], //表单生成规则
      freckleCategory: [], // 存储监测图斑类型选项的数组
      Patternclassification: [],
      fApi: {},
      option: {
        //组件参数配置
        resetBtn: true,
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
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    document.addEventListener("click", this.handleOutsideClick);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleOutsideClick);
  },
  methods: {
    updateRule() {
      this.rule = [
        {
          type: "select",
          field: "freckleCategory",
          title: "监测图斑类型：",
          col: {
            span: 24,
          },
          options: this.freckleCategory,
          props: {
            clearable: true,
            multiple: true,
            collapseTags: true,
          },
        },
        {
          type: "select",
          field: "Patternclassification",
          title: "图斑分类：",
          col: {
            span: 24,
          },
          options: this.Patternclassification,
          props: {
            clearable: true,
            multiple: true,
            collapseTags: true,
          },
        },
        {
          type: "DatePicker",
          field: "month",
          title: "选择月份:",
          value: "",
          props: {
            type: "month", // 改为 "month" 类型
            format: "yyyy-MM", // 显示格式为年-月
            valueFormat: "yyyy-MM", // 绑定值的格式也为年-月
            placeholder: "选择月份",
            clearable: true,
          },
        },
      ];
    },
    handleOutsideClick(event) {
      if (!this.$el.contains(event.target)) {
        this.visible = false;
      }
    },
    onSubmit(formData) {
      formData["deductionType"] = formData["deductionType"].join(",");
      formData["illegalityType"] = formData["illegalityType"].join(",");
      formData["qtjtqx"] = formData["qtjtqx"].join(",");
      this.$emit("getData", formData);
      this.visible = false;
    },
    getData() {
      freckleDict().then((res) => {
        console.log(res.data.监测图斑类型);

        this.freckleCategory = res.data.监测图斑类型.map((item) => ({
          value: item,
          label: item,
        }));
        this.Patternclassification = res.data.图斑分类.map((item) => ({
          value: item,
          label: item,
        }));
        // 确保在这里更新 rule
        this.updateRule();
        if (this.fApi) {
          this.fApi.coverRule(this.rule);
        }
      });
    },
  },
};
</script>

<style  scoped>
/deep/ .el-select .el-input__inner {
  height: 30px;
  width: 260px;
}
</style>