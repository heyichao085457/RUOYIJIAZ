<template>
  <div>
    <div style="height: 30px">
      <!-- 多期影像分屏对比 -->
      <el-page-header @back="goBack" content="多期影像分屏对比">
      </el-page-header>
    </div>
    <el-button
      type="text"
      icon="el-icon-close"
      @click="close"
      :style="{
        color: 'black',
        fontSize: '20px',
        position: 'absolute',
        right: '30px',
        top: '8%',
        zIndex: 999,
      }"
    ></el-button>
    <div id="top">
      <div id="map1" class="map">
        <el-select
          v-model="map1Value"
          placeholder="请选择"
          class="select"
          @change="selectMap1($event)"
        >
          <el-option
            v-for="item in dataUrl"
            :key="item['photoId']"
            :label="item['photoName']"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
      <div id="map2" class="map">
        <el-select
          v-model="map2Value"
          placeholder="请选择"
          class="select"
          @change="selectMap2($event)"
        >
          <el-option
            v-for="item in dataUrl"
            :key="item['photoId']"
            :label="item['photoName']"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
      <div id="map3" class="map">
        <el-select
          v-model="map3Value"
          placeholder="请选择"
          class="select"
          @change="selectMap3($event)"
        >
          <el-option
            v-for="item in dataUrl"
            :key="item['photoId']"
            :label="item['photoName']"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
      <div class="map" id="map4">
        <el-select
          v-model="map4Value"
          placeholder="请选择"
          class="select"
          @change="selectMap4($event)"
        >
          <el-option
            v-for="item in dataUrl"
            :key="item['photoId']"
            :label="item['photoName']"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div id="bottom">
      <div id="map5" class="map"></div>
      <div id="map6" class="map"></div>
      <div id="map7" class="map"></div>
      <div id="map8" class="map"></div>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../api/map/supermap/iclient-leaflet";
