<template>
  <div class="app-box">
    <div class="header-container">
      <el-page-header @back="goBack" :content="landCode"></el-page-header>
    </div>
    <div class="footer-container">
      <el-table
        :data="tableData"
        style="width: 100%"
        height="500px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="index" label="序号" align="center" width="70">
        </el-table-column>
        <el-table-column prop="city" align="center" label="市名称" width="170">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.city" placement="top" effect="dark">
              <div class="address-cell">
                {{ scope.row.city }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="county"
          align="center"
          label="县名称"
          width="170"
        >
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.county"
              placement="top"
              effect="dark"
            >
              <div class="address-cell">
                {{ scope.row.county }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column
          prop="dkOrTb"
          align="center"
          label="地块编号"
          width="170"
        >
        </el-table-column>
        <el-table-column
          prop="sfwttb"
          align="center"
          label="是否问题图斑"
          width="170"
        >
        </el-table-column>
        <el-table-column
          prop="qbtbSfnrwfjs"
          align="center"
          label="是否纳入违法计算"
          width="170"
        >
        </el-table-column>

        <el-table-column
          prop="wyzt"
          align="center"
          label="外业状态"
          width="170"
        >
        </el-table-column>
        <el-table-column
          prop="hcjd"
          align="center"
          label="核查阶段"
          width="170"
        >
        </el-table-column>
        <el-table-column
          prop="tblx"
          align="center"
          label="填报类型"
          width="170"
        >
        </el-table-column>
        <el-table-column
          prop="shengjidxjg"
          align="center"
          label="省级定性结果"
          width="170"
        >
        </el-table-column>
        <el-table-column
          prop="shijidxjg"
          align="center"
          label="市级定性结果"
          width="170"
        >
        </el-table-column>

        <el-table-column
          prop="dkmj"
          label="地块面积"
          width="170"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="nydmj"
          label="农用地面积"
          width="170"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="gdmj"
          label="耕地面积"
          width="170"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="tbfl"
          label="图斑分类"
          width="170"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="pdlx"
          label="判定类型"
          width="170"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="dkmjMax"
          label="最大地块面积"
          width="170"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="dkmjMin"
          label="最小地块面积"
          width="170"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="nydmjMax"
          label="最大农用地面积"
          width="170"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="nydmjMin"
          label="最小农用地面积"
          width="170"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="gdmjMax"
          label="最大耕地面积"
          width="170"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="gdmjMin"
          label="最小耕地面积"
          width="170"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="dydydkmj"
          label="大于等于地块面积"
          width="170"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="xydydkmj"
          label="小于等于地块面积"
          width="170"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="dydynydmj"
          label="大于等于农用地面积"
          width="170"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="xydynydmj"
          label="小于等于农用地面积"
          width="170"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="dydygdmj"
          label="大于等于耕地面积"
          width="170"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="xydygdmj"
          label="小于等于耕地面积"
          width="170"
          align="center"
        ></el-table-column>
      </el-table>
    </div>
    <div class="content-container">
      <div v-if="permissions['下载'] === 0">
        <el-button type="danger" @click="primaryshow">下载</el-button>
      </div>
      <div v-if="permissions['删除'] === 0">
        <el-button type="danger" @click="deletelist">删除</el-button>
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
  comList,
  deleteId,
  remarksjsc2023,
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
      selectedRows: [],
      remarks: "",
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
    // console.log(this.$route.query.landCode);
    this.remarks = this.$route.query.landCode;
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
      // let params = {
      //   landCode: this.dataArray,
      // };
      // comList(params).then((ok) => {
      //   let { code, data } = ok;
      //   if (code == 200) {
      //     this.tableData = data;
      //   }
      // });
      let params = {
        remarks: this.remarks,
      };
      remarksjsc2023(params).then((ok) => {
        // console.log(ok);
        this.tableData.push(ok.data);
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
      // console.log(row.annexUrl);
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
      this.selectedRows = selection;
      this.ids = selection.map((item) => item.remarks).join(",");
    },
    deletelist() {
      deleteId(this.ids).then((ok) => {
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
      let url = this.selectedRows[0].jscUrl;
      // console.log(url);
      // const url = this.urlpo;
      const a = document.createElement("a");
      a.href = url;
      a.download = "";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
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
.content-container {
  width: 200px;
  display: flex;
  justify-content: space-evenly;
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
.address-cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}
</style>