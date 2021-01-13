<template>
  <div class="department">
    <div class="departmentContent">
      <h1>部门管理</h1>
      <div class="addDepartment">
          <div class="divHeader">
            <div class="departmentName">部门名称</div>
            <div>
              <el-button type="primary" @click="addDomain">添加部门</el-button>
            </div>
          </div>
          <div class="divMain">
            <div>
              <el-form :model="dynamicValidateForm" ref="dynamicValidateForm"  class="demo-dynamic">
                <el-form-item
                  v-for="(domain, index) in dynamicValidateForm.domains"
                  :key="domain.key"
                  :prop="'domains.' + index + '.value'"
                  :rules="{
                    required: true, message: '内容不能为空', trigger: 'blur'
                  }"
                >
                  
                  <el-input placeholder="请输入部门名称" v-model="domain.value"></el-input><el-button type="primary" >提交</el-button><el-button @click.prevent="removeDomain(domain)">删除</el-button>
                </el-form-item>
            </el-form>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Department from "./department";
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

</style>
