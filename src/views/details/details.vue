<template>
  <div class="htmlheight">
    <el-collapse v-model="activeNamesop" @change="handlebnsdgb">
      <el-collapse-item class="landCode" name="listlandCode">
        <template #title>
          <el-button-group>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-arrow-left"
              @click="close"
              >返回列表</el-button
            >
          </el-button-group>
          <span class="title-text">图斑编辑(地块编号: {{ landCode }})</span>
        </template>
        <div class="landCodeList-top">
          <div
            v-for="(item, index) in landCodeList"
            :key="index"
            class="liet-item"
            @click="handleLandCodeClick(item)"
          >
            <div class="list-title">{{ item }}</div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>

    <div class="container">
      <div class="bodycolumnrow">
        <div class="left-column">
          <Map ref="map" class="map"></Map>
        </div>
        <div class="right-column" :style="{ width: rightWidth + 'vw' }">
          <el-tabs
            type="border-card"
            v-model="activeName"
            @tab-click="handleClick"
            class="sticky-tabs-header"
          >
            <el-tab-pane label="违法行为信息" name="first">
              <div class="scrollable-tab-content">
                <el-collapse v-model="activeNames" @change="handleChange">
                  <el-collapse-item title="违法行为信息" name="wan">
                    <el-descriptions
                      class="ellipsis"
                      title=""
                      :column="3"
                      :size="size"
                      border
                    >
                      <template slot="extra">
                        <!-- <el-button type="primary" size="small">操作</el-button> -->
                      </template>
                      <el-descriptions-item
                        v-for="(value, key) in filteredData"
                        :key="key"
                      >
                        <template slot="label">
                          <div
                            :title="labels[key] || key"
                            :class="{
                              'blue-text':
                                key === 'sfcfdw' ||
                                key === 'tbsfla' ||
                                key === 'hcjgczjy' ||
                                key === 'tbsfzglsdw' ||
                                key === 'wftbhc' ||
                                key === 'wfczjg',
                            }"
                          >
                            {{ formatText(labels[key]) || key }}
                          </div>
                        </template>
                        <span :title="value">{{
                          formatText(value) || "无"
                        }}</span>
                      </el-descriptions-item>
                    </el-descriptions>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-tab-pane>
            <!-- <el-tab-pane
              :label="getTabLabel()"
              name="second"
              @tab-click="handleClick"
            >
              <div class="scrollable-tab-content">
                <el-collapse
                  v-model="activeNamestwo"
                  @change="handleChange"
                  class="contentk"
                >
                  <el-collapse-item
                    title="用户级别"
                    class="custom-collapse-item"
                    name="1"
                  >
                    <div class="img-container">
                      <div
                        v-for="(item, index) in imgshou"
                        :key="index"
                        class="item-list"
                      >
                        <div class="img-row" id="">
                          <img
                            :src="item.picUrl"
                            alt=""
                            @click="onpreview(index)"
                          />

                          <div
                            class="showviewercolor"
                            id="picviewer"
                            style="position: relative"
                          >
                            <el-image-viewer
                              v-if="showviewer"
                              :on-close="closeviewer"
                              :initial-index="initialIndex"
                              :url-list="urlList"
                              :on-switch="handleImageChange"
                              style="
                                width: 50%;
                                height: 78%;
                                margin-left: 49.7%;
                                margin-top: 5%;
                                overflow: hidden;
                                background-color: black;
                              "
                            />
                          </div>
                          <div class="img-text">
                            <span>{{ item.uploadTime }}</span>
                          </div>
                        </div>
                      </div>

                      <div class="img-updaby" v-if="currentarr">
                        <div>负责人:{{ perviewBottom.uploadBy }}</div>
                        <div>拍摄时间：{{ perviewBottom.uploadTime }}</div>
                        <div>
                          位置：{{ perviewBottom.xcoordinate }},{{
                            perviewBottom.ycoordinate
                          }}
                        </div>
                        <div>方位角：{{ perviewBottom.azimuth }}°</div>
                      </div>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-tab-pane>
            <el-tab-pane label="销号管理" name="third">
              <div class="scrollable-tab-content">
                <div
                  v-for="(item, index) in editData"
                  :key="item + index"
                  class="from"
                >
                  <el-collapse
                    v-model="activeNamesfrist"
                    @change="handleChange"
                  >
                    <el-collapse-item
                      v-bind:title="item.name"
                      :name="String(index + 1)"
                      class="custom-collapse-item"
                    >
                      <div :style="{ fontSize: '30px' }">
                        <form-create
                          :style="{
                            marginTop: '20px',
                          }"
                          v-model="item.fApi"
                          :rule="item.rule"
                          :option="item.option"
                        ></form-create>
                      </div>
                      <div
                        class="tj"
                        v-if="item.editable == null ? true : item.editable"
                      >
                        <el-button type="primary" @click="onSubmit(item)"
                          >提交</el-button
                        >
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                </div>
                <el-collapse v-model="activeNamesthree" @change="handleChange">
                  <el-collapse-item
                    class="custom-collapse-item"
                    title="销号管理"
                    name="1"
                  >
                    <div>
                      <el-table :data="tableData" style="width: 100%">
                        <el-table-column
                          type="index"
                          label="序号"
                          width="180"
                          highlight-current-row
                        >
                        </el-table-column>
                        <el-table-column
                          prop="customAnnexName"
                          label="文件名称"
                          width="180"
                        >
                          <template slot-scope="scope">
                            <div
                              class="address-cell"
                              v-if="!scope.row.setingFlag"
                              @click="handleEdit(scope.row, 'customAnnexName')"
                            >
                              {{ scope.row.customAnnexName }}
                            </div>
                            <div v-else>
                              <el-input
                                v-model="scope.row.customAnnexName"
                                @blur="handleBlur(scope.row, 'customAnnexName')"
                              ></el-input>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column prop="annexExplain" label="文件说明">
                          <template slot-scope="scope">
                            <div
                              class="address-cell"
                              v-if="!scope.row.setingeFlag"
                              @click="handleEdit(scope.row, 'annexExplain')"
                            >
                              {{ scope.row.annexExplain }}
                            </div>
                            <div v-else>
                              <el-input
                                v-model="scope.row.annexExplain"
                                @blur="handleBlur(scope.row, 'annexExplain')"
                              ></el-input>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column prop="address" label="操作">
                          <template slot-scope="scope">
                            <div class="bottom-conter">
                              <div
                                class="bottom-left"
                                @click="iconview(scope.row)"
                              >
                                <el-tag><i class="el-icon-view"></i></el-tag>
                              </div>
                              <div
                                class="bottom-right"
                                @click="dangerxia(scope.row)"
                              >
                                <el-tag type="danger"
                                  ><i class="el-icon-bottom"></i
                                ></el-tag>
                              </div>
                            </div>
                          </template>
                        </el-table-column>
                      </el-table>
                      <el-button
                        type="primary"
                        class="primarylistshow"
                        @click="primaryshow()"
                        plain
                        >上传</el-button
                      >
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-tab-pane>
            <el-tab-pane label="生命周期" name="four" @tab-click="handleClick">
              <div class="scrollable-tab-content">
                <el-collapse v-model="actList">
                  <el-collapse-item
                    class="custom-collapse-item"
                    title="图斑下发"
                    name="1"
                  >
                    <div style="width: 100%" class="tabListname">
                      <template>
                        <el-table :data="tabList" style="width: 100%">
                          <el-table-column
                            prop="city"
                            label="市名称"
                            width="100"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="county"
                            label="县名称"
                            width="94"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="xfsj"
                            label="下发时间"
                            width="94"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="freckleCode"
                            label="图斑编号"
                            width="94"
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
                            label="地块编号"
                            width="94"
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
                            prop="tblx"
                            label="图斑类型"
                            width="94"
                          >
                            <template slot-scope="scope">
                              <el-tooltip
                                :content="scope.row.tblx"
                                placement="top"
                                effect="dark"
                              >
                                <div class="address-cell">
                                  {{ scope.row.tblx }}
                                </div>
                              </el-tooltip>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="tbfl"
                            label="图斑分类"
                            width="94"
                          >
                            <template slot-scope="scope">
                              <el-tooltip
                                :content="scope.row.tbfl"
                                placement="top"
                                effect="dark"
                              >
                                <div class="address-cell">
                                  {{ scope.row.tbfl }}
                                </div>
                              </el-tooltip>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop=""
                            label="往期图斑编号"
                            width="94"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="jcmj"
                            label="监测面积"
                            width="94"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="gdmj"
                            label="耕地面积"
                            width="94"
                          >
                          </el-table-column>
                        </el-table>
                      </template>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item
                    title="县级填报"
                    name="2"
                    class="custom-collapse-item"
                  >
                    <div style="width: 100%" class="tabListname">
                      <template>
                        <el-table :data="tabListwan" style="width: 100%">
                          <el-table-column
                            prop="ywrq"
                            label="业务日期"
                            width="100"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="landCode"
                            label="地块编号"
                            width="100"
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
                            prop="pdlx"
                            label="判定类型"
                            width="100"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="pdyjsm"
                            label="判断依据说明"
                            width="100"
                          >
                            <template slot-scope="scope">
                              <el-tooltip
                                :content="scope.row.pdyjsm"
                                placement="top"
                                effect="dark"
                              >
                                <div class="address-cell">
                                  {{ scope.row.pdyjsm }}
                                </div>
                              </el-tooltip>
                            </template>
                          </el-table-column>

                          <el-table-column
                            prop="sjyt"
                            label="实际用途"
                            width="100"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="dkmj"
                            label="地块面积"
                            width="100"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="gdmj"
                            label="耕地面积"
                            width="100"
                          >
                          </el-table-column>
                        </el-table>
                      </template>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item
                    title="内业审核"
                    name="3"
                    class="custom-collapse-item"
                  >
                    <div style="width: 100%" class="tabListname">
                      <template>
                        <el-table :data="tabListtwo" style="width: 100%">
                          <el-table-column
                            prop="landCode"
                            label="地块编号"
                            width="153"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="jdmc"
                            label="节点名称"
                            width="153"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="tjry"
                            label="提交人员"
                            width="153"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="tjsj"
                            label="提交时间"
                            width="153"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="hcjl"
                            label="核查结论"
                            width="153"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="shyj"
                            label="审核意见"
                            width="153"
                          >
                            <template slot-scope="scope">
                              <el-tooltip
                                :content="scope.row.shyj"
                                placement="top"
                                effect="dark"
                              >
                                <div class="address-cell">
                                  {{ scope.row.shyj }}
                                </div>
                              </el-tooltip>
                            </template>
                          </el-table-column>
                        </el-table>
                      </template>
                    </div>
                  </el-collapse-item>

                  <el-collapse-item
                    title="外业核查"
                    name="5"
                    class="custom-collapse-item"
                  >
                    <div class="tabListname">
                      <template>
                        <el-table :data="tabListtwolisttwo">
                          <el-table-column
                            prop="hcrq"
                            label="核查日期"
                            width="110"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="hcgzmc"
                            label="核查工作名称"
                            width="110"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="hcfs"
                            label="核查方式"
                            width="110"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="hchpdlx"
                            label="核查后判定类型"
                            width="110"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="wflx"
                            label="违法类型"
                            width="110"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="kjlx"
                            label="扣减类型"
                            width="110"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="sjyt"
                            label="实际用途"
                            width="110"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="xmmc"
                            label="项目名称"
                            width="110"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="xcms"
                            label="现场描述"
                            width="110"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="hcr"
                            label="核查人"
                            width="110"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="hcjl"
                            label="核查结论"
                            width="110"
                          >
                          </el-table-column>
                        </el-table>
                      </template>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item
                    title="生命周期节点"
                    name="4"
                    class="custom-collapse-item"
                  >
                    <div style="width: 100%" class="tabListname">
                      <template>
                        <el-table :data="tabListtwolist" style="width: 100%">
                          <el-table-column
                            prop="landCode"
                            label="地块编号"
                            width="153"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="jdmc"
                            label="节点名称"
                            width="153"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="xhzt"
                            label="销号状态"
                            width="153"
                          >
                          </el-table-column>
                        </el-table>
                      </template>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item
                    title="违法图斑整改情况"
                    name="6"
                    class="custom-collapse-item"
                  >
                    <div style="width: 100%" class="tabListname">
                      <template>
                        <el-table :data="SpecklePattern" style="width: 100%">
                          <el-table-column
                            prop="tbbh"
                            label="图斑编号"
                            width="160"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="zglsqk"
                            label="整改落实情况"
                            width="160"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="ccfghftdymmj"
                            label="拆除复耕恢复土地原貌面积"
                            width="165"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="ccfgfgdwmj"
                            label="拆除复耕复耕到位面积"
                            width="160"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="bbsxpzwh"
                            label="补办手续批准文号"
                            width="160"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="bbsxpzmj"
                            label="补办手续批准面积"
                            width="160"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="bbsxqzgdmj"
                            label="补办手续其中耕地面积"
                            width="160"
                          >
                          </el-table-column>
                        </el-table>
                      </template>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item
                    title="违法图斑未整改情况"
                    name="7"
                    class="custom-collapse-item"
                  >
                    <div style="width: 100%" class="tabListname">
                      <template>
                        <el-table :data="tabListtbbh" style="width: 100%">
                          <el-table-column
                            prop="tbbh"
                            label="图斑编号"
                            width="153"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="dkbh"
                            label="地块编号"
                            width="153"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="wfxwbh"
                            label="违法行为编号"
                            width="153"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="zglsqk"
                            label="整改落实情况"
                            width="153"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="clfs"
                            label="处理方式"
                            width="153"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="wfxwms"
                            label="违法行为描述"
                            width="153"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="wfzrzt"
                            label="违法责任主体"
                            width="153"
                          >
                          </el-table-column
                          ><el-table-column
                            prop="sxwfmj"
                            label="涉嫌违法面积"
                            width="153"
                          >
                          </el-table-column
                          ><el-table-column
                            prop="qzgdmj"
                            label="其中耕地面积"
                            width="153"
                          >
                          </el-table-column
                          ><el-table-column
                            prop="bylasm"
                            label="不予立案说明"
                            width="153"
                          >
                          </el-table-column
                          ><el-table-column
                            prop="wfxz"
                            label="违法性质"
                            width="153"
                          >
                          </el-table-column
                          ><el-table-column
                            prop="sfjx"
                            label="是否结象"
                            width="153"
                          >
                          </el-table-column
                          ><el-table-column
                            prop="ajjl"
                            label="案件结论"
                            width="153"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="sfcfdw"
                            label="是否处罚到位"
                            width="153"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="sfzgdw"
                            label="是否整改落实到位"
                            width="153"
                          >
                          </el-table-column>
                        </el-table>
                      </template>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-tab-pane> -->
          </el-tabs>
        </div>
      </div>
      <el-dialog
        title="附件管理"
        :visible.sync="centerDialogVisible"
        width="50%"
        center
      >
        <div>
          <el-upload
            class="upload-demo"
            drag
            ref="upload"
            accept=".pdf, .doc, .docx, .xls, .xlsx,.jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PNG,.GIF,.BMP"
            :http-request="httprequest"
            action="no"
            :limit="1"
            :file-list="fileList"
            :before-upload="beforeUpload"
            :on-remove="onRemove"
            :on-success="onSuccess"
            :on-error="onError"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">文件大小不超过10MB。</div>
          </el-upload>
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <div style="margin-top: 15px" class="teex">
              <el-form-item prop="textarea1">
                <span class="textarea-rop"> 文件名称 : </span>
                <el-input
                  type="textarea"
                  autosize
                  placeholder="请输入内容"
                  v-model.trim="ruleForm.textarea1"
                  class="teextarea"
                  maxlength="20"
                >
                </el-input>
              </el-form-item>

              <el-form-item prop="textarea2">
                <span class="textarea-rop">文件说明 : </span>
                <el-input
                  type="textarea"
                  autosize
                  placeholder="请输入内容"
                  v-model.trim="ruleForm.textarea2"
                  class="teextarea"
                  maxlength="100"
                >
                </el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogCanle()">取 消</el-button>
          <el-button type="primary" @click="centerDialog(), open1">
            确定
          </el-button>
        </span>
      </el-dialog>

      <div class="pole">
        <el-dialog
          title="预览"
          append-to-body
          :visible.sync="fullscreenVisible"
          modal-append-to-body
          :width="'1200px'"
          class="nuiop"
        >
          <div style="width: 100%" class="preview-container">
            <vue-office-excel
              v-if="isexcel"
              style="width: 100%; height: 600px"
              :src="previewUrl"
              @rendered="rendered"
            />
            <iframe
              v-if="isdocx"
              :src="previewUrl"
              style="width: 100%; height: 600px"
              frameborder="0"
            ></iframe>
            <img
              v-if="isImage"
              :src="previewUrl"
              style="
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
                overflow: hidden;
              "
            />
            <iframe
              v-if="ispdf"
              :src="previewUrl"
              style="width: 100%; height: 800px"
              frameborder="0"
            >
            </iframe>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
  
  <script>
