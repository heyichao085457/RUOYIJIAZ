<template>
  <div class="management" v-loading="loading">
    <el-container style="height: 100%">
      <el-main class="main">
        <div class="management-disp">
          <div
            class="romtows"
            v-for="(item, index) in datatwo"
            :key="item + index"
            @click="towrow"
          >
            <div class="management-img">
              <img
                src="../../../public/img/imgwjj.png"
                alt=""
                class="management-imglist"
              />
            </div>
            <span class="management-text">{{ item.wjjName }}</span>
          </div>
          <div
            class="management-top"
            v-for="(item, index) in archivesData"
            :key="item + index"
            v-loading="loadingStatus[item.id]"
          >
            <div
              class="management-img"
              @click="marchivesData(item.id, item.wjjName)"
            >
              <img
                src="../../../public/img/imgwjj.png"
                alt=""
                class="management-imglist"
              />
            </div>
            <span class="management-text">{{ item.wjjName }}</span>
            <div class="checked">
              <el-checkbox
                v-model="item.isChecked"
                @change="handleCheckboxChange(item)"
              ></el-checkbox>
            </div>
          </div>
        </div>
      </el-main>
      <el-footer class="footer">
        <div>
          <el-row :gutter="10">
            <el-col :span="2">
              <div class="grid-content">
                <el-button
                  @click="clickroumo"
                  class="primarybutton"
                  type="primary"
                  icon="el-icon-close"
                  >删除</el-button
                >
              </div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content">
                <el-button
                  @click="Newbuilt"
                  class="primarybutton"
                  type="primary"
                  icon="el-icon-s-tools"
                  >新建</el-button
                >
              </div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content">
                <el-button
                  @click="Changepassword"
                  class="primarybutton"
                  type="primary"
                  icon="el-icon-view"
                  >修改密码</el-button
                >
              </div>
            </el-col>
          </el-row>
        </div>
      </el-footer>
    </el-container>

    <div class="pole">
      <el-dialog
        append-to-body
        :visible.sync="fullscreenVisible"
        :before-close="handlCliuck"
        :modal="false"
        :close-on-click-modal="false"
        modal-append-to-body
        width="90%"
        height="80%"
        class="nuiop"
      >
        <el-container>
          <el-header class="headerdata">
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
                :data="tableData"
                v-loading="loading"
                border
                style="width: 100%"
                height="700"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column type="index" label="序号" width="200">
                </el-table-column>
                <el-table-column
                  prop="archivesName"
                  label="附件名称"
                  width="200"
                >
                </el-table-column>
                <el-table-column
                  prop="archivesType"
                  label="附件类型"
                  width="200"
                >
                </el-table-column>
                <el-table-column
                  prop="identifier"
                  label="附件标识码"
                  width="200"
                >
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
                <div class="contentbgpurple" @click="deleteClick">
                  <el-button class="contentbgpurple" type="danger"
                    >删除</el-button
                  >
                </div>
              </el-col>
              <el-col :span="2">
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
    <div>
      <el-dialog
        title="提示"
        :visible.sync="syncdialogVisible"
        width="30%"
        class="formname"
        :before-close="handleBeforeClose"
        :close-on-click-modal="false"
      >
        <div>
          <el-form
            ref="formRef"
            :rules="rules"
            :model="form"
            label-width="80px"
          >
            <el-form-item label="文件夹名称" prop="name">
              <el-input v-model.trim="form.name"></el-input>
            </el-form-item>

            <el-form-item label="请输入密码" prop="name">
              <el-input
                placeholder="请输入密码"
                v-model.trim="form.passWord"
                show-password
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="ClickCreate">创 建</el-button>
        </span>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        v-loading="doneimg"
        title="上传附件"
        :visible.sync="DialogClick"
        :close-on-click-modal="false"
        :before-close="closehandlCliuck"
        width="40%"
        center
      >
        <el-container>
          <el-main>
            <el-upload
              class="uploaddemo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              :before-upload="handleBeforeUpload"
              :on-change="handleChange"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div
                class="title"
                v-for="(item, index) in selectedFileNames"
                :key="index"
              >
                {{ item }}
              </div>
            </el-upload>
          </el-main>
        </el-container>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="centerDialog">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="centerDialogVisible"
      :before-close="xghandlCliuck"
      :close-on-click-modal="false"
      width="30%"
      center
    >
      <div>
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="formLabelAlign"
          ref="formLa"
          :rules="formLa"
        >
          <el-form-item label="修改密码" prop="passWord">
            <el-input v-model="formLabelAlign.passWord"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="xgDialogVisible">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import axios from "axios";
