<template>
  <div class="container" v-loading="loadinger">
    <div class="top-left">
      <div @click="handlehomeClick()">首页</div>
      <div @click="handletixtClick()">下一页</div>
    </div>
    <img src="../../../public/img/title.png" class="titleBg" />
    <div class="bottonlist"><div class="botton"></div></div>
    <el-container style="height: 100%">
      <el-aside width="25%" v-show="showComponent === 'home'">
        <div class="right1">
          <div class="title"><div class="titleText">全省指标</div></div>
          <div class="body">
            <el-row :style="{ height: '100%', width: '100%', padding: '10px' }">
              <el-col :span="12" :style="{ height: '100%' }">
                <div class="right1_image_text">
                  <div
                    :style="{
                      textAlign: 'center',
                      width: '100%',
                      paddingTop: '50px',
                      color: '#65C3FF',
                      fontSize: '14px',
                    }"
                  >
                    下发图斑(个)
                  </div>
                  <div
                    :style="{
                      textAlign: 'center',
                      width: '100%',
                      marginTop: '30px',
                      fontFamily: 'wpzf',
                      fontSize: '21px',
                    }"
                    v-if="data != null"
                  >
                    {{ data.左侧.左上[0].xfsl }}
                  </div>
                </div>
                <div class="right1_image"></div>
              </el-col>
              <el-col
                :span="12"
                :style="{ height: '100%', marginTop: '1.5vh' }"
              >
                <el-row
                  type="flex"
                  :style="{
                    height: '30%',
                    width: '100%',
                    padding: '10px',
                    marginLeft: '30px',
                  }"
                >
                  <div class="right1_image1_bg"></div>
                  <img
                    src="../../../public/img/icon3.png"
                    class="right1_image1"
                  />
                  <div :style="{ marginLeft: '20px' }">
                    <div
                      :style="{
                        marginTop: '10px',
                        color: '#03F8D8',
                        fontSize: '12px',
                      }"
                    >
                      填报进度
                    </div>
                    <div
                      :style="{ marginTop: '25px', fontFamily: 'wpzf' }"
                      v-if="data != null"
                    >
                      {{ data.左侧.左上[0].tbjd + "%" }}
                    </div>
                  </div>
                </el-row>
                <el-row
                  type="flex"
                  :style="{
                    height: '30%',
                    width: '100%',
                    padding: '10px',
                    marginLeft: '30px',
                  }"
                >
                  <div class="right1_image1_bg"></div>
                  <img
                    src="../../../public/img/icon3.png"
                    class="right1_image1"
                  />
                  <div :style="{ marginLeft: '20px' }">
                    <div
                      :style="{
                        marginTop: '10px',
                        color: '#03F8D8',
                        fontSize: '12px',
                      }"
                    >
                      违法耕地面积(亩)
                    </div>
                    <div
                      :style="{ marginTop: '25px', fontFamily: 'wpzf' }"
                      v-if="data != null"
                    >
                      {{ data.左侧.左上[0].wfgdmj }}
                    </div>
                  </div>
                </el-row>

                <el-row
                  type="flex"
                  :style="{
                    height: '30%',
                    width: '100%',
                    padding: '10px',
                    marginLeft: '30px',
                  }"
                >
                  <div class="right1_image1_bg"></div>
                  <img
                    src="../../../public/img/icon3.png"
                    class="right1_image1"
                  />

                  <div :style="{ marginLeft: '20px' }">
                    <div
                      :style="{
                        marginTop: '10px',
                        color: '#03F8D8',
                        fontSize: '12px',
                      }"
                    >
                      违法比例
                    </div>
                    <div
                      :style="{ marginTop: '25px', fontFamily: 'wpzf' }"
                      v-if="data != null"
                    >
                      {{ data.左侧.左上[0].xtwfbi + "%" }}
                    </div>
                  </div>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="right2">
          <div class="title">
            <div class="titleText" :style="{ float: 'left' }">各市情况</div>
            <el-tabs
              v-model="activeName1"
              @tab-click="handleClick1"
              :style="{ fontFamily: 'none', float: 'right', marginTop: '8px' }"
            >
              <el-tab-pane label="下发图斑" name="1"></el-tab-pane>
              <el-tab-pane label="填报进度" name="2"></el-tab-pane>
              <el-tab-pane label="违法面积" name="3"></el-tab-pane>
              <el-tab-pane label="违法比列" name="4"></el-tab-pane>
            </el-tabs>
          </div>
          <div class="body">
            <div
              ref="echart1"
              :style="{ width: '100%', height: '100%', margin: '10px' }"
            ></div>
          </div>
        </div>
        <div class="right3">
          <div class="title">
            <div class="titleText" :style="{ float: 'left' }">Top20的县</div>
            <el-tabs
              v-model="activeName2"
              @tab-click="handleClick2"
              :style="{ fontFamily: 'none', float: 'right', marginTop: '8px' }"
            >
              <el-tab-pane label="下发图斑" name="1"></el-tab-pane>
              <el-tab-pane label="填报进度" name="2"></el-tab-pane>
              <el-tab-pane label="违法面积" name="3"></el-tab-pane>
              <el-tab-pane label="违法比列" name="4"></el-tab-pane>
            </el-tabs>
          </div>
          <div class="body">
            <el-date-picker
              v-model="valuetime"
              class="year"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="handleDateChange"
              :picker-options="datePickerOptions"
            >
            </el-date-picker>
            <div
              ref="echart2"
              :style="{ width: '100%', height: '100%', margin: '10px' }"
            ></div>
          </div>
        </div>
      </el-aside>
      <el-main v-show="showComponent === 'home'">
        <img class="map_bg" src="../../../public/img/bg_1.png" />
        <div ref="echart" class="map"></div>

        <div style="margin-left: 69px" class="el-prow">
          <el-row :style="{ width: '100%' }" class="eloppoe">
            <el-col :span="6"
              ><el-button
                type="text"
                :class="[selectTime == '1' ? 'bt2' : 'bt1']"
                @click="getData('1')"
                >2022年</el-button
              ></el-col
            >
            <el-col :span="6"
              ><el-button
                type="text"
                :class="[selectTime == '2' ? 'bt2' : 'bt1']"
                @click="getData('2')"
                >2023年</el-button
              ></el-col
            >
            <el-col :span="6"
              ><el-button
                type="text"
                :class="[selectTime == '3' ? 'bt2' : 'bt1']"
                @click="getData('3')"
                >2024年</el-button
              ></el-col
            >
            <!-- <el-col :span="6"
              ><el-button
                :class="[selectTime == '4' ? 'bt2' : 'bt1']"
                type="text"
                @click="getData('4')"
                >全年</el-button
              ></el-col
            > -->
          </el-row>
        </div>
      </el-main>
      <el-aside
        v-show="showComponent === 'home'"
        width="25%"
        :style="{ marginRight: '63px' }"
      >
        <div class="right1">
          <div class="title"><div class="titleText">全省指标</div></div>
          <div class="body">
            <el-row :style="{ height: '100%', width: '100%', padding: '10px' }">
              <el-col :span="12" :style="{ height: '100%' }">
                <div class="right1_image_text">
                  <div
                    :style="{
                      textAlign: 'center',
                      width: '100%',
                      paddingTop: '50px',
                      color: '#FF9896',
                      fontSize: '14px',
                    }"
                  >
                    问题图斑数量(个)
                  </div>
                  <div
                    :style="{
                      textAlign: 'center',
                      width: '100%',
                      marginTop: '30px',
                      fontFamily: 'wpzf',
                      fontSize: '21px',
                    }"
                    v-if="data != null"
                  >
                    {{ data.右侧.右上[0].wttb }}
                  </div>
                </div>
                <div class="left1_image"></div>
              </el-col>
              <el-col
                :span="12"
                :style="{ height: '100%', marginTop: '1.5vh' }"
              >
                <el-row
                  type="flex"
                  :style="{
                    height: '30%',
                    width: '100%',
                    padding: '10px',
                    marginLeft: '30px',
                  }"
                >
                  <div class="right1_image1_bg_1"></div>
                  <img
                    src="../../../public/img/icon4.png"
                    class="right1_image1"
                  />
                  <div :style="{ marginLeft: '20px' }">
                    <div
                      :style="{
                        marginTop: '10px',
                        color: '#FFE696',
                        fontSize: '12px',
                      }"
                    >
                      地块面积(亩)
                    </div>
                    <div
                      :style="{ marginTop: '25px', fontFamily: 'wpzf' }"
                      v-if="data != null"
                    >
                      {{ data.右侧.右上[0].dkmj }}
                    </div>
                  </div>
                </el-row>
                <el-row
                  type="flex"
                  :style="{
                    height: '30%',
                    width: '100%',
                    padding: '10px',
                    marginLeft: '30px',
                  }"
                >
                  <div class="right1_image1_bg_1"></div>
                  <img
                    src="../../../public/img/icon4.png"
                    class="right1_image1"
                  />
                  <div :style="{ marginLeft: '20px' }">
                    <div
                      :style="{
                        marginTop: '10px',
                        color: '#FFE696',
                        fontSize: '12px',
                      }"
                    >
                      耕地面积(亩)
                    </div>
                    <div
                      :style="{ marginTop: '25px', fontFamily: 'wpzf' }"
                      v-if="data != null"
                    >
                      {{ data.右侧.右上[0].gdmj }}
                    </div>
                  </div>
                </el-row>

                <el-row
                  type="flex"
                  :style="{
                    height: '30%',
                    width: '100%',
                    padding: '10px',
                    marginLeft: '30px',
                  }"
                >
                  <div class="right1_image1_bg_1"></div>
                  <img
                    src="../../../public/img/icon4.png"
                    class="right1_image1"
                  />
                  <div :style="{ marginLeft: '20px' }">
                    <div
                      :style="{
                        marginTop: '10px',
                        color: '#FFE696',
                        fontSize: '12px',
                      }"
                    >
                      基本农田面积(亩)
                    </div>
                    <div
                      :style="{ marginTop: '25px', fontFamily: 'wpzf' }"
                      v-if="data != null"
                    >
                      {{ data.右侧.右上[0].jbntmj }}
                    </div>
                  </div>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="right2">
          <div class="title">
            <div class="titleText" :style="{ float: 'left' }">各市情况</div>
            <el-tabs
              v-model="activeName3"
              @tab-click="handleClick3"
              :style="{ fontFamily: 'none', float: 'right', marginTop: '8px' }"
            >
              <el-tab-pane label="永久基本农田面积" name="1"></el-tab-pane>
              <el-tab-pane label="问题图斑数量" name="2"></el-tab-pane>
              <el-tab-pane label="图斑面积" name="3"></el-tab-pane>
              <el-tab-pane label="耕地面积" name="4"></el-tab-pane>
            </el-tabs>
          </div>
          <div class="body">
            <div
              ref="echart3"
              :style="{ width: '100%', height: '100%', margin: '10px' }"
            ></div>
          </div>
        </div>
        <div class="right3">
          <div class="title">
            <div class="titleText" :style="{ float: 'left' }">Top20的县</div>
            <el-tabs
              v-model="activeName4"
              @tab-click="handleClick4"
              :style="{ fontFamily: 'none', float: 'right', marginTop: '8px' }"
            >
              <el-tab-pane label="基本农田面积" name="1"></el-tab-pane>
              <el-tab-pane label="问题图斑数量" name="2"></el-tab-pane>
              <el-tab-pane label="图斑面积" name="3"></el-tab-pane>
              <el-tab-pane label="耕地面积" name="4"></el-tab-pane>
            </el-tabs>
          </div>
          <div class="body">
            <div
              ref="echart4"
              :style="{ width: '100%', height: '100%', margin: '10px' }"
            ></div>
          </div>
        </div>
      </el-aside>
      <div v-show="showComponent === 'next'" class="conliuyt">
        <div class="conlkj">
          <div class="containerliet">
            <div class="button-group">
              <button
                v-for="month in months"
                @click="monteron(month)"
                :key="month"
              >
                {{ month }}
              </button>
            </div>

            <div class="date-picker">
              <el-date-picker
                v-model="timeData"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="handleDateChangee"
              >
              </el-date-picker>
            </div>
          </div>

          <div class="conterop">
            <div class="collpot">
              <button
                v-for="region in regions"
                @click="regionson(region)"
                :key="region"
              >
                {{ region }}
              </button>
            </div>
          </div>
          <div class="dashboard-container">
            <div
              v-for="(card, index) in cards"
              :key="index"
              class="dashboard-card"
            >
              <div class="dashboard-neme">{{ card.title }}</div>
              <div class="card-item">
                <span>{{ card.items[0].remarks }}</span>
                <span>{{
                  card.items[0].tbjd || card.items[0].tbsl || card.items[0].xftb
                }}</span>
              </div>
              <div class="card-item">
                <span>{{ card.items[0].remarks1 }}</span>
                <span>{{
                  card.items[0].shjd ||
                  card.items[0].gdmj ||
                  card.items[0].jsydmj ||
                  card.items[0].jcmj
                }}</span>
              </div>
              <div class="card-item">
                <span>{{ card.items[0].remarks2 }}</span>
                <span>{{
                  card.items[0].tbhshjd ||
                  card.items[0].jbntmj ||
                  card.items[0].gdmj
                }}</span>
              </div>
            </div>
          </div>
          <div class="dispouy">
            <div class="toterty">
              <div class="chart-container">
                <div class="chart-title">地块数量比例</div>
                <div class="chart-content">
                  <dv-capsule-chart
                    :config="config"
                    style="width: 300px; height: 140px"
                  />
                </div>
              </div>
              <div class="chart-container">
                <div class="chart-title">监测面积比例</div>
                <div class="chart-content">
                  <dv-capsule-chart
                    :config="config1"
                    style="width: 300px; height: 140px"
                  />
                </div>
              </div>
              <div class="chart-container">
                <div class="chart-title">耕地面积比例</div>
                <div class="chart-content">
                  <dv-capsule-chart
                    :config="config2"
                    style="width: 300px; height: 140px"
                  />
                </div>
              </div>
            </div>
            <div class="left-e">
              <div class="left-top-op">问题图斑情况</div>
              <div class="shang">
                <div class="container-oppo">
                  <div
                    v-for="(item, index) in itemstecr"
                    :key="index"
                    :class="['quantity', { active: activeIndex === index }]"
                    @click="setActive(index, item)"
                  >
                    {{ item }}
                  </div>
                </div>
                <div class="shang1" ref="container">
                  <dv-conical-column-chart
                    :key="chartKey"
                    :config="config5"
                    style="width: 100%; height: 190px"
                  />
                </div>
              </div>
              <div class="xia">
                <echartster></echartster>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
