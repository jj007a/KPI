<template>
  <div class="KPITemplate">
    <div class="KPITemplateContent">
      <h1>{{ header }}</h1>
      <div class="divMain">
        <el-form
          :model="dynamicValidateForm"
          ref="dynamicValidateForm"
          class="demo-dynamic"
        >
        <!--   <div class="selectDep">
            <el-select
              v-model="department.id"
            >
              <el-option
                v-for="item in tableData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                disabled
              >
              </el-option>
            </el-select>
          </div> -->
          <div class="templateHeader">
            <el-form-item
              prop="mouldName"
              :rules="[
                { required: true, message: '请输入模板名称', trigger: 'blur' },
              ]"
            >
              <el-input
                v-model="dynamicValidateForm.mouldName"
                placeholder="模板名称"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="totalScore"
              :rules="[
                { required: true, message: '请输入模板总分', trigger: 'blur' },
              ]"
            >
              <el-input
                v-model="dynamicValidateForm.totalScore"
                placeholder="模板总分"
              ></el-input>
            </el-form-item>
          </div>
          <div
            class="templateMain"
            v-for="(mouldItem, index) in dynamicValidateForm.kpiMouldItems"
            :key="mouldItem.key"
          >
          <div class="kpiDaskList">
            <el-form-item
              :prop="'kpiMouldItems.' + index + '.kpiName'"
              :rules="{
                required: true,
                message: '填写考核项目',
                trigger: 'blur',
              }"
            >
              <el-input
                v-model="mouldItem.kpiName"
                placeholder="填写考核项目"
              ></el-input>
            </el-form-item>
            <el-form-item
              :key="mouldItem.kpiName"
              :prop="'kpiMouldItems.' + index + '.score'"
              :rules="{
                required: true,
                message: '单项考核分数',
                trigger: 'blur',
              }"
            >
              <el-input
                v-model="mouldItem.score"
                placeholder="分值"
              ></el-input
              >
            </el-form-item>
            <el-form-item>
              <el-button @click.prevent="removeDomain(mouldItem)"
                >删除</el-button
              >
               <el-button @click="addStandard(mouldItem)">新增考核标准</el-button>
            </el-form-item>
          </div>
            <div class="kpiStandard" v-for="(its,index) in mouldItem.memoItems" :key="its.index">
                 <el-input
                 
                  v-model="its.memo"
                placeholder="单项考核标准"
              ></el-input
              >
              
               <el-button @click.prevent="removeStandard(mouldItem,its)"
                >删除</el-button
              >
            </div>
           
          </div>
          <el-form-item v-if="isSave">
            <el-button type="primary" @click="submitForm('dynamicValidateForm')"
              >提交</el-button
            >
            <el-button @click="addDomain">新增考核项目</el-button>
          </el-form-item>
          <el-form-item v-if="isView">
            <!-- <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button> -->
            <el-button @click="$router.go(0)">返回</el-button>
          </el-form-item>
          <el-form-item v-if="isEdit">
            <el-button type="primary" @click="editForm('dynamicValidateForm')"
              >提交</el-button
            >
             <el-button @click="addDomain">新增考核项目</el-button>
            <el-button @click="moudelBack">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="KPITemplateContentRight">
      <el-card class="box-card" v-for="item in KpiMouldList" :key="item.id">
        <div slot="header" class="clearfix">
          <span
            >{{ item.mouldName ? item.mouldName : "暂时数据" }}({{
              item.totalScore ? item.totalScore : 0 + "分"
            }})</span
          >
          <el-button style="float: right; padding: 3px 0" type="text">
            <el-dropdown @command="editKpiMould">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon-more"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{ id: item.id, value: 'edit' }"
                  >编辑</el-dropdown-item
                >
                <el-dropdown-item :command="{ id: item.id, value: 'view' }"
                  >查看</el-dropdown-item
                >
                <el-dropdown-item :command="item.id">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-button>
        </div>
        <div>创建时间 : {{ $moment(item.createdDate).format('YYYY-MM-DD')  }}</div>
        <div
          v-for="(o, index) in item.kpiMouldItems"
          :key="o.index"
          class="text item"
          v-if="index <= 1"
        >
         {{(index+1)+'.'}} {{ o.kpiName }}  (<span style="color: red">{{ o.score }}分</span>)
        </div>
        <div v-else>3. ....</div>
      </el-card>
    </div>
  </div>
</template>

<script>
import KPITemplate from "./KPITemplate";
export default {
  ...KPITemplate,
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.KPITemplate h1,
h2 {
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
.KPITemplate {
  width: 100%;
  height: 100%;
  display: flex;
}
.KPITemplateContent {
  width: 60%;
  height: 100%;
  padding: 40px 24px;
  box-sizing: border-box;
  background-color: #fff;
}
.KPITemplateContentRight {
  width: 40%;
  height: 100%;
  padding: 24px;
  box-sizing: border-box;
  overflow: auto;
}
.KPITemplate h1 {
  font-size: 30px;
}
.KPITemplate .el-button--mini,
.el-button--small {
  font-size: 14px;
}
.KPITemplate .divMain {
  width: 100%;
  margin-top: 32px;
  height: 665px;
  overflow: auto;
}
.KPITemplate .divMain .templateHeader {
  display: flex;
}

.KPITemplate .divMain .el-form-item {
  font-size: 16px;
  width: 80%;
}
.KPITemplate .divMain .el-form-item:last-child {
  width: 100%;
}
.KPITemplate .divMain .el-form-item .el-input--small .el-input__inner {
  height: 40px;
}
.KPITemplate .templateHeader .el-form-item:last-child {
  width: 15%;
  margin-left: 20px;
}
.KPITemplate .templateMain {
  /* display: flex; */
}
.KPITemplate .templateMain .el-form-item:last-child {
  margin-left: 20px;
  width: 65%;
}
.KPITemplate .templateMain .el-form-item:last-child .el-input {
  width: 110px;
  margin-right: 20px;
}
.KPITemplateContentRight .el-card {
  margin-bottom: 20px;
}
.selectDep {
  width: 80%;
  margin-bottom: 20px;
}
.selectDep .el-select {
  width: 100%;
  /* padding: 0 15px; */
  box-sizing: content-box;
}
.selectDep .el-select .el-input--small .el-input__inner {
  height: 40px;
}
.KPITemplate .propBox {
  width: 80%;
  margin: auto;
}
.KPITemplate .propBox .el-form {
  width: 90%;
}
.KPITemplate .propBox form.el-form .el-form-item {
  width: 100%;
}
.KPITemplate .propBox .mouldContent form.el-form:first-child .el-form-item {
  width: 70%;
}
.KPITemplate .propBox .mouldContent form.el-form:last-child .el-form-item {
  width: 30%;
}
.KPITemplate .propBox .el-input--small .el-input__inner {
  height: 40px;
}
.KPITemplate .el-dialog__footer {
  text-align: center;
}
.el-card__body .item{
  margin-bottom: 10px;
}
.templateMain .el-form-item:nth-of-type(2){
   width: 25%;
   margin-left: 10px;
}
.kpiDaskList{
  width: 100%;
  display: flex;
}
.kpiStandard{
  margin-bottom: 20px;
}
.kpiStandard .el-input{
  width: 88%;
}
</style>
