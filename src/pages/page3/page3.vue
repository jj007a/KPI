<template>
   <div class="KPITemplate">
      <div class="KPITemplateContent">
        <h1>绩效考核模板</h1>
        <div class="divMain">
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm"  class="demo-dynamic">
                <div class="templateHeader">
                  <el-form-item
                  prop="templateName"
                  :rules="[
                    { required: true, message: '请输入模板名称', trigger: 'blur' },
                  ]"
                >
                  <el-input v-model="dynamicValidateForm.templateName" placeholder="模板名称"></el-input>
                </el-form-item>
                <el-form-item
                  prop="templateTotalNum"
                  :rules="[
                    { required: true, message: '请输入模板总分', trigger: 'blur' },
                  ]"
                >
                  <el-input v-model="dynamicValidateForm.templateTotalNum" placeholder="模板总分"></el-input>
                </el-form-item>
                </div>
                <div class="templateMain" v-for="(domain, index) in dynamicValidateForm.domains" :key="domain.key">
                  <el-form-item
                  
                  
                  :prop="'domains.' + index + '.value'"
                  :rules="{
                    required: true, message: '填写考核项目', trigger: 'blur'
                  }"
                >
                  <el-input v-model="domain.value" placeholder="填写考核项目"></el-input>
                </el-form-item>
                  <el-form-item
                  
                  :key="domain.key"
                  :prop="'domains.' + index + '.num'"
                  :rules="{
                    required: true, message: '单项考核分数', trigger: 'blur'
                  }"
                >
                  <el-input v-model="domain.num" placeholder="单项考核分数"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>
                </el-form-item>
                </div>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
                  <el-button @click="addDomain">新增考核项目</el-button>
                </el-form-item>
            </el-form>
        </div>
      </div>
      <div class="KPITemplateContentRight">
          <el-card class="box-card" v-for="a in 4" :key="a">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0" type="text" class="">
                <el-dropdown>
                <span class="el-dropdown-link">
                  <i class="el-icon-arrow-down el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>编辑</el-dropdown-item>
                  <el-dropdown-item>查看</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              </el-button>
            </div>
            <div v-for="(o,index) in 4" :key="o" class="text item" v-if="index<=1">
                编制销售转账凭证及应收对账: <span style="color:red">10分</span>
            </div>
          </el-card>
      </div>
    </div>
</template>

<script>
import Page3 from "./page3";
export default {
  ...Page3
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.KPITemplate h1, h2 {
    /* font-weight: normal; */
    margin: 0;
  }
  .KPITemplate ul {
    list-style-type: none;
    padding: 0;
  }
  .KPITemplate li {
    display: inline-block;
    margin: 0 10px;
  }
  .KPITemplate a {
    color: #42b983;
  }
  .KPITemplate{
  width: 100%;
  height: 100%;  
  display: flex;
  }
  .KPITemplateContent{
    width: 60%;
    height: 100%; 
    padding: 40px 24px;
    box-sizing: border-box;
    background-color: #fff;
  }
  .KPITemplateContentRight{
    width: 40%;
    height: 100%; 
    padding:  24px;
    box-sizing: border-box;
    overflow: auto;
  } 
  .KPITemplate h1{
    font-size: 30px;
  }
  .KPITemplate .el-button--mini, .el-button--small{
    font-size: 14px;
  }
  .KPITemplate .divMain{
    width:100%;
    margin-top: 32px;
  }
  .KPITemplate .divMain .templateHeader{
    display: flex;
  }
  .KPITemplate .divMain .templateHeader{
    display: flex;
  }
  .KPITemplate .divMain  .el-form-item{
     font-size: 16px;
     width: 80%;
  }
  .KPITemplate .divMain  .el-form-item:last-child{
     width: 100%;
  }
  .KPITemplate .divMain  .el-form-item .el-input--small .el-input__inner{
     height: 40px;
  }
  .KPITemplate .templateHeader  .el-form-item:last-child{
      width: 15%;
      margin-left: 20px;
  }
  .KPITemplate .templateMain {
      display: flex;
      
  }
  .KPITemplate .templateMain .el-form-item:last-child {
     margin-left: 20px;
     width: 65%;
  }
  .KPITemplate .templateMain .el-form-item:last-child .el-input{
      width: 110px;
      margin-right: 20px;
  }
  .KPITemplateContentRight .el-card{
    margin-bottom: 20px;
  }
</style>
