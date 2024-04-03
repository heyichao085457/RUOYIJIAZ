<template>
  <div class="app-title">
    <div class="app-top">
      <el-card class="box-card" v-for="(item, index) in Datacard" :key="index">
        <img
          src="../../assets/00.png"
          alt=""
          class="item-img"
          @click="boxcardClick(index)"
          v-loading="Datacardnayg"
        />
        <div class="item-name">{{ item.tdwpWjjName }}</div>
      </el-card>
    </div>
  </div>
</template>
  
  <script>
import { tdwpWjjList } from "../../api/document/index";
export default {
  data() {
    return {
      Datacard: [],
      Datacardnayg: false,
      inputon: "",
    };
  },
  mounted() {
    this.tdwpWjjListt();
  },

  methods: {
    tdwpWjjListt() {
      tdwpWjjList().then((ok) => {
        this.Datacard = ok.data;
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
.app-top {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
  padding: 10px;
}

.item-img {
  height: 100%;
  object-fit: cover;
}
.box-card {
  height: 200px;
  position: relative;
}
.item-name {
  position: absolute;
  bottom: 0;
  margin: auto;
  font-size: 14px;
  width: 200px;
  text-align: center;
}
</style>