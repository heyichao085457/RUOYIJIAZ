<template>
  <div class="app-box">
    <div class="header-container">
      <el-page-header @back="goBack" :content="landCode"></el-page-header>
    </div>
    <div class="footer-container">
      <el-table
        align="center"
        class="tableDatalistrow"
        stripe
        height="600"
        :data="tableData"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          prop="index1"
          label="序号"
          type="index"
          align="center"
          :resizable="false"
          width="70"
        >
        </el-table-column>

        <el-table-column
          prop="city"
          :resizable="false"
          align="center"
          label="市"
          width="70"
        />

        <el-table-column
          prop="county"
          :resizable="false"
          align="center"
          label="区县"
          width="100"
        />

        <el-table-column
          prop="freckleCode"
          :resizable="false"
          align="center"
          label="图斑编号"
          width="235"
        >
        </el-table-column>

        <el-table-column
          prop=" dkmj"
          :resizable="false"
          align="center"
          label="地块面积"
          width="117"
        >
        </el-table-column>

        <el-table-column
          prop="gdmj"
          :resizable="false"
          align="center"
          label="耕地面积"
          width="115"
        >
        </el-table-column>

        <el-table-column
          prop="jbntmj"
          :resizable="false"
          align="center"
          label="基本农田面积"
          width="115"
        >
        </el-table-column>
        <el-table-column
          prop="jzjzPdlx"
          :resizable="false"
          align="center"
          label="判定类型"
          width="115"
        >
        </el-table-column>
        <el-table-column
          prop="nyshsm"
          :resizable="false"
          align="center"
          label="内业审核说明"
          width="200"
        >
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.nyshsm"
              placement="top"
              effect="dark"
            >
              <div class="address-cell">
                {{ scope.row.nyshsm }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="tblx"
          :resizable="false"
          align="center"
          label="填报类型"
          width="117"
        >
        </el-table-column>
        <el-table-column
          prop="wyhcsm"
          :resizable="false"
          align="center"
          label="外业核查说明"
          width="115"
        >
        </el-table-column>
        <el-table-column
          prop="wtlx"
          :resizable="false"
          align="center"
          label="问题类型"
          width="280"
        >
        </el-table-column>
        <el-table-column
          prop="wfmj"
          :resizable="false"
          align="center"
          label="违法面积"
          width="115"
        >
        </el-table-column>
        <el-table-column
          prop="wfgdmj"
          :resizable="false"
          align="center"
          label="违法耕地面积"
          width="115"
        >
        </el-table-column>
        <el-table-column
          prop="wfjbntmj"
          :resizable="false"
          align="center"
          label="违法基本农田面积"
          width="115"
        >
        </el-table-column>
        <el-table-column
          prop="jzjzHchlx"
          :resizable="false"
          align="center"
          label="核查后类型"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="wfgdmj"
          :resizable="false"
          align="center"
          label="违法耕地面积"
          width="115"
        >
        </el-table-column>
        <el-table-column
          prop="wfmj"
          :resizable="false"
          align="center"
          label="违法面积"
          width="115"
        >
        </el-table-column>
        <el-table-column
          prop="wfjbntmj"
          :resizable="false"
          align="center"
          label="违法基本农田面积"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="jzjzSfnrwfjs"
          :resizable="false"
          align="center"
          label="是否纳入违法计算"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="jzjzTbly"
          :resizable="false"
          align="center"
          label="图斑来源"
          width="115"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
  
  <script>
import { upload, tbByHcrwmc } from "../../api/document/index";

export default {
  data() {
    return {
      form: {
        hcrwmc: "",
        hcfs: "",
        hcsj: "",
        hcrwsm: "",
      },
      time: "",
      centerDialogVisible: false,
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
      hcrwmc: "",
    };
  },
  mounted() {
    this.querylist();
    // this.AnnexLisrow();
    this.hcrwmc = this.$route.query.hcrwmc;
    this.bByHcrwmc();
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
    bByHcrwmc() {
      let params = {
        hcrwmc: this.hcrwmc,
      };
      tbByHcrwmc(params).then((ok) => {
        // console.log(ok);
        this.tableData = ok.data.rows;
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
      console.log(row);
    },
    handleSelectionChange(selection) {
      this.selectedRows = selection;
      this.ids = selection.map((item) => item.remarks).join(",");
    },
    deletelist() {
      this.centerDialogVisible = true;
      // let data = {
      //   checkTask
      // }
      // hcrwaddCheckTask(data).then((ok) => {
      //   let { code } = ok;
      //   if (code == 200) {
      //   }
      // });
    },
    primaryshow() {
      let url = this.selectedRows[0].jscUrl;
      let link = document.createElement("a");
      link.href = url;
      let filename = url.split("/").pop();
      link.download = filename || "download.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // this.uploadok = true;
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
.address-cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}
</style>