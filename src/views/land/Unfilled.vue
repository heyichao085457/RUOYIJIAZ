<template>
  <div class="poler">
    <div class="top">
      <el-form ref="form" :model="formData" label-width="80px">
        <div>
          <el-row class="title" type="flex" align="middle">
            <el-col :span="4">
              <el-form-item label="">
                <el-cascader
                  clearable
                  v-model="selectXZQ"
                  :options="xzq"
                  :style="{ width: '200px', height: '40px' }"
                  :props="{
                    value: 'dictName',
                    children: 'dataList',
                    label: 'dictName',
                    checkStrictly: true,
                  }"
                  placeholder="请选择行政区"
                  @change="handleChangeXzq"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="">
                <el-select
                  v-model="formData.checkMethod"
                  placeholder="乡镇"
                  clearable
                >
                  <el-option
                    v-for="item in hcfs"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :style="{ width: '100%' }"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="">
                <el-select
                  v-model="formData.checkMethod"
                  placeholder="请选择时间筛选"
                  clearable
                >
                  <el-option
                    v-for="item in hcfs"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :style="{ width: '200px', height: '40px' }"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div :style="{ marginLeft: '20px' }">
                <el-input
                  placeholder="请输入检测编号关键字搜索"
                  v-model="input2"
                >
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
            </el-col>
            <el-col :span="2">
              <div :style="{ marginLeft: '20px' }">
                <el-button type="primary" icon="el-icon-search"
                  >条件筛选</el-button
                >
              </div>
            </el-col>
            <el-col :span="1">
              <div :style="{ marginLeft: '10px' }">总数<span>2</span>个</div>
            </el-col>
            <el-col :span="1">
              <div :style="{ marginLeft: '10px' }">筛选<span>2</span>个</div>
            </el-col>

            <el-col :span="3">
              <div :style="{ marginLeft: '100px' }">
                <el-button type="success"
                  ><i class="el-icon-location"></i>地图</el-button
                >
              </div>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <div class="scrollable-tab-content">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="序号" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="所属县区" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地块编号" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="地块标识" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="核查节点" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="地块面积" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="判定类型" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="核查状态" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="违法类型" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="合法具体情形"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="违法实际用途"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="address" label="分发至" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="质检结果" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="质检描述" show-overflow-tooltip>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
            >
              <el-button type="success">详情</el-button>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <div class="block">
        <div>111</div>
        <div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[20, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="allData.length"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Unfilled",
  data() {
    return {
      formData: [],
      tableData: [],
      currentPage: 1, // 当前页
      pageSize: 20, // 每页显示条数
      total: 0, // 总条数
      allData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
      ], // 存储所有数据
    };
  },
  created() {
    this.updateTableData();
  },
  watch: {
    // 监听表格数据的变化
    tableData(newVal) {
      this.total = newVal.length; // 更新总条数
    },
  },
  methods: {
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.updateTableData();
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
      this.updateTableData();
    },
    updateTableData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.tableData = this.allData.slice(startIndex, endIndex);
    },
  },
};
</script>

<style scoped>
.el-row--flex.is-align-middle {
  align-items: initial !important; /* 或者您希望的任何值 */
}
.el-col-1 {
  line-height: 41px;
}
.scrollable-tab-content {
  max-height: 710px;
  overflow-y: auto;
}

.block {
  display: flex;
  justify-content: space-between;
}
</style>