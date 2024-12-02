<template>
  <div class="app-title">
    <el-card class="box-card" v-for="(item, index) in Datacard" :key="index">
      <div class="box-div" @click="funlandCode(item.remarks)">
        <div>
          <img src="../../assets/00.png" alt="" class="imgbox" />
        </div>
        <div class="item-name">
          {{ item.remarks }}
        </div>
      </div>
    </el-card>
  </div>
</template>
      
    <script>
import { daglSdsj, remarksjsc2024 } from "../../api/document/index";
export default {
  data() {
    return {
      Datacard: [],
      inputon: "",
    };
  },
  mounted() {
    this.tdwpWjjListt();
  },

  methods: {
    tdwpWjjListt() {
      daglSdsj().then((ok) => {
        // console.log(ok.data);
        this.Datacard = ok.data;
      });
    },
    // DataerhandleSearch(remarks) {
    //   let params = {
    //     remarks: remarks,
    //   };
    //   remarksjsc2024(params).then((ok) => {
    //     this.Dataer = ok.data;
    //   });
    // },
    funlandCode(remarks) {
      let params = {
        landCode: remarks,
      };
      // this.DataerhandleSearch(remarks);
      this.$router.push({ path: "/2023danggl/DataPoolxiang", query: params });
    },
  },
};
</script>
      
    <style scoped>
.app-title {
  height: 90%;
  overflow-y: auto;
}

.box-div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.imgbox {
  height: 30px;
}
</style>