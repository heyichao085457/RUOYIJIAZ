<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <theme-picker />
  </div>
</template>

<script>
import ThemePicker from "@/components/ThemePicker";

export default {
  name: "App",
  components: { ThemePicker },
  data() {
    return {};
  },
  metaInfo() {
    return {
      title:
        this.$store.state.settings.dynamicTitle &&
        this.$store.state.settings.title,
      titleTemplate: (title) => {
        return title
          ? `${title} - ${process.env.VUE_APP_TITLE}`
          : process.env.VUE_APP_TITLE;
      },
    };
  },
  watch: {
    $route(to, from) {
      // console.log("当前路由 keepAlive 状态:", to.path);
      if (to.path === "/login") {
        localStorage.removeItem("formData");
        localStorage.removeItem("formData1");
        localStorage.removeItem("formData3");
        localStorage.removeItem("formData2");
        localStorage.removeItem("formDatade");
        localStorage.removeItem("formDatahut");
        localStorage.removeItem("formDatarouty");
        localStorage.removeItem("formData13");
        localStorage.removeItem("formDataLIstr");
        localStorage.removeItem("formData9");
        localStorage.removeItem("formData10");
        localStorage.removeItem("formData11");
        localStorage.removeItem("formData12");
      }
    },
  },
  mounted() {
    window.addEventListener("beforeunload", () => {
      localStorage.removeItem("formData");
      localStorage.removeItem("formData1");
      localStorage.removeItem("formData3");
      localStorage.removeItem("formData2");
      localStorage.removeItem("formDatade");
      localStorage.removeItem("formDatahut");
      localStorage.removeItem("formDatarouty");
      localStorage.removeItem("formData13");
      localStorage.removeItem("formDataLIstr");
      localStorage.removeItem("formData9");
      localStorage.removeItem("formData10");
      localStorage.removeItem("formData11");
      localStorage.removeItem("formData12");
    });
    this.handleResize(); // 初始化尺寸处理
    window.addEventListener("resize", _.debounce(this.handleResize, 300));
    window.addEventListener("mousewheel", this.preventZoom, { passive: false });
    window.addEventListener("DOMMouseScroll", this.preventZoom, {
      passive: false,
    });
  },
  methods: {
    handleResize() {
      const $app = this.$refs.app;
      if (!$app) return;
      const docWidth = document.documentElement.clientWidth;
      const docHeight = document.documentElement.clientHeight;
      const scaleRatio = window.devicePixelRatio || 1;

      if (docWidth < 1680 * scaleRatio) {
        let scale = docWidth / scaleRatio / 1920;
        let translateY = (docHeight - 1080 * scale) / 2;
        translateY = translateY > 0 ? `translateY(${translateY}px)` : "";

        $app.style.cssText = `transform: scale(${scale}) ${translateY}; transform-origin: top center;`;
      } else {
        $app.style.cssText = "";
      }
    },
    preventZoom(event) {
      if (event.ctrlKey === true || event.metaKey) {
        event.preventDefault();
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("mousewheel", this.preventZoom);
    window.removeEventListener("DOMMouseScroll", this.preventZoom);
  },
};
</script>
<style >
#app .theme-picker {
  display: none;
}
html,
body {
  overflow: hidden;
  height: 100%;
  width: 100%;
  margin: 0;  
  padding: 0;
}
</style>
