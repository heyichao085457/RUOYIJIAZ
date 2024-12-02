<template>
  <div>
    <div class="map" id="map"></div>
    <!-- <div id="chk" class="chk">
      <label for="checkbox1"
        ><input
          type="checkbox"
          id="checkbox1"
          class="lyrCheckbox"
          checked="checked"
        />下发图斑</label
      >
      <label for="checkbox2"
        ><input
          type="checkbox"
          id="checkbox2"
          class="lyrCheckbox"
          checked="checked"
        />填报地块</label
      >
      <label for="checkbox3"
        ><input
          type="checkbox"
          id="checkbox3"
          class="lyrCheckbox"
          checked="checked"
        />2022年地块</label
      >
      <label for="checkbox4"
        ><input
          type="checkbox"
          id="checkbox4"
          class="lyrCheckbox"
          checked="checked"
        />2023年地块</label
      >
    </div> -->
    <!-- <div id="multimap">
      <el-button @click="openSmzq" type="primary" v-if="show">全生命周期分析</el-button>
      <el-button @click="openTbxq" type="success" v-if="show">图斑详情</el-button>
      <el-button @click="openMap">多期影像分屏对比</el-button>
    </div> -->
    <div class="listrow">
      <el-button-group>
        <el-button type="primary" plain @click="openMap"
          >多期影像分屏对比</el-button
        >
      </el-button-group>
    </div>
  </div>
</template>

<script>
import { loadMap } from "../api/map/loadMap";
export default {
  data() {
    return { id: "", isQb: "", show: false, tbbh: "" };
  },
  methods: {
    openMap() {
      this.$router.push({
        path:
          "/map_multiScreen?id=" +
          this.id +
          "&isQb=" +
          this.isQb +
          "&tbbh=" +
          this.tbbh,
      });
    },
    openSmzq() {
      this.$emit("openSmzq", {});
    },
    openTbxq() {
      this.$emit("openTbxq", {});
    },
    showButton(show) {
      this.show = show;
    },
  },

  mounted() {
    this.id = this.$route.query.landCode;
    this.isQb = true; // this.$route.query.isQb;
    this.tbbh = this.$route.query.tbbh;
    loadMap();
  },
};
</script>

<style scoped>
@import url("../api/map/mapbox-gl/mapbox-gl.css");
label {
  color: white;
}
#multimap {
  position: absolute;
  z-index: 66;
  right: 20px;
  top: 12.8%;
}
.chk {
  position: absolute;
  z-index: 66;
  top: 12.5%;
  left: 220px;
}
.map {
  position: relative;
  width: 100%;
  height: 100%;
}
.listrow {
  width: 100px;
  position: absolute;
  top: 10px;
  left: 8px;
}
.map >>> .mapboxgl-ctrl-logo {
  display: none !important;
}
</style>
