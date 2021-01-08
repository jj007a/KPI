import axios from '../core/http';

export function login(user,password){
    const data ={
        user:user,
        password:password
    }
    return axios.post({
        url:'/user/login',
        params: data,
    }).then(res=>{
        console.log(res)
    })
}