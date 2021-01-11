import fetch from '@/core/http';

export function loginByTo(user, password) {
    const data = {
        user,
        password
    };
    return fetch({
        url: 'api/user/login',
        method: 'post',
        data
    });
}


export function getInfo(token) {
    return fetch({
        url: '/user/info',
        method: 'get',
        params: { token }
    });
}
export function loginout() {
    return fetch({
        url: 'api/user/loginout',
        method: 'post',
    });
}

