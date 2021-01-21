import Vue from 'vue'
import store from '../vuex/store'
import Router from 'vue-router'
import department from '../pages/department/department.vue'
import personnel from '../pages/personnel/personnel.vue'
import kpiTemplate from '../pages/KPITemplate/KPITemplate.vue'
import kpiSetting from '../pages/KPISetting/KPISetting.vue'
import kpiScore from '../pages/KPIScore/KPIScore.vue'
import detail from '../pages/KPIScore/Detail.vue'
import view from '../pages/dashboard/view'

import notfind from '../pages/notfind/notfind'
import dashboard from '../pages/dashboard/dashboard'
import login from '../pages/login/login'
import register from '../pages/register/register'
import pages from '../pages/pages'
import { TabPane } from 'element-ui'

Vue.use(Router)

// 路由完全配置，在pages.vue里面获取后台给的地址
const routes=[

    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/register',
        name: 'register',
        component: register
    },
    {
        path: '/',
        name:'index',
        redirect: '/dashboard',
        meta: {
            requireAuth: true,
        },
        component: pages,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                meta: {
                    requireAuth: true,
                },
                component: dashboard,
            },
            {
                path: 'department',
                name: 'department',
                meta: {
                    requireAuth: true,
                },
                component: department
            },
            {
                path: 'personnel',
                name: 'personnel',
                meta: {
                    requireAuth: true,
                },
                component: personnel
            },
            {
                path: 'KPITemplate',
                name: 'KPITemplate',
                component: kpiTemplate
            },
            {
                path: 'KPISetting',
                name: 'KPISetting',
                component: kpiSetting
            },
            {
                path: 'KPIScore',
                name: 'KPIScore',
                component: kpiScore,
            },
            {
                path: 'KPIScore/detail',
                name: 'detail',
                component: detail
            },
            { path: '/dashboard/view', name: 'view', component: view }
        ]
    },


]
const router=new Router({
    routes,
    // mode:"history"
})
/* router.beforeEach((to, from, next) => {
    if(store.getters.token){
        console.log(store.getters.token,'23')
        if(to.path=='/login'){
            next({ path: '/dashboard' })
        }else{
            next()
        }
    }else{
       if(to.path=='/login' || to.path=='/register'){
           next()
       }else{
           next({ path: '/login' })
       }
    }
}) */
    

export default router