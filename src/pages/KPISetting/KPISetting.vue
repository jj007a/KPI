<!--  -->
<template>
  <div class="personnel">
    <div class="personnelContent">
      <el-dialog :title="propTitle" :visible.sync="dialogVisible" width="40%">
        <div class="propBox">
          <el-form label-width="100px" :model="tableData" ref="tableData" :rules="rules">
            <el-form-item label="考核模板：" prop="kpiMouldId">
              <el-select
                v-model="tableData.kpiMouldId"
                placeholder="请选择模板"
                style="width: 100%"
              >
                <el-option
                  v-for="item in moudle"
                  :key="item.id"
                  :label="item.mouldName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
     <!--        <el-form-item label="考核时间：">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="开始时间"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="tableData.startDate"
                  style="width: 100%"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="结束时间"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="tableData.endDate"
                  style="width: 100%"
                ></el-date-picker>
              </el-col>
            </el-form-item> -->
            <el-form-item label="考核周期：" prop="assessmentDate">
              <!-- <el-select v-model="tableData.kpiCategory" placeholder="请选择周期" style="width: 100%;">
                <el-option v-for="(val,key) in categoryList" :key="key"  :label="val" :value="key"></el-option>
                
              </el-select> -->
              <el-date-picker
                v-model="tableData.assessmentDate"
                type="month"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择年月"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="考核对象：" prop="userIds">
              <el-select
                v-model="tableData.userIds"
                multiple
                placeholder="请选择"
                style="width: 100%"
                @change="dataUpdate"
              >
                <el-option
                  v-for="item in formLabelAlign.options"
                  :key="item.id"
                  :label="item.realName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer" v-if="isAdd">
          <el-button type="primary" @click.prevent="submitForm('tableData')"
           :disabled="disabled" >确 定</el-button
          >
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
        <span slot="footer" class="dialog-footer" v-if="isEdit">
          <el-button type="primary" @click.prevent="edit" :disabled="disabled">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
   <!--    <el-dialog
        title="添加考核设置"
        :visible.sync="dialogEditVisible"
        width="40%"
      >
        <div class="editProp">
          <el-form label-width="90px" :model="editFromLabel">
            <el-form-item label="考核模板：">
              <el-select
                v-model="editFromLabel.region"
                placeholder="请选择模板"
                style="width: 100%"
              >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="考核时间：">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="开始时间"
                  v-model="editFromLabel.date1"
                  style="width: 100%"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="结束时间"
                  v-model="editFromLabel.date2"
                  style="width: 100%"
                ></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="考核周期：">
              <el-select
                v-model="editFromLabel.cycle"
                placeholder="请选择周期"
                style="width: 100%"
              >
                <el-option label="周" value="week"></el-option>
                <el-option label="月" value="month"></el-option>
                <el-option label="年" value="year"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="考核对象：">
              <el-select
                v-model="editFromLabel.objects"
                multiple
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in editFromLabel.options"
                  :key="item.vlaue"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogEditVisible = false"
            >确 定</el-button
          >
          <el-button @click="dialogEditVisible = false">取 消</el-button>
        </span>
      </el-dialog> -->
      <h1>绩效设置</h1>
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
            <el-button type="primary" @click="addProp" v-if="isKpiAdd">添加绩效</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="assignmentList" style="width: 100%">
        <el-table-column prop="kpiMouldName" label="模板" width="180">
        </el-table-column>
       <!--  <el-table-column prop="startDate" label="开始时间" width="180">
        </el-table-column>
        <el-table-column prop="endDate" label="结束时间"> </el-table-column> -->
        <el-table-column prop="assessmentDate" label="周期"> </el-table-column>
        <el-table-column prop="users" label="成员">
          <template slot-scope="scope">
            <span
              v-for="(item, index) in scope.row.personnels"
              :key="item.id"
              v-if="scope.row.personnels.length > 0 && index < 3"
              >{{index>=2?"...":item.realName+','}}</span
            >
          <!--   <span v-else-if="index==2">...</span>
            <span v-else-if="index==0">{{item.realName}}</span> -->
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="viewDetail(scope.row)" v-if="!scope.row.isEnd &&isKpiEdit"
            :disabled="disabled"  >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              v-if="!scope.row.isEnd && isKpiDel"
              @click="del(scope.row)"
              >删除</el-button
            >
            <el-button size="mini" @click="view(scope.row)" v-if="scope.row.isEnd "
            :disabled="disabled"  >查看</el-button
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
import KPISetting from "./KPISetting";
export default {
  ...KPISetting,
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
  /* height: 100%; */
  padding: 40px 24px;
  box-sizing: border-box;
  background-color: #fff;
}
.personnel h1 {
  font-size: 30px;
}
.personnel .divMain .el-form-item__label {
  font-size: 16px;
  font-weight: bold;
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
.personnel .divMain .el-form-item__content .el-date-editor.el-input {
  width: 100%;
}
.personnel .divMain .el-form-item:last-child {
  margin-left: 20px;
  width: 200px;
}
.personnel .divMain .el-form-item:last-child .el-form-item__content {
  width: 100%;
}
.personnel .divMain .el-input__inner {
  /* width: 120px; */
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}
.personnel .el-table th,
.el-table {
  color: #000;
  font-size: 14px;
}
.personnel .block {
  margin-top: 32px;
}
.propBox,
.editProp {
  width: 80%;
  margin: auto;
}
.propBox .el-form,
.editProp .el-form {
  width: 90%;
}
.personnel .propBox form.el-form .el-form-item,
.personnel .editProp form.el-form .el-form-item {
  width: 100%;
}
.propBox .el-input--small .el-input__inner,
.editProp .el-input--small .el-input__inner {
  height: 40px;
}
.personnel .el-dialog__footer {
  text-align: center;
}
.personnelContent .el-button {
  height: 40px;
  font-size: 16px;
}
.personnelContent .line {
  text-align: center;
}
</style>