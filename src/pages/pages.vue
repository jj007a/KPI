<template>
  <el-container class="clear page-content">
    <!-- 导航 -->
    <el-aside>
        <div class="border-right" style="background:#001529;color:#fff;height:64px;line-height:64px;font-size:16px;text-align:center">绩效考核系统</div>
        <nav-menu ></nav-menu>
    </el-aside>
    <el-container>
        <!-- header -->        
        <el-header>
            <div class="headers clear">
                <h1 class="fl">绩效考核管理系统</h1>
                <div class="fr">
                    <ul class="header-person">
                        <li><span>你好，{{$store.getters.userName}}</span></li>
                      <!--   <li><a href="javascript:;"><i class="el-icon-location"></i>修改密码</a></li> -->
                        <li @click='loginout' class="logout"><i class="el-icon-location "></i>退出></li>
                    </ul>
                </div>
            </div>
        </el-header>
        <!-- tabs -->
        <nav-tabs></nav-tabs>   
        <!-- 路由 -->
        <el-main>
            <keep-alive>
                <router-view/>
            </keep-alive>
        </el-main>
    </el-container>

    
  </el-container>
</template>

<script>
import header from '../components/header/header.vue'
import navMenu from '../components/nav-menu/nav-menu.vue'
import navTabs from '../components/nav-tabs/nav-tabs.vue'
import { setTimeout } from 'timers';
export default {
    name: "pages",
    components: {
        "my-header": header,
        "nav-menu":navMenu,
        "nav-tabs":navTabs
    },
    data:function(){
        return {}
    },
    methods:{
        loginout(){
            this.$store.dispatch('LoginOut').then(()=>{
                this.$message({
                    message:'退出成功',
                    type:'success'
                })
                this.$router.push('/login')
            })
        }
    }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-content{
    height: 100%;
    /* overflow: auto; */
}
header{
    border-bottom:1px solid #bebebe
}
.header-person li{
    float:left;
    padding:0 10px
}
.el-aside{
    overflow: hidden;
}
.el-main{
    background-color: #F0F2F5;
}

.logout{
    cursor: pointer;
}
</style>
