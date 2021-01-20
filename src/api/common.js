import fetch from '@/core/http';


//获取部门列表
export function getDepartmentList(pageNumber,pageSize) {

    const data = {
        pageNumber: pageNumber,
        pageSize: pageSize
    };
    return fetch.get(
        'kpi/auth/dep/list',
        data
    );
}
//获取人员列表
export function getPersonnelList(pageNumber,pageSize) {

    const data = {
        pageNumber,
        pageSize
    };
    return fetch.get(
        'kpi/auth/user/list',
        data
    );
}
//获取考核模板列表
export function getKpiTemplatelList(pageNumber,pageSize) {

    const data = {
        pageNumber,
        pageSize
    };
    return fetch.post(
        'kpi/auth/mould/list',
        data
    );
}
