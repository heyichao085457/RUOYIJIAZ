<template>
  <!-- class="k-border" -->
  <div class="k-border">
    <el-select
      v-model="select"
      slot="prepend"
      placeholder="请选择"
      class="placeholder"
      @change="updateValue"
    >
      <el-option label="大于" value="1"></el-option>
      <el-option label="小于" value="2"></el-option>
      <el-option label="等于" value="3"></el-option>
      <el-option label="大于等于" value="4"></el-option>
      <el-option label="小于等于" value="5"></el-option>
      <el-option label="区间" value="6"></el-option>
    </el-select>

    <!-- 条件渲染 -->
    <template v-if="select === '6'">
      <input
        type="text"
        v-model="minValue"
        placeholder="最小值"
        class="no-border input-light-gray-border"
        slot="append"
        clearable
      />
      <span v-show="minValue || maxValue" slot="append">~</span>
      <input
        type="text"
        v-model="maxValue"
        placeholder="最大值"
        class="no-border input-light-gray-border"
        slot="append"
        clearable
      />
    </template>
    <template v-else>
      <el-input
        placeholder="请输入内容"
        class="no-borderr"
        v-model="input3"
        clearable
      ></el-input>
    </template>
  </div>
</template>
    
<script>
export default {
  props: ["value"],
  data() {
    const [min, max] = this.value.split("~").map((v) => v.trim());
    return {
      minValue: min || "",
      maxValue: max || "",
      input3: "",
      select: null,
    };
  },
  watch: {
    minValue(newVal) {
      this.updateValue();
    },
    maxValue(newVal) {
      this.updateValue();
    },
    input3(newVal) {
      this.updateValue();
    },
    select(newVal) {
      this.updateValue();
    },
  },
  methods: {
    updateValue() {
      if (this.select === "6") {
        this.$emit("input", {
          value: `${this.minValue}~${this.maxValue}`,
          condition: this.select,
        });
      } else {
        this.$emit("input", { value: this.input3, condition: this.select });
      }
    },
  },
};
</script>
      
    <style scoped>
.no-border {
  width: 60px;

  text-align: center;
  border: none;
  outline: none;
}
.no-borderr {
  width: 110px !important;
}
.no-borderr >>> .el-input__inner {
  border: none !important;
}
.k-border {
  width: 220px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  display: flex;
}
.placeholder {
  width: 100px !important;
}
.placeholder >>> .el-input--medium .el-input__inner {
  border: none !important;
}
</style>
      