<template>
  <div class="loginli">
    <div class="guotu">
      <div>1111111111111</div>
      <div class="shoye">
        <el-tabs class="my-tabs" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="首页" name="first">首页</el-tab-pane>
          <el-tab-pane label="工作台" name="second"><staging /> </el-tab-pane>
          <el-tab-pane label="信息站" name="third">信息站</el-tab-pane>
          <el-tab-pane label="检测网络" name="fourth">检测网络</el-tab-pane>
          <el-tab-pane label="数据中心" name="shujui">数据中心</el-tab-pane>
          <el-tab-pane label="管理中心" name="guanli">管理中心</el-tab-pane>
        </el-tabs>
      </div>
      <div>22222222222222</div>
    </div>
  </div>
</template>

<script>
import staging from "../six/staging.vue";
export default {
  name: "homepage",
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {},
  components: {
    staging,
  },
};
</script>

<style scoped>
.loginli {
  height: 342px;
  background: url(../../assets/tu.png);
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  background-size: 100% auto;
}
.guotu {
  width: 100%;
  background-color: cornflowerblue;
  height: 40px;
  display: flex;
  justify-content: space-evenly;
}
.shoye {
  width: 25%;
}
.my-tabs >>> .el-tabs__item {
  color: aliceblue !important;
  border: none;
  width: auto;
  flex: none;
}
.my-tabs >>> .el-tab-pane {
  background-color: aliceblue;
  height: 860px !important;
  /* width: 700px; */
}
.my-tabs >>> .el-tabs__content {
  width: 1400px !important;

  position: absolute;
  left: 274px;
}
</style>