import * as echarts from "echarts";
import echartster from "./echatrt.vue";
import "../../../public/font/fonts.css";
import { szdpTwocount, count } from "../../api/document/index";
import { EventBus } from "../Dataupload/eventBus";
import moment from "moment";
export default {
  components: {
    echartster,
  },
  data() {
    return {
      loadinger: false,
      chartKey: 0,
      activeIndex: 0,
      activeItem: "数量",
      config: {
        data: [],
        colors: ["#e062ae", "#fb7293", "#e690d1", "#32c5e9", "#96bfff"],

        showValue: true,
      },
      config1: {
        data: [],
        colors: ["#e062ae", "#fb7293", "#e690d1", "#32c5e9", "#96bfff"],

        showValue: true,
      },
      config2: {
        data: [],
        colors: ["#e062ae", "#fb7293", "#e690d1", "#32c5e9", "#96bfff"],

        showValue: true,
      },
      config5: {
        data: [],
        showValue: true,
      },
      itemstecr: [
        "数量",
        "数量比例",
        "涉嫌面积",
        "涉嫌面积比例",
        "耕地面积",
        "耕地面积比例",
      ],
      tstartDate: "",
      nendDate: "",
      cards: [],
      months: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ],
      regions: [
        "西安市",
        "铜川市",
        "宝鸡市",
        "咸阳市",
        "渭南市",
        "延安市",
        "汉中市",
        "榆林市",
        "安康市",
        "商洛市",
        "韩城市",
        "杨凌区",
        "西咸新区",
      ],
      showComponent: "home",
      rhtz2024Info: {
        startDate: "",
        endDate: "",
        year: "",
      },
      year: "2023-01",
      timeData: "2024-01-01",
      valuetime: "2024-02-29",
      echart1: { echart: null, option: null, timeOut: null, number: 0 },
      echart2: { echart: null, option: null, timeOut: null, number: 0 },
      echart3: { echart: null, option: null, timeOut: null, number: 0 },
      echart4: { echart: null, option: null, timeOut: null, number: 0 },
      xftb: 0,
      wttb: 0,
      citys: [
        "西安市",
        "延安市",
        "咸阳市",
        "铜川市",
        "渭南市",
        "商洛市",
        "安康市",
        "汉中市",
        "宝鸡市",
      ],
      cardsert1: [],
      cardsert2: [],
      cardsert3: [],
      timer: null,
      selectTime: "1",
      activeName1: "1",
      activeName2: "1",
      activeName3: "1",
      activeName4: "1",
      echart: null,
      option: null,
      dataUrl: require("../../../public/config/shanxi.json"),
      map: require("../../../public/img/map.png"),
      data: null,
      dataAll: null,
      blueItem: {
        type: "linear",
        colorStops: [
          {
            offset: 0,
            color: "#0065C3FF", // 0% 处的颜色
          },
          {
            offset: 1,
            color: "#65C3FF", // 100% 处的颜色
          },
        ],
      },
      blueItemRight: {
        type: "linear",
        colorStops: [
          {
            offset: 0,
            color: "#00FFE696", // 0% 处的颜色
          },
          {
            offset: 1,
            color: "#FFE696", // 100% 处的颜色
          },
        ],
      },
      processedData3: [],
      akop: [],
      itemko: "",
      tmonth: "",
      tcity: "",
    };
  },
  computed: {
    datePickerOptions() {
      const year = Number(this.rhtz2024Info.year); // 确保是数字类型
      return {
        disabledDate(time) {
          const yearOfDate = time.getFullYear();
          return yearOfDate !== year; // 如果年份不匹配，则禁用该日期
        },
      };
    },
  },
  mounted() {
    this.year =
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 0).toString().padStart(2, "0");
    console.info(new Date().getFullYear);
    this.myEcharts();
    this.selectData();
    this.$nextTick(() => {
      this.addResizeListener();
    });

    this.szdpTwo();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  watch: {
    // 监视 `data` 属性的变化
    data: function (newVal, oldVal) {
      if (newVal !== null) {
        this.handleClick1();
        this.handleClick2();
        this.handleClick3();
        this.handleClick4();
      }
    },
    rhtz2024Info: {
      handler(newVal, oldVal) {
        this.selectData();
      },
      deep: true,
    },
  },
  methods: {
    monteron(item) {
      this.tmonth = item;
      this.szdpTwo(item);
    },
    regionson(item) {
      this.tcity = item;
      this.szdpTwo(item);
    },
    handleResize() {
      this.$nextTick(() => {
        this.chartKey += 1; // 更新 key 值以强制刷新组件
      });
    },
    addResizeListener() {
      this.resizeObserver = new ResizeObserver(this.handleResize);
      this.resizeObserver.observe(this.$refs.container);
    },
    removeResizeListener() {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }
    },
    handleDateChangee(dates) {
      if (Array.isArray(dates) && dates.length > 0) {
        const formattedDates = dates.map((date) =>
          moment(date).format("YYYY-MM-DD")
        );
        this.tstartDate = formattedDates[0];
        this.nendDate = formattedDates[1];
        this.szdpTwo();
      } else {
        this.tstartDate = "";
        this.nendDate = "";
      }
    },
    setActive(index, item) {
      this.itemko = item;
      EventBus.$emit("dataEvent", {
        item: this.itemko,
        cardsert3: this.cardsert3,
      });
      this.activeIndex = index;
      let cardsert3 = this.cardsert3[item];

      let Datashul = [
        {
          value: parseFloat(cardsert3.hcjgczjy),
          name: "处置建议",
        },
        {
          value: parseFloat(cardsert3.sfbcdw),
          name: "补偿到位",
        },
        {
          value: parseFloat(cardsert3.sfcfdw),
          name: "处罚到位",
        },
        {
          value: parseFloat(cardsert3.sfdc),
          name: "是否调查",
        },
        {
          value: parseFloat(cardsert3.sffhgjcyzc),
          name: "国家产业政策",
        },
        {
          value: parseFloat(cardsert3.sfja),
          name: "是否结案",
        },

        {
          value: parseFloat(cardsert3.sflsgdzbph),
          name: "耕地占卜平衡",
        },
        {
          value: parseFloat(cardsert3.sflszgdw),
          name: "整改到位",
        },
        {
          value: parseFloat(cardsert3.sfmsgc),
          name: "民生工程",
        },
        {
          value: parseFloat(cardsert3.sfsqrmfyqzzx),
          name: "法院强制执行",
        },
        {
          value: parseFloat(cardsert3.wfxwsl),
          name: "违法行为",
        },
      ];
      let Databili = [
        {
          value: parseFloat(cardsert3.hcjgczjybl),
          name: "处置建议比例",
        },
        {
          value: parseFloat(cardsert3.sfbcdwbl),
          name: "补偿到位比例",
        },
        {
          value: parseFloat(cardsert3.sfcfdwbl),
          name: "处罚到位比例",
        },
        {
          value: parseFloat(cardsert3.sfdcbl),
          name: "是否调查比例",
        },
        {
          value: parseFloat(cardsert3.sffhgjcyzcbl),
          name: "国家产业政策比例",
        },
        {
          value: parseFloat(cardsert3.sfjabl),
          name: "是否结案比例",
        },

        {
          value: parseFloat(cardsert3.sflsgdzbphbl),
          name: "耕地占卜平衡比例",
        },
        {
          value: parseFloat(cardsert3.sflszgdwbl),
          name: "整改到位比例",
        },
        {
          value: parseFloat(cardsert3.sfmsgcbl),
          name: "民生工程比例",
        },
        {
          value: parseFloat(cardsert3.sfsqrmfyqzzxbl),
          name: "法院强制执行比例",
        },
      ];
      let Datashexian = [
        {
          value: parseFloat(cardsert3.hcjgczjysxmj),
          name: "处置建议",
        },
        {
          value: parseFloat(cardsert3.sfmsgcsxmj),
          name: "民生工程",
        },
        {
          value: parseFloat(cardsert3.sflsgdzbphsxmj),
          name: "耕地占卜平衡",
        },
        {
          value: parseFloat(cardsert3.sfbcdwsxmj),
          name: "补偿到位",
        },
        {
          value: parseFloat(cardsert3.sffhgjcyzcsxmj),
          name: "国家产业政策",
        },
        {
          value: parseFloat(cardsert3.sfdcsxmj),
          name: "是否调查",
        },

        {
          value: parseFloat(cardsert3.sfsqrmfyqzzxsxmj),
          name: "法院强制执行",
        },
        {
          value: parseFloat(cardsert3.sfjasxmj),
          name: "是否结案",
        },
        {
          value: parseFloat(cardsert3.sfcfdwsxmj),
          name: "处罚到位",
        },
        {
          value: parseFloat(cardsert3.sflszgdwsxmj),
          name: "整改到位",
        },
      ];
      let Datashexianbili = [
        {
          value: parseFloat(cardsert3.hcjgczjysxmjbl),
          name: "处置建议比例",
        },
        {
          value: parseFloat(cardsert3.sfmsgcsxmjbl),
          name: "民生工程比例",
        },
        {
          value: parseFloat(cardsert3.sflsgdzbphsxmjbl),
          name: "耕地占卜平衡比例",
        },
        {
          value: parseFloat(cardsert3.sfbcdwsxmjbl),
          name: "补偿到位比例",
        },
        {
          value: parseFloat(cardsert3.sffhgjcyzcsxmjbl),
          name: "国家产业政策比例",
        },
        {
          value: parseFloat(cardsert3.sfdcsxmjbl),
          name: "是否调查比例",
        },

        {
          value: parseFloat(cardsert3.sfsqrmfyqzzxsxmjbl),
          name: "法院强制执行比例",
        },
        {
          value: parseFloat(cardsert3.sfjasxmjbl),
          name: "是否结案比例",
        },
        {
          value: parseFloat(cardsert3.sfcfdwsxmjbl),
          name: "处罚到位比例",
        },
        {
          value: parseFloat(cardsert3.sflszgdwsxmjbl),
          name: "整改到位比例",
        },
      ];
      let Datagengdi = [
        {
          value: parseFloat(cardsert3.hcjgczjyGDmj),
          name: "处置建议",
        },
        {
          value: parseFloat(cardsert3.sfmsgcGDmj),
          name: "民生工程",
        },
        {
          value: parseFloat(cardsert3.sflsgdzbphGDmj),
          name: "耕地占卜平衡",
        },
        {
          value: parseFloat(cardsert3.sfbcdwGDmj),
          name: "补偿到位",
        },
        {
          value: parseFloat(cardsert3.sffhgjcyzcGDmj),
          name: "国家产业政策",
        },
        {
          value: parseFloat(cardsert3.sfdcGDmj),
          name: "是否调查",
        },

        {
          value: parseFloat(cardsert3.sfsqrmfyqzzxGDmj),
          name: "法院强制执行",
        },
        {
          value: parseFloat(cardsert3.sfjaDdmj),
          name: "是否结案",
        },
        {
          value: parseFloat(cardsert3.sfcfdwGDmj),
          name: "处罚到位",
        },
        {
          value: parseFloat(cardsert3.sflszgdwGDmj),
          name: "整改到位",
        },
      ];
      let Datagengdibili = [
        {
          value: parseFloat(cardsert3.hcjgczjyGdmjbl),
          name: "处置建议比例",
        },
        {
          value: parseFloat(cardsert3.sfmsgcGdmjbl),
          name: "民生工程比例",
        },
        {
          value: parseFloat(cardsert3.sflsgdzbphGdmjbl),
          name: "耕地占卜平衡比例",
        },
        {
          value: parseFloat(cardsert3.sfbcdwGdmjbl),
          name: "补偿到位比例",
        },
        {
          value: parseFloat(cardsert3.sffhgjcyzcGdmjbl),
          name: "国家产业政策比例",
        },
        {
          value: parseFloat(cardsert3.sfdcGdmjbl),
          name: "是否调查比例",
        },

        {
          value: parseFloat(cardsert3.sfsqrmfyqzzxGdmjbl),
          name: "法院强制执行比例",
        },
        {
          value: parseFloat(cardsert3.sfjaGdmjbl),
          name: "是否结案比例",
        },
        {
          value: parseFloat(cardsert3.sfcfdwGdmjbl),
          name: "处罚到位比例",
        },
        {
          value: parseFloat(cardsert3.sflszgdwGdmjbl),
          name: "整改到位比例",
        },
      ];
      let Data = [];
      this.processedData3 = [];
      if (item == "数量" || item == "") {
        Data = Datashul;
        this.processedData3 = Data;
        // console.log(this.processedData3);
        this.config5 = {
          ...this.config5,
          data: this.processedData3,
        };
      } else if (item == "数量比例") {
        Data = Databili;
        this.processedData3 = Data;
        this.config5 = {
          ...this.config5,
          data: this.processedData3,
        };
      } else if (item == "涉嫌面积") {
        Data = Datashexian;
        this.processedData3 = Data;
        this.config5 = {
          ...this.config5,
          data: this.processedData3,
        };
      } else if (item == "涉嫌面积比例") {
        Data = Datashexianbili;
        this.processedData3 = Data;
        this.config5 = {
          ...this.config5,
          data: this.processedData3,
        };
      } else if (item == "耕地面积") {
        Data = Datagengdi;
        this.processedData3 = Data;
        this.config5 = {
          ...this.config5,
          data: this.processedData3,
        };
      } else if (item == "耕地面积比例") {
        Data = Datagengdibili;
        this.processedData3 = Data;
        this.config5 = {
          ...this.config5,
          data: this.processedData3,
        };
      }
    },
    szdpTwo() {
      let params = {
        startDate: this.tstartDate,
        endDate: this.nendDate,
        month: this.tmonth,
        city: this.tcity,
      };
      this.loadinger = true;
      szdpTwocount(params).then((ok) => {
        if (ok.code == 200) {
          this.loadinger = false;
          this.tstartDate = "";
          this.nendDate = "";
          this.tmonth = "";
          this.tcity = "";
        }
        this.cards = ok.data.a;
        this.cardsert = ok.data.b.地块数量比例;
        this.cardsert1 = ok.data.b.地块面积比例;
        this.cardsert2 = ok.data.b.耕地面积比例;
        this.cardsert3 = ok.data.c;
        EventBus.$emit("dataEvent", {
          item: this.itemko,
          cardsert3: this.cardsert3,
        });
        this.akop = ok.data.c.数量;

        let Datashul = [
          { value: parseFloat(this.akop.hcjgczjy), name: "处置建议" },
          { value: parseFloat(this.akop.sfbcdw), name: "补偿到位" },
          { value: parseFloat(this.akop.sfcfdw), name: "处罚到位" },
          { value: parseFloat(this.akop.sfdc), name: "是否调查" },
          { value: parseFloat(this.akop.sffhgjcyzc), name: "国家产业政策" },
          { value: parseFloat(this.akop.sfja), name: "是否结案" },
          { value: parseFloat(this.akop.sflsgdzbph), name: "耕地占卜平衡" },
          { value: parseFloat(this.akop.sflszgdw), name: "整改到位" },
          { value: parseFloat(this.akop.sfmsgc), name: "民生工程" },
          { value: parseFloat(this.akop.sfsqrmfyqzzx), name: "法院强制执行" },
          { value: parseFloat(this.akop.wfxwsl), name: "违法行为" },
        ];

        this.config5 = {
          ...this.config5,
          data: Datashul,
        };
        const processedData = [
          {
            value: parseFloat(this.cardsert.hfdk),
            name: "合法地块",
          },
          {
            value: parseFloat(this.cardsert.wfdk),
            name: "违法地块",
          },
          {
            value: parseFloat(this.cardsert.qtdk),
            name: "其他地块",
          },
          {
            value: parseFloat(this.cardsert.hfdkbl),
            name: "合法地块比例",
          },
          {
            value: parseFloat(this.cardsert.wfdkbl),
            name: "违法地块比例",
          },
          {
            value: parseFloat(this.cardsert.qtdkbl),
            name: "其他地块比例",
          },
        ];
        const processedData1 = [
          {
            value: parseFloat(this.cardsert1.hfjcbl),
            name: "合法监测比例",
          },
          {
            value: parseFloat(this.cardsert1.hfjcmj),
            name: "合法监测面积",
          },
          {
            value: parseFloat(this.cardsert1.qtjcbl),
            name: "其他监测比例",
          },
          {
            value: parseFloat(this.cardsert1.qtjcmj),
            name: "其他监测面积",
          },
          {
            value: parseFloat(this.cardsert1.wfjcbl),
            name: "违法监测比例",
          },
          {
            value: parseFloat(this.cardsert1.wfjcmj),
            name: "违法监测面积",
          },
        ];
        const processedData2 = [
          {
            value: parseFloat(this.cardsert2.hfgdmj),
            name: "合法耕地面积",
          },
          {
            value: parseFloat(this.cardsert2.hfgdmjbl),
            name: "合法耕地面积比例",
          },
          {
            value: parseFloat(this.cardsert2.qtgdmj),
            name: "其他耕地面积",
          },
          {
            value: parseFloat(this.cardsert2.qtgdmjbl),
            name: "其他耕地面积比例",
          },
          {
            value: parseFloat(this.cardsert2.wfgdmj),
            name: "违法耕地面积",
          },
          {
            value: parseFloat(this.cardsert2.wfgdmjbl),
            name: "违法耕地面积比例",
          },
        ];

        // 更新组件data
        this.config = {
          ...this.config,
          data: processedData,
        };
        this.config1 = {
          ...this.config1,
          data: processedData1,
        };
        this.config2 = {
          ...this.config2,
          data: processedData2,
        };
      });
    },
    handlehomeClick() {
      this.showComponent = "home";
    },
    handletixtClick() {
      this.showComponent = "next";
    },
    handleDateChange(dates) {
      if (Array.isArray(dates) && dates.length > 0) {
        const formattedDates = dates.map((date) =>
          moment(date).format("YYYY-MM-DD")
        );
        this.rhtz2024Info.startDate = formattedDates[0];
        this.rhtz2024Info.endDate = formattedDates[1];
      } else {
        this.rhtz2024Info.startDate = "";
        this.rhtz2024Info.endDate = "";
        // console.log();
      }
    },
    handleClick1(tab, event) {
      let xObject = this.data.左侧.左中;

      let cities = [];
      let wfgdmjValues = [];
      for (let key in xObject) {
        if (xObject.hasOwnProperty(key)) {
          let values = xObject[key].x.value;

          // 遍历value数组
          for (let item of values) {
            // console.log(item, "item");
            if (item) {
              if (this.activeName1 == "1") {
                wfgdmjValues.push(item.xfsl);
                cities.push(item.city);
              } else if (this.activeName1 == "2") {
                wfgdmjValues.push(item.tbjd);
                cities.push(item.city);
              } else if (this.activeName1 == "3") {
                wfgdmjValues.push(item.wfgdmj);
                cities.push(item.city);
              } else if (this.activeName1 == "4") {
                wfgdmjValues.push(item.xtwfbi);
                cities.push(item.city);
              }
            }
          }
        }
      }
      if (this.activeName1 == "1") {
        this.echarts(
          this.$refs.echart1,
          true,
          cities,
          wfgdmjValues,
          "个",
          this.echart1
        );
      } else if (this.activeName1 == "2") {
        this.echarts(
          this.$refs.echart1,
          true,
          cities,
          wfgdmjValues,
          "%",
          this.echart2
        );
      } else if (this.activeName1 == "3") {
        this.echarts(
          this.$refs.echart1,
          true,
          cities,
          wfgdmjValues,
          "亩",
          this.echart3
        );
      } else if (this.activeName1 == "4") {
        this.echarts(
          this.$refs.echart1,
          true,
          cities,
          wfgdmjValues,
          "%",
          this.echart4
        );
      }
    },
    handleClick2() {
      let xObject = this.data.左侧.左下;
      let cities = [];
      let wfgdmjValues = [];
      for (let key in xObject) {
        if (xObject.hasOwnProperty(key)) {
          let values = xObject[key].x.value;

          // 遍历value数组
          for (let item of values) {
            if (item) {
              if (this.activeName2 == "1") {
                wfgdmjValues.push(item.xfsl);
                cities.push(item.county);
              } else if (this.activeName2 == "2") {
                wfgdmjValues.push(item.tbjd);
                cities.push(item.county);
              } else if (this.activeName2 == "3") {
                wfgdmjValues.push(item.wfgdmj);
                cities.push(item.county);
              } else if (this.activeName2 == "4") {
                wfgdmjValues.push(item.xtwfbi);
                cities.push(item.county);
              }
            }
          }
        }
      }
      if (this.activeName2 == "1") {
        this.echarts(
          this.$refs.echart2,
          true,
          cities,
          wfgdmjValues,
          "个",
          this.echart1
        );
      } else if (this.activeName2 == "2") {
        this.echarts(
          this.$refs.echart2,
          true,
          cities,
          wfgdmjValues,
          "%",
          this.echart2
        );
      } else if (this.activeName2 == "3") {
        this.echarts(
          this.$refs.echart2,
          true,
          cities,
          wfgdmjValues,
          "亩",
          this.echart3
        );
      } else if (this.activeName2 == "4") {
        this.echarts(
          this.$refs.echart2,
          true,
          cities,
          wfgdmjValues,
          "%",
          this.echart4
        );
      }
    },
    handleClick3() {
      let xObject = this.data.右侧.右中;
      // console.log(xObject, "xObject");
      let cities = [];
      let wfgdmjValues = [];
      for (let key in xObject) {
        if (xObject.hasOwnProperty(key)) {
          let values = xObject[key].x.value;

          // 遍历value数组
          for (let item of values) {
            if (item.county) {
              if (this.activeName3 == "1") {
                wfgdmjValues.push(item.jbntmj);
                cities.push(item.county);
              } else if (this.activeName3 == "2") {
                wfgdmjValues.push(item.wttb);
                cities.push(item.county);
              } else if (this.activeName3 == "3") {
                wfgdmjValues.push(item.dkmj);
                cities.push(item.county);
              } else if (this.activeName3 == "4") {
                wfgdmjValues.push(item.gdmj);
                cities.push(item.county);
              }
            }
          }
        }
      }
      if (this.activeName3 == "1") {
        this.echarts(
          this.$refs.echart3,
          false,
          cities,
          wfgdmjValues,
          "亩",
          this.echart1
        );
      } else if (this.activeName3 == "2") {
        this.echarts(
          this.$refs.echart3,
          false,
          cities,
          wfgdmjValues,
          "个",
          this.echart2
        );
      } else if (this.activeName3 == "3") {
        this.echarts(
          this.$refs.echart3,
          false,
          cities,
          wfgdmjValues,
          "亩",
          this.echart3
        );
      } else if (this.activeName3 == "4") {
        this.echarts(
          this.$refs.echart3,
          false,
          cities,
          wfgdmjValues,
          "亩",
          this.echart4
        );
      }
    },
    handleClick4() {
      let xObject = this.data.右侧.右下;
      let cities = [];
      let wfgdmjValues = [];
      for (let key in xObject) {
        if (xObject.hasOwnProperty(key)) {
          let values = xObject[key].x.value;

          // 遍历value数组
          for (let item of values) {
            if (item.county) {
              if (this.activeName4 == "1") {
                wfgdmjValues.push(item.jbntmj);
                cities.push(item.county);
              } else if (this.activeName4 == "2") {
                wfgdmjValues.push(item.wttb);
                cities.push(item.county);
              } else if (this.activeName4 == "3") {
                wfgdmjValues.push(item.dkmj);
                cities.push(item.county);
              } else if (this.activeName4 == "4") {
                wfgdmjValues.push(item.gdmj);
                cities.push(item.county);
              }
            }
          }
        }
      }
      if (this.activeName4 == "1") {
        this.echarts(
          this.$refs.echart4,
          false,
          cities,
          wfgdmjValues,
          "亩",
          this.echart1
        );
      } else if (this.activeName4 == "2") {
        this.echarts(
          this.$refs.echart4,
          false,
          cities,
          wfgdmjValues,
          "个",
          this.echart2
        );
      } else if (this.activeName4 == "3") {
        this.echarts(
          this.$refs.echart4,
          false,
          cities,
          wfgdmjValues,
          "亩",
          this.echart3
        );
      } else if (this.activeName4 == "4") {
        this.echarts(
          this.$refs.echart4,
          false,
          cities,
          wfgdmjValues,
          "亩",
          this.echart4
        );
      }
    },
    myEcharts() {
      this.echart = echarts.init(this.$refs.echart);
      //配置图表
      echarts.registerMap("shanxi", this.dataUrl);
      var _this = this;
      this.option = {
        tooltip: {
          //显示每个地区数据
          trigger: "item",
          extraCssText: "background: transparent",
          padding: [
            0, // 上
            0, // 右
            0, // 下
            0, // 左
          ],
          formatter: function (params) {
            // console.log(_this.data, "_this.data");
            const cityData = _this.data.兵马俑.铜川市.cityAll;
            const valueData = _this.data.兵马俑[params.name].value[0];

            const convertToArray = (obj) => {
              const result = {};
              Object.keys(obj).forEach((key) => {
                result[key] = [obj[key]];
              });
              return result;
            };

            const arrayData = convertToArray(valueData);
            // console.log(arrayData);
            const cityIndex = cityData.findIndex(
              (item) => item === params.name
            );

            return (
              '<div class="custom-tooltip-style"><div style="color: #fff;padding-top: 2px;padding-left: 10px;">' +
              params.name +
              '</div><div style="margin:10px;margin-left:10px">' +
              ["ystb", "rhtb"]
                .map((prefix) => {
                  return `<div style="float: left;width:50%">
        <span style="color: #65C3FF; font-weight:500">图斑数量: </span>
        <span style="color: #fff;font-family: wpzf;">${
          arrayData[prefix + "sl"][0]
        }  个</span><br>
        <span style="color: #65C3FF; font-weight:500">地块面积: </span>
        <span style="color: #03F8D8;font-family: wpzf;">${
          arrayData[prefix + "dkmj"][0]
        } </span><br>
        <span style="color: #65C3FF; font-weight:500">耕地面积: </span>
        <span style="color: #03F8D8;font-family: wpzf;">${
          arrayData[prefix + "gdmj"][0]
        } 亩</span><br>
        <span style="color: #65C3FF; font-weight:500">基本农田面积: </span>
        <span style="color: #03F8D8;font-family: wpzf;">${
          arrayData[prefix + "jbntmj"][0]
        } </span>
      </div>`;
                })
                .join("") +
              "</div></div>"
            );
          },
        },

        series: [
          {
            type: "map",
            mapType: "shanxi",
            // selectedMode: "true", //单选地图
            roam: false, //禁止缩放
            zoomLock: true,
            mapLocation: {
              x: "5.0%",
              y: "4.0%",
              height: "90%",
              width: "90%",
            },
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  textStyle: {
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: "900",
                  },
                },
                borderColor: "rgba(0,226,249,0.00)", //边界线颜色
                borderWidth: 2, //边界线大小
                shadowColor: "rgba(63,218,255,0.00)",
                shadowBlur: 30,
                areaColor: "rgba(63,218,255,0.00)",
              },
              emphasis: {
                //选中或者悬浮状态
                label: {
                  show: true,
                  textStyle: {
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: "900",
                  },
                },
                // areaColor: "rgba(10,125,224)", //选中或者悬浮区域颜色
                areaColor: {
                  type: "radial",
                  x: 0.5,
                  y: 0.5,
                  r: 0.8,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(10,125,224,0.00) ", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: " rgba(10,125,224)", // 100% 处的颜色
                    },
                  ],
                  globalCoord: true, // 缺省为 false
                },
              },
            },
            select: {
              // 地图选中区域样式
              label: {
                color: "#fff",
                fontSize: "14px",
                fontWeight: "900",
              },
              itemStyle: {
                // 选中区域的默认样式
                areaColor: {
                  type: "radial",
                  x: 0.5,
                  y: 0.5,
                  r: 0.8,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(10,125,224,0.00) ", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: " rgba(10,125,224)", // 100% 处的颜色
                    },
                  ],
                  globalCoord: true, // 缺省为 false
                },
              },
            },
            animation: false,
          },
        ],
      };
      this.echart.setOption(this.option);
      window.onresize = this.echart.resize;
      var _this = this;

      var index = 0;
      // var timer = setInterval(function () {
      //   index = index < _this.citys.length ? index : 0;
      //   _this.showTips(_this.citys[index++]);
      // }, 3000);

      this.echart.on("mouseover", function () {
        clearInterval(timer);
      });

      this.echart.on("mouseout", function () {
        clearInterval(timer);
        timer = setInterval(function () {
          index = index < _this.citys.length ? index : 0;
          _this.showTips(_this.citys[index++]);
        }, 3000);
      });
    },
    showTips(name) {
      if (this.dataAll == null) {
        return;
      }
      this.citys.forEach((item, i) => {
        this.echart.dispatchAction({
          type: "mapUnSelect",
          seriesIndex: 0,
          dataIndex: i,
        });
        if (item == name) {
          this.echart.dispatchAction({
            type: "mapSelect",
            seriesIndex: 0,
            dataIndex: i,
          });
          this.echart.dispatchAction({
            type: "showTip",
            seriesIndex: 0,
            dataIndex: i,
          });
        }
      });
    },
    echarts(ref, isLeft, yAxis, xAxis, unit, echartData) {
      if (echartData.timeOut != null) {
        this.stop(echartData);
      }
      var option = {
        // backgroundColor: "#1D65DC",
        dataZoom: [
          {
            type: "slider",
            show: true, //隐藏或显示（true）组件
            borderColor: "rgba(255,255,255,0.1)",
            fillerColor: "rgba(255,255,255,0.1)", //滑动块的颜色
            backgroundColor: "rgba(255,255,255,0.1)", //两边未选中的滑动条区域的颜色
            showDetail: true, //是否显示detail，即拖拽时候显示详细数值信息
            startValue: 0, // 数据窗口范围的起始数值
            endValue: 5, // 数据窗口范围的结束数值（一页显示多少条数据）
            yAxisIndex: [0, 1], //控制哪个轴，如果是 number 表示控制一个轴，如果是 Array 表示控制多个轴。此处控制第二根轴
            filterMode: "empty",
            width: 8, //滚动条高度
            height: "80%", //滚动条显示位置
            right: 10, // 距离右边
            handleSize: 0, //控制手柄的尺寸
            zoomLoxk: true, // 是否锁定选择区域（或叫做数据窗口）的大小
            top: "middle",
          },
          {
            //没有下面这块的话，只能拖动滚动条，鼠标滚轮在区域内不能控制外部滚动条
            type: "inside",
            yAxisIndex: [0, 1], //控制哪个轴，如果是 number 表示控制一个轴，如果是 Array 表示控制多个轴。此处控制第二根轴
            zoomOnMouseWheel: false, //滚轮是否触发缩放
            moveOnMouseMove: true, //鼠标移动能否触发平移
            moveOnMouseWheel: true,
          },
        ],
        grid: {
          top: 0,
          bottom: 0,
          right: "5%",
          left: "-10%",
          containLabel: true,
        },
        xAxis: {
          show: false,
        },
        yAxis: [
          {
            triggerEvent: true,
            show: true,
            inverse: true,
            data: yAxis,
            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },

            axisLabel: {
              show: true,
              interval: 0,
              color: "#fff",
              align: "left",
              margin: 60,
              formatter: function (value, index) {
                return "{title|" + value + "}";
              },
              rich: {
                title: {
                  width: 50,
                  align: "right",
                  fontSize: 12,
                },
              },
            },
          },
          {
            triggerEvent: true,
            show: true,
            inverse: true,
            data: xAxis,
            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              // shadowOffsetX: '-20px',
              // shadowOffsetY:'-20px',

              // color: ['#fff'],
              // align: 'left',
              // verticalAlign: 'center',
              // lineHeight: 40,
              // fontSize: 18,
              // formatter: function(value, index) {
              //     return data[index].value+'吨'
              // },
              show: true,
              textStyle: {
                color: "#fff",
                fontSize: "18",
              },
              formatter: function (value, index) {
                return "{x|" + value + "}  {y|" + unit + "}";
              },
              rich: {
                y: {
                  color: "#ffffff",
                  fontSize: 12,
                },
                x: {
                  color: "#65C3FF",
                  fontSize: 12,
                  fontWeight: 800,
                },
              },
            },
          },
        ],
        series: [
          {
            name: "XXX",
            type: "pictorialBar",
            symbol: ["rect", "rect"],

            symbolSize: [3, 10],
            symbolOffset: [0, -2],
            z: 12,
            itemStyle: {
              normal: {
                color: "#fff",
              },
            },
            data: this.getSymbolData(xAxis),
          },
          {
            name: "条",
            type: "bar",
            showBackground: true,
            // barBorderRadius: 30,
            yAxisIndex: 0,
            data: xAxis,
            barWidth: 4,
            // align: left,
            itemStyle: {
              // background: linear-gradient(-90deg, #65C3FF, rgba(101,195,255,0));
              normal: {
                color: isLeft ? this.blueItem : this.blueItemRight,
                // barBorderRadius: 10
              },
              // color: '#A71A2B',
              // barBorderRadius: 4,
            },
            // label: {
            //     normal: {
            //         color: '#fff',
            //         show: true,
            //         position: ["-80px", 0],
            //         textStyle: {
            //             fontSize: 16
            //         },
            //         formatter: function(a, b) {
            //             return a.name
            //         }
            //     }
            // }
          },
          {
            name: "框",
            type: "bar",
            yAxisIndex: 0,
            showBackground: true,
            barGap: "-230%",
            data: xAxis,
            barWidth: 14,
            itemStyle: {
              normal: {
                color: "rgba(255, 255, 255,0.1)",
              },
            },
            z: 13,
          },
        ],
      };

      var echart = echarts.init(ref);
      echart.setOption(option);

      // echartData.echart = echart;
      // echartData.option = option;
      // echartData.number = xAxis.length;

      // echart.on("mouseout", this.goMove(echartData));
      // echart.on("mouseover", this.stop(echartData));
      // this.autoMove(echartData);
    },
    //自动滚动
    autoMove(echartData) {
      //this.dataList.seriesData为柱形图数据
      echartData.timeOut = setInterval(() => {
        if (
          Number(echartData.option.dataZoom[0].endValue) >=
          echartData.length - 1
        ) {
          debugger;
          echartData.option.dataZoom[0].endValue = 5;
          echartData.option.dataZoom[0].startValue = 0;
        } else {
          debugger;
          echartData.option.dataZoom[0].endValue =
            echartData.option.dataZoom[0].endValue + 1;
          echartData.option.dataZoom[0].startValue =
            echartData.option.dataZoom[0].startValue + 1;
        }
        echartData.echart.setOption(echartData.option, true);
      }, 1000);
    },
    //停止滚动
    stop(echartData) {
      // debugger;
      clearInterval(echartData.timeOut);
    },
    //继续滚动
    goMove(echartData) {
      // debugger;
      this.autoMove(echartData);
    },
    selectData() {
      const load = this.$loading({
        background: "#fff", //遮罩层颜色
        lock: true,
        text: "正在获取数据...",
        target: document.querySelector(".container"),
      });

      count(this.rhtz2024Info)
        .then((ok) => {
          if (ok.code == 200) {
            this.dataAll = ok.data;
            this.data = this.dataAll;
            // this.getData(1);
            load.close();
          }
        })
        .finally(() => {
          load.close();
        });
    },
    getData(select) {
      if (select == "1") {
        this.rhtz2024Info.year = "2022";
        this.selectTime = "1";
      } else if (select == "2") {
        this.rhtz2024Info.year = "2023";
        this.selectTime = "2";
      } else if (select == "3") {
        this.rhtz2024Info.year = "2024";
        this.selectTime = "3";
      }
      this.selectData();
      // this.data = this.dataAll;

      this.getNumberLeft(this.data.左侧.左上);
      // this.getNumberRight(this.data.right.province.wttbsl);
      this.echarts(
        this.$refs.echart1,
        true,
        this.data.left.city.xftb.citys,
        this.data.left.city.xftb.value,
        "个",
        this.echart1
      );
      this.echarts(
        this.$refs.echart2,
        true,
        this.data.left.county.xftb.citys,
        this.data.left.county.xftb.value,
        "个",
        this.echart2
      );
      this.echarts(
        this.$refs.echart3,
        false,
        this.data.right.city.wttb.citys,
        this.data.right.city.wttb.value,
        "个",
        this.echart3
      );
      this.echarts(
        this.$refs.echart4,
        false,
        this.data.right.county.wttb.citys,
        this.data.right.county.wttb.value,
        "个",
        this.echart4
      );
    },
    getSymbolData(data) {
      let arr = [];
      for (var i = 0; i < data.length; i++) {
        arr.push({
          value: data[i],
          symbolPosition: "end",
        });
      }
      return arr;
    },
    getNumberLeft(data) {
      const total = data; //设置初始总金额
      this.xftb = 0;
      const frameNum = 30;
      const _this = this;
      let animation = window.requestAnimationFrame(function f() {
        if (_this.xftb < total) {
          _this.xftb = Math.round(_this.xftb + total / frameNum);

          // 动画继续
          animation = window.requestAnimationFrame(f);
        } else {
          _this.xftb = total;
          // 动画停止
          window.cancelAnimationFrame(f);
        }
      });
    },
    getNumberRight(data) {
      const total = data; //设置初始总金额
      this.wttb = 0;
      const frameNum = 30;
      const _this = this;
      let animation = window.requestAnimationFrame(function f() {
        if (_this.wttb < total) {
          _this.wttb = Math.round(_this.wttb + total / frameNum);
          // 动画继续
          animation = window.requestAnimationFrame(f);
        } else {
          _this.wttb = total;
          // 动画停止
          window.cancelAnimationFrame(f);
        }
      });
    },
    addNumber(i) {
      this.xftb = i;
    },
    changeData() {
      this.selectData(this.selectTime);
    },
  },
};
</script>

