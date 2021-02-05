<!--  -->
<template>
  <div class="personnel">
    <div class="personnelContent">
      <el-dialog :title="propTitle" :visible.sync="dialogVisible" width="40%">
        <div class="propBox">
          <el-form label-width="80px" :model="tableData">
            <el-form-item label="类型名称:">
              <el-input v-model="tableData.categoryName"></el-input>
            </el-form-item>
            <el-form-item label="职责描述:">
              <el-input v-model="tableData.responsibility"></el-input>
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
      <h1>用户类型</h1>
      <div class="divMain">
        <el-form :inline="true" :model="pageable" ref="pageable" class="demo-form-inline">
          <el-form-item label="姓名：">
            <el-input v-model="pageable.searchPropertyValue" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search('pageable')">查询</el-button>
            <el-button type="primary" @click="addProp" v-if="isAdd">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table class="animated bounceInDown" :data="personList" style="width: 100%">
        <el-table-column prop="responsibility" label="类型名称" width="180"></el-table-column>
        <el-table-column prop="categoryName" label="职责描述" width="180"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              v-if="isDel"
            >删除</el-button>
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
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "page1",
  data() {
    return {
      formInline: {},
      departmentData: [],
      tableData: {
        responsibility: "",
        categoryName: ""
      },
      rolesId: "",
      value: false,
      currentPage4: 1,
      dialogVisible: false,
      personList: [],
      roleList: [],
      editShow: false,
      addShow: true,
      propTitle: "添加人员",
      pageable: {
        pageNumber: 1,
        pageSize: 10,
        searchPropertyValue: "",
        searchProperty: "u.realName"
      },
      totals: 40,
      isDel: false,
      isAdd: false
    };
  },
  created() {
    this.personInfo();
    this.authority();
  },
  methods: {
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.tableData = {
        responsibility: "",
        categoryName: ""
      };
      this.$http
        .get("kpi/auth/user_category/detail", { id: row.id })
        .then(res => {
          if (res.data.data) {
            this.tableData = res.data.data;
          }
        });
    },

    // 删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post("kpi/auth/user_category/delete", { id: row.id })
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.personInfo();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 显示一页数量
    handleSizeChange(val) {
      this.pageable.pageSize = val;
      this.$http.get("kpi/auth/user/list", this.pageable).then(res => {
        this.personList = res.data.data.data;
      });
    },
    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageable.pageNumber = val;
      this.$http.get("kpi/auth/user/list", this.pageable).then(res => {
        if (res.data.data) {
          this.personList = res.data.data.data;
        }
      });
    },
    // 搜索
    search(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.pageable.searchProperty = "u.realName";
          this.pageable.searchPropertyValue = this.pageable.searchPropertyValue;
          this.$http.get("kpi/auth/user/list", this.pageable).then(res => {
            if (res.data.data.data) {
              this.personList = res.data.data.data;
            } else {
              this.personList = [];
            }
          });
        }
      });
    },
    //初始化人员数据
    personInfo() {
      this.$http.get("kpi/auth/user_category/list", this.pageable).then(res => {
        if (res.data.status == 200) {
          this.personList = res.data.data.data;
          this.pageable = res.data.data.pageable;
          this.totals = res.data.data.total;
        } else if (res.data.status == 401) {
          this.$message({
            type: "error",
            message: `登录已过期,${res.data.msg}`
          });
          this.$store.dispatch("LoginOut");
          this.$router.push("/login");
        } else {
          this.$message({
            type: "error",
            message: `${res.data.msg}`
          });
        }
      });
    },
    //添加 弹窗
    addProp() {
      this.dialogVisible = true;
      this.addShow = true;
      this.editShow = false;
      this.tableData = {
        categoryName: "",
        responsibility: ""
      };
    },

    // 添加
    addPerson() {
      this.$http
        .post("kpi/auth/user_category/save", JSON.stringify(this.tableData))
        .then(res => {
          if (res.data.status == 200) {
            this.dialogVisible = false;
            this.$message({
              type: "success",
              message: "添加成功"
            });
            this.tableData = {
              responsibility: "",
              categoryName: ""
            };
            this.personInfo();
          } else {
            this.$message({
              type: "error",
              message: res.data.data
            });
          }
        });
    },
    // 编辑
    editPerson() {
      this.$http
        .post("kpi/auth/user_category/update", JSON.stringify(this.tableData))
        .then(res => {
          if (res.data.status == 200) {
            this.dialogVisible = false;
            this.$message({
              type: "success",
              message: "编辑成功!"
            });
            this.tableData = {
              responsibility: "",
              categoryName: ""
            };
            this.addShow = true;
            this.editShow = false;
            this.propTitle = "添加人员";
            this.personInfo();
          }
        });
    },
    authority() {
      if (this.$store.getters.roles.length > 0) {
        const roles = this.$store.getters.roles;
        console.log(roles);
        roles[0].permissions.forEach(item => {
          switch (item.permCode) {
            case "perms[user:delete]":
              this.isDel = true;
              break;
            case "perms[user:add]":
              this.isAdd = true;
              break;
          }
        });
      }
    }
  }
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
  height: 100%;
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
  width: 230px;
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