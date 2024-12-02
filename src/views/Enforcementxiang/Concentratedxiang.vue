<template>
  <div class="htmlheight">
    <div class="Header-box">
      <el-collapse v-model="activeNames" @change="handlebnsdgb">
        <el-collapse-item
          class="landCode"
          name="listlandCode"
          style="pointer-events: none"
        >
          <template #title>
            <el-button-group>
              <el-button
                type="primary"
                size="small"
                icon="el-icon-arrow-left"
                @click="close"
                style="pointer-events: auto"
                >返回列表</el-button
              >
            </el-button-group>
            <!-- <div class="rpouttr" v-show="activeSteprow">
              <el-steps
                class="activesss"
                :active="activeStep"
                finish-status="success"
                simple
              >
                <el-step
                  v-for="(step, index) in steps"
                  :key="step + index"
                  :title="step.stepName"
                  :status="
                    step.stepState == '1'
                      ? 'success'
                      : step.stepState == '0'
                      ? 'wait'
                      : 'wait'
                  "
                  :description="horizontal"
                >
                  <template #icon>
                    <i
                      class="el-icon-check custom-icon"
                      :status="
                        step.stepState == '1'
                          ? 'success'
                          : step.stepState == '0'
                          ? 'wait'
                          : 'error'
                      "
                    ></i>
                  </template>
                </el-step>
              </el-steps>
            </div> -->
            <!-- <span class="title-text">图斑编辑(地块编号: {{ landCode }})</span> -->
          </template>
        </el-collapse-item>
      </el-collapse>
    </div>
    <main class="main-content">
      <div class="left-column">
        <Map ref="map" class="map"></Map>
        <!-- <el-tabs type="border-card">
              <el-tab-pane label="天地图">
                <Map ref="map" class="map"></Map>
              </el-tab-pane>
            </el-tabs> -->
        <!-- <el-tabs type="border-card">
              <el-tab-pane label="消息中心">
                <Map ref="map" class="map"></Map>
              </el-tab-pane>
              <el-tab-pane label="角色管理">角色管理</el-tab-pane>
              <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
            </el-tabs> -->
      </div>
      <!-- :style="{ width: rightWidth + 'vw' }" -->
      <div class="right-column">
        <el-tabs
          type="border-card"
          v-model="activeName"
          @tab-click="handleClick"
          class="sticky-tabs-header"
        >
          <el-tab-pane label="图斑信息" name="first">
            <div class="scrollable-tab-content">
              <el-descriptions
                class="my-label"
                title="基本信息"
                :size="size"
                :column="3"
                border
              >
                <el-descriptions-item :span="1.5">
                  <template slot="label">地块编号</template>
                  {{ freckleDatalisto.freckleCode }}
                </el-descriptions-item>

                <el-descriptions-item :span="1.5">
                  <template slot="label"> 所属行政区 </template>
                  {{ freckleDatalisto.city }},{{ freckleDatalisto.county }}
                </el-descriptions-item>

                <el-descriptions-item :span="1.5">
                  <template slot="label"> 地块面积 </template>
                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.dkmj }}
                    </div>
                    <div>亩</div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label"> 耕地面积 </template>
                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.gdmj }}
                    </div>
                    <div>亩</div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">基本农田面积 </template>
                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.jbntmj }}
                    </div>
                    <div>亩</div>
                  </div>
                </el-descriptions-item>

                <el-descriptions-item :span="1.5">
                  <template slot="label">内业审核说明 </template>
                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.nyshsm }}
                    </div>
                  </div>
                </el-descriptions-item>
              </el-descriptions>
              <el-descriptions
                class="my-label"
                title="集中举证记录"
                :size="size"
                :column="3"
                border
              >
                <el-descriptions-item :span="1.5">
                  <template slot="label">外业核查说明</template>
                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.wyhcsm }}
                    </div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="3">
                  <template slot="label">问题类型</template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.wtlx }}
                    </div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label"> 违法面积 </template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.wfmj }}
                    </div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label"> 违法耕地面积 </template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.wfgdmj }}
                    </div>
                    <div>亩</div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label"> 违法基本农田面积 </template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.wfjbntmj }}
                    </div>
                    <div>亩</div>
                  </div>
                </el-descriptions-item>

                <el-descriptions-item :span="1.5">
                  <template slot="label"> 销号状态 </template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.cancelStatus }}
                    </div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label"> 销号人 </template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.cancelBy }}
                    </div>
                  </div>
                </el-descriptions-item>

                <el-descriptions-item :span="1.5">
                  <template slot="label"> 销号原因 </template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.cancelReason }}
                    </div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label"> 未销号原因 </template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.noCancelReason }}
                    </div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label"> 举证人 </template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.jzr }}
                    </div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label"> 单位 </template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.dw }}
                    </div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label"> 核查后类型 </template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.jzjzHchlx }}
                    </div>
                  </div>
                </el-descriptions-item>

                <el-descriptions-item :span="3">
                  <template slot="label">现场是否提供举证材料 </template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.xcsftgjzcl }}
                    </div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">核查批次及时间 </template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.hcrwName }}
                    </div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">核查任务 </template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.hcrwwjjName }}
                    </div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">是否销号 </template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.sfxh }}
                    </div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">销号日期 </template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.cancelDate }}
                    </div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">现场是否提供举证材料 </template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.xcsftgjzcl }}
                    </div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">最终意见 </template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.jzjzZzyj }}
                    </div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">是否纳入违法计算 </template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.jzjzSfnrwfjs }}
                    </div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">举证前违法子类 </template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.jzjzWfzlAfter }}
                    </div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">举证后违法子类</template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.jzjzWfzlFront }}
                    </div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">举证阶段</template>
                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.jzjd }}
                    </div>
                  </div>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </el-tab-pane>
          <el-tab-pane
            :label="getTabLabel()"
            name="second"
            @tab-click="handleClick"
            class="tabscontent"
          >
            <div class="herder">
              <!-- <div class="image-viewer-overlay"> -->
              <!-- <div class="image-viewer-content">
                      <el-carousel :interval="5000" arrow="always">
                        <el-carousel-item v-for="item in 4" :key="item">
                          <h3>{{ item }}</h3>
                        </el-carousel-item>
                      </el-carousel>
                    </div> -->
              <!-- <div><button @click="closeViewer">关闭</button></div> -->
              <!-- <div>
                      <button @click="prevImage" v-if="currentIdx > 0"><</button>
                    </div> -->
              <!-- <div>
                      <button
                        @click="nextImage"
                        v-if="currentIdx < imgList.length - 1"
                      >
                        >
                      </button>
                    </div> -->
              <!-- </div> -->
              <el-collapse v-model="activeNamestwo">
                <el-collapse-item
                  title="用户级别"
                  class="custom-collapse-item"
                  name="1"
                >
                  <div class="scrollable-tab-content">
                    <div class="img-container">
                      <div
                        v-for="(item, index) in imgshou"
                        :key="item + index"
                        class="item-list"
                      >
                        <div class="img-row" id="">
                          <img
                            :src="item.picUrl"
                            alt=""
                            @click="onpreview(item, index)"
                            @mouseover="onpreviewe(item, index)"
                          />

                          <div class="img-text">
                            <span>{{ item.uploadTime }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="viewer-right" v-if="showviewer">
                    <el-image-viewer
                      :on-close="closeviewer"
                      :url-list="urlList"
                      :on-switch="handleImageChange"
                      :initial-index="initialIndex"
                      :style="{
                        position: 'absolute',
                        width: isSidebarOpened ? '42%' : '46%',
                        height: '79%',
                        'margin-left': isSidebarOpened ? '57%' : '53%',
                        'margin-top': '7.9%',
                        'background-color': 'black',
                      }"
                    />
                  </div>
                  <!-- class="isSide"
                          :style="[{ width: !isSidebarOpened ? '46%' : '42%' }]" -->
                  <!-- :style="customviewer" -->
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="getTabfjgl()" name="third">
            <div class="scrollable-tab-content">
              <el-collapse v-model="activeNamesthree">
                <el-collapse-item
                  :title="landCode"
                  name="1"
                  class="customcollapse"
                >
                  <el-table :data="fjgldata" style="width: 100%">
                    <el-table-column align="center" type="index" label="id">
                    </el-table-column>
                    <el-table-column
                      prop="uploadBy"
                      label="上传人"
                      align="center"
                      width="180"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="annexName"
                      align="center"
                      label="文件说明"
                      width="250"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="uploadtime"
                      align="center"
                      label="上传时间"
                      width="250"
                    >
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
                      <template slot-scope="scope">
                        <el-button
                          @click="scopehandleClick(scope.row)"
                          type="text"
                          size="small"
                          >下载</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-tab-pane>
          <el-tab-pane label="图斑销号" class="textareainner">
            <el-form
              ref="formDatarw"
              :model="formDatarw"
              :rules="rulester"
              class="scrollable-tab-content"
              label-width="120px"
            >
              <el-descriptions
                class="my-label"
                title=""
                :size="size"
                :column="3"
                border
              >
                <el-descriptions-item :span="1.5">
                  <template slot="label">外业核查说明</template>
                  <el-form-item>
                    <el-input
                      type="textarea"
                      autosize
                      placeholder="请输入内容"
                      v-model="formDatarw.wyhcsm"
                    ></el-input>
                  </el-form-item>
                </el-descriptions-item>

                <el-descriptions-item :span="3">
                  <template slot="label">问题类型</template>
                  <el-form-item prop="wtlx">
                    <el-input
                      type="textarea"
                      autosize
                      placeholder="请输入内容"
                      v-model="formDatarw.wtlx"
                    ></el-input>
                  </el-form-item>
                </el-descriptions-item>

                <el-descriptions-item :span="1.5">
                  <template slot="label">违法面积</template>
                  <el-form-item prop="wfmj">
                    <el-input
                      type="textarea"
                      autosize
                      placeholder="请输入内容"
                      v-model="formDatarw.wfmj"
                    ></el-input>
                  </el-form-item>
                </el-descriptions-item>

                <el-descriptions-item :span="1.5">
                  <template slot="label">违法耕地面积</template>
                  <el-form-item prop="wfgdmj">
                    <el-input
                      type="textarea"
                      autosize
                      placeholder="请输入内容"
                      v-model="formDatarw.wfgdmj"
                    ></el-input>
                  </el-form-item>
                </el-descriptions-item>

                <el-descriptions-item :span="1.5">
                  <template slot="label">违法基本农田面积</template>
                  <el-form-item prop="wfjbntmj">
                    <el-input
                      type="textarea"
                      autosize
                      placeholder="请输入内容"
                      v-model="formDatarw.wfjbntmj"
                    ></el-input>
                  </el-form-item>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">是否销号</template>
                  <el-form-item prop="sfxh">
                    <el-select v-model="formDatarw.sfxh" placeholder="请选择">
                      <el-option
                        v-for="item in sfxher"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">销号状态</template>
                  <el-form-item prop="cancelStatus">
                    <el-select
                      v-model="formDatarw.cancelStatus"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in itemLiop"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-descriptions-item>

                <el-descriptions-item :span="1.5">
                  <template slot="label">销号人</template>
                  <el-form-item prop="cancelBy">
                    <el-input
                      type="textarea"
                      autosize
                      placeholder="请输入内容"
                      v-model="formDatarw.cancelBy"
                    ></el-input>
                  </el-form-item>
                </el-descriptions-item>

                <el-descriptions-item :span="1.5">
                  <template slot="label">销号原因</template>
                  <el-form-item prop="cancelReason">
                    <el-input
                      type="textarea"
                      autosize
                      placeholder="请输入内容"
                      v-model="formDatarw.cancelReason"
                    ></el-input>
                  </el-form-item>
                </el-descriptions-item>

                <el-descriptions-item :span="1.5">
                  <template slot="label">未销号原因</template>
                  <el-form-item prop="noCancelReason">
                    <el-input
                      type="textarea"
                      autosize
                      placeholder="请输入内容"
                      v-model="formDatarw.noCancelReason"
                    ></el-input>
                  </el-form-item>
                </el-descriptions-item>

                <el-descriptions-item :span="1.5">
                  <template slot="label">销号时间</template>
                  <el-form-item prop="cancelte">
                    <el-date-picker
                      v-model="formDatarw.cancelte"
                      type="datetime"
                      placeholder="选择日期时间"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      format="yyyy-MM-dd HH:mm:ss"
                      @change="handleDateChange"
                    ></el-date-picker>
                  </el-form-item>
                </el-descriptions-item>

                <el-descriptions-item :span="1.5">
                  <template slot="label">举证人</template>
                  <el-form-item prop="jzr">
                    <el-input
                      type="textarea"
                      autosize
                      placeholder="请输入内容"
                      v-model="formDatarw.jzr"
                    ></el-input>
                  </el-form-item>
                </el-descriptions-item>

                <el-descriptions-item :span="1.5">
                  <template slot="label">单位</template>
                  <el-form-item prop="dw">
                    <el-input
                      type="textarea"
                      autosize
                      placeholder="请输入内容"
                      v-model="formDatarw.dw"
                    ></el-input>
                  </el-form-item>
                </el-descriptions-item>

                <el-descriptions-item :span="1.5">
                  <template slot="label">现场是否提供举证材料</template>
                  <el-form-item prop="xcsftgjzcl">
                    <el-input
                      type="textarea"
                      autosize
                      placeholder="请输入内容"
                      v-model="formDatarw.xcsftgjzcl"
                    ></el-input>
                  </el-form-item>
                </el-descriptions-item>

                <el-descriptions-item :span="1.5">
                  <template slot="label">核查后类型*</template>
                  <el-form-item prop="hchlx">
                    <el-select v-model="formDatarw.hchlx" placeholder="请选择">
                      <el-option
                        v-for="item in opvalue"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-descriptions-item>

                <el-descriptions-item :span="1.5">
                  <template slot="label">核查工作名称*</template>
                  <el-form-item prop="hcrwName">
                    <el-input
                      type="textarea"
                      autosize
                      placeholder="请输入内容"
                      v-model="formDatarw.hcrwName"
                    ></el-input>
                  </el-form-item>
                </el-descriptions-item>

                <el-descriptions-item :span="1.5">
                  <template slot="label">核查任务*</template>
                  <el-form-item prop="hcrwwjjName">
                    <el-select
                      v-model="formDatarw.hcrwwjjName"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in opvaluehcrwName"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">举证阶段*</template>
                  <el-form-item prop="jzjd">
                    <el-select v-model="formDatarw.jzjd" placeholder="请选择">
                      <el-option
                        v-for="item in jzjder"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-descriptions-item>

                <el-descriptions-item :span="1.5">
                  <template slot="label">内业审核说明*</template>
                  <el-form-item prop="nyshsm">
                    <el-input
                      type="textarea"
                      autosize
                      placeholder="请输入内容"
                      v-model="formDatarw.nyshsm"
                    ></el-input>
                  </el-form-item>
                </el-descriptions-item>

                <el-descriptions-item :span="3">
                  <template slot="label">提交</template>
                  <div class="type-success" v-if="permissions['提交'] === 0">
                    <el-button type="success" @click="submitFormtj"
                      >提交</el-button
                    >
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="3">
                  <template slot="label">暂时保存</template>
                  <div class="type-success" v-if="permissions['提交'] === 0">
                    <el-button type="warning" @click="submitFormtjer"
                      >暂时保存</el-button
                    >
                  </div>
                </el-descriptions-item>
              </el-descriptions>
            </el-form>
            <!-- <el-button
              type="primary"
              class="primarylistshow"
              @click="primaryshow()"
              plain
              >上传</el-button
            > -->
          </el-tab-pane>
        </el-tabs>
        <div class="img-updab" v-if="showviewer">
          <div class="img-updaby">
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
      </div>
    </main>
  </div>