import config from "../../../public/config/config";
import { ggwjj, wjjList } from "../../api/document/index";
export default {
  data() {
    return {
      datatwo: [],
      labelPosition: "right",
      formLabelAlign: {
        passWord: "",
      },
      formLa: {
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      form: {
        name: "",
        passWord: "",
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      archivesData: [],
      syncdialogVisible: false,
      fullscreenVisible: false,
      tableData: [],
      userName: "",
      selectedUploadBy: null,
      checked: false,
      loadingStatus: {},
      selectedItems: [],
      defaultItem: null,
      inputon: "",
      DialogClick: false,
      selectedFile: null,
      selectedFileNames: [],
      loading: false,
      doneimg: false,
      savedPassword: "",
      savedPasswords: {}, // 保存文件夹密码的对象
      centerDialogVisible: false,
      itemid: "",
      itemName: "",
      selectedFolder: null, // 用于保存当前选中的文件夹信息
      loadingStatus: {}, // 假设你已有此数据用于v-loading
      passwordTimers: {},
      itemis: "",
      idNamezdy: "",
    };
  },
  mounted() {
    this.publicWjj();
    this.wjjList();
    this.userName = localStorage.getItem("userName");
    this.archivesNam();

    window.addEventListener("popstate", this.closeDialog);
  },
  beforeDestroy() {
    window.removeEventListener("popstate", this.closeDialog);
  },
  methods: {
    closeDialog() {
      this.fullscreenVisible = false;
    },
    handleChange(file, fileList) {
      this.selectedFileNames = fileList.map((file) => file.name);
    },
    handlCliuck(done) {
      this.inputon = "";
      done();
    },
    archivesNam() {
      this.loading = true;
      wjjList().then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.loading = false;
          this.archivesData = res.data;
        }
      });
    },
    marchivesData(item, wjjName) {
      this.itemis = item;
      const isPublicFolder = wjjName === "公共文件夹";
      if (isPublicFolder) {
        this.fetchData(item);
      } else if (this.savedPasswords[item]) {
        this.fetchData(item, this.savedPasswords[item]).catch(() => {
          // 如果密码错误，清除保存的密码并提示重新输入
          delete this.savedPasswords[item];
          clearTimeout(this.passwordTimers[item]); // 取消旧的定时器
          delete this.passwordTimers[item]; // 清除定时器引用
          this.promptPassword(item);
        });
      } else {
        this.promptPassword(item);
      }
    },
    promptPassword(item) {
      this.$prompt("请输入密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[a-zA-Z0-9]+$/, // 只允许英文或数字
        inputErrorMessage: "密码格式不正确，只能输入英文或数字",
      }).then(({ value }) => {
        this.fetchData(item, value).then(() => {
          this.savedPasswords[item] = value;
          // 设置一个5分钟的定时器，时间到了后清除密码
          if (this.passwordTimers[item]) {
            clearTimeout(this.passwordTimers[item]); // 取消旧的定时器
          }
          this.passwordTimers[item] = setTimeout(() => {
            delete this.savedPasswords[item];
            delete this.passwordTimers[item]; // 清除定时器引用
          }, 300000); // 5分钟 = 300000毫秒
        });
      });
    },
    fetchData(item, password) {
      console.log(item, "========");
      this.defaultItem = item;
      this.$set(this.loadingStatus, item, true);
      if (!item) {
        return;
      }
      return new Promise((resolve, reject) => {
        let params = { id: item, passWord: password };
        axios
          .get(config.url.archivesByUploadBy, { params: params })
          .then((res) => {
            if (res.data.code === 200) {
              this.tableData = res.data.data;
              this.fullscreenVisible = true;
              resolve(); // 密码验证成功
            } else {
              this.$message.error("密码错误,请输入正确的密码");
              this.savedPassword = "";
              reject(); // 密码验证失败
            }
          })
          .catch(() => {
            reject(); // 请求失败
          })
          .finally(() => {
            this.$set(this.loadingStatus, item, false);
          });
      });
    },

    handleCheckboxChange(item) {
      if (item.isChecked) {
        this.selectedUploadBy = item.id;
        this.selectedFolder = item;
      } else {
        this.selectedUploadBy = null;
        this.selectedFolder = null;
      }
    },
    clickroumo() {
      this.loading = true;
      let params = {
        id: this.selectedUploadBy,
        userName: this.userName,
      };
      axios.get(config.url.deleteList, { params: params }).then((res) => {
        if (res.data.code === 200) {
          this.archivesNam();
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.loading = false;
        } else {
          this.$message({
            message: "请联系管理员,给您增加权限哦！",
            type: "warning",
          });
          this.loading = false;
        }
      });
    },
    Newbuilt() {
      this.syncdialogVisible = true;
    },
    ClickCreate() {
      const urlWithQuery = `${config.url.addWjj}?userName=${encodeURIComponent(
        this.userName
      )}`;
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          const requestBody = {
            wjjName: this.form.name,
            passWord: this.form.passWord,
          };
          axios.post(urlWithQuery, requestBody).then((res) => {
            this.archivesNam();
            this.syncdialogVisible = false;
            this.form.name = "";
            this.form.passWord = "";
          });
        }
      });
    },
    handleBeforeClose(done) {
      this.$refs.formRef.resetFields();
      this.form.name = "";
      done();
    },
    handleSelectionChange(selection) {
      this.selectedItems = selection;
    },
    deleteClick() {
      if (this.selectedItems.length === 0) {
        this.$message.warning("请选择至少一项进行删除");
        return;
      }
      const selectedIds = this.selectedItems.map((item) => ({ id: item.id }));
      this.loading = true;
      axios.put(config.url.delete, selectedIds).then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          this.loading = false;
          this.$message({
            message: "删除成功",
            type: "success",
          });
          if (this.defaultItem === null) {
            console.log(this.defaultItem);
            this.wjjList();
          } else {
            this.marchivesData(this.defaultItem);
          }
        }
      });
    },
    handleBeforeUpload(file) {
      this.selectedFile = file;
      return false;
    },
    UploadClick() {
      this.DialogClick = true;
    },
    centerDialog() {
      this.uploadFile();
    },
    uploadFile() {
      this.selectedFileNames = [];
      if (!this.selectedFile) {
        this.$message({
          message: "请选择你要上传的文件",
          type: "warning",
        });
        return;
      }
      this.doneimg = true;
      const formData = new FormData();
      formData.append("file", this.selectedFile);
      formData.append("userName", this.userName);
      const folderId = this.defaultItem || "1";
      formData.append("id", folderId);
      axios
        .post(config.url.upload, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            this.doneimg = false;
            this.$message({
              message: "上传成功",
              type: "success",
            });
            this.selectedFile = null;
            this.DialogClick = false;
            if (this.defaultItem === null) {
              console.log(this.defaultItem);
              this.wjjList();
            } else {
              this.marchivesData(this.defaultItem);
            }
          }
        });
    },
    closehandlCliuck(done) {
      this.selectedFile = null;
      this.selectedFileNames = [];
      done();
    },
    inputonfun() {
      this.loading = true;
      let params = {
        wjjId: this.defaultItem,
        searchValue: this.inputon,
      };
      axios.get(config.url.archivesList, { params: params }).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data;
          this.loading = false;
        }
      });
    },
    Changepassword() {
      // 判断是否已选择文件夹
      if (!this.selectedFolder) {
        // 如果没有选择文件夹，提示用户并中止操作
        this.$message({
          message: "请选择你要修改的文件夹",
          type: "warning",
        });
        return; // 中止操作
      } else {
        this.centerDialogVisible = true;
      }
    },
    xghandlCliuck(done) {
      this.formLabelAlign.passWord = "";
      done();
    },
    xgDialogVisible() {
      let params = {
        id: this.selectedFolder.id,
        userName: this.userName,
        passWord: this.formLabelAlign.passWord,
      };
      axios.get(config.url.updatePassword, { params: params }).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.formLabelAlign.passWord = "";
          this.centerDialogVisible = false;
        } else if (res.data.code === 500) {
          this.$message({
            message: "您没有权限修改当前文件夹",
            type: "warning",
          });
          this.formLabelAlign.passWord = "";
          this.centerDialogVisible = false;
        }
      });
    },
    handleEdit(index, row) {
      const link = document.createElement("a");
      link.href = row.url;
      link.setAttribute("download", "");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    publicWjj() {
      ggwjj().then((res) => {
        this.datatwo.push(res.data);
      });
    },
    towrow() {
      this.fullscreenVisible = true;
    },
    wjjList() {
      wjjList().then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          this.tableData = res.data.data;
        }
      });
    },
  },
};
</script>

