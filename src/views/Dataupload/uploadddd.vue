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
      <el-col :span="4" :style="{ marginLeft: '10px' }">
        <el-select
          v-model="listf"
          clearable
          :style="{ width: '100%' }"
          placeholder="计算池对象名称"
        >
          <el-option
            v-for="item in listft"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <span style="float: left">{{ item.label }}</span>
            <span
              style="float: right; color: red; cursor: pointer"
              @click.stop="printNumber(item.value)"
            >
              X
            </span>
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="1" :style="{ marginLeft: '10px' }">
        <el-button type="primary" @click="findAlllist">查询</el-button>
      </el-col>
      <el-col :span="1" :style="{ marginLeft: '10px' }">
        <el-button type="primary" @click="UploadClick">导入</el-button>
      </el-col>
      <el-col :span="1" :style="{ marginLeft: '10px' }">
        <el-button type="primary" @click="Uploadtian">批量导入</el-button>
      </el-col>
    </div>
    <div class="Main" v-loading="loading">
      <vue-office-excel :src="previewUrl" @rendered="rendered" />
    </div>
    <div v-show="uploadok">
      <el-card class="box-card-er">
        <div slot="header" class="clearfix" v-loading="loadinger">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
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
  jscList,
  wordReport,
  upload,
  rhtzBath,
  addRhtzByBatch,
  delectRhtz,
} from "../../api/document/index";
import VueOfficeExcel from "@vue-office/excel";
import "@vue-office/excel/lib/index.css";
export default {
  components: {
    VueOfficeExcel,
  },
  data() {
    return {
      idrow: [],
      idrowo: "",
      listft: [],
      listf: "",
      previewUrl: "", //预览属性
      loading: false,
      uploadok: false,
      textarea: "",
      uploadedFileList: [],
      uploadedFiles: [],
    };
  },
  mounted() {
    this.jscLis();
    this.wordRepo();
  },
  computed: {
    isSubmitDisabled() {
      return this.uploadedFiles.length === 0;
    },
  },
  methods: {
    printNumber(value) {
      let params = {
        batch: value,
      };
      delectRhtz(params).then((ok) => {
        if (ok.code == 200) {
          this.jscLis();
        }
      });
    },
    UploadClick() {
      this.uploadok = true;
    },
    Uploadtian() {
      let params = {
        batch: this.listf,
      };
      addRhtzByBatch(params).then((ok) => {
        let { code } = ok;
        if (code == 200) {
          this.$message({
            message: "添加成功",
            type: "success",
          });
        }
      });
    },
    submitto() {
      let formData = new FormData();
      this.uploadedFiles.forEach((file) => {
        formData.append("file", file.raw);
        formData.append("annexExplain", this.textarea);
      });

      upload(formData)
        .then((ok) => {
          this.loadinger = true;
          if (ok.code === 200) {
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
    cancellation() {
      this.textarea = "";
      this.uploadedFiles = [];
      this.uploadedFileList = [];
      this.uploadok = false;
    },
    jscLis() {
      jscList().then((ok) => {
        this.idrow = ok.data.map((item) => ({
          label: item,
          value: item,
        }));
      });
      rhtzBath().then((ok) => {
        this.listft = ok.data.map((item) => ({
          label: item,
          value: item,
        }));
      });
    },
    wordRepo(past) {
      let params = {
        jscName: past,
      };
      this.loading = true;
      wordReport(params).then((ok) => {
        let { code } = ok;
        let { url } = ok.data;
        const baseUrl =
          process.env.NODE_ENV === "production"
            ? "http://124.114.203.222:8084"
            : "http://192.168.1.103";
        const parts = url.split(":8084/");
        const path = parts[1];
        if (code == 200) {
          this.previewUrl = `${baseUrl}/${path}`;
          this.loading = false;
        }
      });
    },
    findAlllist() {
      this.wordRepo(this.idrowo);
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
.vue-office-excel {
  height: 100%;
  width: 100%;
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
/* x-spreadsheet-table */
/* x-spreadsheet-sheet */
.vue-office-excel >>> .x-spreadsheet-sheet {
  width: 100% !important;
}
.vue-office-excel >>> .x-spreadsheet-table {
  width: 100% !important;
}
</style>