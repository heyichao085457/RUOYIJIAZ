<template>
  <div class="htmlheight">
    <div class="Header-box">
      <el-collapse v-model="activeNames" @change="handlebnsdgb">
        <el-collapse-item class="landCode" name="listlandCode" disabled>
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
            <div class="rpouttr" v-show="activeSteprow">
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
                  style="pointer-events: auto; cursor: pointer"
                  @click.native.prevent="activeCollapse(step.stepName)"
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
            </div>
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
                title="审核信息及定性信息"
                :size="size"
                :column="3"
                border
              >
                <el-descriptions-item :span="1.5">
                  <template slot="label">省级审核结果</template>
                  {{ freckleDatalisto.shengjishjg }}
                </el-descriptions-item>

                <el-descriptions-item :span="1.5">
                  <template slot="label"> 省级审核说明 </template>
                  {{ freckleDatalisto.shengjishsm }}
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label"> 省级退回次数 </template>
                  {{ freckleDatalisto.shengjithcs }}
                </el-descriptions-item>
                <el-descriptions-item :span="3">
                  <template slot="label"> 市级审核结果 </template>
                  {{ freckleDatalisto.shijishjg }}
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label"> 市级审核说明 </template>
                  {{ freckleDatalisto.shijishsm }}
                </el-descriptions-item>
              </el-descriptions>
              <el-descriptions
                class="my-label"
                title="基本信息"
                :size="size"
                :column="3"
                border
              >
                <el-descriptions-item :span="3">
                  <template slot="label"> 图斑编号 </template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.freckleCode }}
                    </div>
                    <el-button type="small">合并地块</el-button>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">地块编号</template>
                  {{ freckleDatalisto.landCode }}
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
                  <template slot="label"> 下发时间 </template>
                  {{ freckleDatalisto.xfsj }}
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label"> 所属行政区 </template>
                  {{ freckleDatalisto.city }},{{ freckleDatalisto.county }}
                </el-descriptions-item>
                <el-descriptions-item :span="3">
                  <template slot="label"> 图斑分类 </template>
                  {{ freckleDatalisto.tbfl }}
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label"> 乡镇街道 </template>
                  {{ freckleDatalisto.township }}
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label"> 村/社区名 </template>
                  {{ freckleDatalisto.village }}
                </el-descriptions-item>
                <el-descriptions-item :span="3">
                  <template slot="label"> 图斑来源 </template>
                  {{ freckleDatalisto.qbtbTbly }}
                </el-descriptions-item>
              </el-descriptions>
              <el-descriptions
                class="my-label"
                title="地块面积信息"
                :size="size"
                :column="3"
                border
              >
                <el-descriptions-item :span="1.5">
                  <template slot="label">农用地面积</template>
                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.nydmj }}
                    </div>
                    <div>亩</div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">耕地面积</template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.gdmj }}
                    </div>
                    <div>亩</div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label"> 永久基本农田面积 </template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.jbntmj }}
                    </div>
                    <div>亩</div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label"> 其中水田面积 </template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.qzstmj }}
                    </div>
                    <div>亩</div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label"> 生态保护红线面积 </template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.stbhhxmj }}
                    </div>
                    <div>亩</div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label"> 实际地块面积 </template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.sjdk }}
                    </div>
                    <div>亩</div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label"> 其中耕地面积 </template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.qzgdmj }}
                    </div>
                    <div>亩</div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label"> 其中基本农田面积 </template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.qzjbntmj }}
                    </div>
                    <div>亩</div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label"> 水田面积 </template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.stmj }}
                    </div>
                    <div>亩</div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label"> 建设用地面积 </template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.jsydmj }}
                    </div>
                    <div>亩</div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label"> 未利用地面积 </template>

                  <div style="display: flex; justify-content: space-between">
                    <div>
                      {{ freckleDatalisto.wlydm }}
                    </div>
                    <div>亩</div>
                  </div>
                </el-descriptions-item>
              </el-descriptions>
              <el-descriptions
                class="my-label"
                title="外业及集中举证信息"
                :size="size"
                :column="3"
                border
              >
                <el-descriptions-item :span="1.5">
                  <template slot="label"> 地块外业核查记录 </template>

                  {{ freckleDatalisto.dkwyhcjl }}
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">图斑外业核查记录</template>

                  {{ freckleDatalisto.tbwyhcjl }}
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">核查批次及时间</template>

                  {{ freckleDatalisto.hcpcjsj }}
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">核查任务</template>

                  {{ freckleDatalisto.hcrwwjjName }}
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">图斑核查阶段</template>

                  {{ freckleDatalisto.tbhcjd }}
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">省级预审意见</template>

                  {{ freckleDatalisto.sjysyj }}
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">核查后类型</template>

                  {{ freckleDatalisto.qbtbHchpdlx }}
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">违法面积</template>

                  {{ freckleDatalisto.wfmj }}
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">违法耕地面积</template>

                  {{ freckleDatalisto.wfgdmj }}
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">违法基本农田面积</template>

                  {{ freckleDatalisto.wfjbntmj }}
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">调查人</template>

                  {{ freckleDatalisto.dcr }}
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">举证人员</template>

                  {{ freckleDatalisto.jzry }}
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">是否问题图斑</template>

                  {{ freckleDatalisto.sfwttb }}
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">是否纳入违法计算</template>

                  {{ freckleDatalisto.qbtbSfnrwfjs }}
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">销号状态</template>

                  {{ freckleDatalisto.cancelStatus }}
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">最终判定类型</template>

                  {{ freckleDatalisto.qbtbZzpdlx }}
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">是否外业核查</template>

                  {{ freckleDatalisto.sfwyhc }}
                </el-descriptions-item>
                <el-descriptions-item :span="1.5">
                  <template slot="label">内业审核问题类型</template>

                  {{ freckleDatalisto.neshwtlx }}
                </el-descriptions-item>
              </el-descriptions>
              <el-descriptions
                class="my-label"
                title="填报信息"
                :size="size"
                :column="3"
                border
              >
                <el-descriptions-item :span="3">
                  <template slot="label"> 判定类型 </template>
                  <el-radio v-model="computedRadio" label="1">合法</el-radio>
                  <el-radio v-model="computedRadio" label="2">违法</el-radio>
                  <el-radio v-model="computedRadio" label="3">其他</el-radio>
                </el-descriptions-item>

                <template v-if="computedRadio === '1'">
                  <el-descriptions-item :span="3" class="flex-layout">
                    <template slot="label">具体情形</template>

                    <div style="display: flex; justify-content: space-between">
                      <div style="width: 50%">
                        {{ freckleDatalisto.hfjtqx }}
                      </div>

                      <div style="width: 50%">
                        {{ freckleDatalisto.qtjtlx }}
                      </div>
                    </div>
                  </el-descriptions-item>
                  <el-descriptions-item :span="3">
                    <template slot="label">合法用地实际用途</template>
                    {{ freckleDatalisto.hfsjyt }}
                  </el-descriptions-item>
                  <el-descriptions-item :span="3">
                    <template slot="label">判断依据说明</template>
                    {{ freckleDatalisto.hfpdyjsm }}
                  </el-descriptions-item>
                </template>

                <template v-if="computedRadio === '2'">
                  <el-descriptions-item :span="3">
                    <template slot="label">违法类型</template>

                    <div style="display: flex; justify-content: space-between">
                      <div style="width: 30%; border-right: 2px solid #ccc">
                        {{ freckleDatalisto.wflx1 }}
                      </div>

                      <div style="width: 30%; border-right: 2px solid #ccc">
                        {{ freckleDatalisto.wflx2 }}
                      </div>
                      <div style="width: 30%">
                        {{ freckleDatalisto.wflx3 }}
                      </div>
                    </div>
                  </el-descriptions-item>

                  <el-descriptions-item :span="3">
                    <template slot="label"></template>
                    {{ freckleDatalisto.wflx4 }}
                  </el-descriptions-item>
                  <el-descriptions-item :span="1.5">
                    <template slot="label">是否新增乱耕地建房</template>
                    <el-radio v-model="utedRadio" label="1">是</el-radio>
                    <el-radio v-model="utedRadio" label="2">否</el-radio>
                  </el-descriptions-item>
                  <el-descriptions-item :span="1.5">
                    <template slot="label">是否挖湖造景</template>
                    <el-radio v-model="sutedRadio" label="1">是</el-radio>
                    <el-radio v-model="sutedRadio" label="2">否</el-radio>
                  </el-descriptions-item>
                  <el-descriptions-item :span="3">
                    <template slot="label">实际用途</template>
                    {{ freckleDatalisto.wfsjyt }}
                  </el-descriptions-item>
                  <el-descriptions-item :span="3">
                    <template slot="label">判定依据说明</template>
                    {{ freckleDatalisto.wfpdyjsm }}
                  </el-descriptions-item>
                </template>

                <template v-if="computedRadio === '3'">
                  <el-descriptions-item :span="3">
                    <template slot="label">具体情形</template>
                    <div style="display: flex; justify-content: space-between">
                      <div style="width: 40%; border-right: 2px solid #ccc">
                        {{ freckleDatalisto.qtjtqx }}
                      </div>

                      <div style="width: 40%">
                        {{ freckleDatalisto.qtjtlx }}
                      </div>
                    </div>
                  </el-descriptions-item>
                  <el-descriptions-item :span="3">
                    <template slot="label">判定依据说明</template>
                    {{ freckleDatalisto.qtpdyjsm }}
                  </el-descriptions-item>
                  <el-descriptions-item :span="3">
                    <template slot="label">图斑判定附件</template>

                    <el-table
                      :data="fjgldata"
                      style="width: 100%"
                      class="el-wheader"
                    >
                      <el-table-column align="center" type="index">
                      </el-table-column>
                      <el-table-column prop="uploadBy" align="center">
                      </el-table-column>
                      <el-table-column prop="annexName" align="center">
                      </el-table-column>
                      <el-table-column prop="uploadtime" align="center">
                      </el-table-column>
                      <el-table-column fixed="right" width="100">
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
                  </el-descriptions-item>
                </template>
              </el-descriptions>
              <el-descriptions
                class="my-label"
                title="省级合法性判定"
                :size="size"
                :column="3"
                border
              >
                <el-descriptions-item :span="3">
                  <template slot="label"> 省级合法性判定 </template>
                  <el-radio v-model="computedRadio3" label="1">合法</el-radio>
                  <el-radio v-model="computedRadio3" label="2">违法</el-radio>
                  <el-radio v-model="computedRadio3" label="3">其他</el-radio>
                </el-descriptions-item>

                <template v-if="computedRadio === '1' || computedRadio === '3'">
                  <el-descriptions-item :span="3">
                    <template slot="label">省级定性性质说明</template>
                    {{ freckleDatalisto.shengjidxsm }}
                  </el-descriptions-item>
                  <el-descriptions-item :span="1.5">
                    <template slot="label">省级定性人</template>
                    {{ freckleDatalisto.shengjidxr }}
                  </el-descriptions-item>
                  <el-descriptions-item :span="1.5">
                    <template slot="label">省级定性时间</template>
                    {{ freckleDatalisto.shengjidxsj }}
                  </el-descriptions-item>
                </template>

                <template v-if="computedRadio === '2'">
                  <el-descriptions-item :span="3">
                    <template slot="省级定性性质说明">具体情形</template>
                    {{ freckleDatalisto.sjdxxzsm }}
                  </el-descriptions-item>
                  <el-descriptions-item :span="1.5">
                    <template slot="label">省级定性人</template>
                    {{ freckleDatalisto.sjdxr }}
                  </el-descriptions-item>
                  <el-descriptions-item :span="1.5">
                    <template slot="label">省级定性时间</template>
                    {{ freckleDatalisto.sjdxsj }}
                  </el-descriptions-item>
                </template>
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
              <el-collapse v-model="activeNamestwo" @change="handleChange">
                <el-collapse-item
                  title="用户级别"
                  class="custom-collapse-item"
                  name="1"
                >
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

                  <div class="viewer-right" v-if="showviewer">
                    <el-image-viewer
                      :on-close="closeviewer"
                      :url-list="urlList"
                      :on-switch="handleImageChange"
                      :initial-index="initialIndex"
                      :style="{
                        position: 'absolute',
                        width: isSidebarOpened ? '42%' : '46%',
                        height: '78%',
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
              <el-collapse v-model="activeNamesthree" @change="handleChange">
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
          <!-- <el-tab-pane label="生命周期" name="four" @tab-click="handleClick">
              <div class="scrollable-tab-content">
                <el-collapse v-model="actList">
                  <el-collapse-item
                    class="custom-collapse-item"
                    title="县级已审核"
                    name="1"
                  >
                    <div style="width: 100%" class="tabListname">
                      <template>
                        <el-table :data="tabList" style="width: 100%">
                          <el-table-column prop="city" label="市名称" width="100">
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
                    title="市级已审核"
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
                    title="省级已审核"
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
                    title="百亩大图斑"
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
                          <el-table-column prop="hcr" label="核查人" width="110">
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
                    title="互联网+"
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
                    title="外业核查"
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
                    title="集中举证"
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
                  <el-collapse-item
                    title="平台销号"
                    name="7"
                    class="custom-collapse-item"
                  >
                    <div style="width: 100%" class="tabListname">
                      <template>
                        <el-table :data="pingtxiao" style="width: 100%">
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
                  <el-form-item prop="wyhcsm">
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

                <el-descriptions-item :span="1.5">
                  <template slot="label">提交</template>
                  <div class="type-success" v-if="permissions['提交'] === 0">
                    <el-button type="success" @click="submitFormtj"
                      >提交</el-button
                    >
                  </div>
                </el-descriptions-item>
              </el-descriptions>
            </el-form>
            <el-button
              type="primary"
              class="primarylistshow"
              @click="primaryshow()"
              plain
              >上传</el-button
            >
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

    <!-- 
  
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
      </div> -->
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
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
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
  </div>
