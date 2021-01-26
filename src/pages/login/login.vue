<template>

    <div class="kpiLogin">
      <div class="kpiLoginContainer">
        <h1>绩效考核管理系统</h1>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="demo-ruleForm">
             <el-form-item  prop="username">
                <el-input  v-model="ruleForm.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item  prop="password">
                <el-input type="password" @keyup.enter.native="submitForm('ruleForm')" placeholder="密码" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="checked">
                <el-checkbox v-model="checked">记住用户名</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"  @click="submitForm('ruleForm')">登录</el-button>
                <el-button > <router-link to="/register">还没有账号？去注册</router-link>  </el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
            </el-form-item>
        </el-form>
      </div>
    </div>

</template>

<script>
/* import fetch from '@/core/http' */
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
      return {
        ruleForm: {
          password: '',
          username:"",
          
        },
        checked: false,
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          username: [
            { validator: validateUser , trigger: 'blur'}
          ],
        }
      };
    },
    methods: {
      rememberUser(){
        if(localStorage.getItem('SET_Admin')){
          this.checked=true;
          this.ruleForm.user=this.$store.getters.name
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // let params=new FormData()
            // params.append('username',this.ruleForm.username)
            // params.append('password',this.ruleForm.password)
            let params={username:this.ruleForm.username,password:this.ruleForm.password}
         
            this.$store.dispatch('LoginByTo', params).then((res)=>{
              console.log(res)
               if(res.data.status==200){
                  this.$message({
                    message: '登录成功',
                    type: 'success'
                  })
                  if(this.checked){
                      localStorage.setItem('SET_Admin',true)
                  }else{
                      localStorage.removeItem('SET_Admin')
                  }
                  
                  this.$router.push({path:'/'})
               }else{
                  this.$message({
                    message: res.data.msg,
                    type: 'error'
                  })
               }
               
            }).catch((erro)=>{
                console.log(erro)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
    created(){
      this.rememberUser()
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
    position: relative;
    /* padding-top:200px; */
    background:url('../../assets/loginbg.png');
}
.kpiLoginContainer{
  width: 580px;
  height: 520px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
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
