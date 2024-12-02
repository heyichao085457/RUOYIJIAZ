<template>
  <div class="container">
    <div class="Header">
      <el-col :span="4" :style="{ marginLeft: '10px' }">
        <el-select
          v-model="idrowo"
          clearable
          :style="{ width: '100%' }"
          placeholder="计算池对象名称"
        >
          <el-option
            v-for="item in idrow"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="1" :style="{ marginLeft: '10px' }">
        <el-button type="primary" @click="findAlllist">查询</el-button>
      </el-col>
    </div>
    <div class="Main" v-loading="loading">
      <!-- <iframe
        :src="previewUrl"
        style="width: 100%; height: 800px"
        frameborder="0"
      ></iframe> -->
      <vue-office-docx :src="previewUrl" style="width: 100%; height: 800px" />
    </div>
  </div>
</template>

<script>
import { quarterlyVerify, jscList } from "../../api/document/index";
//引入VueOfficeDocx组件
import VueOfficeDocx from "@vue-office/docx";
import "@vue-office/docx/lib/index.css";
export default {
  components: {
    VueOfficeDocx,
  },
  data() {
    return {
      idrow: [],
      idrowo: "",
      previewUrl: "",
      loading: false,
    };
  },
  mounted() {
    this.jscLis();
    this.quarterly();
  },
  methods: {
    findAlllist() {
      this.quarterly();
    },
    quarterly() {
      let params = {
        jscName: this.idrowo || "河南4月图斑",
      };
      this.loading = true;
      quarterlyVerify(params).then((ok) => {
        const baseUrl = process.env.NODE_ENV === "production" ? "/img" : "/img";
        const parts = ok.data.url.split(":8084");
        const path = parts[1];
        if (ok.code == 200) {
          this.loading = false;
          this.previeUrwl = `${baseUrl}${path}`;
        }
      });
    },
    jscLis() {
      jscList().then((ok) => {
        this.idrow = ok.data.map((item) => ({
          label: item,
          value: item,
        }));
      });
    },
  },
};
</script>

<style scoped>
.container {
  height: calc(100% - 45px);
  display: flex;
  flex-direction: column;
}
.Header {
  padding: 12px 10px 10px 10px;
}
.Main {
  flex: 1;
}
</style>


