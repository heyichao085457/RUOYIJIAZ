<template>
  <div class="app-title">
    <div>
      <el-row :gutter="20">
        <el-col :span="1.5"
          ><div class="grid-content bg-purple">
            <el-input v-model="inputh" placeholder="请输入内容"></el-input></div
        ></el-col>
        <el-col :span="1"
          ><div class="grid-content bg-purple" @click="search">
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </div></el-col
        >
      </el-row>
    </div>
    <div class="app-box">
      <el-card class="box-card" v-for="(item, index) in Datacard" :key="index">
        <div class="box-div" @click="funlandCode(item.landCode)">
          <div>
            <img src="../../../public/img/wjj2008.png" alt="" class="imgbox" />
          </div>
          <div class="item-name">
            {{ item.landCode }}
          </div>
        </div>
      </el-card>
    </div>
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 50, 100, 150]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalItems"
      ></el-pagination>
    </div>
  </div>
</template>
    
  <script>
import { AnnexWjj2022 } from "../../api/document/index";
export default {
  data() {
    return {
      Datacard: [],
      inputon: "",
      currentPage: 1,
      pageSize: 20,
      totalItems: 0,
      inputh: "",
    };
  },
  mounted() {
    this.tdwpWjjListt();
  },

  methods: {
    search() {
      this.tdwpWjjListt();
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.tdwpWjjListt();
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
      this.tdwpWjjListt();
    },
    tdwpWjjListt() {
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        landCode: this.inputh,
      };
      AnnexWjj2022(params).then((ok) => {
        // console.log(ok);
        this.Datacard = ok.data.rows;

        this.totalItems = ok.data.total;
      });
    },
    funlandCode(item) {
      let params = {
        landCode: item,
      };
      this.$router.push({
        path: "/Managementxiang2022/Uploadattachmentsxiang",
        query: params,
      });
    },
  },
};
</script>
    
  <style scoped>
.app-title {
  height: 100%;
}
.app-box {
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