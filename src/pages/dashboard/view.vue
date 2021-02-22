<!-- 评分详情 -->
<template>
  <div class="personnel" id="assess">
    <div class="KPIAssess">
      <h1>考核评分</h1>
      <h2>{{ tableForm.assignmentMouldName }}</h2>
      <p></p>
      <el-form :model="tableForm.assignmentItems.userItems" ref="tableForm">
        <el-table
          border
          :data="tableForm.assignmentItems"
          ref="table"
          id="table"
          style="width: 100%"
          show-summary
          :summary-method="getSummaries"
          max-height="600"
        >
          <el-table-column :label="tableForm.departmentName">
            <el-table-column fixed prop="kpiName" label="考核内容" min-width="100"></el-table-column>
            <el-table-column fixed prop="score" label="总分" width="100"></el-table-column>
            <el-table-column fixed prop="kaohe" label="考核标准">
              <template slot-scope="scope">
                <div
                  v-for="item in scope.row.memoItems"
                  :key="item.memo"
                  class="boxItem"
                >{{ item.memo }}</div>
              </template>
            </el-table-column>
            <el-table-column
              v-for="(it, index) in tableForm.assignmentItems[0].userItems"
              :label="it.realName"
              :key="index"
              width="100"
              align="center"
              prop="factScore"
            >
              <template slot-scope="scope">{{ scope.row.userItems[index].factScore }}</template>
            </el-table-column>
            <!-- <el-table-column
            fixed="right"
        prop="Assessor"
        label="考评人"
        width="100">
            </el-table-column>-->
          </el-table-column>
        </el-table>
        <div class="button_bottom">
          <el-form-item>
            <!--  <el-button type="primary" @click="submitForm('assignmentItems')"
              >提交</el-button
            >-->
            <el-button @click="exportExcel">下载</el-button>
            <el-button>
              <router-link to="/dashboard">返回</router-link>
            </el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      tableForm: {
        assignmentId: "",
        assignmentMouldName: "",
        assignmentItems: [{}]
      },
      userItems: []
    };
  },

  components: {},
  created() {
    this.getKpiScoreDetail();
  },
  methods: {
    //获取考核评分详情
    getKpiScoreDetail() {
      let assignmentId = { assignmentId: this.$route.query.id };
      this.$http.get("kpi/auth/score/detail", assignmentId).then(res => {
        let data = res.data.data;
        this.tableForm.assignmentId = data.assignmentId;
        this.tableForm.assignmentMouldName = data.assignmentMouldName;
        this.tableForm.assignmentItems = data.assignmentItems;
        this.tableForm.departmentName = `部门: ${
          data.departmentName
        }一考核月度: ${this.$moment(data.assessmentDate).format("MM")}月`;
      });
    },
    getSummaries(param) {
      const { columns, data } = param;
      let sums = [];
      let score = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }

        const values = data.map((item, index) => {
          if (column.property != "factScore") {
            return Number(item[column.property]);
          } else {
            return item.userItems.map((it, i) => {
              return Number(it.factScore);
            });
          }
        });
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return Number(prev) + Number(curr);
            } else {
              return prev;
            }
          }, 0);
        } else {
          if (values.every(val => Array.isArray(val))) {
            score = values.reduce((pre, cur, i, arr) => {
              return this.plus(pre, cur);
            });
          } else {
            sums[index] = "";
          }
        }
      });

      let sumss = [...sums, ...score];
      return sumss;
    },

    plus(a, b) {
      return a.map(function(e, i) {
        return e + b[i];
      });
    },
    submitForm(formName) {
      this.$confirm("确定考核提交吗？提交之后不能修改。", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post("kpi/auth/score/save", JSON.stringify(this.tableForm))
            .then(res => {
              if (res.status == 200) {
                this.$message({
                  type: "success",
                  message: "考核成功"
                });
                this.$router.push("/KPIScore");
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //导出数据
    exportExcel() {
      let wb = XLSX.utils.table_to_book(document.querySelector("#table")); // 这里就是表格
      let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          // "table.xlsx"
          `${this.tableForm.assignmentMouldName}-${this.$moment(this.tableForm.assessmentDate).format("MM")}月.xlsx`
        ); //table是自己导出文件时的命名，随意
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    }
  },
  updated() {
    this.$nextTick(() => {
      this.$refs["table"].doLayout();
    });
  }
};
</script>
<style>
.personnel h1,
h2 {
  /* font-weight: normal; */
  margin: 0;
}
.personnel ul {
  list-style-type: none;
  padding: 0;
}
.personnel li {
  display: inline-block;
  margin: 0 10px;
}
.personnel a {
  color: #42b983;
}
.personnel {
  width: 100%;
  /* height: 100%; */
}
.personnel h1 {
  font-size: 30px;
}

.personnel .divMain .el-form-item__label {
  font-size: 16px;
  font-weight: bold;
}
.KPIAssess {
  background-color: #fff;
  padding: 40px 24px;
  box-sizing: border-box;
}
.KPIAssess h1 {
  padding-bottom: 32px;
}
.KPIAssess h2 {
  text-align: center;
  padding-bottom: 12px;
}
.personnel .divMain .el-input__inner {
  width: 120px;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}
#assess form.el-form .el-table .el-form-item {
  width: 80px;
}
#assess form.el-form .button_bottom .el-form-item {
  margin: 30px auto;
  width: 240px;
}
#assess form.el-form .el-form-item .el-form-item__content button.el-button {
  font-size: 16px;
}
.personnel .divMain .el-button--small,
.el-button--small.is-round {
  height: 40px;
  font-size: 16px;
}
.personnel .el-table th,
.el-table .has-gutter tr:first-child {
  background-color: #fafafa;
  color: #000;
}
.personnel .el-table th,
.el-table {
  color: #000;
  font-size: 14px;
}

.personnel .block {
  margin-top: 32px;
}
.propBox {
  margin: auto;
}
.propBox h2,
.propBox p {
  text-align: center;
}
.propBox .el-form {
  width: 90%;
}
.cell .boxItem:last-child {
  border-bottom: none;
}
.boxItem {
  padding: 10px 0;
  border-bottom: 1px solid #ebeef5;
}
.KPIAssess tbody .el-table__row td:nth-of-type(3) {
  padding: 0;
}
.KPIAssess tbody .el-table__row td:nth-of-type(3) .cell {
  padding: 0;
}
.has-gutter .is-hidden .cell {
  visibility: visible;
}
.el-table td.is-hidden .cell {
  visibility: visible;
}
.KPIAssess tbody .el-table {
  overflow: visible !important;
}
</style>