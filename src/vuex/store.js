import Vue from 'vue'
import Vuex from 'vuex'
import { loginByTo, loginout, getInfo} from '@/api/login'
import { getPersonnelList, getDepartmentList, getKpiTemplatelList} from '@/api/common'
import Cookies from 'js-cookie'
Vue.use(Vuex)

const store = new Vuex.Store({
    // 定义状态
    state: {
        routerArray:[],
        // 当前nav
        routerName:{},
        // 已有的tab nav
        navTabs:[{title:'首页',name:'dashboard',url:'/dashboard'}],
        token: Cookies.get('Admin-Token'),
        userId: Cookies.get('User-Id'),
        userName: Cookies.get('User-Name'),
        password:'', 
        userInfo:[],
        depId:'',
        /* pageable:{
            pageNumber:1,
            pageSize:10
        } */
    },
    getters:{
        token: state => state.token,  
        userName: state => state.userName,
        userId: state => state.userId,
        userInfo: state => state.userInfo,
        depId: state => state.depId
    },
    mutations:{
        setRouterName(state,obj){
            obj = obj || {}
            for (const key in obj) {
                if(typeof obj[key] == 'string'){
                    obj[key].replace('Detail','')
                }
            }
            state.routerName = obj;
            
            
            let flag = state.navTabs.find(item=>item.url == obj.url)
            if(!flag){
                state.navTabs.push(obj)
            }
        },
        deleteRouterName(state,str){
            state.navTabs = state.navTabs.filter(item=>item.url!=str)
        },

        changeToArray(state,arr){
            console.log(arr);
            let objT = {};
            let arrT = [];
            let count = 1
            arr.forEach((item) => {
                if(objT[item.name1]){
                    objT[item.name1]++
                }else{
                    objT[item.name1] = 1
                }
                // arrT.push(item)
            });
            for (const key in objT) {
                arr.find((item)=>{
                    if(item.name1 == key){
                        item.span = objT[key]
                        return true
                    }
                })
            }

            // console.log(arrT);
            console.log(objT);
            
            
        },
       SET_TOKEN(state,token){
         state.token=token       
        },
       SET_ID(state,id){
           state.userId=id       
        },
        SET_NAME(state, userName){
           state.userName = userName       
        },
       SET_PASS(state,password){
         state.password=password       
        },
        SET_INFO(state,userInfo){
            state.userInfo = userInfo
        },
        SET_DEPID(state,depId){
            state.depId = depId
        }
     
    },
    actions:{
        // 登录
        LoginByTo({commit},userInfo) {
            return new Promise((resolve, reject) => {
                loginByTo(userInfo.username, userInfo.password).then(response => {
                    const data = response.data;
                    if (data.status==200){
                        Cookies.set('Admin-Token', data.data.token);
                        Cookies.set('User-Id', data.data.currentUserId);
                        Cookies.set('User-Name', userInfo.username)
                        commit('SET_NAME', userInfo.username)
                        commit('SET_ID', data.data.currentUserId);
                        commit('SET_TOKEN', data.data.token);
                        resolve(response);
                    }else{
                        resolve(response)
                    }
                }).catch(error => {
                    reject(error);
                });
            });
        },
        //登出
        LoginOut({commit}){
            return new Promise((resolve,reject)=>{
                loginout().then(()=>{
                    commit('SET_TOKEN','')
                    Cookies.remove('Admin-Token') 
                    Cookies.remove('User-Id') 
                    Cookies.remove('User-Name') 
                    sessionStorage.removeItem('roles')
                    commit('SET_INFO', []);
                    resolve()     
                }).catch(erro=>{
                    reject(erro)
                })
            })
        },
        // 获取用户详情

        GetUserInfo({commit},id){
            console.log(id,'storeActions')
            return new Promise((resolve,reject)=>{
                getInfo(id).then((res)=>{
                    console.log(res,"用户详情")
                    commit('SET_INFO', res.data.data.roles);
                    resolve()
                }).catch(error=>{
                    reject(error)
                })
            })
        },
        //获取部门列表

        GetDepartmentList({commit},data){
            return new Promise((resolve,reject)=>{
                getDepartmentList(data.pageNumber, data.pageSize).then(res=>{
                    resolve(res)
                }).catch(error=>{
                    reject(error)
                })
            })
        },
        //获取人员列表

        GetPersonnelList(data){
            return new Promise((resolve,reject)=>{
                
                getDepartmentList(data.pageNumber, data.pageSize).then(res=>{
                    console.log(res)
                    resolve(res)
                }).catch(error=>{
                    reject(error)
                })
            })
        },
    }
   
})

export default store