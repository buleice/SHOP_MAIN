// import {axiosGet,axiosPost} from '../common/js/axiosData';
// import {Request} from "../common/js/request";
import service from '../common/js/axios-instance'
export function shopDefaultPage() {
    return service({url:'/shop/list.json',method:'get'})
}

export function getUserCourse() {
    // return axiosPost('/shop/mycourse.json');
    return service({url:'/shop/mycourse.json',method:'post'})
}

export function getUserInfo() {
    // return axiosPost('/shop/center.json')
    return service({url:'/shop/center.json',method:'post'})
}

export function getCateGoryInfo(data) {
    // return axiosGet('/shop/category.json',data)
    return service({url:'/shop/category.json',method:'get',params:data})
}

export function getCrunchies(data) {
    // return axiosGet('/shop/hot.json',data)
    return service({url:'/shop/hot.json',method:'get',params:data})
}
