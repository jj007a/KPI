import fetch from '@/core/http';

export function loginByTo(user, password) {
   
    const data = {
        user,
        password
    };
    console.log(data)
    return fetch.post(
       'api/user/login',
        data
    );
}


export function getInfo(token) {
    return fetch({
        url: '/user/info',
        method: 'get',
        params: { token }
    });
}
export function loginout() {
    return fetch.post(
        'api/user/loginout',
    );
}

