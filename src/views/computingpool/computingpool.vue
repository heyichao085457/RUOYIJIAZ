<template>
  <div class="multipleTablelistrow">
    <div class="table-container">
      <el-table
        class="multipleTableheight"
        ref="multipleTable"
        :data="tableData"
        height="800px"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        >
        <el-table-column type="selection"> </el-table-column>
        <el-table-column align="center" label="备注" prop="remarks" width="105">
        </el-table-column>
        <el-table-column align="center" label="市名称" prop="city" width="105">
        </el-table-column>
        <el-table-column
          align="center"
          prop="county"
          label="县名称"
          width="105"
        >
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.county"
              placement="top"
              effect="dark"
            >
              <div class="address-cell">
                {{ scope.row.county }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="startDate"
          label="开始时间"
          width="105"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="结束时间"
          prop="endDate"
          width="105"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="snapdate"
          label="数据时点日期"
          width="105"
        >
        </el-table-column>
        <el-table-column
          width="105"
          align="center"
          prop="checkJobName"
          label="核查工作名称"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="销号状态"
          prop="cancelStatus"
          width="105"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="pdlx"
          label="原判定类型"
          width="105"
        >
        </el-table-column>
        <el-table-column
          width="105"
          align="center"
          prop="checkDetermineResult"
          label="核查后判定类型"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="核查方式"
          prop="checkMethod"
          width="105"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="deductionType"
          label="扣减类型"
          width="105"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="illegalityType"
          label="违法类型"
          width="105"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="其他具体情形"
          prop="qtjtqx "
          width="105"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="最大地块面积"
          prop="freckleInfractionAreaMax "
          width="105"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="最小地块面积"
          prop="freckleInfractionAreaMin "
          width="105"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="最大耕地面积"
          prop="freckleInfractionArableMax "
          width="105"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="最小耕地面积"
          prop="freckleInfractionArableMin "
          width="105"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="最大农田面积"
          prop="freckleInfractionFarmlandMax "
          width="105"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="最小农田面积"
          prop="freckleInfractionFarmlandMin "
          width="105"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="生命周期节点"
          prop="smzqjd"
          width="105"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="审核意见"
          prop="shyj"
          width="105"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="是否问题图斑"
          prop="sfwttb"
          width="105"
        >
        </el-table-column>
        <!-- <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
                >下载</el-button
              >
            </template>
          </el-table-column> -->
      </el-table>
    </div>
    <div style="display: flex">
      <div style="width: 50%">
        <el-row class="title" type="flex" align="middle">
          <div :style="{ marginLeft: '10px' }">
            <el-button type="primary" @click="exportData"
              ><span class="iconfont">&#xe65e;</span> 数 据 导 出</el-button
            >
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>
  <script>
import { computeList, jscId } from "../../api/document/index";
export default {
  data() {
    return {
      tableData: [],
      selectedRows: [],
    };
  },
  activated() {
    this.Addlist();
  },
  mounted() {
    this.Addlist();
  },
  methods: {
    handleSelectionChange(selected) {
      this.selectedRows = selected;
    },
    exportData() {
      if (this.selectedRows.length === 0) {
        this.$message.warning("请至少选择一行数据进行导出");
        return;
      }
      const load = this.$loading({
        background: "rgba(0, 0, 0, 0.8)",
        lock: true,
        text: "正在下载数据请稍等...",
        target: document.querySelector(".el-main"),
      });
      const selectedIdsString = this.selectedRows
        .map((row) => row.id)
        .join(",");

      let paramse = { id: selectedIdsString };
      jscId(paramse).then((ok) => {
        let { msg, code } = ok;
        if (code === 200) {
          let link = document.createElement("a");
          link.href = msg;
          link.download = "your_filename.xlsx";
          link.setAttribute("target", "_blank");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          load.close();
        }
      });
    },
    Addlist() {
      computeList().then((ok) => {
        this.tableData = ok.data;
      });
    },
  },
};
</script>
  
  <style scoped>
.address-cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 105px;
}
.multipleTablelistrow {
  height: 100%;
}
.table-container {
  display: flex;
  flex-direction: column;
  height: 95%;
}
.table-container .multipleTableheight {
  flex: 1;
}
</style>