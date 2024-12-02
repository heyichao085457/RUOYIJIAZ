<template>
  <div class="container">
    <div class="line"></div>
    <div class="sellect">
      <el-form ref="form" :model="Actualuse" label-width="55px">
        <div>
          <el-row class="title" type="flex" align="middle">
            <el-col :span="4" :style="{ marginLeft: '15px' }">
              <el-input
                size="medium"
                placeholder=""
                v-model.trim="Actualuse.dkOrTb"
                clearable
                @keydown.native="handleKeyDown"
              >
              </el-input>
            </el-col>
            <el-col :span="4" :style="{ marginLeft: '5px' }">
              <el-button type="primary" @click="query">查询</el-button>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-row>
            <div class="iconfontlist"></div>
          </el-row>
        </div>
      </el-form>
    </div>
    <div class="line1"></div>
    <div class="table-container">
      <el-table
        align="center"
        class="tableDatalistrow"
        stripe
        height="600"
        :data="tableData"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          prop="index1"
          label="序号"
          type="index"
          align="center"
          :resizable="false"
          width="70"
        >
        </el-table-column>

        <el-table-column
          prop="landCode"
          :resizable="false"
          align="center"
          label="地块编号"
          width="200"
        />

        <el-table-column
          prop="freckleCode"
          :resizable="false"
          align="center"
          label="图斑编号"
          width="200"
        />
        <el-table-column
          prop="tdzl"
          :resizable="false"
          align="center"
          label="土地坐落"
          width="200"
        />
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          :resizable="false"
        >
          <template slot="header" slot-scope="">
            <el-tag @click="Add">添加</el-tag>
          </template>
          <template slot-scope="scope">
            <el-button
              @click="handleEditClick(scope.row)"
              class="button"
              type="text"
              >修改</el-button
            >
            <el-button
              @click="handledelete(scope.row)"
              class="button"
              type="text"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="flexlist">
      <div style="width: 50%; height: 30px">
        <el-row class="title" type="flex" align="middle"> </el-row>
      </div>
      <div style="width: 50%">
        <el-pagination
          @size-change="handleSizeli"
          @current-change="handleCurrentChange"
          :current-page="Actualuse.pageNum"
          :page-sizes="[20, 50, 100]"
          :page-size="Actualuse.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>

    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
      >
        <el-form-item label="地块编号">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="图斑编号">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
        <el-form-item label="土地坐落">
          <el-input v-model="formLabelAlign.tdzl"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleupdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>      
<script>
import {
  sjupdate,
  wzgwttbglq,
  wzgwttbadd,
  wzgwttbids,
} from "@/api/document/index";
export default {
  components: {},
  data() {
    return {
      labelPosition: "left",
      tableData: [],
      total: 0,
      Actualuse: {
        pageSize: 20,
        pageNum: 1,
        dkOrTb: "",
      },
      title: "",
      formLabelAlign: {
        name: "",
        region: "",
        tdzl: "",
      },
      dialogVisible: false,
      rowid: "",
    };
  },
  created() {},

  mounted() {
    this.findAll();
  },

  methods: {
    query() {
      this.findAll();
    },
    findAll() {
      wzgwttbglq(this.Actualuse).then((ok) => {
        this.tableData = ok.data.rows;
        this.total = ok.data.total;
      });
    },
    handleSizeli(value) {
      this.Actualuse.pageSize = value;
      this.findAll();
    },
    handleCurrentChange(value) {
      this.Actualuse.pageNum = value;
      this.findAll();
    },
    handleEditClick(row) {
      //   console.log(row);
      this.dialogVisible = true;
      this.rowid = row.id;
      this.title = "修改";
      this.formLabelAlign.name = row.oneLevel;
      this.formLabelAlign.region = row.twoLevel;
    },
    handledelete(row) {
      let id = row.id;
      wzgwttbids(id).then((ok) => {
        if (ok.code == 200) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.findAll();
        }
      });
    },
    Add() {
      this.formLabelAlign.name = "";
      this.formLabelAlign.region = "";
      this.dialogVisible = true;
      this.title = "添加";
    },
    dialogVisibleupdate() {
      let data = {
        landCode: this.formLabelAlign.name,
        freckleCode: this.formLabelAlign.region,
        tdzl: this.formLabelAlign.tdzl,
      };
      if (this.title == "修改") {
        sjupdate(data).then((ok) => {
          if (ok.code == 200) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.dialogVisible = false;
            this.findAll();
          }
        });
      } else if (this.title == "添加") {
        wzgwttbadd(data).then((ok) => {
          if (ok.code == 200) {
            this.$message({
              message: "添加成功",
              type: "success",
            });
            this.dialogVisible = false;
            this.findAll();
          }
        });
      }
    },
  },
};
</script>
          
