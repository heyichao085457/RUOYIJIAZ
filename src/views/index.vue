<template>
  <div class="container">
    <div class="line"></div>
    <div class="sellect">
      <el-form ref="form" :model="formData" label-width="30px">
        <div>
          <el-row class="title" type="flex" align="middle">
            <el-col :span="4">
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
            </el-col>
            <el-col :span="4">
              <div class="block">
                <el-date-picker
                  v-model="time"
                  type="monthrange"
                  range-separator="至"
                  :picker-options="pickerOptions0"
                  start-placeholder="开始月份"
                  end-placeholder="结束月份"
                >
                </el-date-picker>
              </div>
            </el-col>
            <el-col :span="3" :style="{ marginLeft: '40px' }">
              <el-form-item label="">
                <div class="block">
                  <el-date-picker
                    v-model="formData.snapdate"
                    type="date"
                    placeholder="请选择数据时点日期"
                    :picker-options="ptyOptions"
                  >
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>

            <el-col :span="3" :style="{ marginLeft: '40px' }">
              <el-form-item label="">
                <el-input
                  v-model="formData.checkJobName"
                  v-on:input="restrictSpecialCharacters"
                  placeholder="请输入核查工作名称"
                  clearable
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
              <div v-if="showError" style="color: rgb(152, 140, 140)">
                只能输入字母、数字和空格！
              </div>
            </el-col>
            <el-col :span="5">
              <el-form-item label="">
                <el-input
                  placeholder="请输入图斑编号/地块编号"
                  v-model.trim="formData.dkOrTb"
                  clearable
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <screen @getData="getFrom" />

              <el-button
                type="primary"
                @click="findAll(true)"
                :style="{ marginRight: '10px', marginLeft: '10px' }"
                >查询</el-button
              >

              <el-button type="text" v-if="false"
                >更多查询 <span class="iconfont">&#xe60e;</span></el-button
              >

              <el-button
                type="danger"
                @click="clear"
                :style="{ marginRight: '10px' }"
                >清除</el-button
              >
            </el-col>
          </el-row>
        </div>
        <div>
          <el-row>
            <!-- <el-col :span="4">
              <el-form-item label="">
                <el-select
                  v-model="formData.cancelStatus"
                  placeholder="请选择销号状态"
                  :style="{ width: '100%' }"
                  clearable
                  multiple
                >
                  <el-option
                    v-for="item in xhzt"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
            <!-- <el-col :span="3">
              <el-form-item label="" class="checkDetermineResult">
                <el-select
                  multiple
                  v-model="formData.pdlx"
                  placeholder="请选择原判定类型"
                  clearable
                >
                  <el-option
                    v-for="item in pdlx"
                    :key="item.text"
                    :label="item.label"
                    :value="item.value"
                    :style="{ width: '100%' }"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
            <!-- <el-col :span="4">
              <el-form-item label="">
                <el-select
                  multiple
                  v-model="formData.checkDetermineResult"
                  placeholder="请选择核查后判定类型"
                  clearable
                >
                  <el-option
                    v-for="item in pdlx"
                    :key="item.text"
                    :label="item.label"
                    :value="item.value"
                    :style="{ width: '100%' }"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
            <!-- <el-col :span="4">
              <el-form-item label="">
                <el-select
                  v-model="formData.checkMethod"
                  placeholder="请选择核查方式"
                  clearable
                  multiple
                >
                  <el-option
                    v-for="item in hcfs"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :style="{ width: '100%' }"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col> -->

            <div class="iconfontlist"></div>
          </el-row>
        </div>
      </el-form>
    </div>
    <div class="line1"></div>
    <div class="table-container">
      <el-table
        align="center"
        class="tableDatalistrow"
        stripe
        height="600"
        :data="tableData"
      >
        <el-table-column
          prop="index1"
          label="序号"
          type="index"
          :resizable="false"
          align="center"
          width="46"
        >
        </el-table-column>

        <el-table-column
          prop="checkJobName"
          :resizable="false"
          align="center"
          label="核查工作名称"
          width="114"
        >
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.checkJobName"
              placement="top"
              effect="dark"
            >
              <div class="address-cell">
                {{ scope.row.checkJobName }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="city"
          :resizable="false"
          align="center"
          label="市"
          width="114"
        />

        <el-table-column
          prop="county"
          :resizable="false"
          align="center"
          label="区县"
          width="114"
        />

        <el-table-column
          prop="freckleCode"
          :resizable="false"
          align="center"
          label="图斑编号"
          width="116"
        >
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.freckleCode"
              placement="top"
              effect="dark"
            >
              <div class="address-cell">
                {{ scope.row.freckleCode }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column
          prop="landCode"
          :resizable="false"
          align="center"
          label="地块编号"
          width="115"
        >
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.landCode"
              placement="top"
              effect="dark"
            >
              <div class="address-cell">
                {{ scope.row.landCode }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column
          prop="tbfl"
          :resizable="false"
          align="center"
          label="图斑分类"
          width="117"
        >
        </el-table-column>

        <el-table-column
          prop="pdlx"
          :resizable="false"
          align="center"
          label="原判定类型"
          width="115"
        >
        </el-table-column>
        <el-table-column
          prop="checkDetermineResult"
          :resizable="false"
          align="center"
          label="核查后判定类型"
          width="115"
        >
        </el-table-column>
        <el-table-column
          prop="cancelStatus"
          :resizable="false"
          align="center"
          label="销号状态"
          width="117"
        >
          <template slot-scope="scope">
            <el-tag
              :type="
                scope.row.cancelStatus === '未销号'
                  ? 'danger'
                  : scope.row.cancelStatus === '已销号'
                  ? 'success'
                  : 'primary'
              "
              disable-transitions
              >{{ scope.row.cancelStatus }}</el-tag
            >
          </template>
        </el-table-column>

        <el-table-column
          prop="smzqjd"
          :resizable="false"
          align="center"
          label="生命周期节点"
          width="115"
        >
        </el-table-column>
        <el-table-column
          prop="shyj"
          :resizable="false"
          align="center"
          label="省级审核意见"
          width="115"
        >
        </el-table-column>
        <el-table-column
          prop="illegalityType"
          :resizable="false"
          align="center"
          label="核查后违法类型"
          width="116"
        >
        </el-table-column>
        <el-table-column
          prop="deductionType"
          :resizable="false"
          align="center"
          label="扣减类型"
          width="114"
        >
        </el-table-column>
        <el-table-column
          prop="checkMethod"
          :resizable="false"
          align="center"
          label="核查方式"
          width="114"
        >
        </el-table-column>
        <el-table-column
          prop="actualUse"
          :resizable="false"
          align="center"
          label="核查后实际用途"
          width="112"
        >
        </el-table-column>
        <el-table-column
          prop="freckleInfractionArea"
          :resizable="false"
          align="center"
          label="核查后地块面积"
          width="130"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="freckleInfractionArable"
          :resizable="false"
          align="center"
          label="核查后耕地面积"
          width="130"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="freckleInfractionFarmland"
          :resizable="false"
          align="center"
          label="核查后基本农田面积"
          width="130"
        >
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          :resizable="false"
        >
          <template slot-scope="scope">
            <el-button
              @click="handleEditClick(scope.row)"
              style="color: #18a1f0; fontsize: 20px"
              class="button"
              type="text"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="flexlist">
      <div style="width: 50%">
        <el-row class="title" type="flex" align="middle">
          <div :style="{ marginLeft: '10px' }">
            <el-button type="danger" icon="iconfont"
              ><span class="iconfont">&#xe754;</span>
              添加至核查任务列表</el-button
            >
            <!-- @click="addTask" -->
          </div>
          <div :style="{ marginLeft: '10px' }">
            <el-button type="primary" icon="iconfont " @click="importData"
              ><span class="iconfont">&#xe65e;</span> 批量导入</el-button
            >
          </div>
          <!-- <div :style="{ marginLeft: '10px' }">
            <el-button type="primary" @click="exportData"
              ><span class="iconfont">&#xe65e;</span> 数据导出</el-button
            >
          </div> -->
          <div :style="{ marginLeft: '10px' }">
            <el-dropdown class="dropdown-left" @command="dropdownItemClick">
              <el-button class="dropdown-left" type="primary">
                数据导出<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="exportCurrentList"
                  >当前清单列表</el-dropdown-item
                >
                <el-dropdown-item command="qualityCheckList"
                  >数据质检清单</el-dropdown-item
                >
                <el-dropdown-item command="uploadFileList"
                  >上传文件清单</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div :style="{ marginLeft: '10px' }">
            <el-button
              type="primary"
              icon="el-icon-plus"
              class="elprimary"
              @click="computing"
              >添加至计算池</el-button
            >
          </div>
        </el-row>
      </div>
      <div style="width: 50%">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>

    <div class="el-dialoglbody">
      <div class="dialoglbodylo">
        <el-dialog
          :title="title"
          :visible.sync="dialogUploadVisible"
          :close-on-click-modal="false"
          :before-close="handleClosefengt"
        >
          <el-upload
            class="upload"
            drag
            accept=".xls, .xlsx"
            name="file"
            :limit="1"
            :multiple="false"
            :before-upload="handleBeforeUpload"
            :file-list="fileList"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传excl文件</div>
          </el-upload>

          <el-button type="primary" @click="downLoadTemplate()">{{
            uploadButton
          }}</el-button>
          <el-button type="primary" @click="qualityinspection"
            >数据质检</el-button
          >
          <el-button type="primary" @click="beforeUpload">上传文件</el-button>
        </el-dialog>
        <div v-if="progressVisible" class="progressVisiblerow">
          <el-progress :percentage="uploadProgress"></el-progress>
        </div>
      </div>
    </div>
    <el-dialog
      title="请添加名称"
      :visible.sync="centerVisible"
      width="30%"
      center
      :before-close="handleClose"
    >
      <div>
        <el-input v-model="namerow" autocomplete="off"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="terDialog">确 定</el-button>
      </span>
    </el-dialog>
    <div class="pole">
      <el-dialog
        title="项目清单下载"
        append-to-body
        :visible.sync="fullscreenVisible"
        modal-append-to-body
        :width="'1200px'"
        class="nuiop"
      >
        <div class="grouplist">
          <div>
            <el-input
              v-model.trim="inputsearch"
              placeholder="搜索"
              @blur="handleSearch"
            ></el-input>
          </div>
          <div class="grouplist">
            <el-button-group>
              <el-button type="primary" @click="exportData"
                >开始打包生成</el-button
              >
              <el-button type="primary" @click="grouplistrow">刷新</el-button>
            </el-button-group>
          </div>
        </div>
        <div id="DataListrow">
          <el-table :data="DataListrow" style="width: 100%" height="500px">
            <el-table-column type="index" label="序号" width="200">
            </el-table-column>
            <el-table-column prop="fileName" label="文件名称" width="200">
              <template slot-scope="scope">
                <el-tooltip
                  :content="scope.row.fileName"
                  placement="top"
                  effect="dark"
                >
                  <div class="address-cell">
                    {{ scope.row.fileName }}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="fileSize" label="文件大小(MB)" width="200">
            </el-table-column>
            <el-table-column
              prop="fileDescription"
              label="说明描述"
              width="200"
            >
            </el-table-column>
            <el-table-column prop="createBy" label="创建人" width="200">
              <template slot-scope="scope">
                <el-tooltip
                  :content="scope.row.createBy"
                  placement="top"
                  effect="dark"
                >
                  <div class="address-cell">
                    {{ scope.row.createBy }}
                  </div>
                </el-tooltip>
              </template>
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
          <div>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange1"
                :current-page="currentPage4"
                :page-sizes="[20, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="allData.length"
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <div class="pole">
      <el-dialog
        title="数据质检清单"
        append-to-body
        :visible.sync="polebodyrow"
        modal-append-to-body
        :width="'1200px'"
        class="nuiop"
      >
        <div class="grouplist">
          <div>
            <el-input
              v-model.trim="inputsize"
              placeholder="搜索"
              @blur="handleSinputsize"
            ></el-input>
          </div>
        </div>
        <div id="DataListrowscope">
          <el-table :data="DataListrowscope" style="width: 100%" height="500px">
            <el-table-column type="index" label="序号" width="200">
            </el-table-column>
            <el-table-column prop="checkName" label="文件名称" width="200">
              <template slot-scope="scope">
                <el-tooltip
                  :content="scope.row.checkName"
                  placement="top"
                  effect="dark"
                >
                  <div class="address-cell">
                    {{ scope.row.checkName }}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              prop="checkDescription"
              label="文件描述"
              width="200"
            >
              <template slot-scope="scope">
                <el-tooltip
                  :content="scope.row.checkDescription"
                  placement="top"
                  effect="dark"
                >
                  <div class="address-cell">
                    {{ scope.row.checkDescription }}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="checkSize" label="文件大小(MB)" width="200">
            </el-table-column>
            <el-table-column prop="createBy" label="创建人" width="200">
              <template slot-scope="scope">
                <el-tooltip
                  :content="scope.row.createBy"
                  placement="top"
                  effect="dark"
                >
                  <div class="address-cell">
                    {{ scope.row.createBy }}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="200">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEditscope(scope.$index, scope.row)"
                  >下载</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>
    <div class="pole">
      <el-dialog
        title="上传文件清单"
        append-to-body
        :visible.sync="Uploadfilelist"
        modal-append-to-body
        :width="'1200px'"
        class="nuiop"
      >
        <div class="grouplist">
          <div>
            <el-input
              v-model.trim="Dataerinputsearch"
              placeholder="搜索"
              @blur="DataerhandleSearch"
            ></el-input>
          </div>
        </div>
        <div id="Dataer">
          <el-table :data="Dataer" style="width: 100%" height="500px">
            <el-table-column type="index" label="序号" width="200">
            </el-table-column>
            <el-table-column prop="importName" label="文件名称" width="200">
              <template slot-scope="scope">
                <el-tooltip
                  :content="scope.row.importName"
                  placement="top"
                  effect="dark"
                >
                  <div class="address-cell">
                    {{ scope.row.importName }}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="importSize" label="文件大小(MB)" width="200">
            </el-table-column>
            <el-table-column
              prop="importDescription"
              label="说明描述"
              width="200"
            >
            </el-table-column>
            <el-table-column prop="createBy" label="创建人" width="200">
              <template slot-scope="scope">
                <el-tooltip
                  :content="scope.row.createBy"
                  placement="top"
                  effect="dark"
                >
                  <div class="address-cell">
                    {{ scope.row.createBy }}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="200">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handcodelop(scope.$index, scope.row)"
                  >下载</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import screen from "./screenTwo/screenTwo.vue";
import config from "../api/document/index";
import {
  addProblemPatch,
  options,
  areas,
  exportproblem,
  batchImport,
  listfileList,
  dataDetection,
  checkList,
  importList,
} from "../api/document/index";
export default {
  name: "Index",
  components: {
    screen,
  },
  data() {
    return {
      Dataerinputsearch: "",
      Dataer: [],
      DataListrowscope: [],
      Uploadfilelist: false,
      inputsize: "",
      inputsearch: "",
      allData: [],
      currentPage4: 1, // 当前页码
      pageSize: 20, // 每页显示条目个数
      totalop: 0, // 总条目数
      fullscreenVisible: false,
      namerow: "",
      centerVisible: false,
      selectedIndex: 0,
      enabledDates: [], // 从后端获取的日期数组
      pickerOptions1: {
        disabledDate: (time) => {
          // 将时间转换为 yyyy-MM-dd 格式以便比较
          const formattedDate = this.formatDate(time);
          // 检查日期是否在启用的日期数组中
          return !this.enabledDates.includes(formattedDate);
        },
      },
      valuedate: "",
      enabledDateslist: [], // 从接口获取的日期数组
      ptyOptions: {
        disabledDate: (time) => {
          const formattedDate = this.formatDate(time);
          return !this.enabledDateslist.includes(formattedDate);
        },
        onPick: (date) => {
          // 如果只选择一个则保存至selectDate 否则selectDate 为空
          if (date.minDate && !date.maxDate) {
            this.selectDate = date.minDate;
          } else {
            this.selectDate = null;
          }
        },
      },
      snapdate: "",
      inputText: "",
      showError: false,
      uploadButton: "模版下载",
      uploadLog: "",
      pdlx: [],
      hcfs: [],
      text: "",
      value: "",
      selectDate: null,
      selectedDateValue: null, //时间区间
      pickerOptions0: {
        disabledDate: (time) => {
          if (this.selectDate == null) {
            return false;
          } else {
            return this.selectDate.getFullYear() != time.getFullYear();
          }
        },

        onPick: (date) => {
          // 如果只选择一个则保存至selectDate 否则selectDate 为空
          if (date.minDate && !date.maxDate) {
            this.selectDate = date.minDate;
          } else {
            this.selectDate = null;
          }
        },
      },
      inputlist: "",
      allRoles: [],
      //实例对象
      fApi: {},
      //组件参数配置
      option: {
        submitBtn: false,
        // 是否显示重置按钮
        resetBtn: false,
        form: {
          hideRequiredMark: false,
          layout: "horizontal", //inline
          labelAlign: "left",
        },
      },
      time: [],
      loaded: false,
      isShowExport: false,
      dialogFormVisible: false,
      dialogUploadVisible: false,
      year: "",
      xzq: [],
      selectXZQ: [],
      total: 0,
      currentPage: 1,
      problemTypes: [
        {
          value: "",
          label: "全部",
        },
      ],
      xhzt: [],
      listvalue: [],
      selectedItems: [],
      pageSize: 10,
      DataListrow: [],
      formData: {
        id: "",
        cancelStatus: "",
        city: "",
        county: "",
        freckleCode: "",
        pageNum: 1,
        pageSize: 20,
        problemType: "",
        checkJobName: "",
        dkOrTb: "",
        checkMethod: "",
        snapdate: "",
        smzqjd: "",
        checkDetermineResult: "",
        pdlx: "",
        startDate: "",
        endDate: "",
        shyj: "",
        sfwttb: "",
        freckleInfractionAreaMax: "",
        freckleInfractionAreaMin: "",
        freckleInfractionArableMax: "",
        freckleInfractionArableMin: "",
        freckleInfractionFarmlandMax: "",
        freckleInfractionFarmlandMin: "",
      },
      month1: [],
      timeS: [
        { label: "1月", value: 1 },
        { label: "2月", value: 2 },
        { label: "3月", value: 3 },
        { label: "4月", value: 4 },
        { label: "5月", value: 5 },
        { label: "6月", value: 6 },
        { label: "7月", value: 7 },
        { label: "8月", value: 8 },
        { label: "9月", value: 9 },
        { label: "10月", value: 10 },
        { label: "11月", value: 11 },
        { label: "12月", value: 12 },
        { label: "补充图斑", value: 13 },
      ],
      tableData: [],
      value: {},
      selectUser: {},
      loadingData: null,
      title: "",
      tabloList: [],
      itemWidth: 120,
      deductionType: "",
      illegalityType: "",
      qtjtqx: "",
      listvalue: [],
      listvalues: [],
      progressVisible: false,
      uploadProgress: 0,
      progressInterval: null,
      selectedFile: null,
      fileList: [],
      polebodyrow: false,
      Uploadfilelist: false,
    };
  },

  watch: {
    time(newValue, oldValue) {
      if (newValue && newValue[1]) {
        let newEndDate = new Date(newValue[1]);
        newEndDate = new Date(
          newEndDate.getFullYear(),
          newEndDate.getMonth() + 1,
          0
        );
        const formattedNewEndDate = this.formatDate(newEndDate);

        // 只有在新的结束日期不等于当前结束日期时才更新
        if (formattedNewEndDate !== newValue[1]) {
          this.time = [newValue[0], formattedNewEndDate];
        }
      }
    },
  },
  filters: {
    filterSpecialChars(value) {
      return value.replace(/[^A-Za-z0-9 ]/g, "");
    },
  },
  mounted() {
    this.checkListt();
    const firstDayOfYear = new Date(2023, 0, 1); // 2023年1月1日
    const lastDayOfYear = new Date(2023, 11, 31); // 2023年12月31日
    this.time = [
      this.formatDate(firstDayOfYear),
      this.formatDate(lastDayOfYear),
    ];
    this.listfileList();
    if (!this.loaded) {
      this.getXzqhh();
      this.findAll();
      // this.getType();
      this.geOptions();
      this.loaded = true;
    }
    setTimeout(() => {
      this.$nextTick(() => {
        this.isShowExport =
          config.user.funIds != null && config.user.funIds.indexOf(6) > -1;
      });
    }, 1000);
  },
  methods: {
    handleBeforeUpload(file) {
      this.fileList = [];
      this.selectedFile = file;
      this.fileList.push({ name: file.name });
      return false;
    },
    beforeUpload() {
      if (!this.selectedFile) {
        this.$message.error("请先选择一个文件");
        return;
      }
      this.progressVisible = true;
      this.uploadProgress = 0;

      // 模拟进度更新
      const estimatedTime = 30000;
      let elapsed = 0;
      const updateInterval = 1000;

      const interval = setInterval(() => {
        elapsed += updateInterval;
        // 使用 Math.round() 确保进度值是整数
        this.uploadProgress = Math.round(
          Math.min(100, (elapsed / estimatedTime) * 100)
        );

        if (this.uploadProgress >= 100) {
          clearInterval(interval);
        }
      }, updateInterval);

      batchImport(this.selectedFile)
        .then((res) => {
          clearInterval(interval);
          this.uploadProgress = 100;
          this.progressVisible = false;
          if (res.code === 200) {
            this.$message.success("上传成功");
            this.fileList = [];
            this.selectedFile = null;
            this.selectedFile = "";
          } else {
            this.$message.error("上传失败：" + res.message);
          }
        })
        .catch((error) => {
          clearInterval(interval);
          this.progressVisible = false;
          this.$message.error("上传过程中出现错误");
          console.error("上传错误：", error);
        });
    },
    qualityinspection() {
      if (!this.selectedFile) {
        this.$message.error("请先选择一个文件");
        return;
      }

      this.progressVisible = true;
      this.uploadProgress = 0;

      // 模拟进度更新
      const estimatedTime = 30000;
      let elapsed = 0;
      const updateInterval = 1000;

      const interval = setInterval(() => {
        elapsed += updateInterval;
        // 使用 Math.round() 确保进度值是整数
        this.uploadProgress = Math.round(
          Math.min(100, (elapsed / estimatedTime) * 100)
        );

        if (this.uploadProgress >= 100) {
          clearInterval(interval);
        }
      }, updateInterval);

      dataDetection(this.selectedFile).then((res) => {
        clearInterval(interval);
        this.uploadProgress = 100;
        this.progressVisible = false;
        if (res.code === 200) {
          this.$message.success("数据质检完成,数据无误");
          this.fileList = [];
          this.selectedFile = null;
          this.selectedFile = "";
        } else {
          this.$message.error("上传失败：" + res.message);
        }
      });
    },
    dropdownItemClick(command) {
      switch (command) {
        case "exportCurrentList":
          this.exportCurrentList();
          break;
        case "qualityCheckList":
          this.qualityCheckList();

          break;
        case "uploadFileList":
          this.uploadFileList();
          break;
        default:
      }
    },
    exportCurrentList() {
      this.fullscreenVisible = true;
    },
    qualityCheckList() {
      this.polebodyrow = true;
    },
    uploadFileList() {
      this.Uploadfilelist = true;
    },
    handleClose(done) {
      this.namerow = "";
      done();
    },
    handleClosefengt(done) {
      this.progressVisible = false;
      done();
    },
    handleEdit(index, row) {
      let link = document.createElement("a");
      link.href = row.url;
      let filename = row.url.split("/").pop();
      link.download = filename || "download.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    listfileList(params) {
      listfileList(params).then((res) => {
        this.allData = res.data;
        this.handleCurrentChange1(this.currentPage4);
      });
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.updatePage(this.currentPage4); // 更新当前页的数据
    },

    handleCurrentChange1(newPage) {
      this.currentPage4 = newPage;
      this.updatePage(newPage); // 更新当前页的数据
    },

    updatePage(page) {
      const startIndex = (page - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.DataListrow = this.allData.slice(startIndex, endIndex); // 获取当前页的数据切片
    },
    terDialog() {
      let data = {
        city: this.formData.city,
        county: this.formData.county,
        startDate: this.formData.startDate,
        endDate: this.formData.endDate,
        snapdate: this.formData.snapdate,
        checkJobName: this.formData.checkJobName,
        dkOrTb: this.formData.dkOrTb,
        cancelStatus: this.formData.cancelStatus,
        freckleInfractionAreaMax: this.formData.freckleInfractionAreaMax,
        freckleInfractionAreaMin: this.formData.freckleInfractionAreaMin,
        freckleInfractionArableMax: this.formData.freckleInfractionArableMax,
        freckleInfractionArableMin: this.formData.freckleInfractionArableMin,
        freckleInfractionFarmlandMax:
          this.formData.freckleInfractionFarmlandMax,
        freckleInfractionFarmlandMin:
          this.formData.freckleInfractionFarmlandMin,
        pdlx: this.formData.pdlx,
        checkDetermineResult: this.formData.checkDetermineResult,
        checkMethod: this.formData.checkMethod,
        deductionType: this.formData.deductionType,
        illegalityType: this.formData.illegalityType,
        qtjtqx: this.formData.qtjtqx,
        smzqjd: this.formData.smzqjd,
        shyj: this.formData.shyj,
        sfwttb: this.formData.sfwttb,
        remarks: this.namerow,
      };
      axios.post(config.url.addJsc, data).then((res) => {
        let { code } = res.data;
        if (code === 200) {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.namerow = "";
          this.centerVisible = false;
        } else if (code === 500) {
          this.$message({
            message: "请选择条件",
            type: "warning",
          });
        }
      });
    },
    computing() {
      this.centerVisible = true;
    },
    moveLeft() {
      if (this.selectedIndex > 0) {
        this.selectedIndex--;
      }
    },
    moveRight() {
      if (this.selectedIndex < this.tabloList.length - 1) {
        this.selectedIndex++;
      }
    },
    toggleSelection(index) {
      this.selectedIndex = index;
      const item = this.tabloList[index];
      if (this.selectedItems.includes(item)) {
        // 如果已选中，从数组中移除
        this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
      } else {
        // 如果未选中，添加到数组中
        this.selectedItems.push(item);
      }
    },
    formatDate(date) {
      let d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },

    //输入框限制特殊字符
    checkInput() {
      const regex = /^[A-Za-z0-9 ]*$/;
      if (!regex.test(this.inputValue)) {
        this.showError = true;
      } else {
        this.showError = false;
      }
    },
    restrictSpecialCharacters() {
      // 使用正则表达式过滤特殊字符
      this.inputText = this.inputText.replace(/[^\w\s]/gi, "");
    },

    uploadSuccess(response) {
      if (response.code === 200) {
        this.$message({
          message: "上传成功",
          type: "success",
          showClose: true,
          duration: 0,
        });
      }
      clearInterval(this.progressInterval);
      this.progressVisible = false;
      this.uploadProgress = 100;
    },
    uploadError(error) {
      clearInterval(this.progressInterval);
      this.progressVisible = false;
    },

    importData() {
      this.dialogUploadVisible = true;
      this.title = "批量导入";
    },
    geOptions() {
      options().then((res) => {
        if (res.data.code == 200) {
          res.data.data.XHZT.forEach((ele) => {
            this.xhzt.push({ value: ele, label: ele });
          });
          res.data.data.PDJG.forEach((ele) => {
            this.pdlx.push({ value: ele, label: ele });
          });
          res.data.data.HCFS.forEach((ele) => {
            this.hcfs.push({ value: ele, label: ele });
          });
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    // 解构字符串并赋值的通用函数
    assignValuesFromString(targetObj, sourceStr, minField, maxField) {
      const [minStr, maxStr] = sourceStr.split("~").map(Number);
      const min = minStr && !isNaN(Number(minStr)) ? Number(minStr) : "";
      const max = maxStr && !isNaN(Number(maxStr)) ? Number(maxStr) : "";
      targetObj[maxField] = max;
      targetObj[minField] = min;
    },
    getFrom(data) {
      Object.assign(this.formData, data);

      this.assignValuesFromString(
        this.formData,
        data.MinMax,
        "freckleInfractionAreaMin",
        "freckleInfractionAreaMax"
      );
      this.assignValuesFromString(
        this.formData,
        data.freck,
        "freckleInfractionArableMin",
        "freckleInfractionArableMax"
      );

      this.assignValuesFromString(
        this.formData,
        data.Cufreck,
        "freckleInfractionFarmlandMin",
        "freckleInfractionFarmlandMax"
      );

      this.deductionType = data.deductionType;
      this.illegalityType = data.illegalityType;
      this.qtjtqx = data.qtjtqx;

      this.formData.shyj = data.SHYJ;
      this.formData.smzqjd = data.tabloList;
      this.formData.sfwttb = data.sfwttb;
      this.findAll();
    },
    grouplistrow() {
      this.listfileList();
    },
    handleSearch() {
      let params = {
        retrieval: this.inputsearch,
      };
      this.listfileList(params);
    },

    exportData() {
      const load = this.$loading({
        lock: true,
        text: "正在下载数据请稍等...",
        target: document.querySelector("#DataListrow"),
      });
      let params = {
        city: this.formData.city,
        county: this.formData.county,
        ssqx: this.formData.ssqx,
        cancelStatus: this.formData.cancelStatus,
        checkDetermineResult: this.formData.checkDetermineResult,
        startDate: this.formData.startDate,
        endDate: this.formData.endDate,
        checkJobName: this.formData.checkJobName,
        dkOrTb: this.formData.dkOrTb,
        snapdate: this.formData.snapdate,
        checkMethod: this.formData.checkMethod,
        sfwttb: this.formData.sfwttb,
        pdlx: this.formData.pdlx,
        deductionType: this.deductionType,
        illegalityType: this.illegalityType,
        qtjtqx: this.qtjtqx,
        freckleInfractionArableMax: this.freckleInfractionArableMax,
        freckleInfractionArableMin: this.freckleInfractionArableMin,
        freckleInfractionFarmlandMax: this.freckleInfractionFarmlandMax,
        freckleInfractionAreaMax: this.freckleInfractionAreaMax,
        freckleInfractionAreaMin: this.freckleInfractionAreaMin,
        freckleInfractionFarmlandMin: this.freckleInfractionFarmlandMin,
      };
      exportproblem(params).then((res) => {
        if (res.code === 200) {
          load.close();
          this.listfileList();
        }
      });
    },

    cancel() {
      this.dialogFormVisible = false;
    },
    downLoadTemplate() {
      if (this.uploadButton === "模版下载") {
        window.open(
          "http://124.114.203.222:8084/wp/file/问题图斑导入模板.xlsx"
        );
      } else {
        window.open(this.uploadLog);
      }
    },
    submit() {
      this.fApi.submit((formData, fApi) => {
        const load = this.$loading({
          background: "rgba(0, 0, 0, 0.8)", //遮罩层颜色
          lock: true,
          text: "正在提交...",
          target: document.querySelector(".el-main"),
        });
        formData.id = localStorage.getItem("name");
        if (this.title != "修改问题图斑信息") {
          formData.id = this.selectUser.id;
        }
        update()
          .then((res) => {
            if (res.data.code == 200) {
              load.close();
              this.dialogFormVisible = false;
              this.$message(res.data.msg);
              if (this.title != "修改问题图斑信息") {
                this.clear();
              } else {
                this.findAll();
              }
            } else {
              this.$message(res.data.msg);
            }
          })
          .catch((error) => {})
          .finally(() => {
            load.close();
          });
      });
    },

    handleEditClick(value) {
      this.$router.push({
        path: "/wttb_edit",
        query: {
          id: value.id,
          landCode: value.landCode,
          snapdate: this.formData.snapdate,
          tbbh: value.freckleCode,
        },
      });
    },
    getIndex(index) {
      return this.currentPage - 1 + index;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleCurrentChange(value) {
      this.currentPage = value;
      this.formData.pageNum = value;
      this.findAll();
    },
    handleEditscope(index, row) {
      const link = document.createElement("a");
      link.href = row.checkUrl;
      link.setAttribute("download", true);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    handcodelop(index, row) {
      const link = document.createElement("a");
      link.href = row.importUrl;
      link.setAttribute("download", true);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    getXzqhh() {
      areas()
        .then((res) => {
          if (res.code == 200) {
            res.data.forEach((ele) => {
              ele["dataList"].forEach((item) => {
                item["dictName"] = item["dictLabel"];
              });
            });

            this.xzq = res.data;
          } else {
            this.$message(res.data.msg);
          }
        })
        .catch((error) => {
          // 显示错误信息
          this.$message({ message: error });
        })
        .finally(() => {});
    },
    // getType() {
    //   axios.get(config.url.getProblemTypes).then((res) => {
    //     // 关闭loading
    //     if (res.data.code == 200) {
    //       res.data.data.forEach((ele) => {
    //         this.problemTypes.push({ label: ele, value: ele });
    //       });
    //     } else {
    //       this.$message(res.data.msg);
    //     }
    //   });
    // },
    handleChangeXzq(value) {
      this.formData.city = "";
      this.formData.county = "";
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
        this.formData.city = arr.join(",");
        this.formData.county = county.join(",");
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

    findAll(isSearch) {
      options().then((res) => {
        this.enabledDates = res.data.HCRQ.map((date) =>
          this.formatDate(new Date(date))
        );
        this.enabledDateslist = res.data.YWRQ.map((date) =>
          this.formatDate(new Date(date))
        );
      });
      if (this.time == null || this.time.length < 2) {
        this.$message({ message: "请选择日期" });
        return;
      }
      if (isSearch) {
        this.currentPage = 1;
        this.formData.pageNum = 1;
      }

      function formatDateToCustomString(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
      }
      // 在你的代码中使用这个函数
      this.formData.startDate =
        this.time.length > 0
          ? formatDateToCustomString(new Date(this.time[0]))
          : "";
      this.formData.endDate =
        this.time.length > 1
          ? formatDateToCustomString(new Date(this.time[1]))
          : "";

      const load = this.$loading({
        background: "rgba(0, 0, 0, 0.8)",
        lock: true,
        text: "正在获取...",
        target: document.querySelector(".el-main"),
      });
      this.formData.userId = localStorage.getItem("id");
      if (this.formData.code != undefined) {
        this.formData.code = this.formData.code.replace(/(\s*$)/g, "");
      }
      if (this.formData.snapdate) {
        this.formData.snapdate = this.formatDate(this.formData.snapdate);
      }

      let params = { ...this.formData };
      addProblemPatch(params)
        .then((res) => {
          if (res.code == 200) {
            load.close();
            this.tableData = res.rows;
            this.tableData.forEach((item, index) => {
              item.index1 = (this.currentPage - 1) * 10 + index + 1;
            });
            this.total = res.total;
          }
        })
        .catch((error) => {
          console.error("请求出错:", error);
        });
    },
    clear() {
      this.currentPage = 1;
      this.formData = {
        cancelStatus: "",
        city: "",
        county: "",
        landCode: "",
        pageNum: 1,
        pageSize: 20,
        problemType: "",
        year: "",
        xzq: "",
      };
      var ye = new Date().getFullYear() + "";
      this.formData.year = ye;
      this.month1 = [];
      this.selectXZQ = [];
      this.findAll();
    },
    async checkListt(paramsrow, paramsto) {
      try {
        let params = { searchValue: paramsrow };
        let res = await checkList(params);
        this.DataListrowscope = res.data;
        let paramsop = { searchValue: paramsto };
        let resop = await importList(paramsop);
        this.Dataer = resop.data;
      } catch (error) {
        console.error("请求出错", error);
        this.$message.error("请求出错");
      }
    },

    handleSinputsize() {
      this.checkListt(this.inputsize, this.Dataerinputsearch);
    },

    DataerhandleSearch() {
      this.checkListt(this.inputsize, this.Dataerinputsearch);
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.sellect {
  padding: 12px 10px 10px 10px;
  height: 60px;
}
.table-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto; /* 显示滚动条 */
}

.tableDatalistrow {
  flex: 1;
}
.flexlist {
  display: flex;
  height: 50px;
  font-size: 14px;
  background-color: white;
  padding: 0px 10px;
  align-items: center;
}

.line {
  width: 100%;
  height: 1px;
  background: #eff2f5;
}

.line1 {
  width: 99%;
  height: 1px;
  background: #eff2f5;
  margin-left: 10px;
  margin-right: 10px;
}

.block {
  height: 39px;
}
.blocklist {
  text-align: center;
  line-height: 35px;
  border-left: 2px solid #2e83f0;
}
.title {
  height: 40px;
  width: 100%;
}

.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 0px;
}

.el-pagination {
  margin-top: 10px;
  text-align: end;
  margin-right: 10px;
}

.iconfont {
  display: inline-block;
  transform: rotate(180deg);
}

.button el-button .button-hover {
  /* 悬浮效果样式 */

  background-color: #e6f7ff;
  border-color: #91d5ff;
  color: #1890ff;
}

.shujvkuguanli_table .el-table {
  font-weight: 500 !important;
  font-size: 12px !important;
  color: #232323 !important;
}

/* 数据库管理中table的样式（包含多选框和输入框） */
/* 将 上下pading值调空 */
.shujvkuguanli_table .el-table .el-table__cell {
  padding: 0px 0 !important;
  color: #232323;
  height: 20px !important;
}

/* 将表头高度调低 */
.shujvkuguanli_table .el-table th.el-table__cell > .cell {
  height: 20px !important;
  background-color: #8fb0eb;
  color: #232323;
  font-weight: 500;
}

/* 调表格内行的高度 */
.shujvkuguanli_table .el-table td.el-table__cell div {
  box-sizing: border-box;
  height: 20px !important;
}

/* 第一列index的样式 */
.shujvkuguanli_table .el-table--border .el-table__cell:first-child .cell {
  padding-left: 0 !important;
  background-color: transparent;
}

/* 斑马纹的颜色 */
.shujvkuguanli_table
  .el-table--striped
  .el-table__body
  tr.el-table__row--striped
  td.el-table__cell {
  background: #ddecff !important;
}

/* 修改斑马纹高亮颜色 */
.shujvkuguanli_table
  .el-table--striped
  .el-table__body
  tr.el-table__row--striped:hover
  > td {
  background: #8fb0eb !important;
}

/* 修改非斑马纹行的高亮颜色 */
.shujvkuguanli_table .el-table__body tr:hover > td {
  background-color: #8fb0eb !important;
}

/* 第一列选择框选择区域外的样式 */
.shujvkuguanli_table .el-checkbox:last-of-type {
  background-color: #ffffff;
  margin-top: -2px;
  overflow: hidden;
}

/* 当表格里面有输入框时的样式 */
.shujvkuguanli_table .el-input--mini .el-input__inner {
  height: 20px;
  padding: 0px 0px !important;
  border: 0px solid #ffffff !important;
  line-height: 1px;
  background-color: transparent !important;
  text-align: center !important;
}

.shujvkuguanli_table .el-checkbox__inner {
  padding: 0px 0px !important;
  border: 1px solid #232323;
}

.inp {
  border-color: rgb(220, 223, 230);
  width: 120px;
  height: 27px;
  margin-top: 18px;
}

.upload {
  margin-bottom: 20px;
}
.address-cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}

.scroll-container {
  position: relative;
  width: 70%;
  margin-left: 114px;
  height: 40px;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  align-items: center;
}
.listname {
  width: 8vw;
  height: 25px;
  font-size: 15px;
  line-height: 25px;
  text-align: center;
  background-color: #2e83f0;
  color: #fff;
  border-radius: 40px;
  cursor: pointer;
}
.is-selected {
  background-color: rgb(171, 221, 121);
  color: white;
}
.checkDetermineResult >>> .el-form-item__label {
  width: 90px !important ;
}

.list-container {
  display: flex;
  transition: transform 0.3s ease; /* 添加平滑过渡效果 */
}
.title >>> .el-input--small {
  font-size: inherit !important;
  align-items: baseline;
}
.el-row--flex.is-align-middle {
  align-items: initial !important;
}

.tableDatalistrow >>> .has-gutter {
  color: #1890ff;
  text-align: center !important;
}
/* .tableDatalistrow {
  height: 900px !important;
} */

.tableDatalistrow >>> .cell {
  display: flex !important;
  align-items: center !important;
  text-align: center !important;
}
.elprimary {
  height: 36px;
}

.dropdown-left {
  height: 35px !important;
}
.grouplist {
  display: flex;
  justify-content: space-between;
}

.el-dialoglbody >>> .el-dialog__body {
  width: 50%;
  text-align: center;
  margin-left: 233px;
}

.progressVisiblerow {
  width: 737px;
  position: absolute;
  top: 31%;
  z-index: 9999;
  margin-left: 24%;
}
</style>
