import {axiosPost} from '../common/js/axiosData';
import service from '../common/js/axios-instance'
export function shopDefaultPage() {
    return service({
        url: '/shop/list.json',
        method: 'get'
    })
}

export function getUserCourse() {
    // return axiosPost('/shop/mycourse.json');
    return service({
        url: '/shop/mycourse.json',
        method: 'post'
    })
}

export function getUserInfo() {
    // return axiosPost('/shop/center.json')
    return service({
        url: '/shop/center.json',
        method: 'post'
    })
}

export function getCateGoryInfo(data) {
    // return axiosGet('/shop/category.json',data)
    return service({
        url: '/shop/category.json',
        method: 'get',
        params: data
    })
}

export function getCrunchies(data) {
    // return axiosGet('/shop/hot.json',data)
    return service({
        url: '/shop/hot.json',
        method: 'get',
        params: data
    })
}

export function GET_RECEIVE_COURSE_INFO(data) {
    return service({
        url: '/lesson/give.json',
        method: 'get',
        params: data
    })
}

export function GET_MY_GIVING_COURSE_INFO(data) {
    return service({
        url: '/shop/giveaway.json',
        method: 'get',
        params: data
    })
}
export function RECEIVE_COURSE(data) {
    return service({
        url: '/lesson/receive.json',
        method: 'post',
        data: data
    })
}
export function GET_SHARE_COURSE_INFO(data) {
    return service({
        url: '/lesson/share.json',
        method: 'get',
        params: data
    })
}
export function GET_USER_COUPONS(data){
    return service({
        url: '/coupon/list.json',
        method: 'get',
        params: data 
    })
}
export function GET_ADDRESS_LIST(data){
    return service({
        url: '/address/list.json',
        method: 'get',
        params: data 
    })
}
export function ADD_ADDRESS(data){
    return  axiosPost('/address/add.json',data)
}
export function UPDATA_ADDRESS(data){
    return  axiosPost('/address/add.json',data)
}
export function DELETE_ADDRESS(data){
    return  axiosPost('/address/delete.json',data)
}
export function BIND_BANK_CARD(data){
    return  axiosPost('/bonus/cash/bindcard.json',data)
}
export function GET_ORDER_LIST(data){
    return service({
        url: '/order/list.json',
        method: 'get',
        params: data 
    })
}
export function GET_ORDER_DETAIL(data){
    return service({
        url: '/order/detail.json',
        method: 'get',
        params: data 
    })
}
export function GET_UNPAID_ORDER_INFO(data){
    return service({
        url: '/purchase/unpaid.json',
        method: 'get',
        params: data 
    })
}
export function GET_ORDER_ADDRESS_INFO(data){
    return service({
        url: '/order/address.json',
        method: 'get',
        params: data 
    })
}
export function PLACE_ORDER(data){
    return  axiosPost('/order/address.json',data)
}
export function GET_NONUS_CANSH_INFO(data){
    return service({
        url: '/bonus/cash/center.json',
        method: 'get',
        params: data 
    })
}
export function CASH_MONEY(data){
    return  axiosPost('/bonus/cash/out.json',data)
}

export function BIND_BINK_CARD(data){
    return  axiosPost('/bonus/cash/bindcard.json',data)
}
export function GENERATE_VERIFICATION_CODE(data){
    return  axiosPost('/bonus/cash/sendcode.json',data)
}

export function GET_CASH_RECORD(data){
    return service({
        url: '/bonus/cash/record.json',
        method: 'get',
        params: data 
    })
}