<style scoped>
.management {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.main {
  flex: 1;
  overflow-y: auto;
}

.footer {
  flex-shrink: 0;
}
.footer >>> .grid-content {
  height: 60px;
}
.management-top {
  width: 15%;
  height: 190px;
  border: 2px solid #ccc;
  background-color: #ccc;
  border-radius: 24px 24px 0px 0px;
  margin-top: 15px;
  margin-left: 15px;
  position: relative;
}
.romtows {
  width: 15%;
  height: 190px;
  border: 2px solid #ccc;
  background-color: #ccc;
  border-radius: 24px 24px 0px 0px;
  margin-top: 15px;
  margin-left: 15px;
  position: relative;
}
.management-disp {
  width: 100%;
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
  bottom: 50px;
  left: 0;
  right: 0;
  margin: auto;
  font-size: 20px;
  text-align: center;
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
  margin-top: 6vh !important;
  width: 88% !important;
  height: 94%;
  position: absolute;
  right: 0;
  top: 0px;
  bottom: 0;
}
.nuiop {
  overflow: hidden;
}
.primarybutton {
  width: 100%;
  margin-top: 19px;
}
.formname >>> .el-form-item__label {
  width: 148px !important;
}
.formname >>> .el-form-item__content {
  margin-left: 150px !important;
}
.Loading {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.Loading.img {
  width: 12%;
  height: 190px;
}
.el-maindata {
  height: 740px !important;
}
.headerdata {
  height: auto !important;
}
.contentbgpurple {
  width: 110px;
}
.uploaddemo {
  width: 360px;
  margin-left: 150px;
}
.fullname {
  width: 200px;
}
.fullname-top {
  margin-left: 135px;
}
@media (min-width: 2560px) {
  .nuiop >>> .el-dialog {
    width: 87% !important;
    height: 92% !important;
    margin-top: 7.5vh !important;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
  }
}
</style>