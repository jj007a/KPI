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
export const asyncRouterMap=[
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
        ]
    },
]

