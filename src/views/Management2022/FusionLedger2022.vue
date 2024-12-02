<template>
  <div class="app-title">
    <el-card class="box-card" v-for="(item, index) in Datacard" :key="index">
      <div class="box-div" @click="boxcardClick(item, index)">
        <div>
          <img src="../../assets/00.png" alt="" class="imgbox" />
        </div>
        <div class="item-name">
          {{ item.rhtzWjjName }}
        </div>
      </div>
    </el-card>
    <div class="pole">
      <el-dialog
        :visible.sync="hanClickorel"
        :before-close="hwandClicke"
        append-to-body
        modal-append-to-body
        :modal="false"
        :close-on-click-modal="false"
        width="70%"
      >
        <el-container>
          <el-header>
            <el-row :gutter="10">
              <el-col :span="7">
                <div class="bg-purple">
                  <el-input
                    placeholder="请输入内容"
                    v-model.trim="inputon"
                    class="input-with-select"
                  >
                    <el-button
                      slot="append"
                      @click="inputonfun"
                      icon="el-icon-search"
                    ></el-button>
                  </el-input>
                </div>
              </el-col>
            </el-row>
          </el-header>
          <el-main class="el-maindata">
            <div>
              <el-table
                :data="Datalongtow"
                v-loading="loadingli"
                style="width: 100%"
                height="500"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column type="index" label="序号" width="200">
                </el-table-column>
                <el-table-column prop="batch" label="名称" width="200">
                </el-table-column>
                <el-table-column prop="rhtzName" label="附件名称" width="200">
                </el-table-column>

                <el-table-column prop="uploadBy" label="上传人员" width="200">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="200">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      v-if="permissions['下载'] === 0"
                      @click="handleEdit(scope.$index, scope.row)"
                      >下载</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-main>
          <el-footer>
            <el-row :gutter="20">
              <el-col :span="2" v-if="permissions['删除'] === 0">
                <div class="contentbgpurple" @click="deleteClick">
                  <el-button class="contentbgpurple" type="danger"
                    >删除</el-button
                  >
                </div>
              </el-col>
              <el-col :span="2" v-if="permissions['上传'] === 0">
                <div class="contentbgpurple" @click="UploadClick">
                  <el-button class="contentbgpurple" type="danger"
                    >上传</el-button
                  >
                </div>
              </el-col>
            </el-row>
          </el-footer>
        </el-container>
      </el-dialog>
    </div>
    <div v-show="uploadok">
      <el-card class="box-card-er">
        <div slot="header" class="clearfix" v-loading="loadinger">
          <el-upload
            class="upload-demo"
            drag
            multiple
            :action="uploadAction"
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload"
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
  rhtzFile,
  tdwpFileInfo,
  daglSdsj2022,
  rhtzWjjInfo2022,
  rhtzWjjupdate,
  standingBook2022,
  tentative,
  rhtzWjjList,
} from "../../api/document/index";
export default {
  data() {
    return {
      textarea: "",
      Datacard: [],
      Datalongtow: [],
      hanClickorel: false,
      Datacardnayg: false,
      inputon: "",
      loadingli: false,
      uploadedFiles: [],
      uploadok: false,
      ixd: "",
      loadinger: false,
      uploadedFileList: [],
      selectedRows: [],
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
    // console.log(process.env.VUE_APP_BASE_API);
    this.tdwpWjjListt();
  },
  computed: {
    isSubmitDisabled() {
      return this.uploadedFiles.length === 0;
    },
    uploadAction() {
      let path =
        this.ixd === 4
          ? "rhtzWjj/upload/standingBook2022"
          : "rhtzWjj/upload/standingBook2022";
      return `${process.env.VUE_APP_BASE_API}/${path}`;
    },
  },
  methods: {
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 2MB!");
      }
      return isLt2M;
    },
    tdwpWjjListt() {
      rhtzWjjList().then((ok) => {
        // console.log(ok, "ok");
        this.Datacard = ok.data;
      });
    },
    boxcardClick(item, index) {
      // console.log(item, "item");
      this.ixd = item.id;
      this.hanClickorel = true;
      this.kcwpIdli(item.id);
    },
    kcwpIdli(index) {
      if (!index) {
        index = this.ixd;
      }
      let data = {
        id: index,
      };
      rhtzWjjInfo2022(data).then((ok) => {
        this.Datacardnayg = true;
        if (ok.code === 200) {
          this.Datalongtow = ok.data;
          this.Datacardnayg = false;
        }
      });
    },
    hwandClicke(done) {
      this.textarea = "";
      this.uploadok = false;
      done();
    },
    handleEdit(index, row) {
      const link = document.createElement("a");
      link.href = row.url;
      link.setAttribute("download", true);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    inputonfun() {
      let params = {
        id: this.ixd,
        searchValue: this.inputon,
      };
      tdwpFileInfo(params).then((ok) => {
        // console.log(ok);
        this.Datalongtow = ok.data;
      });
    },
    handleSelectionChange(val) {
      this.selectedRows = val;
    },
    deleteClick() {
      if (this.selectedRows.length === 0) {
        this.$message.warning("请选择至少一条记录进行删除");
        return;
      }
      const ids = this.selectedRows.map((row) => row.batch).join(",");
      let params = {
        batch: ids,
      };
      tentative(params)
        .then((ok) => {
          if (ok.code === 200) {
            this.kcwpIdli();
            this.$message.success("删除成功");
          }
        })
        .catch((error) => {
          console.error(error);
          this.$message.error("删除失败");
        });
      // if (this.ixd == 4) {

      // } else {
      //   const ids = this.selectedRows.map((row) => row.id).join(",");
      //   const data = { id: ids };
      //   rhtzWjjupdate(data)
      //     .then((ok) => {
      //       if (ok.code === 200) {
      //         this.kcwpIdli();
      //         this.$message.success("删除成功");
      //       }
      //     })
      //     .catch((error) => {
      //       console.error(error);
      //       this.$message.error("删除失败");
      //     });
      // }
    },
    UploadClick() {
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
        formData.append("id", this.ixd);
        formData.append("batch", this.textarea);
      });

      standingBook2022(formData)
        .then((ok) => {
          this.loadinger = true;
          if (ok.code === 200) {
            this.uploadok = false;
            this.kcwpIdli();
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
      // console.log(this.ixd);
      // if (this.ixd == 4) {

      // } else {
      //   let formData = new FormData();
      //   this.uploadedFiles.forEach((file) => {
      //     formData.append("file", file.raw);
      //     formData.append("id", this.ixd);
      //     formData.append("batch", this.textarea);
      //   });

      //   rhtzFile(formData)
      //     .then((ok) => {
      //       this.loadinger = true;
      //       if (ok.code === 200) {
      //         this.uploadok = false;
      //         this.kcwpIdli();
      //         this.loadinger = false;
      //         this.uploadedFiles = [];
      //         this.uploadedFileList = [];
      //         this.textarea = "";
      //         this.$message({
      //           message: "上传成功",
      //           type: "success",
      //         });
      //       }
      //     })
      //     .catch((error) => {
      //       console.error(error);
      //     });
      // }
    },
    handleUploadSuccess(response, file, fileList) {
      this.uploadedFiles = fileList;
    },
  },
};
</script>
    
    <style scoped>
.app-title {
  height: 90%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.box-div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.imgbox {
  height: 30px;
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