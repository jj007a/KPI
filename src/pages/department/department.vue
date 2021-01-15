<template>
  <div class="department">
    <div class="departmentContent">
      <h1>部门管理</h1>
      <div class="editProp">
         <el-dialog
        title="添加员工信息"
        :visible.sync="dialogVisible"
        width="40%"
       >
       <div class="propBox">
        <el-form  label-width="100px" :model="editData">
          <el-form-item label="部门名称：">
            <el-input v-model="editData.name"></el-input>
          </el-form-item>
          <el-form-item label="部门负责人：">
            <el-input v-model="editData.manager"></el-input>
          </el-form-item>
        </el-form>
       </div>
        <span slot="footer" class="dialog-footer">
           <el-button type="primary" @click="editDepartment(editData.id)">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
      </div>
     
      <div class="addDepartment">
          <div class="divHeader">
            <div class="departmentName">部门名称</div>
          </div>
          <div class="divMain">
            <div>
              <el-form :model="departmentForm" ref="departmentForm"  class="demo-dynamic">
                <el-form-item
                  prop="name"
                  :rules="{
                    required: true, message: '内容不能为空', trigger: 'blur'
                  }"
                >
                  <el-input placeholder="请输入部门名称" v-model="departmentForm.name"></el-input>
                </el-form-item>
                <el-form-item
                  prop="manager"
                  :rules="{
                    required: true, message: '内容不能为空', trigger: 'blur'
                  }"
                >
                  <el-input placeholder="请输入部门负责人" v-model="departmentForm.manager"></el-input><el-button type="primary" @click.prevent="submitForm('departmentForm')" >提交</el-button>
                </el-form-item>
            </el-form>
            </div>
          </div>
          <div class="departmentList">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="createdDate"
                label="创建日期"
                >
              </el-table-column>
              <el-table-column
                prop="name"
                label="部门名称"
               >
              </el-table-column>
              <el-table-column
                prop="manager"
                label="部门负责人">
              </el-table-column>
               <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row.id)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
            </el-table>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Department from './department'
export default {
  ...Department
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.department h1, h2 {
  /* font-weight: normal; */
  margin: 0;
}
.department ul {
  list-style-type: none;
  padding: 0;
}
.department li {
  display: inline-block;
  margin: 0 10px;
}
.department a {
  color: #42b983;
}
.department{
 width: 100%;
 height: 100%;  
}
.department .departmentContent{
  width: 100%;
  height: 100%; 
  padding: 40px 24px;
  box-sizing: border-box;
  background-color: #fff;
}
.department h1{
  font-size: 30px;
}
.department .divHeader{
  display: flex;
  margin-top: 32px;
}
.department .divHeader .departmentName{
  width: 300px;
  text-align: left;
  height: 32px;
  line-height: 32px;
}
.department .divMain{
  width: 450px;
  margin-top: 32px;
}
.department .divMain form.el-form .el-form-item{
  width: 100%;
}
.department .divMain .el-input{
  width: 60%;
}
.department .divMain .el-input--small .el-input__inner{
  height: 40px;
}
.department button.el-button{
  height: 40px;
  font-size: 14px;
}
.addDepartment button.el-button--primary{
 margin-left: 10px;
}
 .departmentList .el-table th, .el-table .has-gutter tr:first-child{
   background-color: #FAFAFA;
   color: #000;
  }
.departmentList .el-table th, .el-table{
  color: #000;
  font-size: 14px;
}
 .propBox{
    width: 80%;
    margin: auto;
  }
  .propBox .el-form{
    width: 90%;
  }
  .department .propBox form.el-form .el-form-item{
    width: 100%;
  }
  .propBox .el-input--small .el-input__inner{
   height: 40px;
  }
  .department .el-dialog__footer{
    text-align: center;
  }
</style>