<style lang='less' scoped >
.container {
  width: 100%;
  height: 100%;
  background: url("../../../public/img/bg.png") no-repeat;
  background-size: 100% 100%;
}
.top-left {
  position: absolute;
  left: 15%;
  color: aliceblue;
  width: 23%;
  display: flex;
  justify-content: space-evenly;
  top: 4%;
  cursor: pointer;
}

.el-prow {
  display: flex;
  justify-content: space-between;
  .eloppoe {
    display: flex;
    justify-content: space-between;
    text-align: center;
  }
}
.el-aside {
  color: #fff;
  text-align: start;
  line-height: 0vh;
  margin-left: 60px;
  overflow: hidden;
  background-color: initial;
}
.el-main {
  padding: 0px;
  width: 60%;
  overflow: hidden;
}
.map {
  width: 100%;
  height: 100%;
  /* margin-top: 10%; */
}
.title {
  background: url("../../../public/img/Mtitle_bg.png") no-repeat;
  width: 100%;
  height: 3.5vh;
  background-size: 100% 100%;
}
.body {
  background: linear-gradient(
    0deg,
    rgba(29, 101, 220, 0.1),
    rgba(29, 101, 220, 0.02)
  );
  width: 100%;
  height: 25vh;
}
.right1 {
  margin-top: 8vh;
}
.right2 {
  margin-top: 1vh;
  margin-bottom: 1vh;
}
.titleText {
  margin-left: 30px;
  padding-top: 14px;
  font-family: wpzf;
}
.el-row {
  width: 100%;
  height: 100%;
}
.right1_image_text {
  animation: bounce-up 2s linear infinite;
}
.right1_image {
  background: url("../../../public/img/icon1.png") no-repeat;
  width: 8vw;
  height: 17vh;
  background-size: 100% 100%;
  margin-top: 4vh;
  margin-left: 30px;
  position: absolute;
  top: 0;
  animation: bounce-down 2s linear infinite;
}
@keyframes bounce-down {
  25% {
    -webkit-transform: translateY(-4px);
  }
  50%,
  100% {
    -webkit-transform: translateY(0);
  }
  75% {
    -webkit-transform: translateY(4px);
  }
}
@keyframes bounce-up {
  25% {
    -webkit-transform: translateY(4px);
  }
  50%,
  100% {
    -webkit-transform: translateY(0);
  }
  75% {
    -webkit-transform: translateY(-4px);
  }
}
.left1_image {
  background: url("../../../public/img/icon2.png") no-repeat;
  width: 8vw;
  height: 17vh;
  background-size: 100% 100%;
  margin-top: 4vh;
  margin-left: 30px;
  position: absolute;
  top: 0;
  animation: bounce-down 1.6s linear infinite;
}
.right1_image1 {
  width: 30px;
  height: 30px;
  position: absolute;
  padding-left: 7.5px;
  padding-top: 7.5px;
}
.right1_image1_bg {
  width: 45px;
  height: 45px;
  background: url("../../../public/img/icon3_1.png") no-repeat;
  background-size: 100% 100%;
  animation: roate 15s infinite linear;
}
.right1_image1_bg_1 {
  background: url("../../../public/img/icon4_1.png") repeat;
  width: 45px;
  height: 45px;
  background-size: 100% 100%;
  animation: roate 15s infinite linear;
}
.map_bg {
  left: 31.2%;
  width: 36.8%;
  top: 11%;
  position: absolute;
  animation: roate 15s infinite linear;
}
@keyframes roate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
::v-deep .el-tabs__item {
  padding: 3px 10px;
  height: 18px;
  /* -webkit-box-sizing: border-box; */
  box-sizing: border-box;
  line-height: 10px;
  display: inline-block;
  list-style: none;
  font-size: 7px;
  /* font-weight: 500; */
  color: #fff;
  position: relative;
}
::v-deep .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
  padding-left: 10px;
}
::v-deep .el-tabs--top .el-tabs__item.is-top:last-child {
  padding-right: 10px;
}
::v-deep .el-tabs__item.is-active {
  color: #31ecfc;
  border: solid #31ecfc;
  border-width: 1px;
  border-radius: 12px;
}
::v-deep .el-tabs__active-bar {
  background-color: transparent !important;
}

