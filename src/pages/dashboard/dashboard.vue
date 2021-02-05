<template>
  <div class="index">
    <h1>基础信息</h1>
    <div class="divMain">
      <el-form
        :inline="true"
        :model="formInline"
        ref="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="模板名称：">
          <el-input
            v-model="formInline.kpiMouldName"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="周期：">
          <el-date-picker
            v-model="formInline.assessmentDate"
            type="month"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择月"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search('formInline')"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="kpiMouldName" label="模板" width="180">
      </el-table-column>
      <!-- <el-table-column prop="startDate" label="开始时间" width="180">
      </el-table-column>
      <el-table-column prop="endDate" label="结束时间"> </el-table-column> -->
      <el-table-column prop="assessmentDate" label="周期"> </el-table-column>
      <el-table-column props="users" label="成员">
        <template slot-scope="scope">
          <span
            v-for="(item, index) in scope.row.personnels"
            :key="item.id"
            v-if="scope.row.personnels.length > 1"
          >
            {{ index > 1 ? "..." : item.realName + "," }}
          </span>
          <span v-else>
            {{ item.realName }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini">
            <router-link
              :to="{ path: '/dashboard/detail', query: { id: scope.row.id } }"
              >查看</router-link
            >
          </el-button>
          <!-- <el-button type="primary" @click="outExe(scope.row)">
            下载
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :hide-on-single-page="value"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageable.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totals"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "dashboard",
  data() {
    return {
      formInline: {
        kpiMouldName: "",
        assessmentDate: "",
      },
      tableData: [],
      value: false,
      currentPage4: 1,
      dialogVisible: false,
      score: "",
      pageable: {
        pageNumber: 1,
        pageSize: 10,
      },
      totals: 40,
    };
  },
  created() {
    this.getKpiScoreList();
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      this.pageable.pageSize = val;
      let data = { ...this.pageable, ...this.formInline };
      this.$http.get("kpi/auth/assignment/list/finished", data).then((res) => {
        this.tableData = res.data.data.data;
      });
    },
    handleCurrentChange(val) {
      this.pageable.pageNumber = val;
      let data = { ...this.pageable, ...this.formInline };
      this.$http.get("kpi/auth/assignment/list/finished", data).then((res) => {
        this.tableData = res.data.data.data;
      });
    },
    outExe(row) {
      this.$confirm("此操作将导出excel文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let id = { assignmentId: row.id };
          this.$http.get("kpi/auth/score/detail", id).then((res) => {
            this.excelData = res.data.data;
            this.export2Excel();
          });
        })
        .catch(() => {});
    },

    // 搜索
    search(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {};
          if (this.formInline.assessmentDate) {
            data = {
              kpiMouldName: this.formInline.kpiMouldName,
              assessmentDate: this.formInline.assessmentDate,
            };
          } else {
            data = {
              kpiMouldName: this.formInline.kpiMouldName,
            };
          }

          data = { ...data, ...this.pageable };
          this.$http
            .get("kpi/auth/assignment/list/finished", data)
            .then((res) => {
              if (res.data.data.data) {
                this.tableData = res.data.data.data;
                this.tableData.map((item) => {
                  item.assessmentDate = this.$moment(
                    item.assessmentDate
                  ).format("MM月");
                  item.endDate = this.$moment(item.endDate).format(
                    "YYYY-MM-DD"
                  );
                  item.startDate = this.$moment(item.startDate).format(
                    "YYYY-MM-DD"
                  );
                  return item;
                });
              } else {
                this.assignmentList = [];
              }
            });
        }
      });
    },

    //下载
    export2Excel() {
      var that = this;
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../excel/Export2Excle"); //这里必须使用绝对路径
        const proHeader = [];
        that.excelData.assignmentItems[0].userItems.forEach((item) => {
          console.log(item.realName);
          proHeader.push(item.realName);
        });
        const tHeader = ["模板名称", "分值", ...proHeader]; // 导出的表头名
        const filterVal = ["kpiName", "score"]; // 导出的表头字段名
        const list = that.excelData.assignmentItems;
        console.log(list);
        const data = that.formatJson(filterVal, list);
        let time1,
          time2 = "";
        if (this.date !== "") {
          time1 = that.$moment(that.date).format("YYYY-MM-DD");
        }
        if (this.endDate !== "") {
          time2 = that.$moment(that.endDate).format("YYYY-MM-DD");
        }
        export_json_to_excel(tHeader, data, `[${time1}-${time2}]绩效考核`); // 导出的表格名称，根据需要自己命名
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },

    // 获取评分列表

    getKpiScoreList() {
      this.$http.get("kpi/auth/assignment/list/finished").then((res) => {
        if (res.data.status == 200) {
          this.tableData = res.data.data.data;
          this.tableData.map((item) => {
            item.assessmentDate = this.$moment(item.assessmentDate).format(
              "MM月"
            );
            item.endDate = this.$moment(item.endDate).format("YYYY-MM-DD");
            item.startDate = this.$moment(item.startDate).format("YYYY-MM-DD");
            return item;
          });
          this.pageable = res.data.data.pageable;
          this.totals = res.data.data.total;
        } else if (res.data.status == 401) {
          this.$message({
            type: "error",
            message: `登录已过期,${res.data.msg}`,
          });
        } else {
          this.$message({
            type: "error",
            message: `${res.data.msg}`,
          });
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index {
  background-color: #fff;
  height: 100%;
  padding: 40px 24px;
  box-sizing: border-box;
}
.index h1 {
  margin: 0;
  font-size: 30px;
}
.index .divMain {
  width: 100%;
  margin-top: 32px;
}
.index form.el-form .el-form-item {
  width: 240px;
}

.index .divMain .el-form-item__label {
  font-size: 16px;
  font-weight: bold;
  width: 40%;
}
.index .divMain .el-form-item__content {
  width: 60%;
}
.index .divMain .el-form-item__content .el-date-editor.el-input {
  width: 100%;
}
.index .divMain .el-form-item:last-child {
  margin-left: 20px;
  width: 200px;
}
.index .divMain .el-form-item:last-child .el-form-item__content {
  width: 100%;
}

.index .divMain .el-input__inner {
  /* width: 120px; */
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}
.index .divMain .el-button--small,
.el-button--small.is-round {
  height: 40px;
  font-size: 16px;
}
.index .divMain form.el-form .el-form-item .el-button + .el-button {
  margin: 0;
}
.index .el-table th,
.el-table .has-gutter tr:first-child {
  background-color: #fafafa;
  color: #000;
}
.index .el-table th,
.el-table {
  color: #000;
  font-size: 14px;
}
.index .block {
  margin-top: 32px;
}
</style>
