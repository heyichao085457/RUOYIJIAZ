<template>
  <div class="container">
    <div class="line"></div>
    <div class="sellect">
      <el-form ref="form" :model="formData7" label-width="55px">
        <div>
          <el-row class="title" type="flex" align="middle">
            <el-col :span="4">
              <el-form-item label="行政区">
                <el-cascader
                  ref="cascader"
                  clearable
                  v-model="formData7.selectXZQ"
                  :options="xzq"
                  :style="{ width: '100%' }"
                  :props="{
                    value: 'value',
                    label: 'label',
                    children: 'children',
                    multiple: true,
                  }"
                  collapse-tags
                  @change="handleChangeXzq"
                  placeholder="请选择行政区"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-date-picker
                v-model="formData7.valuetime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="handleDateChange"
              >
              </el-date-picker>
            </el-col>
            <!-- <el-col :span="3" :style="{ marginLeft: '10px' }">
                    <el-date-picker
                      v-model="formData.snapdate"
                      type="date"
                      placeholder="请选择数据时点日期"
                      :picker-options="ptyOptions"
                    >
                    </el-date-picker>
                  </el-col> -->

            <el-col :span="4" :style="{ marginLeft: '15px' }">
              <el-input
                size="medium"
                placeholder="请输入图斑编号/地块编号"
                v-model.trim="formData7.dkOrTb"
                clearable
                @keydown.native="handleKeyDown"
              >
              </el-input>
            </el-col>
            <el-col :span="3" class="isscreen">
              <div>
                <screen @getData="emitGetData" />
              </div>
              <div>
                <el-button type="primary" @click="findAll(true)"
                  >查询</el-button
                >
              </div>
            </el-col>
            <el-col :span="5" class="containe"> </el-col>
          </el-row>
        </div>
        <div>
          <el-row>
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
          prop="年度"
          :resizable="false"
          align="center"
          label="年度"
          width="70"
        />

        <el-table-column
          prop="省名称"
          :resizable="false"
          align="center"
          label="省名称"
          width="100"
        />

        <el-table-column
          prop="县名称"
          :resizable="false"
          align="center"
          label="县名称"
          width="100"
        >
          <!-- <template slot-scope="scope">
                  <el-tooltip
                    :content="scope.row.freckleCode"
                    placement="top"
                    effect="dark"
                  >
                    <div class="address-cell">
                      {{ scope.row.freckleCode }}
                    </div>
                  </el-tooltip>
                </template> -->
        </el-table-column>

        <el-table-column
          prop="监测编号"
          :resizable="false"
          align="center"
          label="监测编号"
          width="180"
        >
          <!-- <template slot-scope="scope">
                  <el-tooltip
                    :content="scope.row.landCode"
                    placement="top"
                    effect="dark"
                  >
                    <div class="address-cell">
                      {{ scope.row.landCode }}
                    </div>
                  </el-tooltip>
                </template> -->
        </el-table-column>

        <el-table-column
          prop="原始图斑编号"
          :resizable="false"
          align="center"
          label="原始图斑编号"
          width="200"
        >
        </el-table-column>

        <el-table-column
          prop="合法性判定结果"
          :resizable="false"
          align="center"
          label="合法性判定结果"
          width="115"
        >
        </el-table-column>

        <el-table-column
          prop="监测面积"
          :resizable="false"
          align="center"
          label="监测面积(亩)"
          width="115"
        >
        </el-table-column>
        <el-table-column
          prop="监测耕地面积"
          :resizable="false"
          align="center"
          label="监测耕地面积(亩)"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="永久基本农田面积"
          :resizable="false"
          align="center"
          label="永久基本农田面积(亩)"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="图斑类型"
          :resizable="false"
          align="center"
          label="图斑类型"
          width="117"
        >
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.图斑类型"
              placement="top"
              effect="dark"
            >
              <div class="address-cell">
                {{ scope.row.图斑类型 }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="前时相"
          :resizable="false"
          align="center"
          label="前时相"
          width="115"
        >
        </el-table-column>
        <el-table-column
          prop="后时相"
          :resizable="false"
          align="center"
          label="后时相"
          width="115"
        >
        </el-table-column>

        <el-table-column
          prop="中心点经度"
          :resizable="false"
          align="center"
          label="中心点经度"
          width="115"
        >
        </el-table-column>
        <el-table-column
          prop="中心点纬度"
          :resizable="false"
          align="center"
          label="中心点纬度"
          width="115"
        >
        </el-table-column>
        <el-table-column
          prop="其他实际用途"
          :resizable="false"
          align="center"
          label="其他实际用途"
          width="115"
        >
        </el-table-column>
        <el-table-column
          prop="判定依据说明"
          :resizable="false"
          align="center"
          label="判定依据说明"
          width="115"
        >
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.判定依据说明"
              placement="top"
              effect="dark"
            >
              <div class="address-cell">
                {{ scope.row.判定依据说明 }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="审核意见"
          :resizable="false"
          align="center"
          label="审核意见"
          width="115"
        >
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.审核意见"
              placement="top"
              effect="dark"
            >
              <div class="address-cell">
                {{ scope.row.审核意见 }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="市级审核结果"
          :resizable="false"
          align="center"
          label="市级审核结果"
          width="115"
        >
        </el-table-column>
        <el-table-column
          prop="市级审核意见"
          :resizable="false"
          align="center"
          label="市级审核意见"
          width="115"
        >
        </el-table-column>
        <el-table-column
          prop="市级审核意见填写时间"
          :resizable="false"
          align="center"
          label="市级审核意见填写时间"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="部级审核结果"
          :resizable="false"
          align="center"
          label="部级审核结果"
          width="115"
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
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="flexlist">
      <!-- <div style="width: 50%; height: 30px">
        <el-row class="title" type="flex" align="middle">
          <div :style="{ marginLeft: '10px' }">
            <el-dropdown @command="dropdownItemClick">
              <el-button size="mini" type="primary">
                数据导出<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="exportCurrentList"
                  >当前清单列表</el-dropdown-item
                >
                <el-dropdown-item command="uploadFileList"
                  >计算池清单</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div :style="{ marginLeft: '10px' }">
           
            <el-button type="primary" size="mini" @click="computing"
              >添加至计算池</el-button
            >
          </div>
          <div :style="{ marginLeft: '10px' }">
            <el-button size="mini" type="primary" @click="scshqkbg"
              >生成审核情况报告</el-button
            >
          </div>
        </el-row>
      </div> -->
      <div style="width: 50%">
        <el-pagination
          @size-change="handleSizeli"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[20, 50, 100, 150]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>

    <div class="el-dialoglbody">
      <div class="dialoglbodylo">
        <!-- -->
        <!-- :close-on-click-modal="false" -->
        <el-dialog
          :title="title"
          :before-close="handleClosefengt"
          :visible.sync="dialogUploadVisible"
        >
          <el-upload
            v-loading="loadingxlsx"
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

          <!-- <el-button type="primary" @click="downLoadTemplate()">{{
                  uploadButton
                }}</el-button> -->
          <el-button type="primary" @click="qualityinspection"
            >上传外业核查数据</el-button
          >
          <el-button type="primary" @click="beforeUpload"
            >上传全部图斑数据</el-button
          >
          <!-- <el-button type="primary" @click="beforeUploadjzjz"
                  >上传集中举证数据</el-button
                > -->
        </el-dialog>
        <div v-if="progressVisible" class="progressVisiblerow">
          <el-progress :percentage="uploadProgress"></el-progress>
        </div>
      </div>
    </div>
    <el-dialog
      title="请填写名称"
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
            <el-input v-model.trim="inputsearch"></el-input>
          </div>
          <div :style="{ marginLeft: '10px' }">
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="handleSearch"
              >搜索</el-button
            >
          </div>

          <div class="grouplist" :style="{ marginLeft: '10px' }">
            <el-button-group>
              <el-button type="primary" @click="exportData"
                >开始打包生成</el-button
              >
              <el-button type="primary" @click="grouplistrow">刷新</el-button>
            </el-button-group>
          </div>
        </div>
        <div id="DataListrow">
          <el-table
            :data="DataListrow"
            style="width: 100%"
            height="500px "
            v-loading="loadingqingdan"
          >
            <el-table-column type="index" label="序号" width="80">
            </el-table-column>
            <el-table-column prop="fileName" label="文件名称" width="180">
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
            <el-table-column
              prop="fileDescription"
              label="文件大小(MB)"
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="fileDescription"
              label="说明描述"
              width="180"
            >
            </el-table-column>
            <el-table-column prop="createBy" label="创建人" width="180">
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
            <el-table-column prop="createTime" label="创建时间" width="180">
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
            <el-input v-model.trim="inputsize" placeholder="搜索"></el-input>
          </div>
          <div :style="{ marginLeft: '10px' }">
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="handleSinputsize"
              >搜索</el-button
            >
          </div>
        </div>
        <div id="DataListrowscope">
          <el-table :data="DataListrowscope" style="width: 100%" height="500px">
            <el-table-column type="index" label="序号" width="180">
            </el-table-column>
            <el-table-column prop="checkName" label="文件名称" width="180">
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
              width="180"
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
            <el-table-column prop="checkSize" label="文件大小(MB)" width="180">
            </el-table-column>
            <el-table-column prop="createBy" label="创建人" width="180">
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
            <el-table-column prop="createTime" label="创建时间" width="180">
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
        title="计算池文件清单"
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
              placeholder="添加融合名称"
            ></el-input>
          </div>
          <div :style="{ marginLeft: '10px' }">
            <!-- icon="el-icon-search" -->
            <el-button type="primary" @click="DataerhandleSearch"
              >融合</el-button
            >
          </div>
        </div>
        <div id="Dataer">
          <el-table
            :data="Dataer"
            style="width: 100%"
            height="500px"
            v-loading="loadingronghe"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="70"
            >
            </el-table-column>
            <el-table-column
              prop="remarks"
              align="center"
              label="名称"
              width="170"
            >
            </el-table-column>
            <el-table-column
              prop="city"
              align="center"
              label="市名称"
              width="170"
            >
              <template slot-scope="scope">
                <el-tooltip
                  :content="scope.row.city"
                  placement="top"
                  effect="dark"
                >
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

            <!-- <el-table-column
                    prop="wyzt"
                    align="center"
                    label="外业状态"
                    width="170"
                  >
                  </el-table-column>
      
                  <el-table-column
                    prop="tblx"
                    align="center"
                    label="填报类型"
                    width="170"
                  >
                  </el-table-column> -->
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

            <el-table-column
              prop="qbtbCancelStatus"
              label="销号状态"
              width="170"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="hcjd"
              label="核查阶段"
              width="170"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="xmlx"
              label="项目类型"
              width="170"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="zglsqk"
              label="整改落实情况"
              width="170"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="qtjtqx"
              label="其他具体情形"
              width="170"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="hfjtqx"
              label="合法具体情形"
              width="170"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="wfsjyt"
              label="实际用途"
              width="170"
              align="center"
            ></el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="forettdialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <div style="height: 100%; width: 100%" v-loading="loading">
        <vue-office-docx :src="urlList" style="width: 100%; height: 600px" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisiblebo">下载</el-button>
      </span>
    </el-dialog>
  </div>
</template>
        
        <script>
import screen from "../Enforcementxiang/scrssnio.vue";
import moment from "moment";
import VueOfficeDocx from "@vue-office/docx";
import "@vue-office/docx/lib/index.css";
import {
  all2021_18,
  options,
  areas,
  portproblem2023,
  importQbtb2023,
  list2023,
  importWyhc,
  computeListjsc2023,
  addJsc,
  snapdateallData,
  importJzjz,
  shhqkExport2023,
  jscRh2023,
  specialsfql2023,
} from "../../api/document/index";
export default {
  name: "enforCement",
  components: {
    VueOfficeDocx,
    screen,
  },
  data() {
    return {
      ritememarks: "",
      loadingqingdan: false,
      loadingronghe: false,
      forettdialogVisible: false,
      loadingxlsx: false,
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
      valuetime: "",
      inputlist: "",
      allRoles: [],
      //实例对象
      fApi: {},
      //组件参数配置
      // option: {
      //   submitBtn: false,
      //   // 是否显示重置按钮
      //   resetBtn: false,
      //   form: {
      //     hideRequiredMark: false,
      //     layout: "horizontal", //inline
      //     labelAlign: "left",
      //   },
      // },
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
      formData7: {
        年度: "2021",
        valuetime: "",
        selectXZQ: [],
        city: "",
        county: "",
        pageNum: 1,
        pageSize: 20,
        dkOrTb: "",
        dk_or_tb: "",
        snapdate: "",
        pdlx: "",
        startDate: "",
        endDate: "",
        shyj: "",
        sfwttb: "",
        dkmj: "",
        dkmjMax: "",
        dkmjMin: "",
        gdmj: "",
        gdmjMax: "",
        gdmjMin: "",
        nydmj: "",
        nydmjMax: "",
        nydmjMin: "",
        dydydkmj: "",
        xydydkmj: "",
        dydynydmj: "",
        xydynydmj: "",
        dydygdmj: "",
        xydygdmj: "",
        qbtbSfnrwfjs: "",
        wyzt: "",
        hcjd: "",
        shengjidxjg: "",
        shijidxjg: "",
        qbtbTbly: "",
        qbtbHchpdlx: "",
        qbtbCancelStatus: "",
        remarks: "",
        tbfl: "",
        hcjd: "",
        xmlx: "",
        zglsqk: "",
        qtjtqx: "",
        hfjtqx: "",
        wfsjyt: "",
        合法性判定结果: "",
        图斑类型: "",
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
      urlList: [],
      urlpo: [],
    };
  },
  created() {
    this.loadFormData();
  },

  mounted() {
    if (!this.loaded) {
      this.getXzqhh();
      this.geOptions();
      this.loaded = true;
    }
    this.checkListt();
    this.snapdatea();
    this.findAll();
    this.listfileList();
    this.shhqkExpo();
  },
  filters: {
    filterSpecialChars(value) {
      return value.replace(/[^A-Za-z0-9 ]/g, "");
    },
  },
  watch: {
    formData7: {
      handler() {
        this.saveFormData();
      },
      deep: true,
    },
  },
  methods: {
    handleSelectionChange(selectedItems) {
      this.ritememarks = selectedItems.map((item) => item.remarks).join(",");
    },
    DataerhandleSearch() {
      if (this.ritememarks == "" || this.Dataerinputsearch == "") {
        this.$message({
          message: "请填写名称或选择融合数据",
          type: "warning",
        });
      } else {
        this.loadingronghe = true;
        let params = {
          remarks: this.ritememarks,
          combinationRemarks: this.Dataerinputsearch,
        };
        jscRh2023(params).then((ok) => {
          if (ok.code == 200) {
            this.loadingronghe = false;
            this.checkListt();
          }
        });
      }
    },
    scshqkbg() {
      this.forettdialogVisible = true;
    },
    shhqkExpo() {
      const baseUrl = process.env.NODE_ENV === "production" ? "" : "/img";
      shhqkExport2023().then((ok) => {
        this.urlpo = ok.msg;
        const parts = ok.msg.split(":8084");
        const path = parts[1];
        if (ok.code == 200) {
          this.urlList = `${baseUrl}${path}`;
          console.log(this.urlList, " this.urlList");
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
    saveFormData() {
      // 创建formDatahut的副本
      let dataToStore = { ...this.formData7 };

      // 列出所有不需要存储的字段
      const excludeFields = ["合法性判定结果", "图斑类型"];

      // 循环删除不需要存储的字段
      excludeFields.forEach((field) => {
        delete dataToStore[field];
      });
      localStorage.setItem("formData7", JSON.stringify(dataToStore));
    },
    loadFormData() {
      const savedData = localStorage.getItem("formData7");
      if (savedData) {
        this.formData7 = JSON.parse(savedData);
      }
    },
    // saveFormData() {
    //   localStorage.setItem("formData7", JSON.stringify(this.formData7));
    // },
    // loadFormData() {
    //   const savedData = localStorage.getItem("formData7");
    //   if (savedData) {
    //     this.formData7 = JSON.parse(savedData);
    //     console.log(savedData, "savedData");
    //     console.log(this.formData7, "this.formData7");
    //   }
    // },
    beforeRouteLeave(to, from, next) {
      this.saveFormData();
      next();
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        console.log(vm);
        vm.loadFormData();
      });
    },
    emitGetData(data) {
      this.formData7.图斑类型 = data.TBLX;
      this.formData7.合法性判定结果 = data.HFPDXJG;
      this.findAll(true);
    },
    snapdatea() {
      snapdateallData().then((res) => {
        this.enabledDateslist = res.data.map((date) =>
          this.formatDate(new Date(date))
        );
      });
    },
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
      let formData = new FormData();
      formData.append("file", this.selectedFile);
      this.loadingxlsx = true;
      importQbtb2023(formData)
        .then((res) => {
          if (res.code === 200) {
            this.loadingxlsx = false;
            this.$message.success("上传成功");
            this.fileList = [];
            this.selectedFile = null;
            this.selectedFile = "";
          } else {
            this.$message.error("上传失败：" + res.message);
          }
        })
        .catch((error) => {});
    },
    beforeUploadjzjz() {
      if (!this.selectedFile) {
        this.$message.error("请先选择一个文件");
        return;
      }
      let formData = new FormData();
      formData.append("file", this.selectedFile);
      this.loadingxlsx = true;
      importJzjz(formData)
        .then((res) => {
          if (res.code === 200) {
            this.loadingxlsx = false;
            this.$message.success("上传成功");
            this.fileList = [];
            this.selectedFile = null;
            this.selectedFile = "";
          } else {
            this.$message.error("上传失败：" + res.message);
          }
        })
        .catch((error) => {});
    },
    qualityinspection() {
      if (!this.selectedFile) {
        this.$message.error("请先选择一个文件");
        return;
      }
      let formData = new FormData();
      formData.append("file", this.selectedFile);
      this.loadingxlsx = true;
      importWyhc(formData).then((res) => {
        if (res.code === 200) {
          this.loadingxlsx = false;
          this.checkListt();
          this.$message.success("上传成功");
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
      this.fileList = [];
      this.selectedFile = null;
      this.selectedFile = "";
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
      specialsfql2023(params).then((res) => {
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
      if (this.namerow == "") {
        this.$message({
          message: "请填写名称",
          type: "warning",
        });
      } else {
        this.formData7.remarks = this.namerow;
        let data = { ...this.formData7 };
        addJsc(data).then((res) => {
          if (res.code === 200) {
            this.checkListt();
            this.$message({
              message: "添加成功",
              type: "success",
            });
            this.namerow = "";
            this.centerVisible = false;
          } else if (res.code === 500) {
            this.$message({
              message: "请选择条件",
              type: "warning",
            });
          }
        });
      }
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
    appli(app) {
      // console.log(app);
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
      this.loadingqingdan = true;
      portproblem2023(this.formData7)
        .then((res) => {
          if (res.code === 200) {
            this.loadingqingdan = false;
            this.listfileList();
          }
        })
        .finally(() => {});
    },

    cancel() {
      this.dialogFormVisible = false;
    },
    downLoadTemplate() {
      if (this.uploadButton === "模版下载") {
        window.open("http://124.114.203.222:8084/downloads/批量导入模板.xlsx");
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

              if (this.title != "修改问题图斑信息") {
                this.clear();
              } else {
                this.findAll();
              }
            }
          })
          .catch((error) => {})
          .finally(() => {
            load.close();
          });
      });
    },

    handleEditClick(value) {
      // this.$message({
      //   message: "正在开发中",
      //   type: "success",
      //   showClose: true,
      //   duration: 0,
      // });
      console.log(value);
      this.$router.push({
        path: "/wttb_edit/fefr",
        query: {
          // id: value.id,
          landCode: value.landCode,
          // snapdate: this.formData.snapdate,
          tbbh: value.freckleCode,
          // dkbh: value.landCode,
        },
      });
      // this.$router.push({ path: "/details/details", query: params });
    },
    getIndex(index) {
      return this.currentPage - 1 + index;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleCurrentChange(value) {
      this.formData7.pageNum = value;
      this.findAll();
    },
    handleSizeli(value) {
      this.formData7.pageSize = value;
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
      areas().then((res) => {
        console.log(res, "res");
        if (res.code == 200) {
          const formattedData = res.data.map((ele) => ({
            value: ele.dictType,
            label: ele.dictType,
            children: ele.xzqx.map((subItem) => ({
              value: subItem,
              label: subItem,
            })),
          }));

          this.xzq = formattedData;
          console.log(this.xzq);
        }
      });
    },
    // getType() {
    //   axios.get(config.url.getProblemTypes).then((res) => {
    //     // 关闭loading
    //     if (res.data.code == 200) {
    //       res.data.data.forEach((ele) => {
    //         this.problemTypes.push({ label: ele, value: ele });
    //       });
    //     } else {
    //
    //     }
    //   });
    // },
    handleKeyDown(event) {
      // 检查按键是否为 Enter
      if (event.key === "Enter" || event.keyCode === 13) {
        this.findAll();
      }
    },
    handleChangeXzq(value) {
      // console.log(value);
      this.formData7.city = "";
      this.formData7.county = "";
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
        this.formData7.city = arr.join(",");
        this.formData7.county = county.join(",");
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
      });
      if (isSearch) {
        this.currentPage = 1;
        this.formData7.pageNum = 1;
      }

      const load = this.$loading({
        background: "#fff",
        lock: true,
        text: "正在获取...",
        target: document.querySelector(".tableDatalistrow"),
      });
      // this.formData.userId = localStorage.getItem("id");
      // if (this.formData.code != undefined) {
      //   this.formData.code = this.formData.code.replace(/(\s*$)/g, "");
      // }
      if (this.formData7.snapdate) {
        this.formData7.snapdate = this.formatDate(this.formData7.snapdate);
      }

      let params = { ...this.formData7 };

      all2021_18(params)
        .then((res) => {
          if (res.code == 200) {
            load.close();
            this.tableData = res.data.rows;
            this.tableData.forEach((item, index) => {
              item.index1 = (this.currentPage - 1) * 10 + index + 1;
            });
            this.total = res.data.total;
          }
        })
        .catch((error) => {});
    },
    clear() {
      this.currentPage = 1;
      this.formData7 = {
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
      this.formData7.year = ye;
      this.month1 = [];
      this.selectXZQ = [];
      this.findAll();
    },
    async checkListt() {
      try {
        let ok = await computeListjsc2023();

        this.Dataer = ok.data;
      } catch (error) {}
    },

    handleSinputsize() {},

    // DataerhandleSearch() {
    //   let params = {
    //     remarks: this.Dataerinputsearch,
    //   };
    //   remarksjsc2024(params).then((ok) => {
    //     this.Dataer = ok.data;
    //   });
    // },
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
  justify-content: flex-end;
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
.title >>> .el-form-item {
  display: flex;
}
.title >>> .el-form-item__label {
  width: 54px !important;
}
.title >>> .el-form-item__content {
  margin-left: 0px !important;
}
.el-row--flex.is-align-middle {
  align-items: initial !important;
}

.tableDatalistrow >>> .has-gutter {
  color: #1890ff;
  /* text-align: center !important; */
}
/* .tableDatalistrow {
          height: 900px !important;
        } */

.tableDatalistrow >>> .cell {
  /* display: flex !important; */
  /* align-items: center !important; */
  /* text-align: center !important; */
}
.elprimary {
  height: 36px;
}

.dropdown-left {
  height: 37px !important;
}
.grouplist {
  display: flex;
  /* justify-content: space-between; */
}

.el-dialoglbody >>> .el-dialog__body {
  /* width: 50%; */
  text-align: center;
  /* margin-left: 233px; */
}

.progressVisiblerow {
  width: 737px;
  position: absolute;
  top: 31%;
  z-index: 9999;
  margin-left: 24%;
}
.isscreen {
  display: flex;
  justify-content: space-evenly;
}
.flexlist >>> .el-button--medium {
  height: 36px !important;
}
</style>
        