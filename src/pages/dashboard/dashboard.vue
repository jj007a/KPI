<template>
  <div class="index">
    <h1>基础信息</h1>
    <div class="divMain">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="姓名：">
              <el-input v-model="formInline.user" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="部门：">
              <el-input v-model="formInline.user" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="职位：">
              <el-input v-model="formInline.user" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="角色：">
              <el-input v-model="formInline.user" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" >查询</el-button>
            </el-form-item>
        </el-form>
        </div>
         <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="模板"
            width="180">
          </el-table-column>
          <el-table-column
            prop="date"
            label="开始时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="endDate"
            label="结束时间">
          </el-table-column>
          <el-table-column
            prop="cycle"
            label="周期">
          </el-table-column>
          <el-table-column
            prop="proson"
            label="成员">
          </el-table-column>
          <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
           > <router-link to='/page5/detail'>查看</router-link> </el-button>
          <el-button
            type="primary"
            @click='outExe'
           > 下载 </el-button>
         
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
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="40">
          </el-pagination>
        </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
            formInline: {
                user: '',
                region: ''
            },
            tableData: [
                {
                    date: '2021-01-13',
                    name: '王小虎',
                    endDate: '2021-01-31',
                    proson: '职员',
                    cycle: '月',
                },
                {
                    date: '2021-01-13',
                    name: '王小虎',
                    endDate: '2021-01-31',
                    proson: '职员',
                    cycle: '月',
                },
                {
                    date: '2021-01-13',
                    name: '王小虎',
                    endDate: '2021-01-31',
                    proson: '职员',
                    cycle: '月',
                },
                {
                    date: '2021-01-13',
                    name: '王小虎',
                    endDate: '2021-01-31',
                    proson: '职员',
                    cycle: '月',
                },
               
               

            ],
            value: false,
            currentPage4: 4,
            dialogVisible: false,
            score:''
        }
  },
  methods:{
      handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        outExe() {
            this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.excelData = this.tableData //你要导出的数据list。
                this.export2Excel()
            }).catch(() => {
            
            });
        },
        export2Excel() {
            var that = this;
            require.ensure([], () => {
                const { export_json_to_excel } = require('../../excel/Export2Excle'); //这里必须使用绝对路径
                const tHeader = ['模板','开始时间', '结束时间', '周期','成员']; // 导出的表头名
                const filterVal = ['name','date','endDate', 'cycle','proson']; // 导出的表头字段名
                const list = that.excelData;
                const data = that.formatJson(filterVal, list);
                let time1,time2 = '';
                if(this.date !== '') {
                    time1 = that.$moment(that.date).format('YYYY-MM-DD')
                }
                if(this.endDate !== '') {
                    time2 = that.$moment(that.endDate).format('YYYY-MM-DD')
                }
                export_json_to_excel(tHeader, data, `[${time1}-${time2}]绩效考核`);// 导出的表格名称，根据需要自己命名
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .index{
    background-color: #fff;
    height: 100%;
    padding: 40px 24px;
    box-sizing: border-box;
  }
  .index h1{
    margin: 0;
    font-size: 30px;
  }
   .index .divMain{
    width: 100%;
    margin-top: 32px;
  }
  .index form.el-form .el-form-item{
    width: 190px;
  }
 .index .divMain .el-form-item__label{
   font-size: 16px;
   font-weight: bold;
   width: 40%;
  }
 .index .divMain .el-form-item__content{
    width: 60%;
  }
 .index .divMain .el-form-item:last-child{
    margin-left: 20px;
    width: 200px;
  }
 .index .divMain .el-form-item:last-child .el-form-item__content{
    width: 100%;
  }
 .index .divMain .el-input__inner{
   /* width: 120px; */
   height: 40px;
   line-height: 40px;
   font-size: 16px;
  }
 .index .divMain .el-button--small, .el-button--small.is-round{
   height: 40px;
   font-size: 16px;
  }
 .index .divMain form.el-form .el-form-item .el-button+.el-button{
   margin: 0;
  }
   .index .el-table th, .el-table .has-gutter tr:first-child{
   background-color: #FAFAFA;
   color: #000;
  }
 .index .el-table th, .el-table{
   color: #000;
   font-size: 14px;
  }
.index .block{ 
    margin-top: 32px;
  }
</style>
