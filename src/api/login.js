import fetch from '@/core/http';
import qs from 'qs'
export function loginByTo(username, password) {
    let params = new FormData()
    params.append('username', username)
    params.append('password', password)

    return fetch.post(
       'kpi/auth/login',
        params,
        { headers: { 'Content-Type':'multipart/form-data'}}
    );
}

export function getInfo(id) {
    return fetch.get(
        'kpi/auth/user/detail',
        {id:id}
    );
}
export function loginout() {
    return fetch.post(
        '/kpi/logout',
    );
}