/*去掉tabs底部的下划线*/
::v-deep .el-tabs__nav-wrap::after {
  position: static !important;
}
.map {
  background: url("../../../public/img/map.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 8vh;
  height: 83%;
  width: 78%;
  margin-left: 3vw;
}
.titleBg {
  position: absolute;
  top: 15px;
  left: 0;
  right: 0;
  margin: auto;
  height: 28px;
}

::v-deep .custom-tooltip-box {
  padding: 0px !important ;
  border: none !important;
  background-color: transparent !important;
}
::v-deep .custom-tooltip-style {
  width: 400px;
  height: 130px;
  background: url("../../../public/img/map_pop_bg.png") no-repeat;
  background-size: 100% 100%;
  padding: 0px !important;
  z-index: 99999;
}
:v-deep .pop-title {
  color: #fff;
  padding-top: 10px;
  padding-left: 30px;
}
.bottonlist {
  height: 25px;
  margin: auto;

  width: 38.6%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 6%;
  margin: auto;
}
// background: url("../../../public/img/map_sjz_bg.png") no-repeat;
//   background-size: 100% 100%;
.botton {
  width: 100%;
  height: 25px;
  position: absolute;
  bottom: 6%;
}
.bt1 {
  background: url("../../../public/img/map_sjz.png") no-repeat;
  height: 60px;
  width: 60px;
  background-size: 100% 100%;
  color: #fff;
}
.bt2 {
  background: url("../../../public/img/map_sjz_sel.png") no-repeat;
  height: 60px;
  width: 60px;
  background-size: 100% 100%;
  color: #fff;
}
.jrxt {
  position: absolute;
  right: 4%;
  top: 3%;
  color: #03dcf7;
}
::v-deep.year {
  z-index: 100;
  position: absolute;
  top: 10%;
  left: 30%;
  width: 230px !important;
  .el-input__inner {
    width: 230px !important;
  }
  .el-range-input {
    background-color: #00244a;
  }
}
::v-deep .el-input--suffix .el-input__inner {
  padding-right: 0px;
}
::v-deep .el-input__inner {
  background-color: transparent !important;
  border-color: RGB(0, 226, 249, 0);
  box-shadow: 1px 1px 5px 1px RGB(63, 218, 255, 0) inset;
  height: 30px;
  width: 100px;
}
.containerliet {
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 60%;
  margin: auto;
}

.date-picker {
  display: inline-block;
  .el-input__inner {
    width: 239px;
  }
  ::v-deep.el-range-input {
    background-color: #00244a;
  }
}

.button-group {
  display: inline-block;
  width: 615px;
  display: flex;
  justify-content: space-around;
  button {
    background-color: #0d1f3c;
    color: #fff;
  }
}
.conterop {
  width: 60%;
  margin: auto;
  display: flex;
  justify-content: space-around;
}
.collpot {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  button {
    background-color: #0d1f3c;
    color: #fff;
  }
}

.conliuyt {
  width: 90%;
  height: 87%;
  margin: 66px auto;
}
.conlkj {
  height: 100%;
  width: 100%;
}
.dashboard-container {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}

.dashboard-card {
  background-color: #0d1f3c; /* 卡片背景色 */
  color: #00ffff; /* 文字颜色 */
  padding: 15px;
  border-radius: 10px;
  width: 19%; /* 调整卡片宽度 */

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  .dashboard-neme {
    font-size: 16px;
    border-bottom: 1px solid #fff;
  }
}

.dashboard-card h3 {
  font-size: 18px; /* 调整标题文字大小 */
  margin-bottom: 10px;
  border-bottom: 1px solid #00ffff;
  padding-bottom: 5px;
}

.card-item {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}

.card-item .item-label {
  font-size: 14px; /* 调整标签文字大小 */
}

.card-item .item-value {
  font-size: 14px; /* 调整数值文字大小 */
}
.dispouy {
  width: 100%;
  height: 70%;
  margin-top: 5px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
}
.chart-container {
  padding: 9px;
  margin-top: 3px;
  height: 183px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #10273e;
}
.chart-content {
  ::v-deep.dv-capsule-chart .unit-label {
    display: none !important;
  }
}
.chart-title {
  color: #00ffff;
  font-size: 16px;
  margin-bottom: 5px;
  border-bottom: 1px solid #fff;
}

.chart-content {
  height: 131px;
}
.toterty {
  width: 23%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.left-e {
  width: 76%;
  border-radius: 10px;
  padding: 10px;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  background-color: #0d1f3c;
  height: 100%;
  .left-top-op {
    width: 100%;
    height: 5%;
    color: #00ffff;
    font-size: 16px;
    border-bottom: 1px solid #fff;
  }
  .xia {
    height: 60%;
    width: 100%;
    .xia1 {
      width: 100%;
      height: 100%;
      background-color: #31ecfc;
    }
  }
  .shang {
    width: 100%;
    height: 40%;
    margin-top: 3px;
    display: flex;
    justify-content: space-between;
    position: relative;
    .container-oppo {
      position: absolute;
      right: 5%;
      width: 60%;
      display: flex;
      justify-content: space-between;
      .quantity {
        width: 110px;
        text-align: center;
        border: 1px solid #fff;
        color: #00ffff;
      }
    }
    .shang1 {
      // width: 32%;
      width: 100%;
      height: 100%;
    }

    // background-color: aquamarine;
  }
  .quantity.active {
    background-color: yellow;
  }
}
</style>





















