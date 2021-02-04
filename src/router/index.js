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
import role from '../pages/roleManagement/roleManagement'
import jurisdiction from '../pages/jurisdictionManagement/jurisdictionManagement'
import user from '../pages/user/user'
import userType from '../pages/user/userType'

import notfind from '../pages/notfind/notfind'
import dashboard from '../pages/dashboard/dashboard'
import login from '../pages/login/login'
import register from '../pages/register/register'
import pages from '../pages/pages'
import { TabPane } from 'element-ui'

Vue.use(Router)

// 路由完全配置，在pages.vue里面获取后台给的地址
const routes = [

    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/404',
        name: 'not found',
        component: notfind
    },
    {
        path: '/register',
        name: 'register',
        component: register
    },
    {
        path: '/',
        name: 'index',
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
                    role: ['super']
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
            { path: '/dashboard/detail', name: 'detail', component: view },
            { path: '/roleManagement', name: 'role', component: role },
            { path: '/jurisdictionManagement', name: 'jurisdiction', component: jurisdiction },
            { path: '/user', name: 'user', component: user },
            { path: '/userType', name: 'userType', component: userType }
        ]
    },

]
// permissiom judge
function hasPermission(roles, permissionRoles) {
    if (roles.indexOf('admin') >= 0) return true // admin权限 直接通过
    if (!permissionRoles) return true
    return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
const router = new Router({
    routes,
    // mode:"history"
})
router.beforeEach((to, from, next) => {
    if (store.getters.token) {
        // console.log(store.getters.token,'23')
        if (to.path == '/login') {
            next({ path: '/dashboard' })
        } else {

            if (store.getters.roles.length == 0) {
                store.dispatch('GetUserInfo').then(res => {
                    next()
                    // if (res.data.data && to.meta.role) {
                    //     const roles = res.data.data.roles
                    //     console.log(roles[0].roleName, to.meta.role, 999);
                    //     if (to.meta.role.includes(roles[0].roleName)) {
                    //         next()
                    //     } else {
                    //         next('/404')
                    //     }
                    // } else {
                    //     next()
                    // }

                   
                })

            } else {
                next()
                /*  store.dispatch('getNowRoutes', to)
                 console.log(999)
                 if (hasPermission(store.getters.roles, to.meta.role)) {
                     next()//
  
                     console.log("has userinfo")
                 } else {
                     next({ path: '/' })
                 } */
            }

        }
    } else {
        if (to.path == '/login' || to.path == '/register') {
            next()
        } else {
            next({ path: '/login' })
        }
    }
})


export default router