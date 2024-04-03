<template>
  <div class="management">
    <div style="height: 30px"></div>
    <div class="management-disp">
      <div
        class="management-top"
        v-for="(item, index) in archivesData"
        :key="item + index"
      >
        <div class="management-img" @click="marchivesData(item.uploadBy)">
          <img
            src="../../../public/img/imgwjj.png"
            alt=""
            class="management-imglist"
          />
        </div>
        <span class="management-text">{{ item.uploadBy }}</span>
        <div class="checked"><el-checkbox v-model="checked"></el-checkbox></div>
      </div>
    </div>
    <div class="pole">
      <el-dialog
        append-to-body
        :visible.sync="fullscreenVisible"
        modal-append-to-body
        width="90%"
        height="80%"
        class="nuiop"
      >
        <div>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" label="序号" width="200">
            </el-table-column>
            <el-table-column prop="archivesName" label="附件名称" width="200">
            </el-table-column>
            <el-table-column prop="archivesType" label="附件类型" width="200">
            </el-table-column>
            <el-table-column prop="identifier" label="附件标识码" width="200">
            </el-table-column>
            <el-table-column prop="uploadBy" label="上传人员" width="200">
            </el-table-column>
            <el-table-column prop="uploadTime" label="创建时间" width="200">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "../../../public/config/config";
export default {
  data() {
    return {
      archivesData: [],
      fullscreenVisible: false,
      tableData: [],
    };
  },
  mounted() {
    this.archivesNam();
  },
  methods: {
    archivesNam() {
      axios.get(config.url.archivesName).then((res) => {
        this.archivesData = res.data.data;
      });
    },
    marchivesData(item) {
      let params = {
        uploadBy: item,
      };
      axios
        .get(config.url.archivesByUploadBy, { params: params })
        .then((res) => {
          if (res.data.code === 200) {
            this.tableData = res.data.data;
            this.fullscreenVisible = true;
          }
        });
    },
  },
};
</script>

<style scoped>
.management {
  height: 100%;
  width: 100%;
}
.management-top {
  width: 15%;
  height: 230px;
  border: 2px solid #ccc;
  background-color: #ccc;
  border-radius: 24px 24px 0px 0px;
  margin-top: 15px;
  margin-left: 15px;
  position: relative;
}
.management-disp {
  width: 100%;
  height: 50%;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
}
.management-img {
  width: 100%;
  height: 80%;
  background-color: #ccc;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.management-imglist {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.management-top:last-child {
  margin-bottom: 0;
}
.management-text {
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  margin: auto;
  font-size: 20px;
}
.checked {
  width: 22px;
  height: 35px;
  margin-top: 23px;
}
.checked >>> .el-checkbox__inner {
  height: 22px;
  width: 22px;
}
.nuiop >>> .el-dialog {
  width: 90% !important;
  height: 80% !important;
  margin-top: 10vh !important;
}
.nuiop {
  overflow: hidden;
}
</style>