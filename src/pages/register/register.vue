<template>

    <div class="kpiLogin">
      <div class="kpiLoginContainer">
        <h1>注册</h1>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="demo-ruleForm">
             <el-form-item  prop="user">
                <el-input  v-model="ruleForm.user" placeholder="用户名"></el-input>
            </el-form-item>
             <el-form-item  prop="email"
             :rules="[
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
              ]">
                <el-input  v-model="ruleForm.email" placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item  prop="pass">
                <el-input type="password" placeholder="密码" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item  prop="checkPass">
                <el-input type="password" placeholder="确认密码" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"  @click="submitForm('ruleForm')">注册</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
            </el-form-item>
        </el-form>
      </div>
    </div>

</template>

<script>
import fetch from '@/core/http'
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
       var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          user:"",
          email:'',
          checkPass:''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          user: [
            { validator: validateUser , trigger: 'blur'}
          ],
            checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(this.ruleForm)
          if (valid) {
            let url='/api/user/login'
            let params={user:this.ruleForm.user,password:this.ruleForm.pass}
            fetch({method:'post',url,data:params}).then(res=>{
              console.log(res)
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
