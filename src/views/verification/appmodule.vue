<template>
  <div>
    <el-empty
      :image="emptyImage"
      :image-size="900"
      description="拼命开发中........."
    ></el-empty>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emptyImage: "/img/chaor.gif",
    };
  },
};
</script>

<style>
</style>