</template>
    
    <script>
import Map from "../mapTwo.vue";
import { loadMap, loadPhotoMap, MapInit } from "../../api/map/loadMap";

import {
  freckleCode,
  smzq2022,
  pictureList2022,
  updateAnnexInfo,
  rhtzByFreckleCode2022,
  jzjzupdate,
  DropdownBoXContent,
  hcrwlist2024,
  specialAnnexupload,
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
      itemLiop: [],
      tabListtwolisttwo: [],
      tabListtwolist: [],
      tabListwan: [],
      tabListtwo: [],
      tabList: [],
      tabListtbbh: [],
      SpecklePattern: [],
      pingtxiao: [],
      opvalue: [],
      opvaluehcrwName: [],
      cancelte: "",
      formDatarw: {
        nyshsm: "",
        hcrwwjjName: "",
        xcsftgjzcl: "",
        dw: "",
        jzr: "",
        wxhyy: "",
        xhyy: "",
        xhr: "",
        xhzt: "",
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
      },
      rulester: {
        wyhcsm: [
          { required: true, message: "请输入外业核查说明", trigger: "blur" },
        ],
        wtlx: [{ required: true, message: "请输入问题类型", trigger: "blur" }],
        wfmj: [{ required: true, message: "请输入违法面积", trigger: "blur" }],
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
        cancelStatus: [
          { required: true, message: "请选择销号状态", trigger: "change" },
        ],
        cancelBy: [
          { required: true, message: "请输入销号人", trigger: "blur" },
        ],
        cancelReason: [
          { required: true, message: "请输入销号原因", trigger: "blur" },
        ],
        noCancelReason: [
          { required: true, message: "请输入未销号原因", trigger: "blur" },
        ],
        cancelte: [
          { required: true, message: "请选择销号时间", trigger: "change" },
        ],
        jzr: [{ required: true, message: "请输入举证人", trigger: "blur" }],
        dw: [{ required: true, message: "请输入单位", trigger: "blur" }],
        xcsftgjzcl: [
          {
            required: true,
            message: "请输入现场是否提供举证材料",
            trigger: "blur",
          },
        ],
        hchlx: [
          { required: true, message: "请选择核查后类型", trigger: "change" },
        ],
        hcrwName: [
          { required: true, message: "请输入核查工作名称", trigger: "blur" },
        ],
        hcrwwjjName: [
          { required: true, message: "请选择核查任务", trigger: "change" },
        ],
        nyshsm: [
          { required: true, message: "请输入内业审核说明", trigger: "blur" },
        ],
      },
      fjgldata: [],
      freckleDatalisto: {},
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
      activeSteprow: true,
      responseData: {},

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
      activeNames: ["", "wan"],
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
    this.id = this.$route.query.id;
    this.landCode = this.$route.query.landCode;
    this.freckleCode = this.$route.query.tbbh;
    this.listrow = this.$route.query.listrow;
    document.querySelector(".right-column").style.overflow = "hidden";
    this.listrowl();
    this.tbxfs();
    this.freckleCod();
    this.rhtzByFreckl();
    this.picture();
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
    handleDateChange(date) {
      if (date) {
        const formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
        this.formDatarw.cancelDate = formattedDate;
      } else {
        this.formDatarw.cancelDate = "";
      }
    },
    tdwpWjjListt() {
      hcrwlist2024().then((ok) => {
        this.opvaluehcrwName = [];
        ok.data.forEach((item) => {
          this.opvaluehcrwName.push({ value: item.hcrwmc, label: item.hcrwmc });
        });
      });
    },
    activeCollapse() {
      this.activeName = "four";
    },
    submitFormtj() {
      this.$refs.formDatarw.validate((valid) => {
        if (valid) {
          this.formDatarw.landCode = this.landCode;
          this.jzjzupdat(this.formDatarw);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    jzjzupdat(formDatarw) {
      jzjzupdate(formDatarw).then((ok) => {
        // console.log(ok);
        if (ok.code == 200) {
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
      pictureList2022(params).then((res) => {
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
    },

    rhtzByFreckl() {
      let params = {
        freckleCode: this.freckleCode,
      };
      rhtzByFreckleCode2022(params).then((ok) => {
        this.freckleDatalisto = ok.data.融合台账;
        this.formDatarw.id = ok.data.集中举证.id;
        this.formDatarw.nyshsm = ok.data.集中举证.nyshsm;
        this.formDatarw.wfjbntmj = ok.data.集中举证.wfjbntmj;
        this.formDatarw.hcrwwjjName = ok.data.集中举证.hcrwwjjName;
        this.formDatarw.xcsftgjzcl = ok.data.集中举证.xcsftgjzcl;
        this.formDatarw.dw = ok.data.集中举证.dw;
        this.formDatarw.jzr = ok.data.集中举证.jzr;
        this.formDatarw.noCancelReason = ok.data.集中举证.noCancelReason;
        this.formDatarw.cancelReason = ok.data.集中举证.cancelReason;
        this.formDatarw.cancelBy = ok.data.集中举证.cancelBy;
        this.formDatarw.cancelStatus = ok.data.集中举证.cancelStatus;
        this.formDatarw.xhlx = ok.data.集中举证.xhlx;
        this.formDatarw.hchlx = ok.data.集中举证.jzjzHchlx;
        this.formDatarw.wtlx = ok.data.集中举证.wtlx;
        this.formDatarw.wfgdmj = ok.data.集中举证.wfgdmj;
        this.formDatarw.wfmj = ok.data.集中举证.wfmj;
        this.formDatarw.wyhcsm = ok.data.集中举证.wyhcsm;
        this.formDatarw.landCode = ok.data.集中举证.landCode;
        this.formDatarw.hcrwName = ok.data.集中举证.hcrwName;
        this.formDatarw.wfzl = ok.data.集中举证.wfzl;
        this.cancelte = ok.data.集中举证.cancelDate;
        // console.log(this.freckleDatalisto, " this.freckleDatalisto");
      });
    },
    formatText(text) {
      return text && text.length > 9 ? text.substring(0, 9) + "..." : text;
    },
    freckleCod() {
      let params = {
        freckleCode: this.listrow,
      };

      freckleCode(params).then((ok) => {
        this.filteredData = ok.data;
      });
    },
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
    listrowl() {
      DropdownBoXContent().then((ok) => {
        ok.data.HCHLX.forEach((ele) => {
          this.opvalue.push({ value: ele, label: ele });
        });
        ok.data.XHZT.forEach((ele) => {
          this.itemLiop.push({ value: ele, label: ele });
        });
      });
      let params = {
        freckleCode: this.freckleCode,
      };
      smzq2022(params).then((ok) => {
        let stepObj = [
          { stepName: "县级已填报", stepType: "xjytb" },
          { stepName: "市级已审核", stepType: "sjysh" },
          { stepName: "省级已审核", stepType: "sjyshbtg" },
          { stepName: "百亩大图斑", stepType: "bmdtb" },
          { stepName: "互联网+", stepType: "hlw" },
          { stepName: "外业核查", stepType: "wyhc" },
          { stepName: "集中举证", stepType: "jzjz" },
          { stepName: "平台销号", stepType: "yxh" },
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
            if (
              this.jdmcp &&
              this.jdmcp.length > 0 &&
              item.stepName === this.jdmcp[0].jdmc
            ) {
              this.activeStep = stepObj.indexOf(item) + 1;
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
          params.append("landCode", this.landCode);
          params.append("customAnnexName", this.ruleForm.textarea1);
          params.append("annexExplain", this.ruleForm.textarea2);
          specialAnnexupload(params).then((res) => {
            if (res.code == 200) {
              this.picture();
              this.fileList = [];
              this.textarea1 = "";
              this.textarea2 = "";
              this.centerDialogVisible = false;
              this.$message({
                message: "上传成功",
                type: "success",
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
      console.log(itm.picUrl);
      this.activeName = "second";
      this.urlList = [];
      this.imgshou.forEach((m, n) => {
        this.urlList.push(m.picUrl);
      });
      this.perviewBottom = itm;
      this.showviewer = true;
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
    close(event) {
      event.stopPropagation();
      this.$router.back();
    },
    handlebnsdgb(val) {
      if (val.includes("listlandCode")) {
        this.$nextTick(() => {
          this.activeNames = this.activeNames.filter(
            (name) => name !== "listlandCode"
          );
        });
      }
    },
    // handlebnsdgb(newActiveNames) {
    //   if (newActiveNames.includes("listlandCode")) {
    //     this.$nextTick(() => {
    //       const index = this.activeNames.indexOf("listlandCode");
    //       if (index > -1) {
    //         this.activeNames.splice(index, 1);
    //       }
    //     });
    //   }
    // },
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
    handleChange() {},
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
  height: 750px;
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
    