//项目域名地址
const url = '';
let ROOT
//由于封装的axios请求中，会将ROOT打包进去，为了方便之后不再更改，判断了当前环境，而生成的不同的ROOT
if (process.env.NODE_ENV === 'development') {
    //开发环境下的代理地址，解决本地跨域跨域，配置在config目录下的index.js dev.proxyTable中
    document.cookie="auth=c4a699f2067bbb0df21202874c5bc7556daed39a74581bd32daedc274424a1656fc3647631ea2db6f3677470513d7e340d20e0396fa9fe5d4f213039f9a8214a49b08539404d72882fc5fa13dc3ef4e26161ba4284a44fee"
    ROOT = ""
} else {
    //生产环境下的地址
    ROOT = url;
}
export{
  ROOT
}
