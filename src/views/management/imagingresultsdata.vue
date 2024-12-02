<template>
  <div class="app-title">
    <el-card class="box-card" v-for="(item, index) in Datacard" :key="index">
      <div class="box-div" @click="boxcardClick(index)">
        <div>
          <img src="../../assets/00.png" alt="" class="imgbox" />
        </div>
        <div class="item-name">
          {{ item.kcwpWjjName }}
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
        width="67%"
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
                <el-table-column type="index" label="序号" width="80">
                </el-table-column>
                <el-table-column prop="kcwpName" label="附件名称" width="200">
                </el-table-column>
                <el-table-column prop="kcwpType" label="附件类型" width="200">
                </el-table-column>
                <el-table-column prop="uploadBy" label="上传人员" width="200">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="200">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
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
              <el-col :span="2">
                <div
                  class="contentbgpurple"
                  @click="deleteClick"
                  v-if="permissions['删除'] === 0"
                >
                  <el-button class="contentbgpurple" type="danger"
                    >删除</el-button
                  >
                </div>
              </el-col>
              <el-col :span="2">
                <div
                  class="contentbgpurple"
                  @click="UploadClick"
                  v-if="permissions['上传'] === 0"
                >
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
  cwpWjjList,
  kcwpId,
  kcwpFile,
  kcwpFileInfo,
  updateKcwp,
} from "../../api/document/index";
export default {
  data() {
    return {
      Datacard: [],
      Datalongtow: [],
      uploadedFiles: [],
      hanClickorel: false,
      Datacardnayg: false,
      inputon: "",
      loadingli: false,
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
    this.tdwpWjjListt();
  },
  computed: {
    isSubmitDisabled() {
      return this.uploadedFiles.length === 0;
    },
    uploadAction() {
      return `${process.env.VUE_APP_BASE_API}/kcwpFile`;
    },
  },
  methods: {
    tdwpWjjListt() {
      cwpWjjList().then((ok) => {
        this.Datacard = ok.data;
      });
    },
    boxcardClick(index) {
      this.ixd = index;
      this.hanClickorel = true;
      this.kcwpIdli(index);
    },

    kcwpIdli(index) {
      if (!index) {
        index = this.ixd;
      }

      let params = {
        id: index,
      };
      kcwpId(params).then((ok) => {
        this.Datacardnayg = true;
        console.log(ok);
        if (ok.code === 200) {
          this.Datalongtow = ok.data;
          this.Datacardnayg = false;
        }
      });
    },
    hwandClicke(done) {
      this.uploadok = false;
      done();
    },
    handleEdit(index, row) {
      const link = document.createElement("a");
      link.href = row.kcwpUrl;
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
      kcwpFileInfo(params).then((ok) => {
        console.log(ok);
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

      const ids = this.selectedRows.map((row) => ({ id: String(row.id) }));
      const data = ids;

      updateKcwp(data)
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
    },
    UploadClick() {
      this.uploadok = true;
    },
    cancellation() {
      this.uploadedFiles = [];
      this.uploadedFileList = [];
      this.uploadok = false;
    },
    submitto() {
      let formData = new FormData();
      this.uploadedFiles.forEach((file) => {
        formData.append("file", file.raw);
        formData.append("id", this.ixd);
      });

      kcwpFile(formData)
        .then((ok) => {
          this.loadinger = true;
          if (ok.code === 200) {
            this.uploadok = false;
            this.kcwpIdli();
            this.loadinger = false;
            this.uploadedFiles = [];
            this.uploadedFileList = [];
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