<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.sellect {
  padding: 12px 10px 10px 10px;
  height: 60px;
}
.table-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
}

.tableDatalistrow {
  flex: 1;
}
.flexlist {
  display: flex;
  height: 50px;
  font-size: 14px;
  background-color: white;
  padding: 0px 10px;
  align-items: center;
}
.elformer >>> .el-col-24 {
  height: 44px;
}
.primaryli {
  display: flex;
  justify-content: space-evenly;
}
.line {
  width: 100%;
  height: 1px;
  background: #eff2f5;
}

.line1 {
  width: 99%;
  height: 1px;
  background: #eff2f5;
  margin-left: 10px;
  margin-right: 10px;
}

.block {
  height: 39px;
}
.blocklist {
  text-align: center;
  line-height: 35px;
  border-left: 2px solid #2e83f0;
}
.title {
  height: 40px;
  width: 100%;
}

.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 0px;
}

.el-pagination {
  margin-top: 10px;
  text-align: end;
  margin-right: 10px;
}

.iconfont {
  display: inline-block;
  transform: rotate(180deg);
}

.button el-button .button-hover {
  /* 悬浮效果样式 */

  background-color: #e6f7ff;
  border-color: #91d5ff;
  color: #1890ff;
}

.shujvkuguanli_table .el-table {
  font-weight: 500 !important;
  font-size: 12px !important;
  color: #232323 !important;
}

/* 数据库管理中table的样式（包含多选框和输入框） */
/* 将 上下pading值调空 */
.shujvkuguanli_table .el-table .el-table__cell {
  padding: 0px 0 !important;
  color: #232323;
  height: 20px !important;
}

/* 将表头高度调低 */
.shujvkuguanli_table .el-table th.el-table__cell > .cell {
  height: 20px !important;
  background-color: #8fb0eb;
  color: #232323;
  font-weight: 500;
}

/* 调表格内行的高度 */
.shujvkuguanli_table .el-table td.el-table__cell div {
  box-sizing: border-box;
  height: 20px !important;
}

/* 第一列index的样式 */
.shujvkuguanli_table .el-table--border .el-table__cell:first-child .cell {
  padding-left: 0 !important;
  background-color: transparent;
}

.shujvkuguanli_table
  .el-table--striped
  .el-table__body
  tr.el-table__row--striped
  td.el-table__cell {
  background: #ddecff !important;
}

/* 修改斑马纹高亮颜色 */
.shujvkuguanli_table
  .el-table--striped
  .el-table__body
  tr.el-table__row--striped:hover
  > td {
  background: #8fb0eb !important;
}

/* 修改非斑马纹行的高亮颜色 */
.shujvkuguanli_table .el-table__body tr:hover > td {
  background-color: #8fb0eb !important;
}

/* 第一列选择框选择区域外的样式 */
.shujvkuguanli_table .el-checkbox:last-of-type {
  background-color: #ffffff;
  margin-top: -2px;
  overflow: hidden;
}

/* 当表格里面有输入框时的样式 */
.shujvkuguanli_table .el-input--mini .el-input__inner {
  height: 20px;
  padding: 0px 0px !important;
  border: 0px solid #ffffff !important;
  line-height: 1px;
  background-color: transparent !important;
  text-align: center !important;
}

.shujvkuguanli_table .el-checkbox__inner {
  padding: 0px 0px !important;
  border: 1px solid #232323;
}

.inp {
  border-color: rgb(220, 223, 230);
  width: 120px;
  height: 27px;
  margin-top: 18px;
}

.upload {
  margin-bottom: 20px;
}
.address-cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}
</style>
          