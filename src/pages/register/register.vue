<template>

    <div class="kpiLogin">
      <div class="kpiLoginContainer">
        <h1>注册</h1>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="demo-ruleForm">
             <el-form-item  prop="username">
                <el-input  v-model="ruleForm.username" placeholder="用户名"></el-input>
            </el-form-item>
             <el-form-item  prop="realName">
                <el-input  v-model="ruleForm.realName" placeholder="姓名"></el-input>
            </el-form-item>
            <!--  <el-form-item  prop="email"
             :rules="[
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
              ]">
                <el-input  v-model="ruleForm.email" placeholder="邮箱"></el-input>
            </el-form-item> -->
            <el-form-item  prop="password">
                <el-input type="password" placeholder="密码" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
           <!--  <el-form-item  prop="checkPass">
                <el-input type="password" placeholder="确认密码" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary"  @click="submitForm('ruleForm')">注册</el-button>
                <el-button > <router-link to="/login">去登录</router-link>  </el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
            </el-form-item>
        </el-form>
      </div>
    </div>

</template>

<script>
 export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else{
            callback()
        }
      };
      var validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        }else{
            callback()
        }
      };
      var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入姓名'));
        }else{
            callback()
        }
      };
     /*   var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }; */
      return {
        ruleForm: {
          password: '',
          username:"",
          realName:""
        },
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          username: [
            { validator: validateUser , trigger: 'blur'}
          ],
          realName: [
            { validator: validateUser , trigger: 'blur'}
          ],
           
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(this.ruleForm)
          if (valid) {
            let url='kpi/register'
            let params={username:this.ruleForm.username,password:this.ruleForm.password,realName:this.ruleForm.realName}
            this.$http.post(url,JSON.stringify(params)).then(res=>{
              console.log(res)
              if(res.status==200){
                this.$message({
                  type:'success',
                  message:'注册成功'
                })
                this.$router.push('/login')
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.kpiLogin h1{
    text-align: center;
    font-size: 24px;
}
.kpiLogin .el-form{
   margin: 0 auto;
   width: 338px;
}
.kpiLogin{
    width: 100%;
    height: 100%;
    padding-top:200px;
    background:url('../../assets/loginbg.png');
}
.kpiLoginContainer{
  width: 580px;
  height: 520px;
  margin: 0 auto;
  padding-top: 56px ;
  background-color: #fff;
}
.kpiLogin form.el-form .el-form-item {
    width: 338px;
}
.kpiLogin button.el-button{
    width: 100%;
    height: 40px;
    font-size: 16px;
}
.kpiLogin .el-button+.el-button{
   margin: 20px 0;
}
.kpiLoginContainer .el-input--small .el-input__inner{
  height: 40px;
  font-size: 16px;
}
/* .bg-purple {
    background: #d3dce6;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  } */
</style>
