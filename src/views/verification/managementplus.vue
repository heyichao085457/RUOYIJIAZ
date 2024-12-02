 <!-- <template>
  <div class="app-title">
    <div class="box-card">
      <el-card v-for="(item, index) in Datacard" :key="index" class="Fortpo">
        <div class="box-div" @click="funlandCode(item.hcrwmc)">
          <div>
            <el-checkbox
              v-model="selectedItems[item.hcrwmc]"
              @change="(event) => handleCheckboxChange(event, item.hcrwmc)"
              @click.native.stop
            ></el-checkbox>
          </div>
          <div>
            <img src="../../../public/img/wjj2008.png" alt="" class="imgbox" />
          </div>
          <div class="item-name">
            {{ item.hcrwmc }}
          </div>
        </div>
        <div style="width: 100px">
          <el-tag type="danger" @click="handleDelete(item.id)">删除</el-tag>
        </div>
      </el-card>
    </div>
    <div class="content-container">
      <div>
        <el-button type="danger" @click="deletelist">添加</el-button>
      </div>
      <div>
        <el-button type="danger" @click="primaryshow">导出</el-button>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="核查任务名称">
          <el-input v-model="form.hcrwmc"></el-input>
        </el-form-item>
        <el-form-item label="核查方式">
          <el-input v-model="form.hcfs"></el-input>
        </el-form-item>
        <el-form-item label="核查日期">
          <el-date-picker
            v-model="time"
            type="date"
            placeholder="选择日期"
            @change="handleDateChange"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="核查任务说明">
          <el-input v-model="form.hcrwsm"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialog">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
    
  <script>
