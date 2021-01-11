import Vue from 'vue'
import Vuex from 'vuex'
import {loginByTo,loginout} from '@/api/login'
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
        name: Cookies.get('Admin-Name'),
        password:'',    
        // filialeJudgeManageAdd数据
        // tree:[],
        // arr:[]
    },
    getters:{
        token: state => state.token,  
        name:state=> state.name
    },
    mutations:{
        setRouterName(state,obj){
            obj = obj || {}
            for (const key in obj) {
                console.log(obj[key])
                if(typeof obj[key] == 'string'){
                    obj[key].replace('Detail','')
                }
            }
            state.routerName = obj;
            
            console.log(obj);
            
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
       SET_NAME(state,name){
         state.name=name       
        },
       SET_PASS(state,password){
         state.password=password       
        },
     
    },
    actions:{
        // 登录
        LoginByTo({commit},userInfo) {
            return new Promise((resolve, reject) => {
                loginByTo(userInfo.user, userInfo.password).then(response => {
                    const data = response.data;
                    console.log(response.data);
                    if(data.code==200){
                        Cookies.set('Admin-Token', data.data.token);
                        Cookies.set('Admin-Name', userInfo.user);
                        commit('SET_TOKEN', data.data.token);
                        commit('SET_NAME', userInfo.user);
                        resolve();
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
                    resolve()     
                }).catch(erro=>{
                    reject(erro)
                })
            })
        }
    }
   
})

export default store