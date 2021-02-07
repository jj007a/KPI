<!--  -->
<template>
  <div class="personnel">
    <div class="personnelContent">
      <h1>绩效评分</h1>
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
      <el-table :data="assignmentList" style="width: 100%">
        <el-table-column prop="kpiMouldName" label="模板" width="180">
        </el-table-column>
        <!-- <el-table-column prop="startDate" label="开始时间" width="180">
        </el-table-column>
        <el-table-column prop="endDate" label="结束时间"> </el-table-column> -->
        <el-table-column prop="assessmentDate" label="周期"> </el-table-column>
        <el-table-column prop="users" label="成员">
          <template slot-scope="scope">
            <span
              v-for="(item, index) in scope.row.personnels"
              :key="item.id"
              v-if="scope.row.personnels.length > 1"
              >{{ index > 1 ? "..." : item.realName + "," }}</span
            >
            <span v-else>{{ item.realName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.isEnd == false&&isScore" size="mini">
              <router-link
                :to="{ path: '/KPIScore/detail', query: { id: scope.row.id } }"
                >评分</router-link
              >
            </el-button>
            <el-button size="mini" v-else>考核已结束</el-button>
            <!--  <el-button
              size="mini"
              type="danger"
            >删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :hide-on-single-page="values"
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
import KPIScore from "./KPIScore";
export default {
  ...KPIScore,
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
.personnel .divMain {
  width: 100%;
  margin-top: 32px;
}
.personnel .divMain .el-form-item__label {
  font-size: 16px;
  font-weight: bold;
}
.personnel .divMain .el-input__inner {
  /* width: 120px; */
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}
.personnel form.el-form .el-form-item {
  width: 240px;
}
.personnel .divMain .el-form-item__content .el-date-editor.el-input {
  width: 100%;
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