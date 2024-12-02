<template>
    <div class="container">
      <div class="line"></div>
      <div class="sellect">
        <el-form ref="form" :model="formDatarouty" label-width="55px">
          <div>
            <el-row class="title" type="flex" align="middle">
              <el-col :span="4">
                <el-form-item label="行政区">
                  <el-cascader
                    ref="cascader"
                    clearable
                    v-model="formDatarouty.selectXZQ"
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
                  v-model="formDatarouty.valuetime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="handleDateChange"
                >
                </el-date-picker>
              </el-col>
              <el-col :span="3" :style="{ marginLeft: '10px' }">
                <el-date-picker
                  v-model="formDatarouty.snapdate"
                  type="date"
                  placeholder="请选择数据时点日期"
                  :picker-options="ptyOptions"
                >
                </el-date-picker>
              </el-col>
  
              <el-col :span="4" :style="{ marginLeft: '15px' }">
                <el-input
                  placeholder="请输入图斑编号/地块编号"
                  v-model.trim="formDatarouty.dkOrTb"
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
            prop="省名称"
            label="省名称"
            :resizable="false"
            align="center"
            width="70"
          />
  
          <el-table-column
            prop="市名称"
            :resizable="false"
            align="center"
            label="市名称"
            width="100"
          />
          <el-table-column
            prop="县名称"
            :resizable="false"
            align="center"
            label="县名称"
            width="100"
          />
          <el-table-column
            prop="图斑编号"
            :resizable="false"
            align="center"
            label="图斑编号"
            width="260"
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
            prop="地块编号"
            :resizable="false"
            align="center"
            label="地块编号"
            width="210"
          >
          </el-table-column>
  
          <el-table-column
            prop="地块类型"
            :resizable="false"
            align="center"
            label="地块类型"
            width="117"
          >
          </el-table-column>
  
          <el-table-column
            prop="土地坐落"
            :resizable="false"
            align="center"
            label="土地坐落"
            width="115"
          >
            <template slot-scope="scope">
              <el-tooltip
                :content="scope.row.土地坐落"
                placement="top"
                effect="dark"
              >
                <div class="address-cell">
                  {{ scope.row.土地坐落 }}
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
  
          <el-table-column
            prop="东至"
            :resizable="false"
            align="center"
            label="东至"
            width="115"
          >
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.东至" placement="top" effect="dark">
                <div class="address-cell">
                  {{ scope.row.东至 }}
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="南至"
            :resizable="false"
            align="center"
            label="南至"
            width="200"
          >
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.南至" placement="top" effect="dark">
                <div class="address-cell">
                  {{ scope.row.南至 }}
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="西至"
            :resizable="false"
            align="center"
            label="西至"
            width="117"
          >
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.西至" placement="top" effect="dark">
                <div class="address-cell">
                  {{ scope.row.西至 }}
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="北至"
            :resizable="false"
            align="center"
            label="北至"
            width="200"
          >
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.北至" placement="top" effect="dark">
                <div class="address-cell">
                  {{ scope.row.北至 }}
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="地块面积"
            :resizable="false"
            align="center"
            label="地块面积(亩)"
            width="280"
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
            prop="耕地面积"
            :resizable="false"
            align="center"
            label="耕地面积(亩)"
            width="115"
          >
          </el-table-column>
  
          <el-table-column
            prop="建设现状"
            :resizable="false"
            align="center"
            label="建设现状"
            width="115"
          >
            <template slot-scope="scope">
              <el-tooltip
                :content="scope.row.建设现状"
                placement="top"
                effect="dark"
              >
                <div class="address-cell">
                  {{ scope.row.建设现状 }}
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="制止情况"
            :resizable="false"
            align="center"
            label="制止情况"
            width="200"
          >
            <template slot-scope="scope">
              <el-tooltip
                :content="scope.row.制止情况"
                placement="top"
                effect="dark"
              >
                <div class="address-cell">
                  {{ scope.row.制止情况 }}
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="地类编码"
            :resizable="false"
            align="center"
            label="地类编码"
            width="200"
          >
          </el-table-column>
          <el-table-column
            prop="是否民生工程"
            :resizable="false"
            align="center"
            label="是否民生工程"
            width="115"
          >
          </el-table-column>
          <el-table-column
            prop="实际用途"
            :resizable="false"
            align="center"
            label="实际用途"
            width="200"
          >
            <template slot-scope="scope">
              <el-tooltip
                :content="scope.row.实际用途"
                placement="top"
                effect="dark"
              >
                <div class="address-cell">
                  {{ scope.row.实际用途 }}
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="是否保障性安居住房"
            :resizable="false"
            align="center"
            label="是否保障性安居住房"
            width="200"
          >
          </el-table-column>
          <el-table-column
            prop="民生工程名称"
            :resizable="false"
            align="center"
            label="民生工程名称"
            width="115"
          >
          </el-table-column>
  
          <el-table-column
            prop="项目名称"
            :resizable="false"
            align="center"
            label="项目名称"
            width="200"
          >
          </el-table-column>
          <el-table-column
            prop="项目类型"
            :resizable="false"
            align="center"
            label="项目类型"
            width="200"
          >
          </el-table-column>
          <el-table-column
            prop="违法类型"
            :resizable="false"
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
            prop="违法性质"
            :resizable="false"
            align="center"
            label="违法性质"
            width="115"
          >
          </el-table-column>
          <el-table-column
            prop="是否履职到位"
            :resizable="false"
            align="center"
            label="是否履职到位"
            width="115"
          >
          </el-table-column>
          <el-table-column
            prop="填表人"
            :resizable="false"
            align="center"
            label="填表人"
            width="115"
          >
          </el-table-column>
          <el-table-column
            prop="填表时间"
            :resizable="false"
            align="center"
            label="填表时间"
            width="115"
          >
          </el-table-column>
          <el-table-column
            prop="审核人"
            :resizable="false"
            align="center"
            label="审核人"
            width="115"
          >
          </el-table-column>
          <el-table-column
            prop="审核时间"
            :resizable="false"
            align="center"
            label="审核时间"
            width="115"
          >
          </el-table-column>
          <el-table-column
            prop="年度"
            :resizable="false"
            align="center"
            label="年度"
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
        <!-- <div style="width: 50%; height: 40px">
          <el-row class="title" type="flex" align="middle">
          
            <div :style="{ marginLeft: '10px' }">
              <el-button
                size="mini"
                type="primary"
                class="elprimary"
                @click="scshqkbg"
                >生成县级填报情况报告</el-button
              >
            </div>
          </el-row>
        </div> -->
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
            <el-button type="primary" @click="beforeUploadjzjz"
              >上传集中举证数据</el-button
            >
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
            <el-table :data="DataListrow" style="width: 100%" height="500px">
              <el-table-column type="index" label="序号" width="180">
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
                placeholder="搜索"
              ></el-input>
            </div>
            <div :style="{ marginLeft: '10px' }">
              <el-button
                type="primary"
                icon="el-icon-search"
                @click="DataerhandleSearch"
                >搜索</el-button
              >
            </div>
          </div>
          <div id="Dataer">
            <el-table :data="Dataer" style="width: 100%" height="500px">
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="70"
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
                prop="township"
                align="center"
                label="乡镇名称"
                width="170"
              >
              </el-table-column>
              <el-table-column
                prop="village"
                align="center"
                label="村社名称"
                width="170"
              >
                <template slot-scope="scope">
                  <el-tooltip
                    :content="scope.row.village"
                    placement="top"
                    effect="dark"
                  >
                    <div class="address-cell">
                      {{ scope.row.village }}
                    </div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                prop="freckleCode"
                align="center"
                label="图斑编号"
                width="170"
              >
              </el-table-column>
              <el-table-column
                prop="xfsj"
                label="下发时间"
                width="170"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="landCode"
                label="地块编号"
                width="170"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="地块面积"
                label="dkmj"
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
                prop="图斑分类"
                label="tbfl"
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
  import screen from "../Enforcementxiang/screenEn.vue";
  import moment from "moment";
  import VueOfficeDocx from "@vue-office/docx";
  import "@vue-office/docx/lib/index.css";
  import {
    all2021_18dk,
    options,
    areas,
    portproblem,
    importQbtb,
    listfileList,
    importWyhc,
    comList,
    jsc2024,
    snapdateallData,
    importJzjz,
    qbdkExport,
  } from "../../api/document/index";
  export default {
    name: "Field",
    components: {
      screen,
      VueOfficeDocx,
    },
    data() {
      return {
        forettdialogVisible: false,
        urlList: [],
        urlpo: [],
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
        formDatarouty: {
          年度: "2019",
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
    created() {
      // 页面加载时读取localStorage中的数据
      this.loadFormData();
    },
    watch: {
      formDatarouty: {
        handler() {
          this.saveFormData();
        },
        deep: true,
      },
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
    methods: {
      scshqkbg() {
        this.forettdialogVisible = true;
      },
      shhqkExpo() {
        const baseUrl = process.env.NODE_ENV === "production" ? "" : "/img";
        qbdkExport().then((ok) => {
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
        let dataToStore = { ...this.formDatarouty };
  
        // 列出所有不需要存储的字段
        const excludeFields = [
          "sfwttb",
          "hcjd",
          "pdlx",
          "shengjidxjg",
          "shijidxjg",
          "qbtbHchpdlx",
          "qbtbSfnrwfjs",
          "qbtbTbly",
          "tbfl",
          "qbtbCancelStatus",
          "hcjd",
          "xmlx",
          "zglsqk",
          "qtjtqx",
          "hfjtqx",
          "wfsjyt",
        ];
  
        // 循环删除不需要存储的字段
        excludeFields.forEach((field) => {
          delete dataToStore[field];
        });
        localStorage.setItem("formDatarouty", JSON.stringify(dataToStore));
      },
      loadFormData() {
        const savedData = localStorage.getItem("formDatarouty");
        if (savedData) {
          this.formDatarouty = JSON.parse(savedData);
        }
      },
      // saveFormData() {
      //   localStorage.setItem("formDatarouty", JSON.stringify(this.formDatarouty));
      // },
      // loadFormData() {
      //   const savedData = localStorage.getItem("formDatarouty");
      //   if (savedData) {
      //     this.formDatarouty = JSON.parse(savedData);
      //   }
      // },
      beforeRouteLeave(to, from, next) {
        this.saveFormData();
        next();
      },
      beforeRouteEnter(to, from, next) {
        next((vm) => {
          if (to.params.savedData) {
            vm.formDatarouty = to.params.savedData;
          }
        });
      },
      handleDateChange(dates) {
        if (Array.isArray(dates) && dates.length > 0) {
          const formattedDates = dates.map((date) =>
            moment(date).format("YYYY-MM-DD")
          );
          this.formDatarouty.startDate = formattedDates[0];
          this.formDatarouty.endDate = formattedDates[1];
        } else {
          this.formDatarouty.startDate = "";
          this.formDatarouty.endDate = "";
        }
      },
      emitGetData(data) {
        // console.log(data);
        this.formDatarouty.sfwttb = data.sfwttb;
        this.formDatarouty.hcjd = data.hcjd;
        this.formDatarouty.pdlx = data.tblx;
        this.formDatarouty.shengjidxjg = data.checkMethod;
        this.formDatarouty.shijidxjg = data.illegalityType;
        this.formDatarouty.qbtbHchpdlx = data.hchlxx;
        this.formDatarouty.qbtbSfnrwfjs = data.deductionType;
        this.formDatarouty.qbtbTbly = data.tbly;
        this.formDatarouty.tbfl = data.tbfl;
        this.formDatarouty.qbtbCancelStatus = data.qbtbCancelstatus;
        this.formDatarouty.hcjd = data.hcjd;
        this.formDatarouty.xmlx = data.xmlx;
        this.formDatarouty.zglsqk = data.zglsqk;
        this.formDatarouty.qtjtqx = data.qtjtqx;
        this.formDatarouty.hfjtqx = data.hfjtqx;
        this.formDatarouty.wfsjyt = data.sjyt;
        const updateFormData = (field, value, condition) => {
          switch (condition) {
            case "3":
              this.formDatarouty[field] = value;
              break;
            case "1":
              this.formDatarouty[`${field}Max`] = value;
              break;
            case "2":
              this.formDatarouty[`${field}Min`] = value;
              break;
            case "4":
              this.formDatarouty[`dydy${field}`] = value;
              break;
            case "5":
              this.formDatarouty[`xydy${field}`] = value;
              break;
            case "6":
              const [min, max] = value.split("~");
              this.formDatarouty[`${field}Max`] = max;
              this.formDatarouty[`${field}Min`] = min;
              break;
          }
        };
  
        updateFormData("dkmj", data.MinMax.value, data.MinMax.condition);
  
        if (data.freck.condition === "4") {
          this.formDatarouty.dydygdmj = data.freck.value;
        } else if (data.freck.condition === "5") {
          this.formDatarouty.xydygdmj = data.freck.value;
        } else {
          updateFormData("gdmj", data.freck.value, data.freck.condition);
        }
  
        if (data.Cufreck.condition === "4") {
          this.formDatarouty.dydynydmj = data.Cufreck.value;
        } else if (data.Cufreck.condition === "5") {
          this.formDatarouty.xydynydmj = data.Cufreck.value;
        } else {
          updateFormData("nydmj", data.Cufreck.value, data.Cufreck.condition);
        }
  
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
        importQbtb(formData)
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
        this.formDatarouty.remarks = this.namerow;
        let data = { ...this.formDatarouty };
        jsc2024(data).then((res) => {
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
        const load = this.$loading({
          lock: true,
          text: "正在下载数据请稍等...",
          target: document.querySelector("#DataListrow"),
        });
        let exportRhtz2024 = {
          city: this.formDatarouty.city,
          county: this.formDatarouty.county,
          ssqx: this.formDatarouty.ssqx,
          cancelStatus: this.formDatarouty.cancelStatus,
          checkDetermineResult: this.formDatarouty.checkDetermineResult,
          startDate: this.formDatarouty.startDate,
          endDate: this.formDatarouty.endDate,
          checkJobName: this.formDatarouty.checkJobName,
          dkOrTb: this.formDatarouty.dkOrTb,
          snapdate: this.formDatarouty.snapdate,
          checkMethod: this.formDatarouty.checkMethod,
          sfwttb: this.formDatarouty.sfwttb,
          pdlx: this.formDatarouty.pdlx,
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
  
        portproblem(exportRhtz2024)
          .then((res) => {
            if (res.code === 200) {
              load.close();
              this.listfileList();
            }
          })
          .finally(() => {
            load.close();
          });
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
  
        this.$router.push({
          path: "/Enforcementxiang/Allplotsxiang",
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
        this.currentPage = value;
        this.formDatarouty.pageNum = value;
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
        this.formDatarouty.city = "";
        this.formDatarouty.county = "";
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
          this.formDatarouty.city = arr.join(",");
          this.formDatarouty.county = county.join(",");
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
          this.formDatarouty.pageNum = 1;
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
        if (this.formDatarouty.snapdate) {
          this.formDatarouty.snapdate = this.formatDate(
            this.formDatarouty.snapdate
          );
        }
  
        const { selectXZQ, valuetime, ...params } = this.formDatarouty;
  
        all2021_18dk(params)
          .then((res) => {
            console.log(res.data);
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
        this.formDatarouty = {
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
        this.formDatarouty.year = ye;
        this.month1 = [];
        this.selectXZQ = [];
        this.findAll();
      },
      async checkListt() {
        try {
          let ok = await comList();
  
          this.Dataer = ok.data;
        } catch (error) {}
      },
  
      handleSinputsize() {},
  
      DataerhandleSearch() {
        let params = {
          remarks: this.Dataerinputsearch,
        };
        remarksjsc2024(params).then((ok) => {
          this.Dataer = ok.data;
        });
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
    height: 35px !important;
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
  </style>
          