import "../api/map/supermap/iclient-leaflet.min.css";
//import L from "@supermap/iclient-leaflet";
//import mapConfig from "../map/mapConfig";
require("proj4");
//require("proj4leaflet");
// import proj4 from "proj4";
// import "proj4leaflet";
import config from "../../public/config/config";
import axios from "axios";
import wellknown from "wellknown";
import Cookies from "js-cookie";
import {
  userPhotofind,
  userPhotoupdate,
  userPhotofindAll,
  findByLandCode,
  findByLandCodeQb,
} from "../api/document/index";
export default {
  data() {
    return {
      dataUrl: [],
      map1Value: "",
      map2Value: "",
      map3Value: "",
      map4Value: "",
      id: "", //地块编号
      tbbh: "", //图斑编号
      isQb: false,
      map1: null,
      map2: null,
      map3: null,
      map4: null,
      map5: null,
      map6: null,
      map7: null,
      map8: null,
      userId: "",
    };
  },
  mounted() {
    // Cookies.get(userId);
    this.userId = Cookies.get("userId");
    // console.log(this.userId, "this.userId");
    this.id = this.$route.query.id;
    this.isQb = this.$route.query.isQb;
    this.tbbh = this.$route.query.tbbh;
    this.initMaps();
    this.getData();
    this.getLayer();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getDeftLayer() {
      let params = {
        type: "多期影像对比",
        userId: this.userId,
      };
      userPhotofind(params).then((ok) => {
        // console.log(ok.data[0], "11111111");
        if (ok.code == 200) {
          this.setMapUrl(this.map1, ok.data[0], true);
          this.map1Value = ok.data[0]["photoName"];
          this.setMapUrl(this.map2, ok.data[1], true);
          this.map2Value = ok.data[1]["photoName"];
          this.setMapUrl(this.map3, ok.data[2], true);
          this.map3Value = ok.data[2]["photoName"];
          this.setMapUrl(this.map4, ok.data[3], true);
          this.map4Value = ok.data[3]["photoName"];
          this.setMapUrl(this.map5, ok.data[4], true);
          this.setMapUrl(this.map6, ok.data[5], true);
          this.setMapUrl(this.map7, ok.data[6], true);
          this.setMapUrl(this.map8, ok.data[7], true);
        }
      });
      // axios
      //   .get(config.url.userPhotoFind, {
      //     params: { type: "多期影像对比", userId: localStorage.getItem("id") },
      //   })
      //   .then((res) => {
      //     // debugger;
      //     // 关闭loading
      //     if (res.data.code == 200) {
      //       this.setMapUrl(this.map1, res.data["data"][0], true);
      //       this.map1Value = res.data["data"][0]["photoName"];
      //       this.setMapUrl(this.map2, res.data["data"][1], true);
      //       this.map2Value = res.data["data"][1]["photoName"];
      //       this.setMapUrl(this.map3, res.data["data"][2], true);
      //       this.map3Value = res.data["data"][2]["photoName"];
      //       this.setMapUrl(this.map4, res.data["data"][3], true);
      //       this.map4Value = res.data["data"][3]["photoName"];
      //       this.setMapUrl(this.map5, res.data["data"][4], true);
      //       this.setMapUrl(this.map6, res.data["data"][5], true);
      //       this.setMapUrl(this.map7, res.data["data"][6], true);
      //       this.setMapUrl(this.map8, res.data["data"][7], true);
      //     } else {
      //       this.$message(res.data.msg);
      //     }
      //   })
      //   .catch((error) => {
      //     this.$message({ message: error });
      //   })
      //   .finally(() => {});
    },
    saveDef(s, id) {
      let params = {
        type: "多期影像对比",
        userId: localStorage.getItem("id"),
        sort: s,
        photoId: id,
      };
      userPhotoupdate(params).then((ok) => {});
      // axios
      //   .get(config.url.userPhotoUpdate, {
      //     params: {
      //       type: "多期影像对比",
      //       userId: localStorage.getItem("id"),
      //       sort: s,
      //       photoId: id,
      //     },
      //   })
      //   .then((res) => {})
      //   .catch((error) => {
      //     // 显示错误信息
      //     this.$message({ message: error });
      //   })
      //   .finally(() => {});
    },
    selectMap1(v) {
      // console.log(v, "item");
      this.setMapUrl(this.map1, v, false);
      this.map1Value = v["photoName"];
      this.saveDef(1, v["photoId"]);
    },
    selectMap2(v) {
      this.setMapUrl(this.map2, v, false);
      this.map2Value = v["photoName"];
      this.saveDef(2, v["photoId"]);
    },
    selectMap3(v) {
      this.setMapUrl(this.map3, v, false);
      this.map3Value = v["photoName"];
      this.saveDef(3, v["photoId"]);
    },
    selectMap4(v) {
      this.setMapUrl(this.map4, v, false);
      this.map4Value = v["photoName"];
      this.saveDef(4, v["photoId"]);
    },
    getLayer() {
      userPhotofindAll().then((ok) => {
        if (ok.code == 200) {
          this.dataUrl = ok.data;

          console.info(this.dataUrl);
          console.info(ok.data);
        } else {
          this.$message(ok.data.msg);
        }
      });
      // axios
      //   .get(config.url.userPhoto)
      //   .then((res) => {
      //     // 关闭loading
      //     if (res.data.code == 200) {
      //       this.dataUrl = res.data["data"];
      //       console.info(this.dataUrl);
      //       console.info(res.data["data"]);
      //     } else {
      //       this.$message(res.data.msg);
      //     }
      //   })
      //   .catch((error) => {
      //     // 显示错误信息
      //     this.$message({ message: error });
      //   })
      //   .finally(() => {});
    },
    close() {
      this.$router.back();
    },
    setMapUrl(map, item, first) {
      // console.log(item, "item");
      const customWMTS = new L.supermap.tiledMapLayer(
        // http://10.0.34.5:8084/wp/#/Databig
        `http://10.0.16.14:8091/iserver/services/map-mongodb-${item["photoUrl"]}/rest/maps/${item["photoUrl"]}`,
        {
          noWrap: true,
          format: "png",
        }
      );
      map.addLayer(customWMTS);
      if (!first) {
        // console.log(map, " map.attributionControl");
        map.attributionControl.setPrefix(item["photoName"]);
      } else {
        L.control.attribution({ prefix: item["photoName"] }).addTo(map);
      }
    },
    initMaps() {
      //天地图服务
      let m_VecLayer = L.tileLayer(
        "http://t3.tianditu.com/DataServer?T=img_c&x={x}&y={y}&l={z}&tk=8c6b202e6c1be4cf359a477e7e3c2d27"
      );
      let m_labelLayer = L.tileLayer(
        "http://t3.tianditu.com/DataServer?T=cia_c&x={x}&y={y}&l={z}&tk=8c6b202e6c1be4cf359a477e7e3c2d27"
      );

      var res = [
        1.4078260157100582, 0.7031250000000002, 0.3515625000000001,
        0.17578125000000006, 0.08789062500000003, 0.043945312500000014,
        0.021972656250000007, 0.010986328125000003, 0.005493164062500002,
        0.002746582031250001, 0.0013732910156250004, 6.866455078125002e-4,
        3.433227539062501e-4, 1.7166137695312505e-4, 8.583068847656253e-5,
        4.2915344238281264e-5, 2.1457672119140632e-5, 1.0728836059570316e-5,
        5.364418029785158e-6, 2.682209014892579e-6, 1.3411045074462895e-6,
      ];
      let crs1 = new L.Proj.CRS(
        "EPSG:4326",
        "+proj=longlat +datum=WGS84 +no_defs",
        {
          bounds: L.bounds([-180, -90], [180, 90]),
          origin: L.Point(-180, 90),
          resolutions: res,
        }
      );
      // 创建地图实例
      var option = {
        crs: L.Proj.CRS("EPSG:4326", {
          bounds: L.bounds([-180, -90], [180, 90]), //默认坐标系范围，加载地图范围超出的可以设置为地图范围
          origin: L.point(-180, 90),
        }),
        center: [34, 109],
        zoom: 13,
        minZoom: 1,
        maxZoom: 21,
        attributionControl: false,
      };

      this.map1 = L.map("map1", option);
      this.map2 = L.map("map2", option);
      this.map3 = L.map("map3", option);
      this.map4 = L.map("map4", option);
      this.map5 = L.map("map5", option);
      this.map6 = L.map("map6", option);
      this.map7 = L.map("map7", option);
      this.map8 = L.map("map8", option);
      var maps = [
        this.map1,
        this.map2,
        this.map3,
        this.map4,
        this.map5,
        this.map6,
        this.map7,
        this.map8,
      ];
      this.map4.addLayer(m_VecLayer); //天地图影像
      this.map4.addLayer(m_labelLayer); //天地图标注

      //同步缩放与拖拽
      function mapLink(e) {
        var _this = this;
        maps.map(function (t) {
          t.setView(_this.getCenter(), _this.getZoom());
        });
      }
      maps.map(function (t) {
        t.on({ drag: mapLink, zoom: mapLink });
      });
      this.getDeftLayer();
    },
    getData() {
      let url = this.isQb == "false" ? findByLandCodeQb : findByLandCode;
      let params = {
        code: this.id,
      };
      url(params).then((res) => {
        if (res.code == 200) {
          if (
            res.data.freckleList != undefined &&
            res.data.freckleList.length > 0
          ) {
            this.freckleList = res.data.freckleList;
            this.freckleList.forEach((item, index) => {
              item.lable = index + 1 + "";
            });
            this.tableData1 = res.data.freckleList[0];
            this.tableData2 = res.data.landList;
            var a = wellknown(
              res.data.geomCenter == null
                ? res.data.freckleGeomList[0].center
                : res.data.geomCenter
            );
            var geom = wellknown(
              res.data.geom == null
                ? res.data.freckleGeomList[0].geom
                : res.data.geom
            );
            var d = geom.coordinates;
            let arrayS = [];
            d.forEach((item, index) => {
              let latlngs = [];
              item.forEach((it, index1) => {
                latlngs.push([parseFloat(it[1]), parseFloat(it[0])]);
              });
              arrayS = arrayS.concat(latlngs);
              var rectangle = L.polygon(latlngs, {
                clickable: false,
                color: "rgb(244,214,210)",
                weight: 3,
                opacity: 0.9,
                fillColor: "#FF00FF",
                fillOpacity: 0.0,
              }).addTo(this.map1);
              var text = L.marker(rectangle.getCenter(), {
                icon: L.divIcon({
                  html:
                    "<div style='color: #ffffff;; font-weight:700'>" +
                    this.tbbh +
                    "</div>",
                  iconSize: 0,
                }),
              }).addTo(this.map1);
              this.map1.setView(rectangle.getCenter(), 16);
              var rectangle = L.polygon(latlngs, {
                clickable: false,
                color: "rgb(244,214,210)",
                weight: 3,
                opacity: 0.9,
                fillColor: "#FF00FF",
                fillOpacity: 0.0,
              }).addTo(this.map1);
              var text = L.marker(rectangle.getCenter(), {
                icon: L.divIcon({
                  html:
                    "<div style='color: #ffffff;; font-weight:700'>" +
                    this.tbbh +
                    "</div>",
                  iconSize: 0,
                }),
              }).addTo(this.map1);
              this.map1.setView(rectangle.getCenter(), 16);
              var rectangle = L.polygon(latlngs, {
                clickable: false,
                color: "rgb(244,214,210)",
                weight: 3,
                opacity: 0.9,
                fillColor: "#FF00FF",
                fillOpacity: 0.0,
              }).addTo(this.map1);
              var text = L.marker(rectangle.getCenter(), {
                icon: L.divIcon({
                  html:
                    "<div style='color: #ffffff;; font-weight:700'>" +
                    this.tbbh +
                    "</div>",
                  iconSize: 0,
                }),
              }).addTo(this.map1);
              this.map1.setView(rectangle.getCenter(), 16);
              var rectangle = L.polygon(latlngs, {
                clickable: false,
                color: "rgb(244,214,210)",
                weight: 3,
                opacity: 0.9,
                fillColor: "#FF00FF",
                fillOpacity: 0.0,
              }).addTo(this.map2);
              var text = L.marker(rectangle.getCenter(), {
                icon: L.divIcon({
                  html:
                    "<div style='color: #ffffff;; font-weight:700'>" +
                    this.tbbh +
                    "</div>",
                  iconSize: 0,
                }),
              }).addTo(this.map2);
              this.map2.setView(rectangle.getCenter(), 16);
              var rectangle = L.polygon(latlngs, {
                clickable: false,
                color: "rgb(244,214,210)",
                weight: 3,
                opacity: 0.9,
                fillColor: "#FF00FF",
                fillOpacity: 0.0,
              }).addTo(this.map3);
              var text = L.marker(rectangle.getCenter(), {
                icon: L.divIcon({
                  html:
                    "<div style='color: #ffffff;; font-weight:700'>" +
                    this.tbbh +
                    "</div>",
                  iconSize: 0,
                }),
              }).addTo(this.map3);
              this.map3.setView(rectangle.getCenter(), 16);
              var rectangle = L.polygon(latlngs, {
                clickable: false,
                color: "rgb(244,214,210)",
                weight: 3,
                opacity: 0.9,
                fillColor: "#FF00FF",
                fillOpacity: 0.0,
              }).addTo(this.map4);
              var text = L.marker(rectangle.getCenter(), {
                icon: L.divIcon({
                  html:
                    "<div style='color: #ffffff;; font-weight:700'>" +
                    this.tbbh +
                    "</div>",
                  iconSize: 0,
                }),
              }).addTo(this.map4);
              this.map4.setView(rectangle.getCenter(), 16);
              var rectangle = L.polygon(latlngs, {
                clickable: false,
                color: "rgb(244,214,210)",
                weight: 3,
                opacity: 0.9,
                fillColor: "#FF00FF",
                fillOpacity: 0.0,
              }).addTo(this.map5);
              var text = L.marker(rectangle.getCenter(), {
                icon: L.divIcon({
                  html:
                    "<div style='color: #ffffff;; font-weight:700'>" +
                    this.tbbh +
                    "</div>",
                  iconSize: 0,
                }),
              }).addTo(this.map5);
              this.map5.setView(rectangle.getCenter(), 16);
              var rectangle = L.polygon(latlngs, {
                clickable: false,
                color: "rgb(244,214,210)",
                weight: 3,
                opacity: 0.9,
                fillColor: "#FF00FF",
                fillOpacity: 0.0,
              }).addTo(this.map6);
              var text = L.marker(rectangle.getCenter(), {
                icon: L.divIcon({
                  html:
                    "<div style='color: #ffffff;; font-weight:700'>" +
                    this.tbbh +
                    "</div>",
                  iconSize: 0,
                }),
              }).addTo(this.map6);
              this.map6.setView(rectangle.getCenter(), 16);
              var rectangle = L.polygon(latlngs, {
                clickable: false,
                color: "rgb(244,214,210)",
                weight: 3,
                opacity: 0.9,
                fillColor: "#FF00FF",
                fillOpacity: 0.0,
              }).addTo(this.map7);
              var text = L.marker(rectangle.getCenter(), {
                icon: L.divIcon({
                  html:
                    "<div style='color: #ffffff;; font-weight:700'>" +
                    this.tbbh +
                    "</div>",
                  iconSize: 0,
                }),
              }).addTo(this.map7);
              this.map7.setView(rectangle.getCenter(), 16);
              var rectangle = L.polygon(latlngs, {
                clickable: false,
                color: "rgb(244,214,210)",
                weight: 3,
                opacity: 0.9,
                fillColor: "#FF00FF",
                fillOpacity: 0.0,
              }).addTo(this.map8);
              var text = L.marker(rectangle.getCenter(), {
                icon: L.divIcon({
                  html:
                    "<div style='color: #ffffff;; font-weight:700'>" +
                    this.tbbh +
                    "</div>",
                  iconSize: 0,
                }),
              }).addTo(this.map8);
              this.map8.setView(rectangle.getCenter(), 16);
              // this.map4.flyToBounds(rectangle.getBounds());
            });
          }
        }
      });
    },
    // getData() {
    //   axios
    //     .get(
    //       this.isQb == "false"
    //         ? config.url.findByLandCodeQb
    //         : config.url.findByLandCode,
    //       { params: { code: this.id } }
    //     )
    //     .then((res) => {
    //       // 关闭loading
    //       if (res.data.code == 200) {
    //         if (
    //           res.data.data.freckleList != undefined &&
    //           res.data.data.freckleList.length > 0
    //         ) {
    //           debugger;
    //           this.freckleList = res.data.data.freckleList;
    //           this.freckleList.forEach((item, index) => {
    //             item.lable = index + 1 + "";
    //           });
    //           this.tableData1 = res.data.data.freckleList[0];
    //           this.tableData2 = res.data.data.landList;
    //           var a = wellknown(
    //             res.data.data.geomCenter == null
    //               ? res.data.data.freckleGeomList[0].center
    //               : res.data.data.geomCenter
    //           );
    //           var geom = wellknown(
    //             res.data.data.geom == null
    //               ? res.data.data.freckleGeomList[0].geom
    //               : res.data.data.geom
    //           );
    //           var d = geom.coordinates;
    //           let arrayS = [];
    //           d.forEach((item, index) => {
    //             let latlngs = [];
    //             item.forEach((it, index1) => {
    //               latlngs.push([parseFloat(it[1]), parseFloat(it[0])]);
    //             });
    //             arrayS = arrayS.concat(latlngs);

    //             var rectangle = L.polygon(latlngs, {
    //               clickable: false,
    //               color: "rgb(244,214,210)",
    //               weight: 3,
    //               opacity: 0.9,
    //               fillColor: "#FF00FF",
    //               fillOpacity: 0.0,
    //             }).addTo(this.map1);
    //             var text = L.marker(rectangle.getCenter(), {
    //               icon: L.divIcon({
    //                 html:
    //                   "<div style='color: #ffffff;; font-weight:700'>" +
    //                   this.tbbh +
    //                   "</div>",
    //                 iconSize: 0,
    //               }),
    //             }).addTo(this.map1);

    //             this.map1.setView(rectangle.getCenter(), 16);

    //             var rectangle = L.polygon(latlngs, {
    //               clickable: false,
    //               color: "rgb(244,214,210)",
    //               weight: 3,
    //               opacity: 0.9,
    //               fillColor: "#FF00FF",
    //               fillOpacity: 0.0,
    //             }).addTo(this.map1);
    //             var text = L.marker(rectangle.getCenter(), {
    //               icon: L.divIcon({
    //                 html:
    //                   "<div style='color: #ffffff;; font-weight:700'>" +
    //                   this.tbbh +
    //                   "</div>",
    //                 iconSize: 0,
    //               }),
    //             }).addTo(this.map1);

    //             this.map1.setView(rectangle.getCenter(), 16);

    //             var rectangle = L.polygon(latlngs, {
    //               clickable: false,
    //               color: "rgb(244,214,210)",
    //               weight: 3,
    //               opacity: 0.9,
    //               fillColor: "#FF00FF",
    //               fillOpacity: 0.0,
    //             }).addTo(this.map1);
    //             var text = L.marker(rectangle.getCenter(), {
    //               icon: L.divIcon({
    //                 html:
    //                   "<div style='color: #ffffff;; font-weight:700'>" +
    //                   this.tbbh +
    //                   "</div>",
    //                 iconSize: 0,
    //               }),
    //             }).addTo(this.map1);

    //             this.map1.setView(rectangle.getCenter(), 16);

    //             var rectangle = L.polygon(latlngs, {
    //               clickable: false,
    //               color: "rgb(244,214,210)",
    //               weight: 3,
    //               opacity: 0.9,
    //               fillColor: "#FF00FF",
    //               fillOpacity: 0.0,
    //             }).addTo(this.map2);
    //             var text = L.marker(rectangle.getCenter(), {
    //               icon: L.divIcon({
    //                 html:
    //                   "<div style='color: #ffffff;; font-weight:700'>" +
    //                   this.tbbh +
    //                   "</div>",
    //                 iconSize: 0,
    //               }),
    //             }).addTo(this.map2);

    //             this.map2.setView(rectangle.getCenter(), 16);

    //             var rectangle = L.polygon(latlngs, {
    //               clickable: false,
    //               color: "rgb(244,214,210)",
    //               weight: 3,
    //               opacity: 0.9,
    //               fillColor: "#FF00FF",
    //               fillOpacity: 0.0,
    //             }).addTo(this.map3);
    //             var text = L.marker(rectangle.getCenter(), {
    //               icon: L.divIcon({
    //                 html:
    //                   "<div style='color: #ffffff;; font-weight:700'>" +
    //                   this.tbbh +
    //                   "</div>",
    //                 iconSize: 0,
    //               }),
    //             }).addTo(this.map3);

    //             this.map3.setView(rectangle.getCenter(), 16);

    //             var rectangle = L.polygon(latlngs, {
    //               clickable: false,
    //               color: "rgb(244,214,210)",
    //               weight: 3,
    //               opacity: 0.9,
    //               fillColor: "#FF00FF",
    //               fillOpacity: 0.0,
    //             }).addTo(this.map4);
    //             var text = L.marker(rectangle.getCenter(), {
    //               icon: L.divIcon({
    //                 html:
    //                   "<div style='color: #ffffff;; font-weight:700'>" +
    //                   this.tbbh +
    //                   "</div>",
    //                 iconSize: 0,
    //               }),
    //             }).addTo(this.map4);

    //             this.map4.setView(rectangle.getCenter(), 16);

    //             var rectangle = L.polygon(latlngs, {
    //               clickable: false,
    //               color: "rgb(244,214,210)",
    //               weight: 3,
    //               opacity: 0.9,
    //               fillColor: "#FF00FF",
    //               fillOpacity: 0.0,
    //             }).addTo(this.map5);
    //             var text = L.marker(rectangle.getCenter(), {
    //               icon: L.divIcon({
    //                 html:
    //                   "<div style='color: #ffffff;; font-weight:700'>" +
    //                   this.tbbh +
    //                   "</div>",
    //                 iconSize: 0,
    //               }),
    //             }).addTo(this.map5);

    //             this.map5.setView(rectangle.getCenter(), 16);

    //             var rectangle = L.polygon(latlngs, {
    //               clickable: false,
    //               color: "rgb(244,214,210)",
    //               weight: 3,
    //               opacity: 0.9,
    //               fillColor: "#FF00FF",
    //               fillOpacity: 0.0,
    //             }).addTo(this.map6);
    //             var text = L.marker(rectangle.getCenter(), {
    //               icon: L.divIcon({
    //                 html:
    //                   "<div style='color: #ffffff;; font-weight:700'>" +
    //                   this.tbbh +
    //                   "</div>",
    //                 iconSize: 0,
    //               }),
    //             }).addTo(this.map6);

    //             this.map6.setView(rectangle.getCenter(), 16);

    //             var rectangle = L.polygon(latlngs, {
    //               clickable: false,
    //               color: "rgb(244,214,210)",
    //               weight: 3,
    //               opacity: 0.9,
    //               fillColor: "#FF00FF",
    //               fillOpacity: 0.0,
    //             }).addTo(this.map7);
    //             var text = L.marker(rectangle.getCenter(), {
    //               icon: L.divIcon({
    //                 html:
    //                   "<div style='color: #ffffff;; font-weight:700'>" +
    //                   this.tbbh +
    //                   "</div>",
    //                 iconSize: 0,
    //               }),
    //             }).addTo(this.map7);

    //             this.map7.setView(rectangle.getCenter(), 16);

    //             var rectangle = L.polygon(latlngs, {
    //               clickable: false,
    //               color: "rgb(244,214,210)",
    //               weight: 3,
    //               opacity: 0.9,
    //               fillColor: "#FF00FF",
    //               fillOpacity: 0.0,
    //             }).addTo(this.map8);
    //             var text = L.marker(rectangle.getCenter(), {
    //               icon: L.divIcon({
    //                 html:
    //                   "<div style='color: #ffffff;; font-weight:700'>" +
    //                   this.tbbh +
    //                   "</div>",
    //                 iconSize: 0,
    //               }),
    //             }).addTo(this.map8);

    //             this.map8.setView(rectangle.getCenter(), 16);

    //             // this.map4.flyToBounds(rectangle.getBounds());
    //           });
    //         } else {
    //           this.$message({ message: "未搜索到地块" });
    //         }
    //         // this.cancelremarks = res.data.data.cancelremarks
    //         //传给地图
    //       } else {
    //         this.$message(res.data.msg);
    //       }
    //     })
    //     .catch((error) => {
    //       // 显示错误信息
    //       this.$message({ message: error });
    //     })
    //     .finally(() => {});
    // },
  },
};
</script>

<style scoped>
#top {
  height: 50%;
  width: 100%;
}
#bottom {
  height: 50%;
  width: 100%;
}
.map {
  position: relative;
  height: 432px;
  width: 25%;
  float: left;
}
.map >>> .iclient-leaflet-logo {
  display: none;
}
.select {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 999;
}
.my-box {
  font-size: 12px;
  /*background:red;*/
  /*width:5px;*/
  color: red;
}
</style>
