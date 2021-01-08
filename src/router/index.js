import Vue from 'vue'
import store from '../vuex/store'
import Router from 'vue-router'
import page1 from '../pages/page1/page1.vue'
import page2 from '../pages/page2/page2.vue'
import page3 from '../pages/page3/page3.vue'
import page4 from '../pages/page4/page4.vue'
import page5 from '../pages/page5/page5.vue'

import notfind from '../pages/notfind/notfind'
import dashboard from '../pages/dashboard/dashboard'
import login from '../pages/login/login'
import register from '../pages/register/register'
import pages from '../pages/pages'

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
                component: dashboard
            },
            {
                path: 'page1',
                name: 'page1',
                meta: {
                    requireAuth: true,
                },
                component: page1
            },
            {
                path: 'page2',
                name: 'page2',
                meta: {
                    requireAuth: true,
                },
                component: page2
            },
            {
                path: 'page3',
                name: 'page3',
                component: page3
            },
            {
                path: 'page4',
                name: 'page4',
                component: page4
            },
            {
                path: 'page5',
                name: 'page5',
                component: page5
            },
           

        ]
    },


]
const router=new Router({
    routes,
    mode:"history"
})

/* router.beforeEach((to, from, next) => {
    if(to.path=='/login'){
        next()
    }else{
        let token= localStorage.getItem('token')
        if(token!=""&&token!="null"){
            next({path:'/login',query:{redirect:to.fullPath}})
        }
    }
}) */

export default router