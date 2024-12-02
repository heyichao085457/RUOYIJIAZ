<template>
  <div class="app-box">
    <div class="header-container">
      <el-page-header @back="goBack" :content="landCode"></el-page-header>
    </div>
    <div class="footer-container">
      <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column fixed type="index" label="id" width="200">
        </el-table-column>
        <el-table-column prop="landCode" label="图斑号" width="300">
        </el-table-column>
        <el-table-column prop="annexName" label="文件" width="300">
        </el-table-column>

        <el-table-column prop="updateTime" label="上传时间" width="300">
        </el-table-column>
        <el-table-column prop="uploadBy" label="上传人" width="300">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >下载</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="content-container">
      <div v-if="permissions['删除'] === 0">
        <el-button type="danger" @click="deletelist">删除</el-button>
      </div>
      <div v-if="permissions['上传'] === 0">
        <el-button type="danger" @click="primaryshow">上传</el-button>
      </div>
    </div>
    <div v-show="uploadok">
      <el-card class="box-card-er">
        <div slot="header" class="clearfix" v-loading="loadinger">
          <el-upload
            class="upload-demo"
            drag
            :action="uploadAction"
            multiple
            :on-success="handleUploadSuccess"
            :file-list="uploadedFileList"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
          </el-upload>
        </div>
        <div>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea"
          >
          </el-input>
        </div>
        <div class="clearfix-er">
          <div>
            <el-button type="warning" @click="cancellation">取消</el-button>
          </div>
          <div>
            <el-button
              type="success"
              :disabled="isSubmitDisabled"
              @click="submitto"
              >提交</el-button
            >
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
  
  <script>
import {
  upload,
  AnnexList2022,
  specialAnnexdelete,
} from "../../api/document/index";
export default {
  data() {
    return {
      dataArray: [],
      landCode: "",
      lCode: "",
      tableData: [],
      uploadok: false,
      uploadedFileList: [],
      uploadedFiles: [],
      textarea: "",
      loadinger: false,
      ids: "",
      permissions: {},
    };
  },
  created() {
    const storedPermissions = localStorage.getItem("permissions");
    if (storedPermissions !== null) {
      this.permissions = JSON.parse(storedPermissions);
    }
  },

  mounted() {
    this.querylist();
    this.AnnexLisrow();
  },
  computed: {
    isSubmitDisabled() {
      return this.uploadedFiles.length === 0;
    },
    uploadAction() {
      return `${process.env.VUE_APP_BASE_API}/specialAnnex/upload`;
    },
  },
  methods: {
    AnnexLisrow() {
      let params = {
        landCode: this.dataArray,
      };
      AnnexList2022(params).then((ok) => {
        let { code, data } = ok;
        if (code == 200) {
          this.tableData = data;
        }
      });
    },

    goBack() {
      this.$router.go(-1);
    },

    querylist() {
      let params = this.$route.query;
      this.dataArray = params.landCode;
      this.landCode = params.landCode;
    },

    handleDelete(index, row) {
      console.log(row.annexUrl);
      if (row.annexUrl) {
        const link = document.createElement("a");
        link.href = row.annexUrl;
        link.download = row.annexUrl.split("/").pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error("No URL provided for download");
      }
    },
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.annexId).join(",");
    },
    deletelist() {
      let data = {
        annexId: this.ids,
      };
      specialAnnexdelete(data).then((ok) => {
        let { code } = ok;
        if (code == 200) {
          this.AnnexLisrow();
          this.$message({
            message: "删除成功",
            type: "success",
          });
        }
      });
    },
    primaryshow() {
      this.uploadok = true;
    },
    cancellation() {
      this.textarea = "";
      this.uploadedFiles = [];
      this.uploadedFileList = [];
      this.uploadok = false;
    },
    submitto() {
      let formData = new FormData();
      this.uploadedFiles.forEach((file) => {
        formData.append("file", file.raw);
        formData.append("freckleCode", this.landCode);
        formData.append("annexExplain", this.textarea);
      });

      upload(formData)
        .then((ok) => {
          this.loadinger = true;
          if (ok.code === 200) {
            this.uploadok = false;
            this.AnnexLisrow();
            this.loadinger = false;
            this.uploadedFiles = [];
            this.uploadedFileList = [];
            this.textarea = "";
            this.$message({
              message: "上传成功",
              type: "success",
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    handleUploadSuccess(response, file, fileList) {
      this.uploadedFiles = fileList;
    },
  },
};
</script>
  
  <style scoped>
.app-box {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.footer-container {
  flex: 1;
}
.box-card-er {
  width: 436px;
  height: 400px;
  z-index: 9999;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.clearfix {
  margin-left: 16px;
}
.clearfix-er {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}
.content-container {
  width: 200px;
  display: flex;
  justify-content: space-evenly;
}
</style>