<template>
  <div class="k-border">
    <input
      type="text"
      v-model="minValue"
      placeholder="最小值"
      class="no-border"
    />
    <span v-show="minValue || maxValue">~</span>
    <input
      type="text"
      v-model="maxValue"
      placeholder="最大值"
      class="no-border"
    />
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
    };
  },
  watch: {
    minValue(newVal) {
      this.updateValue();
    },
    maxValue(newVal) {
      this.updateValue();
    },
  },
  methods: {
    updateValue() {
      this.$emit("input", `${this.minValue}~${this.maxValue}`);
    },
  },
};
</script>
    
  <style scoped>
.no-border {
  width: 70px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border: none;
  outline: none;
}

.k-border {
  width: 211px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
    