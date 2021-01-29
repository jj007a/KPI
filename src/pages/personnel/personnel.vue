<!--  -->
<template>
    <div class="personnel">
      <div class="personnelContent">
        <el-dialog
        :title="propTitle"
        :visible.sync="dialogVisible"
        width="40%"
       >
       <div class="propBox">
        <el-form  label-width="80px" :model="tableData">
          <el-form-item label="姓名：">
            <el-input v-model="tableData.realName"></el-input>
          </el-form-item>
          <el-form-item label="部门：">
            <el-select v-model="tableData.department.id" placeholder="请选择">
              <el-option
                v-for="item in departmentData"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职位：">
            <el-input v-model="tableData.position"></el-input>
          </el-form-item>
          <!-- <el-form-item label="角色：">
            <el-input v-model="tableData.username"></el-input>
          </el-form-item> -->
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
        <h1>人员管理</h1>
        <div class="divMain">
          <el-form :inline="true" :model="pageable" ref="pageable" class="demo-form-inline">
            <el-form-item label="姓名：">
              <el-input v-model="pageable.searchPropertyValue" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search('pageable')">查询</el-button>
              <el-button type="primary" @click="dialogVisible = true">添加</el-button>
            </el-form-item>
        </el-form>
        </div>
        <el-table class="animated bounceInDown"
          :data="personList"
          style="width: 100%">
          <el-table-column
            prop="realName"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="department.name"
            label="部门"
            width="180">
          </el-table-column>
          <el-table-column
            prop="position"
            label="职位">
          </el-table-column>
          <el-table-column
            prop="username"
            label="角色">
          </el-table-column>
          <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
            :total="totals">
          </el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
import Personnel from "./personnel";
export default {
  ...Personnel
}
</script>
<style >
  .personnel h1, h2 {
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
  .personnel{
  width: 100%;
  height: 100%;  
  }
  .personnelContent{
    width: 100%;
    height: 100%; 
    padding: 40px 24px;
    box-sizing: border-box;
    background-color: #fff;
  }
  .personnel h1{
    font-size: 30px;
  }
  .personnel .divMain{
    width: 100%;
    margin-top: 32px;
  }
  .personnel form.el-form .el-form-item{
    width: 230px;
  }
 .personnel .divMain .el-form-item__label{
   font-size: 16px;
   font-weight: bold;
   width: 40%;
  }
 .personnel .divMain .el-form-item__content{
    width: 60%;
  }
 .personnel .divMain .el-form-item:last-child{
    margin-left: 20px;
    width: 200px;
  }
 .personnel .divMain .el-form-item:last-child .el-form-item__content{
    width: 100%;
  }
 .propBox .el-select{
    width: 100%;
  }
 .personnel .divMain .el-input__inner{
   /* width: 120px; */
   height: 40px;
   line-height: 40px;
   font-size: 16px;
  }
 .personnel .divMain .el-button--small, .el-button--small.is-round{
   height: 40px;
   font-size: 16px;
  }
 .personnel .divMain form.el-form .el-form-item .el-button+.el-button{
   margin: 0;
  }
 .personnel .el-table th, .el-table .has-gutter tr:first-child{
   background-color: #FAFAFA;
   color: #000;
  }
 .personnel .el-table th, .el-table{
   color: #000;
   font-size: 14px;
  }
 .personnel .block{ 
    margin-top: 32px;
  }
  .propBox{
    width: 80%;
    margin: auto;
  }
  .propBox .el-form{
    width: 90%;
  }
  .personnel .propBox form.el-form .el-form-item{
    width: 100%;
  }
  .propBox .el-input--small .el-input__inner{
   height: 40px;
  }
  .personnel .el-dialog__footer{
    text-align: center;
  }
  .personnelContent .el-button{
    height: 40px;
    font-size: 16px;
  }
</style>