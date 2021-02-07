<!--  -->
<template>
  <div class="personnel">
    <div class="personnelContent">
      <el-dialog :title="propTitle" :visible.sync="dialogVisible" width="40%">
        <div class="propBox">
          <el-form label-width="80px" :model="tableData">
            <el-form-item label="权限代码">
              <el-input v-model="tableData.permCode"></el-input>
            </el-form-item>
            <el-form-item label="权限名称：">
              <el-input v-model="tableData.permName"></el-input>
            </el-form-item>
            <el-form-item label="请求路径：">
              <el-input v-model="tableData.requestPath"></el-input>
            </el-form-item>
          </el-form>
        </div>

        <span slot="footer" class="dialog-footer" v-if="addShow">
          <el-button type="primary" @click="addPerson">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
        <span slot="footer" class="dialog-footer" v-if="editShow">
          <el-button type="primary" @click="editPerson">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
      <h1>权限管理</h1>
      <div class="divMain">
        <el-button type="primary" @click="dialogVisible = true">添加</el-button>
      </div>
      <el-table
        class="animated bounceInDown"
        :data="jurisdictionList"
        style="width: 100%"
      >
        <el-table-column prop="permName" label="权限名称" width="180">
        </el-table-column>
        <el-table-column prop="permCode" label="权限代码" width="180">
        </el-table-column>
        <el-table-column prop="requestPath" label="权限路径"> </el-table-column>
        <el-table-column label="操作">
          <!-- <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >设置</el-button
            >
          </template> -->
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
              type="danger"
              >删除</el-button
            >
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
  </div>
</template>

<script>
export default {
  name: "page1",
  data() {
    return {
      tableData: {
        permCode: "",
        permName: "",
        requestPath: "",
      },
      value: false,
      propTitle: "权限添加",
      currentPage4: 1,
      dialogVisible: false,
      jurisdictionList: [],
      editShow: false,
      addShow: true,
      pageable: {
        pageNumber: 1,
        pageSize: 10,
        /* searchPropertyValue:"",
                searchProperty:'u.realName', */
      },
      totals: 40,
      disabled:true
    };
  },
  created() {
    this.jurisdictionInfo();
  },
  methods: {
   /*  handleEdit(index, row) {
      this.dialogVisible = true;
      this.$http.get("kpi/auth/user/detail", { id: row.id }).then((res) => {
        this.tableData = res.data.data;
        this.addShow = false;
        this.editShow = true;
        this.propTitle = "编辑人员";
      });
    }, */
    // 删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除模板, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http
            .post("/kpi/auth/permission/delete", { id: row.id })
            .then((res) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.jurisdictionInfo();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 显示一页数量
    handleSizeChange(val) {
      this.pageable.pageSize = val;
      this.$http.get("kpi/auth/permission/list", this.pageable).then((res) => {
        console.log(res, "23");
        this.jurisdictionList = res.data.data.data;
        this.pageable = res.data.data.pageable;
      });
    },
    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageable.pageNumber = val;
      this.$http.get("kpi/auth/permission/list", this.pageable).then((res) => {
        if (res.data.data) {
          this.jurisdictionList = res.data.data.data;
          this.pageable = res.data.data.pageable;
        }
      });
    },
    /*   // 搜索
    search(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.pageable.searchProperty = "u.realName";
          this.pageable.searchPropertyValue = this.pageable.searchPropertyValue;
          this.$http.get("kpi/auth/user/list", this.pageable).then((res) => {
            if (res.data.data.data) {
              this.personList = res.data.data.data;
            } else {
              this.personList = [];
            }
          });
        }
      });
    }, */
    //初始化权限列表
    jurisdictionInfo() {
      this.$http.get("kpi/auth/permission/list", this.pageable).then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          this.jurisdictionList = res.data.data.data;
          this.pageable = res.data.data.pageable;
          console.log(this.pageable, "2233");
          this.totals = res.data.data.total;
        } else if (res.data.status == 401) {
          this.$message({
            type: "error",
            message: `登录已过期,${res.data.msg}`,
          });
          this.$store.dispatch("LoginOut");
          this.$router.push("/login");
        } else {
          this.$message({
            type: "error",
            message: `${res.data.msg}`,
          });
        }
      });
    },
    // 添加
    addPerson() {
       this.disabled= true;
      this.$http
        .post("kpi/auth/permission/save", JSON.stringify(this.tableData))
        .then((res) => {
         
          if (res.data.status == 200) {
            this.disabled= false;
            this.dialogVisible = false;
            this.$message({
              type: "success",
              message: "添加成功",
            });
            this.tableData = {
              permCode: "",
              permName: "",
              requestPath: "",
            };
            this.jurisdictionInfo();
          }else{
                this.disabled = false;
                this.$message({
                    type: 'error',
                    message: `${res.data.msg}${res.data.data}`
                });
            }
        });
    },
    // 编辑
    editPerson() {
      this.disabled= true;
      this.$http
        .post("kpi/auth/user/update", JSON.stringify(this.tableData))
        .then((res) => {
          
          if (res.data.status == 200) {
            this.disabled= false;
            this.dialogVisible = false;
            this.$message({
              type: "success",
              message: "编辑成功!",
            });
            this.tableData = {
              department: {
                id: "",
              },
              realName: "",
              position: "",
              username: "",
            };
            this.addShow = true;
            this.editShow = false;
            this.propTitle = "添加人员";
            this.jurisdictionInfo();
          }else{
                this.disabled = false;
                this.$message({
                    type: 'error',
                    message: `${res.data.msg}${res.data.data}`
                });
            }
        });
    },
  },
};
</script>
<style >
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
.personnelContent {
  width: 100%;
  padding: 40px 24px;
  box-sizing: border-box;
  background-color: #fff;
}
.personnel h1 {
  font-size: 30px;
}
.personnel .divMain {
  width: 100%;
  margin-top: 32px;
}
.personnel form.el-form .el-form-item {
  width: 240px;
}
.personnel .divMain .el-form-item__label {
  font-size: 16px;
  font-weight: bold;
  width: 40%;
}
.personnel .divMain .el-form-item__content {
  width: 60%;
}
.personnel .divMain .el-form-item:last-child {
  margin-left: 20px;
  width: 200px;
}
.personnel .divMain .el-form-item:last-child .el-form-item__content {
  width: 100%;
}
.propBox .el-select {
  width: 100%;
}
.personnel .divMain .el-input__inner {
  /* width: 120px; */
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}
.personnel .divMain .el-button--small,
.el-button--small.is-round {
  height: 40px;
  font-size: 16px;
}
.personnel .divMain form.el-form .el-form-item .el-button + .el-button {
  margin: 0;
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
  width: 80%;
  margin: auto;
}
.propBox .el-form {
  width: 90%;
}
.personnel .propBox form.el-form .el-form-item {
  width: 100%;
}
.propBox .el-input--small .el-input__inner {
  height: 40px;
}
.personnel .el-dialog__footer {
  text-align: center;
}
.personnelContent .el-button {
  height: 40px;
  font-size: 16px;
}
</style>