</template>
      
      <script>
import Map from "../mapTwo.vue";
import { loadMap, loadPhotoMap, MapInit } from "../../api/map/loadMap";

import {
  pictureList,
  updateAnnexInfo,
  annexUpload,
  jzjzByfreckleCode,
  DropdownBoXContent,
  jzjzupdate,
  hcrwlist2024,
  jzjzupdatejzym,
} from "../../api/document/index";
import elImageViewer from "element-ui/packages/image/src/image-viewer.vue";
//引入VueOfficeDocx组件
import VueOfficeDocx from "@vue-office/docx";
import "@vue-office/docx/lib/index.css";
//引入VueOfficeExcel组件
import VueOfficeExcel from "@vue-office/excel";
//引入相关样式
import "@vue-office/excel/lib/index.css";
import moment from "moment";
export default {
  data() {
    return {
      permissions: {},
      sfxher: [
        {
          label: "是",
          value: "是",
        },
        {
          label: "否",
          value: "否",
        },
      ],
      formDatarw: {
        nyshsm: "",
        hcrwwjjName: "",
        xcsftgjzcl: "",
        dw: "",
        jzr: "",
        noCancelReason: "",
        cancelReason: "",
        cancelBy: "",
        cancelStatus: "",
        sfxh: "",
        xhlx: "",
        hchlx: "",
        wfjbntmj: "",
        wfgdmj: "",
        wfmj: "",
        wyhcsm: "",
        wtlx: "",
        landCode: "",
        id: "",
        hcrwName: "",
        wfzl: "",
        cancelDate: "",
        jzjd: "",
        freckleCode: "",
      },
      jzjder: [],
      rulester: {},
      itemLiop: [],
      fjgldata: [],
      opvalue: [],
      freckleDatalisto: {},
      filteredData: {},

      activeSteprow: true,
      responseData: {},

      tabListtwolist: [],
      tabListwan: [],
      tabListtwo: [],
      actList: ["1", "2", "3", "4", "5", "6", "7"],
      tabList: [],
      name: localStorage.getItem("name"),
      id: "",
      snapdate: null,
      editData: [],
      horizontal: null,
      currentFileUrl: "",
      // isPdf: false,
      leftWidth: 40,
      rightWidth: 50,
      isResizing: false,
      resData: {},
      size: "",
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
      centerDialogVisible: false,
      direction: "btt",
      numberOfPhotos: 0,
      currentarr: false,
      textarea1: "",
      textarea2: "",
      fileList: [], //上传文件的集合
      parentMessage: "Hello from parent",
      landCode: "",
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
      steps: [],
      freckleCode: "",
      listrow: "",
      container: null,
      hcrwName: "",
      opvaluehcrwName: [],
      idrower: "",
    };
  },
  created() {
    const storedPermissions = localStorage.getItem("permissions");
    if (storedPermissions !== null) {
      this.permissions = JSON.parse(storedPermissions);
    }
  },
  watch: {
    "formDatarw.sfxh"(newVal) {
      // console.log(newVal, "newVal");
      this.$refs.formDatarw.clearValidate();
      this.rulester = {};
      if (newVal === "是") {
        this.itemLiop = [
          { value: "已销号", label: "已销号" },
          { value: "图形灭失", label: "图形灭失" },
        ];
        this.rulester = {
          cancelBy: [
            { required: true, message: "请输入销号人", trigger: "blur" },
          ],
          cancelReason: [
            { required: true, message: "请输入销号原因", trigger: "blur" },
          ],
          cancelte: [
            { required: true, message: "请选择销号时间", trigger: "change" },
          ],
        };
      } else if (newVal === "否") {
        this.itemLiop = [
          { value: "未销号", label: "未销号" },
          { value: "县级已填报违法", label: "县级已填报违法" },
          { value: "持续监测", label: "持续监测" },
        ];
        this.rulester = {
          noCancelReason: [
            { required: true, message: "请输入未销号原因", trigger: "blur" },
          ],
          wfmj: [
            { required: true, message: "请输入违法面积", trigger: "blur" },
          ],
          wfgdmj: [
            { required: true, message: "请输入违法耕地面积", trigger: "blur" },
          ],
          wfjbntmj: [
            {
              required: true,
              message: "请输入违法基本农田面积",
              trigger: "blur",
            },
          ],
        };
      } else {
        this.itemLiop = [];
      }
      // 重置cancelStatus
      this.formDatarw.cancelStatus = "";
      this.$nextTick(() => {
        this.$refs.formDatarw.clearValidate();
      });
    },
  },
  mounted() {
    this.id = this.$route.query.id;
    this.idrower = this.$route.query.idrower;
    this.formDatarw.id = this.$route.query.idrower;
    this.landCode = this.$route.query.landCode;
    this.freckleCode = this.$route.query.tbbh;
    this.listrow = this.$route.query.listrow;
    document.querySelector(".right-column").style.overflow = "hidden";
    // this.listrowl();
    this.tbxfs();
    // this.freckleCod();
    this.rhtzByFreckl();
    this.picture();
    // this.exportBylandCodewyh();
    this.tdwpWjjListt();
    MapInit(this); //地图关联初始化
  },

  components: {
    Map,
    elImageViewer,
    VueOfficeDocx,
    VueOfficeExcel,
    // VueOfficePdf,
  },
  computed: {
    isSidebarOpened() {
      return this.$store.state.app.sidebar.opened;
    },
    // customviewer() {
    //   return {
    //     position: "absolute",
    //     top: "210px",
    //     left: this.isSidebarOpened ? "1095px" : "1020px",
    //     width: this.isSidebarOpened ? "calc(42%)" : "calc(46%)",
    //     height: "69%",
    //     overflow: "hidden",
    //     backgroundColor: "black",
    //     transition: "width 0.5s ease",
    //   };
    // },
    computedRadio: {
      get() {
        switch (this.freckleDatalisto.pdlx) {
          case "合法":
            return "1";
          case "违法":
            return "2";
          case "其他":
            return "3";
          default:
            return null;
        }
      },
      set(value) {
        // 由于不允许更改，这里不做任何事情
      },
    },
    computedRadio3: {
      get() {
        switch (this.freckleDatalisto.shengjidxjg) {
          case "合法":
            return "1";
          case "违法":
            return "2";
          case "其他":
            return "3";
          default:
            return null;
        }
      },
      set(value) {
        // 由于不允许更改，这里不做任何事情
      },
    },
    utedRadio: {
      get() {
        switch (this.freckleDatalisto.sflzgdjf) {
          case "是":
            return "1";
          case "否":
            return "2";
          default:
            return null;
        }
      },
    },
    sutedRadio: {
      get() {
        switch (this.freckleDatalisto.sfwhzj) {
          case "是":
            return "1";
          case "否":
            return "2";
          default:
            return null;
        }
      },
    },
    sfdpfutedRadio: {
      get() {
        switch (this.freckleDatalisto.sfdpf) {
          case "是":
            return "1";
          case "否":
            return "2";
          default:
            return null;
        }
      },
    },
  },
  directives: {
    tooltip: function (el, binding) {
      el.setAttribute("title", binding.value);
    },
  },
  methods: {
    tdwpWjjListt() {
      hcrwlist2024().then((ok) => {
        ok.data.forEach((item) => {
          this.opvaluehcrwName.push({ value: item.hcrwmc, label: item.hcrwmc });
        });
      });
    },
    submitFormtjer() {
      this.$refs.formDatarw.validate((valid) => {
        if (valid) {
          this.formDatarw.freckleCode = this.freckleCode;
          this.formDatarw.jzjd = "已审核待提交";
          this.jzjzupdat(this.formDatarw);
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    submitFormtj() {
      this.$refs.formDatarw.validate((valid) => {
        if (valid) {
          this.formDatarw.freckleCode = this.freckleCode;
          this.jzjzupdat(this.formDatarw);
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    jzjzupdat(formDatarw) {
      jzjzupdatejzym(formDatarw).then((ok) => {
        // console.log(ok);
        if (ok.code == 200 && this.formDatarw.jzjd == "已审核待提交") {
          this.$message({
            message: "保存成功",
            type: "success",
          });
        } else if (ok.code == 200 && this.formDatarw.jzjd != "已审核待提交") {
          this.$message({
            message: "修改成功",
            type: "success",
          });
        }
      });
    },
    toggleZoom() {
      this.isZoomed = !this.isZoomed;
    },
    scopehandleClick(row) {
      // console.log(row);
      const url = row.annexUrl;
      const a = document.createElement("a");
      a.href = url;
      a.download = "";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    picture() {
      let params = {
        landCode: this.landCode,
        freckleCode: this.freckleCode,
      };
      pictureList(params).then((res) => {
        this.resData = res.data;
        loadMap(this.resData);
        if (res.code == 200) {
          // res.data.photos.forEach((item) => {
          //   this.imgshou.push(item);
          //   this.numberOfPhotos = this.imgshou.length;
          // });
          if (res.data.photos.length) {
            this.imgshou = [...res.data.photos];
            this.numberOfPhotos = this.imgshou.length;
          }
          this.fjgldata = res.data.files;
          this.numfjgl = this.fjgldata.length;
        }
      });
      DropdownBoXContent().then((ok) => {
        ok.data.HCHLX.forEach((ele) => {
          this.opvalue.push({ value: ele, label: ele });
        });
        ok.data.JZJD.forEach((ele) => {
          this.jzjder.push({ value: ele, label: ele });
        });
      });
    },
    // exportBylandCodewyh() {
    //   let params = {
    //     landCode: this.landCode,
    //     freckleCode: this.freckleCode,
    //   };
    //   exportBylandCodewyhc(params).then((ok) => {
    //     // console.log(ok);
    //   });
    // },
    handleDateChange(date) {
      if (date) {
        const formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
        this.formDatarw.cancelDate = formattedDate;
      } else {
        this.formDatarw.cancelDate = "";
      }
    },
    rhtzByFreckl() {
      let params = {
        id: this.idrower,
      };
      jzjzByfreckleCode(params).then((ok) => {
        this.freckleDatalisto = ok.data;
        // this.freckleDatalisto = ok.data.融合台账;
        this.formDatarw.id = ok.data.id;
        this.formDatarw.nyshsm = ok.data.nyshsm;
        this.formDatarw.wfjbntmj = ok.data.wfjbntmj;
        this.formDatarw.hcrwwjjName = ok.data.hcrwwjjName;
        this.formDatarw.xcsftgjzcl = ok.data.xcsftgjzcl;
        this.formDatarw.dw = ok.data.dw;
        this.formDatarw.jzr = ok.data.jzr;
        this.formDatarw.noCancelReason = ok.data.noCancelReason;
        this.formDatarw.cancelReason = ok.data.cancelReason;
        this.formDatarw.cancelBy = ok.data.cancelBy;
        this.formDatarw.cancelStatus = ok.data.cancelStatus;
        this.formDatarw.xhlx = ok.data.xhlx;
        this.formDatarw.hchlx = ok.data.jzjzHchlx;
        this.formDatarw.wtlx = ok.data.wtlx;
        this.formDatarw.wfgdmj = ok.data.wfgdmj;
        this.formDatarw.wfmj = ok.data.wfmj;
        this.formDatarw.wyhcsm = ok.data.wyhcsm;
        this.formDatarw.landCode = ok.data.landCode;
        this.formDatarw.hcrwName = ok.data.hcrwName;
        this.formDatarw.wfzl = ok.data.wfzl;
        this.formDatarw.sfxh.sfxh = ok.data.sfxh;
        this.cancelte = ok.data.cancelDate;
        this.formDatarw.jzjd = ok.data.jzjd;
      });
    },
    formatText(text) {
      return text && text.length > 9 ? text.substring(0, 9) + "..." : text;
    },
    // freckleCod() {
    //   let params = {
    //     freckleCode: this.listrow,
    //   };

    //   freckleCode(params).then((ok) => {
    //     this.filteredData = ok.data;
    //   });
    // },
    tbxfs() {
      // let params = {
      //   dkbh_or_tbbh: this.landCode || "10086",
      // };
      // smzqjd(params).then((ok) => {
      //   this.tabListtwolist.push(ok.data);
      //   const { jdmc } = ok.data;
      //   if (jdmc && typeof jdmc === "string") {
      //     this.jdmcp = [{ jdmc }];
      //   }
      // });
    },
    // listrowl() {
    //   this.snapdate = this.$route.query.snapdate;
    //   let params = {
    //     landCode: this.landCode,
    //   };
    //   smzqshjd(params).then((ok) => {
    //     let stepObj = [
    //       { stepName: "县级已填报", stepType: "xjytb" },
    //       { stepName: "市级已审核", stepType: "sjysh" },
    //       { stepName: "省级已审核", stepType: "sjyshbtg" },
    //       { stepName: "百亩大图斑", stepType: "bmdtb" },
    //       { stepName: "互联网+", stepType: "hlw" },
    //       { stepName: "外业核查", stepType: "wyhc" },
    //       { stepName: "集中举证", stepType: "jzjz" },
    //       { stepName: "平台销号", stepType: "yxh" },
    //     ];
    //     let arr = [];
    //     let responseData = ok.data;
    //     for (let i in responseData) {
    //       arr.push({ [i]: responseData[i] });
    //     }

    //     let stepArr = [];
    //     stepObj.map((item, index) => {
    //       let obj = {};
    //       obj.stepName = item.stepName;
    //       obj.stepType = item.stepType;
    //       arr.map((itm, ind) => {
    //         if (item.stepType == Object.keys(itm)) {
    //           obj.stepState = Object.values(itm).join("");
    //         }
    //         if (
    //           this.jdmcp &&
    //           this.jdmcp.length > 0 &&
    //           item.stepName === this.jdmcp[0].jdmc
    //         ) {
    //           this.activeStep = stepObj.indexOf(item) + 1;
    //           obj.stepState = "2";
    //         }
    //       });
    //       stepArr.push(obj);
    //     });
    //     this.steps = stepArr;
    //   });
    // },

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
      updateAnnexInfo(param).then((res) => {
        if (res.code == 200) {
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
      return `现场照片(${
        this.numberOfPhotos == null ? 0 : this.numberOfPhotos
      })`;
    },

    getTabfjgl() {
      return `附件管理(${this.numfjgl == null ? 0 : this.numfjgl})`;
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
          params.append("freckleCode", this.freckleCode);
          params.append("customAnnexName", this.ruleForm.textarea1);
          params.append("annexExplain", this.ruleForm.textarea2);
          annexUpload(params).then((res) => {
            if (res.code == 200) {
              this.fileList = [];
              this.textarea1 = "";
              this.textarea2 = "";
              this.centerDialogVisible = false;
              this.$notify({
                title: "上传成功",
                message: "操作成功完成",
                type: "success",
                duration: 2000,
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
      this.closeviewer();
    },

    startResize() {
      this.isResizing = true;
      window.addEventListener("mousemove", this.resize);
      window.addEventListener("mouseup", this.stopResize);
    },

    closeviewer() {
      this.showviewer = false;
      loadPhotoMap(null);
    },

    onpreview(itm, index) {
      // console.log(itm.picUrl);
      this.activeName = "second";
      this.urlList = [];
      this.imgshou.forEach((m, n) => {
        this.urlList.push(m.picUrl);
      });
      this.perviewBottom = itm;
      this.showviewer = true; // 先关闭预览
      this.initialIndex = index;

      // 稍作延迟后重新打开预览
      this.$nextTick(() => {
        loadPhotoMap(itm, this); // 更新地图
      });
    },
    onpreviewe(itm, index) {
      // this.urlList = [];
      this.urlList.push(itm.picUrl);
      this.perviewBottom = itm;
      this.initialIndex = index;
      this.$nextTick(() => {
        loadPhotoMap(itm, this);
      });
    },
    handleImageChange(newIndex) {
      this.initialIndex = newIndex;
      this.perviewBottom = this.imgshou[newIndex];
      loadPhotoMap(this.imgshou[newIndex], this);
      // return true;
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
    },
    close() {
      this.$router.back();
    },

    handlebnsdgb(newActiveNames) {
      if (newActiveNames.includes("listlandCode")) {
        this.$nextTick(() => {
          const index = this.activeNames.indexOf("listlandCode");
          if (index > -1) {
            this.activeNames.splice(index, 1);
          }
        });
      }
    },
    onSubmit(item) {
      this.showReminder();
      this.submitIntervalId = setInterval(() => {
        this.showReminder();
      }, 5 * 60 * 1000);
      item.fApi.submit((formData, fApi) => {
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
            // this.$message(res.data.msg);
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
    // iconview(file) {
    //   this.resetPreviewFlags(); // 重置所有预览标志
    //   const fileExtension = file.annexUrl.split(".").pop().toLowerCase(); // 获取文件扩展名
    //   const parts = file.annexUrl.split(":8084");
    //   const path = parts[1];
    //   switch (fileExtension) {
    //     case "xlsx":
    //       this.isexcel = true;
    //       this.previewUrl = `/img${path}`;
    //       break;
    //     case "docx":
    //     case "doc":
    //       this.isdocx = true;
    //       this.previewUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
    //         `/img${path}`
    //       )}&embedded=true`;
    //       break;
    //     case "pdf":
    //       this.ispdf = true;
    //       this.previewUrl = `/img${path}`;
    //       break;
    //     case "jpg":
    //     case "jpeg":
    //     case "png":
    //     case "gif":
    //     case "bmp":
    //       this.isImage = true;
    //       this.previewUrl = `/img${path}`;
    //       break;
    //     default:
    //       this.previewUrl = `/img${path}`; // 处理其他文件类型或默认行为
    //   }
    //   this.fullscreenVisible = true; // 显示预览窗口
    // },
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
    <style>
.viewer-right {
  width: 300px;
  display: flex;
  flex-direction: column;
  position: relative;
}
.custom-viewer {
  position: relative;
}
.img-updab {
  width: 100%;
  height: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  z-index: 9999;
  position: absolute;
  bottom: 0;
}
.img-updaby {
  display: flex;
  justify-content: space-between;
  width: 98%;
  height: 40px;
  margin: auto;
  background-color: #fff;
  color: #3b3bca;
  /* border: 1px solid #0078d7; */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  line-height: 25px;
  padding: 9px;
  flex-grow: 0;
}
.isSide {
  position: absolute !important;
  top: 210px !important;
  left: 1050px !important;
  /* width: 42% !important; */
  max-height: 600px !important;
  overflow: hidden;
}
</style>
    
    
      <style scoped>
html,
body {
  height: 100%;
  margin: 0;
}
.map {
  position: relative;
}
@import url("../../api/map/mapbox-gl/mapbox-gl.css");
.mapboxgl-ctrl-logo {
  display: none !important;
}
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
  width: 100%;
  height: calc(100% - 45px);
}
.container {
  width: 100%;
  height: 90%;
  background: white;
}
.main-content {
  width: 100%;
  display: flex;
  align-items: center;
  height: 100%;
  background-color: #ffff;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  justify-content: space-around;
  margin: auto;
}

.left-column {
  width: 50%;
  height: 98%;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
}
.left-column >>> .el-tabs__content {
  height: 691px !important;
}
.left-column >>> .mapboxgl-canvas {
  width: 100% !important;
  height: 100% !important;
}
.right-column {
  width: 48%;
  height: 98%;
  background-color: #fff;
  overflow: auto;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  position: relative;
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
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(146px, 1fr));
  gap: 10px;
  overflow-y: auto;
  position: relative;
}
.item-list {
  min-height: 111px;
}
.img-row {
  min-height: 111px;
  position: relative;
}
.img-row > img {
  width: 100%;
  height: 111px;
  object-fit: cover;
  border-radius: 5% 5% 5% 5%;
}

.img-text {
  width: 100%;
  position: absolute;
  bottom: 7px;
  background-color: #363636;
  color: #f0f0f0;
  text-align: center;
  border-radius: 0 0 16% 16%;
  opacity: 0.7;
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
/* .viewer-right {
      width: 200px;
      height: 100px;
      display: flex;
      flex-direction: column;
      position: relative;
    } */

/* .viewer-updaby {
      width: 50%;
      height: 200px;
      display: flex;
    } */
/* .img-updaby {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: space-between;
      background-color: #e6f0e9;
      color: #3b3bca;
      border: 1px solid #0078d7;
      z-index: 9999;
      line-height: 20px;
      padding: 9px;
      flex-grow: 0;
    } */
/* .viewer-updaby {
      position: absolute;
    } */

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
  height: 706px;
  overflow-y: auto;
}
.scrollable-tab-content >>> .el-form-item {
  margin-bottom: 0px !important;
}
.scrollable-tab-content >>> .el-form-item__content {
  margin-left: 0px !important;
}
.scrollable-tab-content >>> .is-bordered-label {
  width: 160px !important;
}

.scrollable-tab-content >>> .el-textarea__inner {
  border: none;
}
.scrollable-tab-content >>> .el-input__inner {
  border: none;
}
.nuiop {
  height: 90%;
  display: flex;
  overflow: hidden;
  justify-content: space-evenly;
}
.contentk {
  height: 690px;
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
.rpouttr {
  width: 100%;
}
.rpouttr >>> .el-steps {
  height: 20px;
}
.rpouttr >>> .el-step__main {
  white-space: nowrap;
}
.rpouttr >>> .el-steps--simple {
  background-color: #fff;
}
.landCode >>> .el-collapse-item__header {
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
}
.page-header {
  height: 40px;
  width: 100%;
}
.title-text {
  font-size: 16px;
  margin-left: 10px;
}
.image-viewerlo {
  height: 70%;
  width: 30%;
}
.margin-top >>> .el-descriptions__title {
  color: rgb(106, 106, 245);
}

.custom-collapse-item >>> .el-collapse-item__header {
  font-size: 15px; /* 调整字体大小 */
  display: block;
  background: #f5f5f9;
  padding: 0 10px;
  color: #409eff;
}

.customcollapse >>> .el-collapse-item__header {
  color: white;
  font-size: 17px;
  background-color: #409eff !important;
  display: flex;
}
.my-label >>> .el-descriptions-item__label.is-bordered-label {
  background-color: #f3f9ff;
  color: #000;
  font-weight: bold;
  font-size: 13px;
  width: 207px;
}
.my-label >>> .el-descriptions__title {
  color: rgb(64, 158, 255);
  font-size: 14px;
}
.my-label >>> .el-descriptions-item__cell {
  width: 200px;
}
.el-wheader >>> .el-table__header {
  display: none !important;
}
.Header-box {
  width: 100%;
}
.type-success >>> .el-button {
  width: 207px !important;
}
</style>
      