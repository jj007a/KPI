<!-- 评分详情 -->
<template>
  <div class="personnel " id='assess'>
    <div class="KPIAssess">
        <h1>考核评分</h1>
        <h2>考核模板名称</h2>
        <p></p>
        <el-form :model="forms" ref="forms" :rules="rules">
            <el-table
        border
        :data="forms.tableData"
        show-summary
        style="width:100%"
        sum-text='总分'
        span-method	="getSummaries"
        height="600">
        <el-table-column
        fixed
        prop="content"
        label="考核内容"
        width="500"
        >
        
        </el-table-column>
         <el-table-column
        fixed
        prop="department"
        label="部门"
        width="100">
        </el-table-column>
        <el-table-column
        fixed
        prop="num"
        label="总分"
        width="50">
        </el-table-column>
       
        <el-table-column
        v-for='item in forms.tableData'
        prop='num'
        :label="item.name"
        :key='item.key'
        width="100"
        >
        </el-table-column>
        <el-table-column
            fixed="right"
        prop="Assessor"
        label="考评人"
        width="100">
        </el-table-column>
       <!--  <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
        </template>
        </el-table-column> -->
            </el-table>
            <div class="button_bottom">
             <el-form-item>
                  <el-button type="primary" @click="submitForm('forms')">提交</el-button>
                  <el-button >返回</el-button>
                </el-form-item>
            </div>
        </el-form>
        
    </div>
  </div>
</template>

<script>
   export default {
    data() {
        return {
            forms:{
                tableData: [
                    {
                        content: '能否总是在规定期限内完成工作？或者尚能在规定的时限内完成工作，还是经常需要上级的催促才能按时完成工作？',
                        name: '王小虎',
                        num: '10',
                        department: '网络',
                        Assessor: 'Tom',
                    },
                    {
                        content: '能否总是在规定期限内完成工作？或者尚能在规定的时限内完成工作，还是经常需要上级的催促才能按时完成工作？',
                        name: '王小虎',
                        num: '10',
                        department: '网络',
                        Assessor: 'Tom',
                    },
                    {
                        content: '能否总是在规定期限内完成工作？或者尚能在规定的时限内完成工作，还是经常需要上级的催促才能按时完成工作？',
                        name: '王小虎',
                        num: '10',
                        department: '网络',
                        Assessor: 'Tom',
                    },
                    {
                        content: '能否总是在规定期限内完成工作？或者尚能在规定的时限内完成工作，还是经常需要上级的催促才能按时完成工作？',
                        name: '王小虎',
                        num: '7',
                        department: '网络',
                        Assessor: 'Tom',
                    },
                    {
                        content: '能否总是在规定期限内完成工作？或者尚能在规定的时限内完成工作，还是经常需要上级的催促才能按时完成工作？',
                        name: '王小虎',
                        num: '5',
                        department: '网络',
                        Assessor: 'Tom',
                    },
                    {
                        content: '能否总是在规定期限内完成工作？或者尚能在规定的时限内完成工作，还是经常需要上级的催促才能按时完成工作？',
                        name: '王小虎',
                        num: '8',
                        department: '网络',
                        Assessor: 'Tom',
                    },
                    {
                        content: '能否总是在规定期限内完成工作？或者尚能在规定的时限内完成工作，还是经常需要上级的催促才能按时完成工作？',
                        name: '王小虎',
                        num: '10',
                        department: '网络',
                        Assessor: 'Tom',
                    },
                    {
                        content: '能否总是在规定期限内完成工作？或者尚能在规定的时限内完成工作，还是经常需要上级的催促才能按时完成工作？',
                        name: '王小虎',
                        num: '10',
                        department: '网络',
                        Assessor: 'Tom',
                    },
                ]
            },
            rules: {
                num: [{ required: true, message: '数量不能为空', trigger: 'blur' }],

            }
            

        };
    },

    components: {},

    methods: {
        getsummarier(params){
          const {columns,data}=params;
          const sum=[];
          columns.forEach((column,index)=>{
            if(index==0){
              sums[index]='总分';
              return;
            }
          })

        }
    }
}

</script>
<style>
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
  .personnel h1{
    font-size: 30px;
  }

 .personnel .divMain .el-form-item__label{
   font-size: 16px;
   font-weight: bold;
  }
  .KPIAssess{
      background-color: #fff;
       padding: 40px 24px;
       box-sizing: border-box;
  }
  .KPIAssess h1{
     padding-bottom: 32px;
  }
  .KPIAssess h2{
      text-align: center;
     padding-bottom: 12px;
  }
 .personnel .divMain .el-input__inner{
   width: 120px;
   height: 40px;
   line-height: 40px;
   font-size: 16px;
  }
  #assess form.el-form .el-table .el-form-item {
    width: 80px;
  }
  #assess form.el-form .button_bottom .el-form-item {
    margin:30px auto;
    width: 240px;
  }
  #assess form.el-form  .el-form-item .el-form-item__content button.el-button{
    font-size: 16px;
  }
 .personnel .divMain .el-button--small, .el-button--small.is-round{
   height: 40px;
   font-size: 16px;
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
    margin: auto;
  }
  .propBox h2,
  .propBox p{
   text-align: center;
  }
  .propBox .el-form{
    width: 90%;
  }

.el-table__fixed-body-wrapper{
  height: 500px!important;
}
</style>