//request.js
import {baseUrl} from "../../config/sit.env";
import axios from "axios";
import qs from "qs";
import {Vue} from '../../main'
/****** 创建axios实例 ******/
const service = axios.create({
    baseURL: baseUrl, // 因为我本地做了反向代理
    timeout: 10000,
    responseType: "json",
    withCredentials: true, // 是否允许带cookie这些
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
});

/****** request拦截器==>对请求参数做处理 ******/
service.interceptors.request.use(config => {
    Vue.prototype.$loading.show()
    config.method === 'post'
        ? config.data = qs.stringify({...config.data})
        : config.params = {...config.params};
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    if (localStorage.token) {
        config.headers.Authorization = localStorage.token;
    }
    return config;
}, error => {  //请求错误处理
    Vue.prototype.$message.error({
        type: 'warn',
        text: error
    });
    Promise.reject(error)
});


/****** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(
    response => {  //成功请求到数据
        //这里根据后端提供的数据进行对应的处理
        Vue.prototype.$loading.hide()
        if (response.statusText === 'OK') {
            return response
        } else {
            console.log("error")
            Vue.prototype.$message.error({  //常规错误处理
                type: 'warn',
                text: response.data.data.msg
            });
        }
    },
    error => {  //响应错误处理
        let text = JSON.parse(JSON.stringify(error)).response.status === 404
            ? '404'
            : '网络异常，请重试';
        Vue.prototype.$message.info({
            type: 'warn',
            text: text
        });
        return Promise.reject(error)
    }
);
export default service