import moment from "moment";
import {
  hcrwlist2024,
  hcrwaddCheckTask,
  hcrwremoveCheckTask,
  exportXhtbjzjz,
} from "../../api/document/index";
export default {
  data() {
    return {
      Datacard: [],
      inputon: "",
      centerDialogVisible: false,
      form: {
        hcrwmc: "",
        hcfs: "",
        hcsj: "",
        hcrwsm: "",
      },
      time: "",
      selectedItems: {},
      selectedTrueItemsString: "",
    };
  },
  mounted() {
    this.tdwpWjjListt();
  },

  methods: {
    handleCheckboxChange(e, hcrwmc) {
      const selectedTrueItems = Object.keys(this.selectedItems).filter(
        (key) => this.selectedItems[key]
      );
      this.selectedTrueItemsString = selectedTrueItems.join(",");
    },
    primaryshow() {
      let params = {
        hcrwmc: this.selectedTrueItemsString,
      };
      exportXhtbjzjz(params).then((ok) => {
        const link = document.createElement("a");
        link.href = ok.msg;
        link.download = "downloadedFile";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    },
    handleDelete(hcrwmc) {
      let data = {
        id: hcrwmc,
      };
      hcrwremoveCheckTask(data).then((ok) => {
        if (ok.code == 200) {
          this.tdwpWjjListt();
          this.$message({
            message: "删除成功",
            type: "success",
          });
        }
      });
    },
    centerDialog() {
      this.form.hcsj = "";
      this.form = {};
      this.centerDialogVisible = false;
    },
    handleSubmit() {
      let checkTask = this.form;
      hcrwaddCheckTask(checkTask).then((ok) => {
        if (ok.code == 200) {
          this.tdwpWjjListt();
          this.form.hcsj = "";
          this.centerDialogVisible = false;
          this.form = {};
          this.$message({
            message: "添加成功",
            type: "success",
          });
        }
      });
    },
    handleDateChange(date) {
      if (date) {
        this.form.hcsj = moment(date).format("YYYY-MM-DD");
      } else {
        this.form.hcsj = "";
      }
    },
    deletelist() {
      this.centerDialogVisible = true;
    },
    tdwpWjjListt() {
      hcrwlist2024().then((ok) => {
        // console.log(ok.data);
        this.Datacard = ok.data;
      });
    },
    funlandCode(hcrwmc) {
      let params = {
        hcrwmc: hcrwmc,
      };

      this.$router.push({
        path: "/verification/managementplusxiang",
        query: params,
      });
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

.box-div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
}
.imgbox {
  height: 30px;
}
.bottom {
  height: 40px;
}
.box-card {
  flex: 1;
}
.Fortpo >>> .el-card__body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content-container {
  width: 200px;
  display: flex;
  justify-content: space-evenly;
}
</style>













 -->
 <template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="4" :xs="24">
        <!-- <el-cascader
          ref="cascader"
          clearable
          v-model="selectXZQ"
          :options="xzq"
          :style="{ width: '100%' }"
          :props="{
            value: 'dictName',
            children: 'dataList',
            label: 'dictName',
            multiple: true,
          }"
          collapse-tags
          @change="handleChangeXzq"
          placeholder="请选择行政区"
        ></el-cascader> -->
        <!-- <div class="head-container">
          <el-input
            v-model="deptName"
            placeholder="请输入部门名称"
            clearable
            size="small"
            prefix-icon="el-icon-search"
            style="margin-bottom: 20px"
          />
        </div> -->
        <div class="head-container">
          <el-tree
            :data="deptOptions"
            :props="defaultProps"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            ref="tree"
            node-key="id"
            default-expand-all
            highlight-current
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <el-col :span="20" :xs="24">
        <el-form ref="form" :model="formData1" label-width="55px">
          <el-col :span="1.5">
            <!-- <el-form-item label="行政区">
              <el-cascader
                ref="cascader"
                clearable
                v-model="selectXZQ"
                :options="xzq"
                :style="{ width: '100%' }"
                :props="{
                  value: 'dictName',
                  children: 'dataList',
                  label: 'dictName',
                  multiple: true,
                }"
                collapse-tags
                @change="handleChangeXzq"
                placeholder="请选择行政区"
              ></el-cascader>
            </el-form-item> -->
          </el-col>

          <!-- <el-col :span="1.5">
              <el-date-picker
                v-model="valuetime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="handleDateChange"
              >
              </el-date-picker>
            </el-col> -->
          <!-- <el-col :span="1.5">
              <el-date-picker
                v-model="formData1.snapdate"
                type="date"
                placeholder="请选择数据时点日期"
                :picker-options="ptyOptions"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="1.5">
              <el-input
                placeholder="请输入图斑编号/地块编号"
                v-model.trim="formData1.dkOrTb"
                clearable
                @keydown.native="handleKeyDown"
              >
              </el-input>
            </el-col> -->
          <!-- <el-col :span="1.5" class="isscreen">
            <div>
              <screen @getData="emitGetData" />
            </div>
            <div>
              <el-button type="primary" @click="findAll(true)">查询</el-button>
            </div>
          </el-col> -->

          <div>
            <el-row>
              <div class="iconfontlist"></div>
            </el-row>
          </div>
        </el-form>
        <!-- <el-form
          :model="queryParams"
          ref="queryForm"
          size="small"
          :inline="true"
          v-show="showSearch"
          label-width="68px"
        >
          <el-form-item label="用户名称" prop="userName">
            <el-input
              v-model="queryParams.userName"
              placeholder="请输入用户名称"
              clearable
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="手机号码" prop="phonenumber">
            <el-input
              v-model="queryParams.phonenumber"
              placeholder="请输入手机号码"
              clearable
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select
              v-model="queryParams.status"
              placeholder="用户状态"
              clearable
              style="width: 240px"
            >
              <el-option
                v-for="dict in dict.type.sys_normal_disable"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="dateRange"
              style="width: 240px"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
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
        </el-form> -->

        <el-row :gutter="10" class="mb8">
          <!-- <el-col :span="1.5">
            <el-button
              type="primary"
              plain
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
              v-hasPermi="['system:user:add']"
              >新增</el-button
            >
          </el-col> -->
          <!-- <el-col :span="1.5">
            <el-button
              type="success"
              plain
              icon="el-icon-edit"
              size="mini"
              :disabled="single"
              @click="handleUpdate"
              v-hasPermi="['system:user:edit']"
              >修改</el-button
            >
          </el-col> -->
          <!-- <el-col :span="1.5">
            <el-button
              type="danger"
              plain
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
              v-hasPermi="['system:user:remove']"
              >删除</el-button
            >
          </el-col> -->
          <!-- <el-col :span="1.5">
            <el-button
              type="info"
              plain
              icon="el-icon-upload2"
              size="mini"
              @click="handleImport"
              v-hasPermi="['system:user:import']"
              >导入</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="warning"
              plain
              icon="el-icon-download"
              size="mini"
              @click="handleExport"
              v-hasPermi="['system:user:export']"
              >导出</el-button
            >
          </el-col> -->
          <!-- <right-toolbar
            :showSearch.sync="showSearch"
            @queryTable="getList"
            :columns="columns"
          ></right-toolbar> -->
        </el-row>

        <div class="table-container">
          <el-table
            align="center"
            class="tableDatalistrow"
            stripe
            :data="tableData"
            max-height="760"
          >
            <!-- 固定的序号列 -->
            <el-table-column
              type="index"
              label="序号"
              width="70"
              align="center"
            >
            </el-table-column>

            <!-- 动态生成表格列 -->
            <el-table-column
              v-for="column in columnList"
              :key="column.prop"
              :prop="column.prop"
              :label="column.label"
              :width="column.width"
              :align="column.align"
              :resizable="false"
            >
              <!-- 判断是否需要 tooltip -->
              <template v-slot="scope">
                <el-tooltip
                  v-if="column.tooltip"
                  :content="scope.row[column.prop]"
                  placement="top"
                  effect="dark"
                >
                  <div class="address-cell">{{ scope.row[column.prop] }}</div>
                </el-tooltip>
                <div v-else>{{ scope.row[column.prop] }}</div>
              </template>
            </el-table-column>

            <!-- 操作列 -->
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              :resizable="false"
            >
              <template slot-scope="scope">
                <el-button
                  @click="handleEditClick(scope.row)"
                  style="color: #18a1f0"
                  class="button"
                  type="text"
                  >详情</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- <el-table
          v-loading="loading"
          :data="userList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column
            label="用户编号"
            align="center"
            key="userId"
            prop="userId"
            v-if="columns[0].visible"
          />
          <el-table-column
            label="用户名称"
            align="center"
            key="userName"
            prop="userName"
            v-if="columns[1].visible"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="用户昵称"
            align="center"
            key="nickName"
            prop="nickName"
            v-if="columns[2].visible"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="部门"
            align="center"
            key="deptName"
            prop="dept.deptName"
            v-if="columns[3].visible"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="手机号码"
            align="center"
            key="phonenumber"
            prop="phonenumber"
            v-if="columns[4].visible"
            width="120"
          />
          <el-table-column
            label="状态"
            align="center"
            key="status"
            v-if="columns[5].visible"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                active-value="0"
                inactive-value="1"
                @change="handleStatusChange(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            align="center"
            prop="createTime"
            v-if="columns[6].visible"
            width="160"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="160"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope" v-if="scope.row.userId !== 1">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
                v-hasPermi="['system:user:edit']"
                >修改</el-button
              >
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
                v-hasPermi="['system:user:remove']"
                >删除</el-button
              >
              <el-dropdown
                size="mini"
                @command="(command) => handleCommand(command, scope.row)"
                v-hasPermi="['system:user:resetPwd', 'system:user:edit']"
              >
                <el-button size="mini" type="text" icon="el-icon-d-arrow-right"
                  >更多</el-button
                >
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    command="handleResetPwd"
                    icon="el-icon-key"
                    v-hasPermi="['system:user:resetPwd']"
                    >重置密码</el-dropdown-item
                  >
                  <el-dropdown-item
                    command="handleAuthRole"
                    icon="el-icon-circle-check"
                    v-hasPermi="['system:user:edit']"
                    >分配角色</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table> -->

        <!-- <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        /> -->
        <div style="float: right">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="this.ListNum.pageNum"
            :page-sizes="[20, 50, 100, 150]"
            :page-size="this.ListNum.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalItems"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>

    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户昵称" prop="nickName">
              <el-input
                v-model="form.nickName"
                placeholder="请输入用户昵称"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归属部门" prop="deptId">
              <treeselect
                v-model="form.deptId"
                :options="deptOptions"
                :show-count="true"
                placeholder="请选择归属部门"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phonenumber">
              <el-input
                v-model="form.phonenumber"
                placeholder="请输入手机号码"
                maxlength="11"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="form.email"
                placeholder="请输入邮箱"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              v-if="form.userId == undefined"
              label="用户名称"
              prop="userName"
            >
              <el-input
                v-model="form.userName"
                placeholder="请输入用户名称"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              v-if="form.userId == undefined"
              label="用户密码"
              prop="password"
            >
              <el-input
                v-model="form.password"
                placeholder="请输入用户密码"
                type="password"
                maxlength="20"
                show-password
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户性别">
              <el-select v-model="form.sex" placeholder="请选择性别">
                <el-option
                  v-for="dict in dict.type.sys_user_sex"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in dict.type.sys_normal_disable"
                  :key="dict.value"
                  :label="dict.value"
                  >{{ dict.label }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- <el-col :span="12">
            <el-form-item label="岗位">
              <el-select
                v-model="form.postIds"
                multiple
                placeholder="请选择岗位"
              >
                <el-option
                  v-for="item in postOptions"
                  :key="item.postId"
                  :label="item.postName"
                  :value="item.postId"
                  :disabled="item.status == 1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <!-- <el-col :span="12">
            <el-form-item label="角色">
              <el-select
                v-model="form.roleIds"
                multiple
                placeholder="请选择角色"
              >
                <el-option
                  v-for="item in roleOptions"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
                  :disabled="item.status == 1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input
                v-model="form.remark"
                type="textarea"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="upload.title"
      :visible.sync="upload.open"
      width="400px"
      append-to-body
    >
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <div class="el-upload__tip" slot="tip">
            <el-checkbox v-model="upload.updateSupport" />
            是否更新已经存在的用户数据
          </div>
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link
            type="primary"
            :underline="false"
            style="font-size: 12px; vertical-align: baseline"
            @click="importTemplate"
            >下载模板</el-link
          >
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listUser,
  getUser,
  delUser,
  addUser,
  updateUser,
  resetUserPwd,
  changeUserStatus,
  deptTreeSelect,
} from "@/api/system/user";
import {
  hcglTree,
  listwyhc,
  areas,
  tbByHcrwmc,
  hcpcjsjwyhc,
} from "../../api/document/index";
import { getToken } from "@/utils/auth";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import moment from "moment";
export default {
  name: "User",
  dicts: ["sys_normal_disable", "sys_user_sex"],
  components: { Treeselect },
  data() {
    return {
      totalItems: 0,
      tableData: [],
      columnList: [],
      selectXZQ: [],
      xzq: [],
      ListNum: {
        pageNum: 1,
        pageSize: 20,
        hcrwmc: "",
        hcpcjsj: "",
      },
      // 总条数

      // 用户表格数据
      userList: null,
      // 弹出层标题
      title: "",
      // 部门树选项
      deptOptions: [],
      // 是否显示弹出层
      open: false,
      // 部门名称
      deptName: undefined,
      // 默认密码
      initPassword: undefined,
      // 日期范围
      dateRange: [],
      // 岗位选项
      postOptions: [],
      // 角色选项
      roleOptions: [],
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "label",
      },
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/system/user/importData",
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        phonenumber: undefined,
        status: undefined,
        deptId: undefined,
      },
      // 列信息
      columns: [
        { key: 0, label: `用户编号`, visible: true },
        { key: 1, label: `用户名称`, visible: true },
        { key: 2, label: `用户昵称`, visible: true },
        { key: 3, label: `部门`, visible: true },
        { key: 4, label: `手机号码`, visible: true },
        { key: 5, label: `状态`, visible: true },
        { key: 6, label: `创建时间`, visible: true },
      ],
      // 表单校验
      rules: {
        userName: [
          { required: true, message: "用户名称不能为空", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "用户名称长度必须介于 2 和 20 之间",
            trigger: "blur",
          },
        ],
        nickName: [
          { required: true, message: "用户昵称不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "用户密码不能为空", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "用户密码长度必须介于 5 和 20 之间",
            trigger: "blur",
          },
        ],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        phonenumber: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {
    this.getList();

    this.hcglTreel();
    this.getConfigKey("sys.user.initPassword").then((response) => {
      this.initPassword = response.msg;
    });
  },
  mounted() {
    this.getXzqhh();
  },
  methods: {
    handleDateChange(dates) {
      if (Array.isArray(dates) && dates.length > 0) {
        const formattedDates = dates.map((date) =>
          moment(date).format("YYYY-MM-DD")
        );
        this.formData1.startDate = formattedDates[0];
        this.formData1.endDate = formattedDates[1];
      } else {
        this.formData1.startDate = "";
        this.formData1.endDate = "";
      }
    },
    getXzqhh() {
      areas().then((res) => {
        if (res.code == 200) {
          res.data.forEach((ele) => {
            ele["dataList"].forEach((item) => {
              item["dictName"] = item["dictLabel"];
            });
          });
          this.xzq = res.data;
        }
      });
    },
    handleKeyDown(event) {
      // 检查按键是否为 Enter
      if (event.key === "Enter" || event.keyCode === 13) {
        this.findAll();
      }
    },
    handleChangeXzq(value) {
      this.formData1.city = "";
      this.formData1.county = "";
      if (value.length) {
        const textArr = [];
        value.map((item, index) => {
          let type = this.arrayToObject(item);
          textArr.push(type);
        });
        const city = [];
        const county = [];
        textArr.map((m, n) => {
          city.push(m["0"]);
          county.push(m["1"]);
        });
        const arr = [];
        city.map((k, i) => {
          if (!arr.includes(k)) {
            arr.push(k);
          }
        });
        this.formData1.city = arr.join(",");
        this.formData1.county = county.join(",");
      }
    },
    //数组转对象
    arrayToObject(arr) {
      let obj = {};
      arr.forEach((item, index) => {
        obj[index] = item;
      });
      return obj;
    },
    findAll() {},
    handleSizeChange(newSize) {
      this.ListNum.pageSize = newSize;
      // this.list1();
      this.tbByHcrwmcw();
    },
    handleCurrentChange(newPage) {
      this.ListNum.pageNum = newPage;
      // this.list1();
      this.tbByHcrwmcw();
    },
    list1() {
      // listwyhc(this.ListNum).then((ok) => {
      //   if (ok.code == 200) {
      //     this.tableData = ok.data.rows;
      //     this.totalItems = ok.data.total;
      //   }
      // });
    },
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      listUser(this.addDateRange(this.queryParams, this.dateRange)).then(
        (response) => {
          this.userList = response.rows;
          // this.total = response.total;
          this.loading = false;
        }
      );
    },
    /** 查询部门下拉树结构 */
    // getDeptTree() {
    //   deptTreeSelect().then((response) => {
    //     console.log(response.data, "response.data");
    //     this.deptOptions = response.data;
    //   });
    // },
    hcglTreel() {
      hcglTree().then((response) => {
        // console.log(response.data, "response.data");
        this.deptOptions.push(response.data);
      });
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data) {
      console.log(data);
      if (data.flag == "1") {
        this.ListNum.hcpcjsj = data.label;
        this.hcpcjsjwyhcw();
      } else if (data.flag == "5") {
        this.ListNum.hcrwmc = data.label;
        this.tbByHcrwmcw();
      }
      this.queryParams.deptId = data.id;
      this.handleQuery();
    },
    tbByHcrwmcw() {
      tbByHcrwmc(this.ListNum).then((ok) => {
        let Lister = [
          { prop: "city", label: "市", width: "70", align: "center" },
          { prop: "county", label: "区县", width: "100", align: "center" },
          {
            prop: "freckleCode",
            label: "图斑编号",
            width: "250",
            align: "center",
          },
          {
            prop: "hcrwName",
            label: "核查批次及时间",
            width: "210",
            align: "center",
            tooltip: true,
          },
          {
            prop: "dkmj",
            label: "地块面积(亩)",
            width: "117",
            align: "center",
          },
          {
            prop: "gdmj",
            label: "耕地面积(亩)",
            width: "115",
            align: "center",
          },
          {
            prop: "jbntmj",
            label: "基本农田面积(亩)",
            width: "200",
            align: "center",
          },
          {
            prop: "jzjzPdlx",
            label: "判定类型",
            width: "115",
            align: "center",
          },
          {
            prop: "nyshsm",
            label: "内业审核说明",
            width: "200",
            align: "center",
            tooltip: true,
          },
          {
            prop: "wyhcsm",
            label: "外业核查说明",
            width: "115",
            align: "center",
            tooltip: true,
          },
          {
            prop: "wtlx",
            label: "问题类型",
            width: "280",
            align: "center",
            tooltip: true,
          },
          {
            prop: "wfmj",
            label: "违法面积(亩)",
            width: "115",
            align: "center",
          },
          {
            prop: "wfjbntmj",
            label: "违法基本农田面积(亩)",
            width: "200",
            align: "center",
          },
          {
            prop: "cancelStatus",
            label: "销号状态",
            width: "200",
            align: "center",
          },
          {
            prop: "jzjzHchlx",
            label: "核查后类型",
            width: "200",
            align: "center",
            tooltip: true,
          },
          {
            prop: "jzjzSfnrwfjs",
            label: "是否纳入违法计算",
            width: "200",
            align: "center",
          },
          {
            prop: "jzjzTbly",
            label: "图斑来源",
            width: "115",
            align: "center",
          },
        ];
        let tableData = ok.data.rows.map((row, index) => {
          let mappedRow = {};
          Lister.forEach((col) => {
            if (col.prop === "index1") {
              mappedRow[col.prop] = index + 1;
            } else {
              mappedRow[col.prop] = row[col.prop];
            }
          });
          return mappedRow;
        });

        this.columnList = Lister;
        this.tableData = tableData;
        this.totalItems = ok.data.total;
      });
    },
    hcpcjsjwyhcw() {
      hcpcjsjwyhc(this.ListNum).then((ok) => {
        let Listop = [
          { prop: "city", label: "市", width: "70", align: "center" },
          { prop: "county", label: "区县", width: "100", align: "center" },
          {
            prop: "freckleCode",
            label: "图斑编号",
            width: "235",
            align: "center",
          },
          {
            prop: "landCode",
            label: "地块编号",
            width: "235",
            align: "center",
          },
          { prop: "tbfl", label: "图斑分类", width: "117", align: "center" },
          { prop: "tbmj", label: "图斑面积", width: "115", align: "center" },
          { prop: "gdmj", label: "耕地面积", width: "115", align: "center" },
          {
            prop: "yjjbntmj",
            label: "永久基本农田面积",
            width: "200",
            align: "center",
          },
          { prop: "tblx", label: "填报类型", width: "117", align: "center" },
          {
            prop: "wyhcTbly",
            label: "图斑来源",
            width: "115",
            align: "center",
          },
          {
            prop: "sjysyj",
            label: "省级预审意见",
            width: "280",
            align: "center",
            tooltip: true,
          },
          {
            prop: "tbhcjd",
            label: "图斑核查阶段",
            width: "115",
            align: "center",
          },
          { prop: "hczt", label: "核查状态", width: "115", align: "center" },
          { prop: "jzzt", label: "举证状态", width: "115", align: "center" },
          { prop: "hchlx", label: "核查后类型", width: "200", align: "center" },
          {
            prop: "wfgdmj",
            label: "违法耕地面积",
            width: "115",
            align: "center",
          },
          { prop: "wfmj", label: "违法面积", width: "115", align: "center" },
          {
            prop: "wfjbntmj",
            label: "违法基本农田面积",
            width: "200",
            align: "center",
          },
          { prop: "dcr", label: "调查人", width: "115", align: "center" },
          { prop: "jzry", label: "举证人员", width: "115", align: "center" },
          {
            prop: "wyhcSfnrwfjs",
            label: "是否纳入违法计算",
            width: "200",
            align: "center",
          },
          {
            prop: "wyhcCancelStatus",
            label: "销号状态",
            width: "115",
            align: "center",
          },
        ];
        let tableData = ok.data.rows.map((row, index) => {
          let mappedRow = {};
          Listop.forEach((col) => {
            if (col.prop === "index1") {
              mappedRow[col.prop] = index + 1;
            } else {
              mappedRow[col.prop] = row[col.prop];
            }
          });
          return mappedRow;
        });
        this.columnList = Listop;
        this.tableData = tableData;
        this.totalItems = ok.data.total;
      });
    },
    // 用户状态修改
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$modal
        .confirm('确认要"' + text + '""' + row.userName + '"用户吗？')
        .then(function () {
          return changeUserStatus(row.userId, row.status);
        })
        .then(() => {
          this.$modal.msgSuccess(text + "成功");
        })
        .catch(function () {
          row.status = row.status === "0" ? "1" : "0";
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
        userId: undefined,
        deptId: undefined,
        userName: undefined,
        nickName: undefined,
        password: undefined,
        phonenumber: undefined,
        email: undefined,
        sex: undefined,
        status: "0",
        remark: undefined,
        postIds: [],
        roleIds: [],
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
      this.dateRange = [];
      this.resetForm("queryForm");
      this.queryParams.deptId = undefined;
      this.$refs.tree.setCurrentKey(null);
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.userId);
      // this.single = selection.length != 1;
    },
    // 更多操作触发
    handleCommand(command, row) {
      switch (command) {
        case "handleResetPwd":
          this.handleResetPwd(row);
          break;
        case "handleAuthRole":
          this.handleAuthRole(row);
          break;
        default:
          break;
      }
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      getUser().then((response) => {
        this.postOptions = response.posts;
        this.roleOptions = response.roles;
        this.open = true;
        this.title = "添加用户";
        this.form.password = this.initPassword;
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const userId = row.userId || this.ids;
      getUser(userId).then((response) => {
        this.form = response.data;
        this.postOptions = response.posts;
        this.roleOptions = response.roles;
        this.$set(this.form, "postIds", response.postIds);
        this.$set(this.form, "roleIds", response.roleIds);
        this.open = true;
        this.title = "修改用户";
        this.form.password = "";
      });
    },
    /** 重置密码按钮操作 */
    handleResetPwd(row) {
      this.$prompt('请输入"' + row.userName + '"的新密码', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        inputPattern: /^.{5,20}$/,
        inputErrorMessage: "用户密码长度必须介于 5 和 20 之间",
      })
        .then(({ value }) => {
          resetUserPwd(row.userId, value).then((response) => {
            this.$modal.msgSuccess("修改成功，新密码是：" + value);
          });
        })
        .catch(() => {});
    },
    /** 分配角色操作 */
    handleAuthRole: function (row) {
      const userId = row.userId;
      this.$router.push("/system/user-auth/role/" + userId);
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.userId != undefined) {
            updateUser(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addUser(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const userIds = row.userId || this.ids;
      this.$modal
        .confirm('是否确认删除用户编号为"' + userIds + '"的数据项？')
        .then(function () {
          return delUser(userIds);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "system/user/export",
        {
          ...this.queryParams,
        },
        `user_${new Date().getTime()}.xlsx`
      );
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "用户导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download(
        "system/user/importTemplate",
        {},
        `user_template_${new Date().getTime()}.xlsx`
      );
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(
        "<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" +
          response.msg +
          "</div>",
        "导入结果",
        { dangerouslyUseHTMLString: true }
      );
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
  },
};
</script>
<style scoped>
.address-cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}
.table-container {
  height: 100%;
}
</style>
