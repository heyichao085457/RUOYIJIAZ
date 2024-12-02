<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="公告标题" prop="noticeTitle">
        <el-input
          v-model="queryParams.noticeTitle"
          placeholder="请输入公告标题"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="操作人员" prop="createBy">
        <el-input
          v-model="queryParams.createBy"
          placeholder="请输入操作人员"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="类型" prop="noticeType">
        <el-select
          v-model="queryParams.noticeType"
          placeholder="公告类型"
          clearable
        >
          <el-option
            v-for="dict in dict.type.sys_notice_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          >新增</el-button
        >
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:notice:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:notice:remove']"
          >删除</el-button
        >
      </el-col> -->
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>
    <el-tabs type="border-card">
      <el-tab-pane label="通知公告">
        <el-table
          v-loading="loading"
          :data="noticeList"
          @selection-change="handleSelectionChange"
          height="500px"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column
            label="序号"
            align="center"
            type="index"
            width="100"
          />
          <el-table-column
            label="公告标题"
            align="center"
            prop="policyName"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="公告内容"
            align="center"
            prop="noticeContent"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="公告类型"
            align="center"
            prop="type"
            width="100"
          >
            <!-- <template slot-scope="scope">
              <dict-tag
                :options="dict.type.sys_notice_type"
                :value="scope.row.noticeType"
              />
            </template> -->
          </el-table-column>
          <!-- <el-table-column
            label="状态"
            align="center"
            prop="status"
            width="100"
          >
            <template slot-scope="scope">
              <dict-tag
                :options="dict.type.sys_notice_status"
                :value="scope.row.status"
              />
            </template>
          </el-table-column> -->
          <el-table-column
            label="创建者"
            align="center"
            prop="createBy"
            width="100"
          />
          <el-table-column
            label="创建时间"
            align="center"
            prop="createTime"
            width="100"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime, "{y}-{m}-{d}") }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
                >修改</el-button
              >
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </el-tab-pane>
      <el-tab-pane label="政策文件">
        <el-table
          v-loading="loading"
          :data="noticeList2"
          @selection-change="handleSelectionChange"
          height="500px"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column
            label="序号"
            align="center"
            type="index"
            width="100"
          />
          <el-table-column
            label="公告标题"
            align="center"
            prop="policyName"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="公告类型"
            align="center"
            prop="policyType"
            width="100"
          >
            <!-- <template slot-scope="scope">
              <dict-tag
                :options="dict.type.sys_notice_type"
                :value="scope.row.noticeType"
              />
            </template> -->
          </el-table-column>
          <!-- <el-table-column
            label="状态"
            align="center"
            prop="status"
            width="100"
          >
            <template slot-scope="scope">
              <dict-tag
                :options="dict.type.sys_notice_status"
                :value="scope.row.status"
              />
            </template>
          </el-table-column> -->
          <el-table-column
            label="创建者"
            align="center"
            prop="createBy"
            width="100"
          />
          <el-table-column
            label="创建时间"
            align="center"
            prop="createTime"
            width="100"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime, "{y}-{m}-{d}") }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="noticeList2Delete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="totallist > 0"
          :total="totallist"
          :page.sync="queryParams2.pageNum"
          :limit.sync="queryParams2.pageSize"
          @pagination="getpolicy"
        />
      </el-tab-pane>
      <el-tab-pane label="问题">
        <el-table
          v-loading="loading"
          :data="noticeList3"
          @selection-change="handleSelectionChange"
          height="500px"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column
            label="序号"
            align="center"
            type="index"
            width="100"
          />
          <el-table-column
            label="标题"
            align="center"
            prop="problemName"
            :show-overflow-tooltip="true"
          />
          <!-- <el-table-column
            label="标签"
            align="center"
            prop="problemType"
            width="100"
            :show-overflow-tooltip="true"
          >
          </el-table-column> -->

          <el-table-column
            label="创建者"
            align="center"
            prop="publishBy"
            width="180"
          />
          <el-table-column
            label="创建时间"
            align="center"
            prop="publishTime"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.publishTime, "{y}-{m}-{d}") }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="getprobleDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="totalti > 0"
          :total="totalti"
          :page.sync="queryParams3.pageNum"
          :limit.sync="queryParams3.pageSize"
          @pagination="getproble"
        />
      </el-tab-pane>
    </el-tabs>

    <!-- 添加或修改公告对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="780px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="公告类型" prop="noticeType">
              <el-select v-model="form.noticeType" placeholder="请选择公告类型">
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

          <el-col :span="24" v-if="form.noticeType === '通知公告'">
            <el-tabs type="border-card">
              <el-tab-pane label="公告标题">
                <editor class="edier" v-model="policyy" :min-height="192" />
              </el-tab-pane>
              <el-tab-pane label="公告内容">
                <editor class="edier" v-model="notice" :min-height="192" />
              </el-tab-pane>
            </el-tabs>
          </el-col>

          <el-col :span="24" v-if="form.noticeType === '政策文件'">
            <el-tabs type="border-card">
              <el-tab-pane label="文件标题">
                <editor class="edier" v-model="notice" :min-height="192" />
              </el-tab-pane>
              <el-tab-pane label="上传">
                <div class="uolode">
                  <el-upload
                    class="upload-demo"
                    drag
                    :action="uploadAction"
                    multiple
                    :on-success="handleUploadSuccess"
                    :on-error="handleUploadError"
                    :before-upload="beforeUpload"
                    :file-list="fileList"
                  >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                      将文件拖到此处，或<em>点击上传</em>
                    </div>
                  </el-upload>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-col :span="4" v-if="form.noticeType === '通知公告'">
          <input type="file" @change="handleFileChange"
        /></el-col>
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="修改公告"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-tabs type="border-card">
        <el-tab-pane label="修改标题">
          <editor class="edier" v-model="serterop" :min-height="192" />
        </el-tab-pane>
        <el-tab-pane label="修改详情">
          <editor class="edier" v-model="terfort" :min-height="192" />
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogisible">取 消</el-button>
        <el-button type="primary" @click="dialogble">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  listNotice,
  getNotice,
  delNotice,
  addNotice,
  updateNotice,
} from "@/api/system/notice";
import {
  notice2024,
  PolicyDocument2024,
  PolicyDocumentnotice2024,
  PolicyDocumentlist2024,
  probleList2024,
  PolicyDocumentnoticewt2024,
  addNotice2024,
  addPolicyFile2024,
} from "@/api/document/index";

