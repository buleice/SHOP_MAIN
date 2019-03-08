// 配置项目请求路径
let baseUrl='';
const hostName=window.location.hostname
if(hostName==='localhost'){
    baseUrl='';
}else if(hostName==='test.wxyx.youban.com'){
    baseUrl='//test.wxyx.youban.com'
}else if(hostName==='wxyx.youban.com'){
    baseUrl='//wxyx.youban.com';
}else{
    baseUrl='';
}

export {
    baseUrl
}

// module.exports = {
//     NODE_ENV: '"production"',
//     BASE_API: '"https://wxyx.youban.com"',
//     CRM_PATH: '"http://test.wxyx.youban.com"',        //  其他配置
// };

