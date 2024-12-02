<template>
  <div class="app-title">
    <div class="header-container">
      <el-form ref="form" :model="formData" label-width="30px">
        <div>
          <el-row class="title" type="flex" align="middle">
            <el-col :span="5">
              <el-input
                placeholder="请输入图斑编号/违法行为编号"
                v-model.trim="formData.dkOrTb"
                clearable
              >
              </el-input>
            </el-col>

            <el-col :span="1" :style="{ marginLeft: '20px' }">
              <el-popover
                placement="right"
                width="400"
                trigger="click"
                v-model="popoverVisible"
              >
                <el-form
                  ref="form"
                  :model="form"
                  label-width="135px"
                  class="elformer"
                >
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="核查结果处置建议">
                        <el-select
                          v-model="formData.Verification"
                          clearable
                          placeholder="核查结果处置建议"
                        >
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="处罚到位">
                        <el-select
                          v-model="formData.punishment"
                          clearable
                          placeholder="是否处罚到位"
                        >
                          <el-option
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="埴报整改落实到位">
                        <el-select
                          v-model="formData.rectified"
                          clearable
                          placeholder="埴报是否整改落实到位"
                        >
                          <el-option
                            v-for="item in options3"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="申请法院强制执行">
                        <el-select
                          v-model="formData.People"
                          clearable
                          placeholder="是否申请人民法院强制执行"
                        >
                          <el-option
                            v-for="item in options4"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="埴报已结案">
                        <el-select
                          v-model="formData.closed"
                          clearable
                          placeholder="埴报是否已结案"
                        >
                          <el-option
                            v-for="item in options5"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="违法性质">
                        <el-select
                          v-model="formData.WFXZ"
                          clearable
                          placeholder="违法性质"
                        >
                          <el-option
                            v-for="item in options6"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="主体分类">
                        <el-select
                          v-model="formData.ZTFL"
                          clearable
                          placeholder="主体分类"
                        >
                          <el-option
                            v-for="item in options7"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <div class="primaryli">
                    <el-button type="primary" @click="onSubprimary"
                      >确定</el-button
                    >
                    <el-button @click="getryop">取消</el-button>
                  </div>
                </el-form>

                <el-button type="primary" slot="reference">条件筛选</el-button>
              </el-popover>
            </el-col>
            <el-col :span="2" :style="{ marginLeft: '30px' }">
              <el-button
                type="primary"
                @click="findAll"
                :style="{ marginRight: '10px', marginLeft: '10px' }"
                >查询</el-button
              >
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <div class="footer-container">
      <el-table
        class="tableDatalistrow"
        :data="paginatedData"
        style="width: 100%"
        height="600"
        @selection-change="handleSelectionChange"
        v-loading="loading"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column fixed type="index" label="id" width="80">
        </el-table-column>
        <el-table-column
          prop="县名称"
          align="center"
          label="县名称"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="市名称"
          align="center"
          label="市名称"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="图斑编号"
          align="center"
          label="图斑编号"
          width="250"
        >
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.图斑编号"
              placement="top"
              effect="dark"
            >
              <div class="address-cell">
                {{ scope.row.图斑编号 }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="违法行为编号"
          align="center"
          label="违法行为编号"
          width="200"
        >
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.违法行为编号"
              placement="top"
              effect="dark"
            >
              <div class="address-cell">
                {{ scope.row.违法行为编号 }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="违法行为描述"
          align="center"
          label="违法行为描述"
          width="200"
        >
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.违法行为描述"
              placement="top"
              effect="dark"
            >
              <div class="address-cell">
                {{ scope.row.违法行为描述 }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="违法性质"
          align="center"
          label="违法性质"
          width="200"
        >
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.违法性质"
              placement="top"
              effect="dark"
            >
              <div class="address-cell">
                {{ scope.row.违法性质 }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="违法类型"
          align="center"
          label="违法类型"
          width="200"
        >
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.违法类型"
              placement="top"
              effect="dark"
            >
              <div class="address-cell">
                {{ scope.row.违法类型 }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="违法行为发现时间"
          align="center"
          label="违法行为发现时间"
          width="200"
        >
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.违法行为发现时间"
              placement="top"
              effect="dark"
            >
              <div class="address-cell">
                {{ scope.row.违法行为发现时间 }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="违法行为发生地"
          align="center"
          label="违法行为发生地"
          width="200"
        >
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.违法行为发生地"
              placement="top"
              effect="dark"
            >
              <div class="address-cell">
                {{ scope.row.违法行为发生地 }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="违法行为发生时间
  "
          align="center"
          label="违法行为发生时间
  "
          width="200"
        >
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.违法行为发生时间"
              placement="top"
              effect="dark"
            >
              <div class="address-cell">
                {{ scope.row.违法行为发生时间 }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="核查结果处置建议"
          align="center"
          label="核查结果处置建议"
          width="200"
        >
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.核查结果处置建议"
              placement="top"
              effect="dark"
            >
              <div class="address-cell">
                {{ scope.row.核查结果处置建议 }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="不予立案说明"
          align="center"
          label="不予立案说明"
          width="200"
        >
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.不予立案说明"
              placement="top"
              effect="dark"
            >
              <div class="address-cell">
                {{ scope.row.不予立案说明 }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="xmmc"
          align="center"
          label="项目名称"
          width="200"
        >
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.xmmc" placement="top" effect="dark">
              <div class="address-cell">
                {{ scope.row.xmmc }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="结案条件"
          align="center"
          label="结案条件"
          width="200"
        >
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.结案条件"
              placement="top"
              effect="dark"
            >
              <div class="address-cell">
                {{ scope.row.结案条件 }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="tbly"
          align="center"
          label="填报类型"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="案件结论"
          align="center"
          label="案件结论"
          width="200"
        >
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.案件结论"
              placement="top"
              effect="dark"
            >
              <div class="address-cell">
                {{ scope.row.案件结论 }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="是否处罚到位"
          align="center"
          label="是否处罚到位"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="是否整改落实到位"
          label="是否整改落实到位"
          width="200"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="是否申请人民法院强制执行"
          label="是否申请人民法院强制执行"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="符合规划情况"
          align="center"
          label="符合规划情况"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="建设现状"
          align="center"
          label="建设现状"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="实际用途"
          align="center"
          label="实际用途"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="主体分类"
          align="center"
          label="主体分类
  "
          width="200"
        >
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.主体分类"
              placement="top"
              effect="dark"
            >
              <div class="address-cell">
                {{ scope.row.主体分类 }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="涉嫌违法面积
  "
          align="center"
          label="涉嫌违法面积
  "
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="涉嫌违法当事人"
          align="center"
          label="涉嫌违法当事人"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="wfczjg"
          align="center"
          label="违法处置结果"
          width="200"
        >
        </el-table-column>
        <el-table-column label="操作" fixed="right">
          <!-- <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >详情</el-button
                > -->
          <template slot-scope="scope">
            <el-button
              @click="handleDelete(scope.$index, scope.row)"
              style="color: #18a1f0; fontsize: 20px"
              class="button"
              type="text"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="content-container" style="display: flex; align-items: center">
      <div class="block">
        <el-row class="title" type="flex" align="middle">
          <div
            :style="{ marginLeft: '10px' }"
            v-if="permissions['生成违法行为报告'] === 0"
          >
            <el-button type="primary" size="mini" @click="importData">
              生成违法行为报告</el-button
            >
          </div>
          <div
            :style="{ marginLeft: '10px' }"
            v-if="permissions['违法统计'] === 0"
          >
            <el-button type="primary" size="mini" @click="dataimgli">
              违法统计</el-button
            >
          </div>
        </el-row>
      </div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[20, 50, 100, 200]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalItems"
        ></el-pagination>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="forettdialogVisible" width="60%">
      <!-- :before-close="handleClose" -->
      <div style="height: 100%; width: 100%" v-loading="loading">
        <vue-office-docx :src="urlList" style="width: 100%; height: 600px" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisiblebo">下载</el-button>
      </span>
    </el-dialog>
    <el-dialog title="未整改图斑数据表" :visible.sync="foretterkop" width="80%">
      <div
        class="office-exce"
        style="width: 100%; height: 600px"
        v-loading="loading"
      >
        <vue-office-excel :src="urlLister" style="width: 100%; height: 600px" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogertop">下载</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  offenceList,
  offenceReport,
  ReportDetails,
} from "../../api/document/index";
import VueOfficeDocx from "@vue-office/docx";
import "@vue-office/docx/lib/index.css";
//引入VueOfficeExcel组件
import VueOfficeExcel from "@vue-office/excel";
//引入相关样式
import "@vue-office/excel/lib/index.css";
export default {
  components: {
    VueOfficeDocx,
    VueOfficeExcel,
  },
  data() {
    return {
      popoverVisible: false,
      urlpo: [],
      urlList: [],
      urlLister: [],
      loading: false,
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      totalItems: 0,
      paginatedData: [],
      forettdialogVisible: false,
      foretterkop: false,
      items: [],
      formData: {
        dkOrTb: "",
        Verification: "",
        punishment: "",
        rectified: "",
        People: "",
        closed: "",
      },
      options: [],
      options2: [],
      options3: [],
      options4: [],
      options5: [],
      options6: [],
      options7: [],
      urler: [],
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
    this.ReportDe();
    this.downloadFile();
    this.fetchData();
    this.Dropdownfxw();
  },
  methods: {
    ReportDe() {
      const baseUrl = process.env.NODE_ENV === "production" ? "" : "";
      ReportDetails().then((ok) => {
        let { code, msg } = ok;
        let url = msg;
        const path = url.split(":8084/")[1];
        // this.urlpo = ok.msg;
        if (code === 200) {
          this.urler = url;
          const fullUrl = `${baseUrl}/${path}`;
          console.log(fullUrl, "fullUrl");
          this.urlLister = fullUrl;
        }
      });
    },
    dialogertop() {
      const url = this.urler;
      const a = document.createElement("a");
      a.href = url;
      a.download = "";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    dataimgli() {
      this.foretterkop = true;
    },
    Dropdownfxw() {
      DropdownBoxWfxw().then((ok) => {
        console.log(ok);
        ok.data.HCJGCZJY.forEach((ele) => {
          this.options.push({ value: ele, label: ele });
        });
        ok.data.SFCFDW.forEach((ele) => {
          this.options2.push({ value: ele, label: ele });
        });
        ok.data.SFLSZGDW.forEach((ele) => {
          this.options3.push({ value: ele, label: ele });
        });
        ok.data.SFSQRMFYQZZX.forEach((ele) => {
          this.options4.push({ value: ele, label: ele });
        });
        ok.data.SFJA.forEach((ele) => {
          this.options5.push({ value: ele, label: ele });
        });
        ok.data.WFXZ.forEach((ele) => {
          this.options6.push({ value: ele, label: ele });
        });
        ok.data.ZTFL.forEach((ele) => {
          this.options7.push({ value: ele, label: ele });
        });
      });
    },
    onSubprimary() {
      this.findAll();
      this.popoverVisible = false;
    },
    getryop() {
      this.popoverVisible = false;
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.fetchData();
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
      this.fetchData();
    },

    fetchData() {
      let params = {
        searchValue: this.formData.dkOrTb,
        核查结果处置建议: this.formData.Verification,
        是否处罚到位: this.formData.punishment,
        是否整改落实到位: this.formData.rectified,
        是否申请人民法院强制执行: this.formData.People,
        是否结案: this.formData.closed,
        违法性质: this.formData.WFXZ,
        主体分类: this.formData.ZTFL,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      };
      this.loading = true;
      offenceList(params).then((ok) => {
        console.log(ok);
        let { data, code } = ok;
        if (code == 200) {
          this.loading = false;
          this.paginatedData = data.rows;
          this.totalItems = data.total;
        }
      });
    },
    handleDelete(index, row) {
      this.$router.push({
        path: "/details/detailsoi",
        query: {
          id: row.id,
          landCode: row.图斑编号,
          land: row.违法行为编号,
        },
      });
    },
    handleSelectionChange() {},
    downloadFile() {
      const baseUrl = process.env.NODE_ENV === "production" ? "" : "";
      offenceReport().then((ok) => {
        let { code, msg } = ok;
        let url = msg;
        const path = url.split(":8084/")[1];
        this.urlpo = ok.msg;
        if (code === 200) {
          const fullUrl = `${baseUrl}/${path}`;
          this.urlList = fullUrl;
        }
      });
    },
    dialogVisiblebo() {
      const url = this.urlpo;
      const a = document.createElement("a");
      a.href = url;
      a.download = "";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    importData() {
      this.forettdialogVisible = true;
    },
    findAll() {
      this.fetchData();
    },
  },
};
</script>

<style scoped>
.app-title {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header-container {
  padding: 12px 10px 10px 10px;
  height: 60px;
}
.footer-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto; /* 显示滚动条 */
}
.tableDatalistrow {
  flex: 1;
}
.address-cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
}
.content-container {
  display: flex;
  justify-content: space-between;
  height: 40px;
}
.block {
  height: 50%;
}
.elformer >>> .el-col-24 {
  height: 44px;
}
.primaryli {
  display: flex;
  justify-content: space-evenly;
}
</style>