// import Map from "../views/mapTwo.vue";
import {
  freckleCode,
  tbxf,
  xjtb,
  nysh,
  smzqjd,
  wyhc,
  wfzg,
  wzgqk,
  smzqshjd,
  spotDetails,
} from "../../api/document/index";
import elImageViewer from "element-ui/packages/image/src/image-viewer.vue";
//引入VueOfficeDocx组件
import VueOfficeDocx from "@vue-office/docx";
import "@vue-office/docx/lib/index.css";
//引入VueOfficeExcel组件
import VueOfficeExcel from "@vue-office/excel";
//引入相关样式
import "@vue-office/excel/lib/index.css";
export default {
  data() {
    return {
      activeSteprow: true,
      responseData: {},
      tabListtbbh: [],
      SpecklePattern: [],
      tabListtwolisttwo: [],
      tabListtwolist: [],
      tabListwan: [],
      tabListtwo: [],
      actList: ["1", "2", "3", "4", "5", "6", "7"],
      tabList: [],
      name: localStorage.getItem("name"),
      id: "",
      snapdate: null,
      editData: [],
      currentFileUrl: "",
      // isPdf: false,
      leftWidth: 40,
      rightWidth: 50,
      isResizing: false,
      resData: {},
      loadingData: null,
      show: true,
      forliadd: "",
      activeName: "first",
      fieldslist: [],
      imgshou: [],
      showviewer: false,
      urlList: [],
      tableData: [],
      azimuthlist: false,
      current: null,
      activeNamesfrist: ["1", "2", "3"],
      activeNamestwo: ["1"],
      activeNamesthree: ["1"],
      activeNames: ["wan"],
      activeNamesop: ["listlandCode"],
      centerDialogVisible: false,
      direction: "btt",
      numberOfPhotos: 0,
      currentarr: false,
      textarea1: "",
      textarea2: "",
      fileList: [], //上传文件的集合
      parentMessage: "Hello from parent",
      landCode: "",
      landCodelist: [],
      rules: {
        textarea1: [
          { required: true, message: "请输入文件名称", trigger: "change" },
        ],
        textarea2: [
          { required: true, message: "请输入文件说明", trigger: "change" },
        ],
      },
      ruleForm: {
        textarea1: "",
        textarea2: "",
      },
      isEditing: false,
      originalValues: {},
      fullscreenVisible: false,
      currentImageUrl: [],
      initialIndex: 0,
      perviewBottom: {},
      isdocx: false,
      isexcel: false,
      ispdf: false,
      isImage: false,
      previewUrl: "", //预览属性
      dkbh_or_tbbh: null,
      activeStep: 0, // 设置默认激活的步骤
      submitIntervalId: null,
      hasShownWarning: false, // 添加标志变量
      jdmcp: [],
      steps: [
        // "县级已填报",
        // "市级已审核",
        // "市级已审核(不通过)",
        // "市级已审核(通过)",
        // "外业核查",
        // "集中举证",
        // "互联网+",
        // "百亩大图斑核查",
        // "图形灭式",
        // "已销号",
      ],
      filteredData: {},
      labels: {
        freckleCode: "图斑编号",
        offenceCode: "违法行为编号",
        wfzwms: "违法行为描述",
        wfzrzt: "违法责任主体",
        sxwfdsr: "涉嫌违法当事人",
        sxwfmj: "涉嫌违法面积",
        qzgdmj: "其中耕地面积",
        qzjbntmj: "其中基本农田面积",
        hcjgczjy: "核查结果处置建议",
        bylasm: "不予立案说明",
        xmmc: "项目名称",
        wfxz: "违法性质",
        tbsfla: "填报是否已结案",
        ajjl: "案件结论",
        sfcfdw: "是否处罚到位",
        tbsfzglsdw: "填报是否整改落实到位",
        year: "年度",
        sfsqfyqzzx: "是否申请人民法院强制执行",
        wfxwfsd: "违法行为发生地",
        jsxz: "建设现状",
        sjyt: "实际用途",
        wflx: "违法类型",
        wftbhc: "违法图斑核查",
        wfczjg: "违法处置结果",
        landCode: "违法图斑编号",
        cancelStatus: "销号状态",
        cancelDate: "销号时间",
        cancelBy: "销号人",
        cancelReason: "销号原因",
      },
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.landCode = this.$route.query.landCode;
    if (this.$route.query) {
      this.landCodeList = this.$route.query.landCode
        .split(";")
        .filter((code) => code.trim() !== "");
    } else {
      this.landCodeList = [];
    }
    document.querySelector(".right-column").style.overflow = "hidden";
    this.freckleCod();
    this.listrowl();
    this.getData();
    this.tbxfs();

    // LifeCycle.drawChart();
    // MapInit(this); //地图关联初始化
  },

  components: {
    // Map,
    elImageViewer,
    VueOfficeDocx,
    VueOfficeExcel,
    // VueOfficePdf,
  },
  directives: {
    tooltip: function (el, binding) {
      el.setAttribute("title", binding.value);
    },
  },
  methods: {
    formatText(text) {
      return text && text.length > 9 ? text.substring(0, 9) + "..." : text;
    },
    freckleCod() {
      let params = {
        freckleCode: this.landCode,
      };
      // console.log(params);
      freckleCode(params).then((ok) => {
        // console.log(ok);
        this.filteredData = ok.data;
      });
    },
    tbxfs() {
      let params = {
        dkbh_or_tbbh: this.landCode,
      };
      tbxf(params).then((ok) => {
        this.tabList.push(ok.data);
      });
      xjtb(params).then((ok) => {
        this.tabListwan = ok.data;
      });
      nysh(params).then((ok) => {
        this.tabListtwo = ok.data;
      });
      smzqjd(params).then((ok) => {
        this.tabListtwolist.push(ok.data);
        const { jdmc } = ok.data;
        if (jdmc && typeof jdmc === "string") {
          this.jdmcp = [{ jdmc }];
        }
      });
      wyhc(params).then((ok) => {
        this.tabListtwolisttwo.push(ok.data);
      });
      wfzg(params).then((ok) => {
        this.SpecklePattern.push(ok.data);
      });
      wzgqk(params).then((ok) => {
        this.tabListtbbh.push(ok.data);
      });
    },
    listrowl() {
      this.snapdate = this.$route.query.snapdate;
      let params = {
        landCode: this.landCode,
      };
      smzqshjd(params).then((ok) => {
        let stepObj = [
          { stepName: "县级已填报", stepType: "xjytb" },
          { stepName: "市级已审核", stepType: "sjysh" },
          { stepName: "省级已审核(不通过)", stepType: "sjyshbtg" },
          { stepName: "省级已审核(通过)", stepType: "sjyshtg" },
          { stepName: "外业核查", stepType: "wyhc" },
          { stepName: "集中举证", stepType: "jzjz" },
          { stepName: "互联网+", stepType: "hlw" },
          { stepName: "百亩大图斑核查", stepType: "bmdtb" },
          { stepName: "图形灭失", stepType: "txms" },
          { stepName: "已销号", stepType: "yxh" },
        ];
        let arr = [];
        let responseData = ok.data;
        for (let i in responseData) {
          arr.push({ [i]: responseData[i] });
        }

        let stepArr = [];
        stepObj.map((item, index) => {
          let obj = {};
          obj.stepName = item.stepName;
          obj.stepType = item.stepType;
          arr.map((itm, ind) => {
            if (item.stepType == Object.keys(itm)) {
              obj.stepState = Object.values(itm).join("");
            }
            if (item.stepName == this.jdmcp[0].jdmc) {
              this.activeStep = index + 1;
              obj.stepState = "2";
            }
          });

          stepArr.push(obj);
        });

        this.steps = stepArr;
      });
    },
    rehgub() {
      this.activeSteprow = !this.activeSteprow;
    },
    handleBlur(row, fieldType) {
      if (!row[fieldType].trim()) {
        this.$notify({
          title: "错误",
          message: "内容不能为空",
          type: "error",
          duration: 2000,
        });
        return;
      }
      if (fieldType === "customAnnexName") {
        row.setingFlag = false;
      } else if (fieldType === "annexExplain") {
        row.setingeFlag = false;
      }

      const param = {
        annexId: row.annexId,
      };
      param[fieldType] = row[fieldType];

      this.updateAnnexInfo(param);
    },
    updateAnnexInfo(param) {
      axios.put(config.url.updateAnnexInfo, param).then((res) => {
        if (res.data.code == 200) {
          this.$notify({
            title: "修改成功",
            message: "操作成功完成",
            type: "success",
            duration: 2000,
          });
        }
      });
    },

    handleEdit(row, fieldType) {
      this.$set(this.originalValues, row.annexId, {
        customAnnexName: row.customAnnexName,
        annexExplain: row.annexExplain,
      });
      if (fieldType === "customAnnexName") {
        this.$set(row, "setingFlag", true);
      } else if (fieldType === "annexExplain") {
        this.$set(row, "setingeFlag", true);
      }
    },
    primaryshow() {
      this.centerDialogVisible = true;
    },
    //上传之前大小校验
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 10MB");
      }
      return isLt2M;
    },
    //自定义上传
    httprequest(file) {
      this.fileList.push(file.file);
    },
    //删除附件
    onRemove(file, fileList) {
      this.fileList = [];
    },
    //上传成功
    onSuccess(response) {
      this.$message.success("上传成功");
      // 处理后端返回的响应数据
    },
    //上传失败
    onError(error) {
      this.$message.error("上传失败");
      // 处理上传失败的逻辑
    },
    getTabLabel() {
      return {
        text: `现场照片(${
          this.numberOfPhotos == null ? 0 : this.numberOfPhotos
        })`,
        obj: this.numberOfPhotos,
      };
    },
    dran() {
      this.centerDialogVisible = true;
    },
    centerDialog() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let params = new FormData();
          this.fileList.map((item) => {
            params.append("file", item);
          });
          params.append("landCode", this.landCode);
          params.append("customAnnexName", this.ruleForm.textarea1);
          params.append("annexExplain", this.ruleForm.textarea2);
          axios.post(config.url.upload, params).then((res) => {
            let { code, data } = res.data;
            if (code == 200) {
              let obj = {};
              obj.customAnnexName = this.ruleForm.textarea1;
              obj.annexExplain = this.ruleForm.textarea2;
              obj.path = data.path;
              //往数组后面添加数据this.tableData
              this.tableData.push(obj);
              this.fileList = [];
              this.textarea1 = "";
              this.textarea2 = "";
              this.centerDialogVisible = false;
              this.$notify({
                title: "上传成功",
                message: "操作成功完成",
                type: "success",
                duration: 2000, // 显示时长，单位毫秒
              });
            }
          });
        }
      });
    },
    //弹框取消
    centerDialogCanle() {
      this.fileList = [];
      this.textarea1 = "";
      this.textarea2 = "";
      this.centerDialogVisible = false;
    },
    handleClick(val) {
      debugger;
      this.forliadd = val.name;
      if (val.name == "third") {
        this.editData = [];
        this.getData();
      } else if (this.forliadd == "first") {
        this.editData = [];
        this.getData();
      }
      this.closeviewer();
    },

    startResize() {
      this.isResizing = true;
      window.addEventListener("mousemove", this.resize);
      window.addEventListener("mouseup", this.stopResize);
    },

    closeviewer() {
      this.showviewer = false;
      // this.current = false;
      this.currentarr = false;
      this.urlList = [];
      this.buttomhidder = false;

      loadPhotoMap(null);
    },

    onpreview(index) {
      this.activeName = "second";
      this.showviewer = false; // 先关闭预览
      this.imgshou.map((itm, ind) => {
        this.urlList.push(itm.picUrl);
      });
      this.initialIndex = index; // 更新当前图片索引
      this.perviewBottom = this.imgshou[index];
      this.currentarr = true;
      // 稍作延迟后重新打开预览
      this.$nextTick(() => {
        this.showviewer = true;
        loadPhotoMap(this.imgshou[index], this); // 更新地图
      });
    },
    handleImageChange(val) {
      this.initialIndex = val; // 设置当前图片索引
      if (val >= this.urlList.length - 1) {
        this.$message({
          message: "已经是最后一张图片了",
          type: "warning",
        });
        // 防止切换到下一张图片（可以通过不更新initialIndex或者其他逻辑来实现）
        return;
      }
      this.perviewBottom = this.imgshou[val];
      loadPhotoMap(this.imgshou[val], this);
    },
    handlebnsdgb(val) {
      if (!val.includes("listlandCode")) {
        this.$nextTick(() => {
          this.activeNamesop = ["listlandCode"];
        });
      }
    },
    resize(e) {
      if (this.isResizing) {
        const containerWidth = this.$el.clientWidth;
        const minLeftWidth = 100; // 最小左侧宽度（以像素为单位）
        const maxLeftWidth = containerWidth - 100; // 最大左侧宽度（以像素为单位）
        const mouseX = e.clientX;

        if (mouseX >= minLeftWidth && mouseX <= maxLeftWidth) {
          const leftWidthPercent = (mouseX / containerWidth) * 100; // 计算左侧宽度的百分比
          const rightWidthPercent = 100 - leftWidthPercent; // 计算右侧宽度的百分比
          this.leftWidth = `${leftWidthPercent}`; // 使用vw单位设置左侧宽度
          this.rightWidth = `${rightWidthPercent}`; // 使用vw单位设置右侧宽度
        }
      }
    },
    stopResize() {
      this.isResizing = false;
      window.removeEventListener("mousemove", this.resize);
      window.removeEventListener("mouseup", this.stopResize);
      loadMap(this.resData);
    },
    close() {
      this.$router.back();
    },
    handleLandCodeClick(landCode) {
      this.$router.push({
        path: "/wttb_edit",
        query: {
          listrow: landCode,
        },
      });

      // spotDetails(params).then((ok) => {
      //   console.log(ok);
      //   let { data, code } = ok;
      // });
    },
    //获取初始化数据
    getData() {
      // this.loadingData = this.$loading({
      //   lock: true,
      //   text: "查询中",
      //   spinner: "el-icon-loading",
      //   background: "rgba(0, 0, 0, 0.7)",
      // });
      axios
        .get(config.url.problemPatchId, {
          params: {
            dkid: this.id,
            id: this.id,
            snapdate: this.snapdate,
          },
        })
        .then((res) => {
          // 关闭loading
          if (res.data.code == 200) {
            res.data.freckleGeomList = res.data.data.freckleGeomList;
            this.resData = res.data;
            this.addData(res.data); //页面布局数据

            this.resData.data.photos[0].fields.forEach((item) => {
              this.imgshou.push(item);
              this.numberOfPhotos = this.imgshou.length;
            });
            this.resData.data.files[0].fields.forEach((item) => {
              this.tableData.push(item);
            });
          } else {
            // this.resData = config.url.exampleData.data.data;
            // this.addData(config.url.exampleData.data);
          }
        })
        .catch((error) => {
          // 显示错误信息
          //this.$message({ message: error });
        })
        .finally(() => {
          this.loadingData.close();
        });
    },

    //初始化页面布局数据
    addData(data) {
      if (this.forliadd == "third") {
        this.editData = [];
        let APPso = [...this.editData, data.data.attributes[0]];
        this.editData = APPso;
      } else if (this.forliadd == "" || this.forliadd == "first") {
        this.editData = [];
        let newEditData = data.data.attributes.slice(1);
        this.editData = newEditData;
      }
      this.editData.forEach((ele) => {
        ele.fApi = {};
        ele.rule = [];
        ele.option = {
          resetBtn: false,
          submitBtn: false,
          form: {
            hideRequiredMark: false,
            layout: "horizontal",
            labelAlign: "center",
          },
        };

        ele.fields.forEach((item) => {
          var fieldValue = item.fieldValue == null ? "" : item.fieldValue; //值
          var arrValues = item.values == null ? [] : item.values; //单选字典
          var arrHierarchicalValues =
            item.hierarchicalValues == null ? [] : item.hierarchicalValues; //层级字典
          if (item.type === "text" || item.type === "numeric") {
            //||item.type==='textarea'
            ele.rule.push({
              type: item.type === "text" ? "input" : "inputNumber",
              field: item.fieldName,
              title: item.fieldAlias,
              value: fieldValue,
              info: fieldValue,
              col: {
                span: 12,
              },
              props: {
                disabled: !item.editable,
                text: item.type === "text" ? "text" : "number",
              },
            });
          } else if (item.type === "radio") {
            // || item.type === "select"
            ele.rule.push({
              type: "select",
              field: item.fieldName,
              title: item.fieldAlias,
              style: { width: "100%" },
              value: fieldValue,
              col: {
                span: 12,
              },
              props: {
                disabled: !item.editable,
                clearable: true,
                multiple: item.type === "radio" ? false : true,
                collapseTags: true,
              },
              options: arrValues.map(function (it) {
                return { label: it, value: it };
              }),
            });
          } else if (item.type === "select") {
            //hierarchicalSelect
            ele.rule.push({
              type: "cascader",
              field: item.fieldName,
              title: item.fieldAlias,
              value: fieldValue,
              style: { width: "100%" },
              col: {
                span: 12,
              },
              props: {
                clearable: true,
                props: {
                  disabled: !item.editable,
                  children: "children",
                  multiple: false,
                  emitPath: true,
                },
                options: arrHierarchicalValues.map(function (it) {
                  // return {label: e, value: e}
                  return {
                    label: it.name,
                    value: it.name,
                    children: it.children.map(function (it) {
                      return { label: it, value: it };
                    }),
                  };
                }),
                collapseTags: true,
              },
            });
          } else if (item.type === "date") {
            ele.rule.push({
              type: "datePicker",
              field: item.fieldName,
              title: item.fieldAlias,
              value: fieldValue,
              style: { width: "100%" },
              col: {
                span: 12,
              },
              props: {
                disabled: !item.editable,
                clearable: true,
              },
            });
          } else if (item.type === "textarea") {
            ele.rule.push({
              type: "input",
              field: item.fieldName,
              title: item.fieldAlias,
              value: fieldValue,
              style: { width: "100%" },
              col: {
                span: 12,
              },
              props: {
                disabled: !item.editable,
                clearable: true,
                type: "textarea",
                autosize: "{ minRows: 4, maxRows: 8}",
              },
            });
          }
        });
      });
      setTimeout(function () {
        loadMap(data);
      }, 800);
    },

    onSubmit(item) {
      this.showReminder();
      this.submitIntervalId = setInterval(() => {
        this.showReminder();
      }, 5 * 60 * 1000);
      item.fApi.submit((formData, fApi) => {
        alert(JSON.stringify(formData));
        Object.entries(formData).forEach(function ([key, value]) {
          if (Array.isArray(value)) {
            // 判断是否为数组
            if (Array.isArray(arr[0])) {
              if (value != undefined) {
                var data = [];
                value.forEach((ele) => {
                  data.push(ele[1]);
                });
                value = data.join(",");
              }
            } else {
              return (value = value.join(","));
            }
          }
        });
        formData.id = item.id;
        axios.put(item.url, formData).then((res) => {
          // 关闭loading
          if (res.data.code == 200) {
            this.$message(res.data.msg);
          } else {
            this.$message(res.data.msg);
          }
        });
      });
    },
    showReminder() {
      // 检查是否已经弹出过警告
      if (!this.hasShownWarning) {
        this.$notify({
          title: "警告",
          message: "请先上传附件",
          type: "error",
          duration: 5000,
        });
        // 将标志设置为 true，表示已经弹出过警告
        this.hasShownWarning = true;
        this.activeName = "third";
      }
    },
    iconview(file) {
      this.resetPreviewFlags(); // 重置所有预览标志
      const fileExtension = file.annexUrl.split(".").pop().toLowerCase(); // 获取文件扩展名
      switch (fileExtension) {
        case "xlsx":
          this.isexcel = true;
          this.previewUrl = file.annexUrl;
          break;
        case "docx":
        case "doc":
          this.isdocx = true;
          this.previewUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
            file.annexUrl
          )}&embedded=true`;
          break;
        case "pdf":
          this.ispdf = true;
          this.previewUrl = file.annexUrl;
          break;
        case "jpg":
        case "jpeg":
        case "png":
        case "gif":
        case "bmp":
          this.isImage = true;
          this.previewUrl = file.annexUrl;
          break;
        default:
          this.previewUrl = file.annexUrl; // 处理其他文件类型或默认行为
      }
      this.fullscreenVisible = true; // 显示预览窗口
    },
    // 重置预览标志的辅助方法
    resetPreviewFlags() {
      this.isexcel = false;
      this.isdocx = false;
      this.ispdf = false;
      this.isImage = false;
    },
    dangerxia(url) {
      let link = document.createElement("a");
      link.href = url.annexUrl;
      link.download = "download";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    beforeDestroy() {
      // 清除提交定时器
      if (this.submitIntervalId) {
        clearInterval(this.submitIntervalId);
        // 重置标志为 false，以便下次点击提交时再次弹出警告
        this.hasShownWarning = false;
      }
    },
  },
};
</script>
  
  <style scoped>
/* .map {
    position: relative;
  }
  @import url("../map/mapbox-gl/mapbox-gl.css");
  .mapboxgl-ctrl-logo {
    display: none !important;
  } */
.custom-title-style {
  /* font-size: 12px; 设置字体大小 */
  font-weight: bold; /* 设置字体粗体 */
  color: #0078d7; /* 设置字体颜色 */
}
.custom-collapse-item >>> .el-collapse-item__header {
  font-size: 16px;
  font-weight: bold;
  color: #0078d7;
}
.htmlheight {
  height: calc(100% - 45px);
}
.container {
  width: 100%;
  height: 90%;
  background: white;
}
.bodycolumnrow {
  width: 100%;
  display: flex;
  height: calc(100% - 45px);
  justify-content: space-around;
}

.left-column {
  width: 49%;
  background-color: #f0f0f0;
  /* width: 50.9424vw !important; */
}
.left-column >>> .mapboxgl-canvas {
  width: 100% !important;
}
.right-column {
  width: 49%;
  background-color: #fff;
  overflow: auto;
  border: 1px solid #ccc;
}
.block {
  height: 18px;
  width: 4px;
  background: #2e83f0;
}
.resizer {
  width: 15px;
  cursor: col-resize;
  background-color: #eee;
  cursor: pointer;
}
.from {
  margin: 10px;
}
.tj {
  text-align: right;
}

.img-container {
  /* height: 800px; */
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
}
.item-list {
  height: 150px;
  margin-top: 20px;
}
.img-row {
  width: 150px;
  height: 150px;
  margin-left: 20px;
  margin-top: 10px;
  position: relative;
}
.img-row > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.img-text {
  width: 150px;
  position: absolute;
  bottom: 0;
  background-color: #01060c;
  color: #f0f0f0;
  text-align: center;
}
.el-table {
  text-align: center !important;
}
.address-cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}
.showviewercolor {
  height: 80%;
}
.img-updaby {
  width: 100%;
  height: 40px;
  left: 0;
  display: flex;
  justify-content: space-between;
  background-color: #e6f0e9;
  color: #3b3bca;
  border: 1px solid #0078d7;
  z-index: 999;
  line-height: 20px;
  padding: 9px;
  position: absolute;
  left: 0;
  bottom: 5px;
}
.bottom-conter {
  width: 100px;
  display: flex;
  justify-content: space-between;
}

.lopp {
  width: 100px;
  position: absolute;
  right: 0;
}
.upload-demo {
  margin-left: 318px;
}
.teextarea {
  width: 350px;
  margin-top: 10px;
}
.teex {
  display: flex;
  margin: 0 auto;
  width: 67%;
  flex-wrap: wrap;
}

.textarea-rop {
  margin-top: 15px;
  padding-right: 10px;
}
.primarylistshow {
  margin-left: 680px;
  margin-top: 15px;
}
.sticky-tabs-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: white;
}

.scrollable-tab-content {
  max-height: 800px;
  overflow-y: auto;
}
.nuiop {
  height: 90%;
  display: flex;
  overflow: hidden;
  justify-content: space-evenly;
}
.contentk {
  height: 750px;
}
.nuiop >>> .el-dialog__header {
  background: #0078d7 !important; /* 设置为蓝色 */
  color: #fff;
}

.preview-container {
  width: 100%; /* 或者设置一个固定宽度 */
  max-height: 500px; /* 设置合适的高度 */
  overflow: auto; /* 允许滚动 */
  text-align: center; /* 文字居中，有助于图片居中 */
}

.centered-image {
  max-width: 100%;
  max-height: 80vh; /* 视口高度的 80% */
  object-fit: contain;
  display: block;
  margin: auto;
}
.Cycle {
  background-color: transparent;
  width: 100%;
  height: 760px;
}
.tabListname >>> .el-table__body-wrapper::-webkit-scrollbar {
  height: 8px !important;
}

.tabListname >>> .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #ccc !important; /* 使用 !important 提高优先级 */
  border-radius: 3px;
}

.tabListname >>> .el-table__body-wrapper::-webkit-scrollbar-track {
  background-color: #ccc !important;
}
/* .titleStepColor {
    color: red !important;
  } */
.landCoderowe {
  display: flex;
  font-size: 17px;
  width: 100%;
  height: 40px;
  line-height: 40px;
}
.rowpo {
  width: 5%;
  margin-top: 10px;
}
.container-rehgub {
  border-top: 1.1rem solid transparent;
  border-bottom: 1.1rem solid transparent;
  border-right: 1.25rem solid black;
}
.rehgublist {
  display: flex;
  justify-content: space-evenly;
}
.rpouttr >>> .el-step__title {
  width: 160px;
}
.rpouttr >>> .el-steps {
  height: 53px;
  display: flex;
  justify-content: space-around;
}
.landCode >>> .el-collapse-item__header {
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
}
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.blue-text {
  color: blue;
}
.landCodeList-top {
  cursor: pointer;
  width: 50%;
  height: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  justify-content: space-evenly;
  align-items: center;
}
.liet-item {
  width: 250px;
  line-height: 40px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.list-title {
  font-size: 17px;
  line-height: 40px;
}
.title-text {
  font-size: 16px;
  margin-left: 10px;
}
</style>
  