export default {
  name: "Notice",
  dicts: ["sys_notice_status", "sys_notice_type"],
  data() {
    return {
      policyy: "",
      fileter: [],
      notice: "",
      file: null,
      options: [
        {
          value: "通知公告",
          label: "通知公告",
        },
        {
          value: "政策文件",
          label: "政策文件",
        },
        {
          value: "问题",
          label: "问题",
        },
      ],
      serterop: "",
      terfort: "",

      dialogVisible: false,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      totallist: 0,
      totalti: 0,
      // 公告表格数据
      noticeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        noticeTitle: undefined,
        createBy: undefined,
        status: undefined,
      },
      queryParams2: {
        pageNum: 1,
        pageSize: 10,
        noticeTitle: undefined,
        createBy: undefined,
        status: undefined,
      },
      queryParams3: {
        pageNum: 1,
        pageSize: 10,
        noticeTitle: undefined,
        createBy: undefined,
        status: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        noticeTitle: [
          { required: true, message: "公告标题不能为空", trigger: "blur" },
        ],
        noticeType: [
          { required: true, message: "公告类型不能为空", trigger: "change" },
        ],
      },
      policy: {
        policyName: "",
        id: "",
        noticeContent: "",
      },
      noticeList2: [],
      noticeList3: [],
    };
  },
  computed: {
    uploadAction() {
      return `${process.env.VUE_APP_BASE_API}/PolicyDocument/addPolicyFile`;
    },
  },
  created() {
    this.getList();
    this.getpolicy();
    this.getproble();
  },
  methods: {
    dialogble() {
      if (this.serterop) {
        this.policy.policyName = this.serterop.replace(/<\/?p>/g, "");
        this.policy.noticeContent = this.terfort.replace(/<\/?p>/g, "");
      }

      PolicyDocument2024(this.policy).then((ok) => {
        if (ok.code == 200) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.getList();
          this.dialogVisible = false;
          this.policy.id = "";
          this.policy.policyName = "";
          this.policy.noticeContent = "";
          this.serterop = "";
          this.terfort = "";
        }
      });
    },
    dialogisible() {
      this.dialogVisible = false;
      this.policy.id = "";
      this.policy.policyName = "";
      this.policy.noticeContent = "";
      this.serterop = "";
      this.terfort = "";
    },
    getList() {
      this.loading = true;
      notice2024(this.queryParams).then((response) => {
        this.noticeList = response.data.rows;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    getpolicy() {
      this.loading = true;
      PolicyDocumentlist2024(this.queryParams2).then((ok) => {
        this.noticeList2 = ok.data.rows;
        this.totallist = ok.data.total;
        this.loading = false;
      });
    },
    getproble() {
      this.loading = true;
      probleList2024(this.queryParams3).then((ok) => {
        console.log(ok);
        this.noticeList3 = ok.data.rows;
        this.totalti = ok.data.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        noticeId: undefined,
        noticeTitle: undefined,
        noticeType: "通知公告",
        noticeContent: undefined,
        status: "0",
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.noticeId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加公告";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.policy.id = row.id;
      this.serterop = row.policyName;
      this.terfort = row.noticeContent;
      this.dialogVisible = true;
    },
    handleFileChange(event) {
      this.file = event.target.files[0];
    },
    handleUploadSuccess(response, file, fileList) {
      this.fileter = fileList;
      console.log("上传成功", response, file, fileList);
    },
    /** 提交按钮 */
    submitForm: function () {
      if (this.form.noticeType === undefined) {
        this.$modal.msgSuccess("请选择公告类型");
      }
      if (this.form.noticeType == "通知公告") {
        let policyy = this.policyy.replace(/<\/?p>/g, "");
        let notice = this.notice.replace(/<\/?p>/g, "");
        const formData = new FormData();
        formData.append("file", this.file);
        formData.append("policyName", policyy);
        formData.append("noticeContent", notice);
        addNotice2024(formData).then((ok) => {
          console.log(ok);
          if (ok.code == 200) {
            this.getList();
            this.$modal.msgSuccess("新增成功");
            this.policyy = "";
            this.notice = "";
          }
        });
      } else if (this.form.noticeType == "政策文件") {
        let notice = this.notice.replace(/<\/?p>/g, "");
        let formData = new FormData();
        this.fileter.forEach((file) => {
          formData.append("files", file.raw);
        });
        // formData.append("files", this.fileter);
        formData.append("noticeContent", notice);
        addPolicyFile2024(formData).then((ok) => {
          console.log(ok);
          if (ok.code == 200) {
            this.getList();
            this.$modal.msgSuccess("新增成功");
            this.policyy = "";
            this.notice = "";
          }
        });
      } else {
        console.log(333);
      }
      // this.$refs["form"].validate((valid) => {
      //   if (valid) {
      //     if (this.form.noticeId != undefined) {
      //       updateNotice(this.form).then((response) => {
      //         this.$modal.msgSuccess("修改成功");
      //         this.open = false;
      //         this.getList();
      //       });
      //     } else {
      //       addNotice(this.form).then((response) => {
      //         this.$modal.msgSuccess("新增成功");
      //         this.open = false;
      //         this.getList();
      //       });
      //     }
      //   }
      // });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      PolicyDocumentnotice2024(row.id).then((ok) => {
        if (ok.code == 200) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.getList();
        }
      });
    },
    noticeList2Delete(row) {
      PolicyDocumentnotice2024(row.id).then((ok) => {
        if (ok.code == 200) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.getpolicy();
        }
      });
    },
    getprobleDelete(row) {
      PolicyDocumentnoticewt2024(row.id).then((ok) => {
        if (ok.code == 200) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.getproble();
        }
      });
    },
  },
};
</script>
<style scoped>
.edier >>> .ql-toolbar.ql-snow {
  display: none;
}
.edier >>> .ql-toolbar.ql-snow + .ql-container.ql-snow {
  border: 1px solid;
}

.uolode {
  display: flex;
  justify-content: space-around;
  align-items: stretch;
}
</style>
