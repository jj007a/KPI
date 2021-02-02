import Vue from 'vue'
import Vuex from 'vuex'
import { loginByTo, loginout, getInfo } from '@/api/login'
import { getPersonnelList, getDepartmentList, getKpiTemplatelList } from '@/api/common'
import Cookies from 'js-cookie'
import { asyncRouterMap } from '@/router/asyncRouterMap'
// import router from '@/router/index'
Vue.use(Vuex)


function hasPermission(roles, route) {
    if (route.meta && route.meta.role) {
        return roles.some(role => route.meta.role.indexOf(role) >= 0)
    } else {
        return true
    }
}

function filterAsyncRouter(asyncRouterMap, roles) {
    const accessedRouters = asyncRouterMap.filter(route => {
        if (hasPermission(roles, route)) {

            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles)
            }
            return true
        }
        return false
    })
    return accessedRouters
}

function getNowRouter(asyncRouterMap, to) {
    return asyncRouterMap.some(route => {
        if (to.path.indexOf(route.path) !== -1) {
            return true;
        }
        else if (route.children && route.children.length) { //如果有孩子就遍历孩子
            return getNowRouter(route.children, to)
        }
    })

}
const store = new Vuex.Store({
    // 定义状态
    state: {
        routerArray: [],
        // 当前nav
        routerName: {},
        // 已有的tab nav
        navTabs: [{ title: '首页', name: 'dashboard', url: '/dashboard' }],
        token: Cookies.get('Admin-Token'),
        userId: Cookies.get('User-Id'),
        userName: Cookies.get('User-Name'),
        password: '',
        userInfo: [],
        depId: '',
        roles: [],
        siderbar_routers: [],
        // routers: constantRouterMap,
        addRouters: [],
    },
    getters: {
        token: state => state.token,
        userName: state => state.userName,
        userId: state => state.userId,
        userInfo: state => state.userInfo,
        depId: state => state.depId,
        roles: state => state.roles,
        addRouters: state => state.addRouters,
        siderbar_routers: state => state.siderbar_routers,
    },
    mutations: {
        setRouterName(state, obj) {
            obj = obj || {}
            for (const key in obj) {
                if (typeof obj[key] == 'string') {
                    obj[key].replace('Detail', '')
                }
            }
            state.routerName = obj;


            let flag = state.navTabs.find(item => item.url == obj.url)
            if (!flag) {
                state.navTabs.push(obj)
            }
        },
        deleteRouterName(state, str) {
            state.navTabs = state.navTabs.filter(item => item.url != str)
        },

        changeToArray(state, arr) {
            console.log(arr);
            let objT = {};
            let arrT = [];
            let count = 1
            arr.forEach((item) => {
                if (objT[item.name1]) {
                    objT[item.name1]++
                } else {
                    objT[item.name1] = 1
                }
                // arrT.push(item)
            });
            for (const key in objT) {
                arr.find((item) => {
                    if (item.name1 == key) {
                        item.span = objT[key]
                        return true
                    }
                })
            }

            // console.log(arrT);
            console.log(objT);


        },
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_ID(state, id) {
            state.userId = id
        },
        SET_NAME(state, userName) {
            state.userName = userName
        },
        SET_PASS(state, password) {
            state.password = password
        },
        SET_INFO(state, userInfo) {
            state.userInfo = userInfo
        },
        SET_DEPID(state, depId) {
            state.depId = depId
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        SET_ROUTERS(state, router) {
            state.addRouters = router;
            console.log(state.addRouters, 'ww')
            /*  state.routers=constantRouterMap.concat(router); */
        },
        SET_NOW_ROUTERS(state, to) {
            console.log(state.addRouters, 'eeee')
            state.addRouters.forEach(e => {
                
                if (e.children && e.children.length) {
                    if (getNowRouter(e.children, to) === true) {
                        state.siderbar_routers = e
                    }
                }
            })
        }

    },
    actions: {
        // 登录
        LoginByTo({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                loginByTo(userInfo.username, userInfo.password).then(response => {
                    const data = response.data;
                    if (data.status == 200) {
                        Cookies.set('Admin-Token', data.data.token);
                        Cookies.set('User-Id', data.data.currentUserId);
                        Cookies.set('User-Name', userInfo.username)
                        commit('SET_NAME', userInfo.username)
                        commit('SET_ID', data.data.currentUserId);
                        commit('SET_TOKEN', data.data.token);
                        resolve(response);
                    } else {
                        resolve(response)
                    }
                }).catch(error => {
                    reject(error);
                });
            });
        },
        //登出
        LoginOut({ commit }) {
            return new Promise((resolve, reject) => {
                loginout().then(() => {
                    commit('SET_TOKEN', '')
                    Cookies.remove('Admin-Token')
                    Cookies.remove('User-Id')
                    Cookies.remove('User-Name')
                    sessionStorage.removeItem('roles')
                    commit('SET_ROLES', []);
                    commit('SET_INFO', []);
                    resolve()
                }).catch(erro => {
                    reject(erro)
                })
            })
        },
        // 获取用户详情

        GetUserInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfo(state.userId).then((res) => {
                    console.log(res, "用户详情")
                    if(res.data.data){
                        commit('SET_ROLES', res.data.data.roles);
                        commit('SET_INFO', res.data.data.roles);
                       
                    }else{
                        commit('SET_ROLES', []);
                        commit('SET_INFO', []);
                    }
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //获取部门列表

        GetDepartmentList({ commit }, data) {
            return new Promise((resolve, reject) => {
                getDepartmentList(data.pageNumber, data.pageSize).then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //获取人员列表

        GetPersonnelList(data) {
            return new Promise((resolve, reject) => {

                getDepartmentList(data.pageNumber, data.pageSize).then(res => {
                    console.log(res)
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 异步生成路由列表
        GenerateRouters({ commit }, data) {
            return new Promise(resolve => {
                console.log(data, "23")
                const roles = data
                console.log(roles)
                let accessedRouters
                if (roles[0].roleName.indexOf('super') >= 0) {
                    accessedRouters = asyncRouterMap
                } else {
                    accessedRouters = filterAsyncRouter(asyncRputerMap, roles)
                }
                commit('SET_ROUTERS', accessedRouters)
                resolve();
            })
        },
        getNowRoutes({ commit }, data) {
            return new Promise(resolve => {
                console.log(data,'ssssddddfff')
                commit('SET_NOW_ROUTERS', data)
                resolve();
            })
        },
    }

})

export default store