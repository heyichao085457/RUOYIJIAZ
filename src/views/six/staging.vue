<template>
  <div>
    <div class="quanbu">
      <div
        class="listng"
        v-for="(item, index) in list"
        :key="index"
        :style="{ backgroundImage: 'url(' + item.image + ')' }"
      >
        <div class="listname">{{ item.name }}</div>
        <div class="listage">{{ item.age }}</div>
      </div>
    </div>
    <div class="yiban">
      <div class="xinjian">
        <div class="renwu">
          <el-button type="primary">主要按钮</el-button>
        </div>
        <div class="daiban">
          <div
            v-for="(item, index) in tabs"
            :key="index"
            @click="tabslist(index)"
            :class="{ active: activeTabIndex === index }"
          >
            <div>{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="shuang">
        <div class="primaryy">
          <el-button type="primary">刷新列表</el-button>
        </div>
        <div class="primaryy">
          <el-select
            v-model="whole"
            placeholder="全部任务"
            @change="handleSelectChange"
          >
            <el-option
              v-for="item in wholes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <el-input
            v-model="inpudata"
            placeholder="请输入关键字"
            @input="handleInputChange"
          ></el-input>
        </div>
      </div>
    </div>
    <div v-show="yiban" class="ban">
      <el-empty :image-size="200"></el-empty>
    </div>
    <div v-show="daiban" class="ban">
      <div
        class="wantaskor"
        @click="taskNameonclick(index)"
        v-for="(item, index) in Datalist"
        :key="index"
      >
        <div>
          <div class="taskor">
            <div><img src="../../assets/task2.png" alt="" /></div>
            <div class="Nameie">
              <div class="taskName">{{ item.taskName }}</div>
              <div class="creatshi">
                <div>{{ item.createTime }}</div>
                <div>|</div>
                <div>{{ item.createUnit }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="primaryikan">
          <el-progress
            :text-inside="true"
            :stroke-width="26"
            :percentage="item.rwCompletionRate"
          ></el-progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { listName, taskDataList } from "../../api/login";
export default {
  data() {
    return {
      list: [
        { name: "全部任务", age: 3, image: require("@/assets/1.png") },
        { name: "国家任务", age: 5, image: require("@/assets/2.png") },
        { name: "自建任务", age: 2, image: require("@/assets/3.png") },
        { name: "重点专项任务", age: 6, image: require("@/assets/4.png") },
      ],
      tabs: [{ name: "已办" }, { name: "待办" }],
      activeTabIndex: 0,
      wholes: [],
      whole: "",
      inpudata: "",
      yiban: false,
      daiban: true,
      Datalist: [],
      progressData: {
        progressPercentage: 0, // 初始值
      },
    };
  },
  mounted() {
    this.fetchInitialData(); // 初始加载数据
    taskDataList().then((res) => {
      this.wholes = res.data.RWLX.map((item) => ({
        value: item,
        label: item,
      }));
    });
  },
  methods: {
    fetchInitialData() {
      listName().then((res) => {
        this.Datalist = res.data.map((item) => {
          let rwCompletionRate = item.rwCompletionRate;
          if (typeof rwCompletionRate === "string") {
            // 移除 '%' 符号并转换为数字
            rwCompletionRate = parseFloat(rwCompletionRate.replace("%", ""));
          } else if (typeof rwCompletionRate !== "number") {
            // 如果不是数字，设置为默认值 0
            rwCompletionRate = 0;
          }
          return {
            ...item,
            rwCompletionRate,
          };
        });
      });
    },
    handleInputChange() {
      // 基于输入的数据发送请求
      this.fetchDataBasedOnInput(this.inpudata);
    },
    fetchDataBasedOnInput(input) {
      const params = {
        input: input,
      };
      // 调用 taskDataList 函数
      listName(params).then((res) => {
        this.Datalist = res.data.map((item) => {
          let rwCompletionRate = item.rwCompletionRate;
          if (typeof rwCompletionRate === "string") {
            // 移除 '%' 符号并转换为数字
            rwCompletionRate = parseFloat(rwCompletionRate.replace("%", ""));
          } else if (typeof rwCompletionRate !== "number") {
            // 如果不是数字，设置为默认值 0
            rwCompletionRate = 0;
          }
          return {
            ...item,
            rwCompletionRate: rwCompletionRate,
          };
        });
      });
      this.Datalist = res.data;
    },
    tabslist(selectedIndex) {
      this.activeTabIndex = selectedIndex;
      if (this.activeTabIndex == 0) {
        this.yiban = true;
        this.daiban = false;
      } else if (this.activeTabIndex == 1) {
        this.daiban = true;
        this.yiban = false;
      }
    },
    taskNameonclick(index) {
      if (index === 0) {
        return;
      } else if (index === 1) {
        this.$router.push({ path: this.redirect || "/" });
      }
    },
  },
};
</script>

<style scoped>
.quanbu {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.listng {
  width: 300px;
  height: 50px;
  border-radius: 5px;
  background-color: blue;
  background-size: cover; /* 背景图片覆盖整个 div */
  background-position: center; /* 背景图片居中 */
  background-repeat: no-repeat; /* 背景图片不重复 */
  width: 300px;
  height: 50px;
  border-radius: 5px;
  margin-top: 20px;
  padding: 10px;
}
.yiban {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-top: 20px;
}
.xinjian {
  display: flex;
  justify-content: space-between;
  width: 250px;
}
.daiban {
  width: 100px;
  display: flex;
  justify-content: space-between;
  height: 40px;
  line-height: 40px;
}
.active {
  color: brown;
}
.shuang {
  width: 560px;
  display: flex;
  justify-content: space-between;
}
.ban {
  width: 90%;
  height: 400px;
  margin: 30px auto;
}
.wantaskor {
  border: 1px solid #000;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  margin-top: 10px;
}
.taskor {
  display: flex;
  width: 220px;
  justify-content: space-between;
}
.taskName {
  font-size: 20px;
}
.creatshi {
  width: 200px;
  display: flex;
  justify-content: space-between;
  height: 30px;
  line-height: 30px;
}
.Nameie {
  margin-left: 10px;
}
.primaryikan {
  width: 200px;
  margin-top: 10px;
}
</style>