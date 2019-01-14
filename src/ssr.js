// const fs = require('fs')

// const createBundleRenderer = require('vue-server-renderer').createBundleRenderer;
// // 从内存文件系统中读取 bundle 文件
// let bundle = fs.readFileSync(path.join(__dirname,'../dist/index.html'), 'utf-8');
// // 创建 renderer
// let renderer = createBundleRenderer(bundle);
// // 渲染得到 HTML
// renderer.renderToString({}, (err, skeletonHtml) => {});
// // 加入 ExtractTextPlugin 插件到 webpack 配置对象插件列表中
// serverWebpackConfig.plugins.push(new ExtractTextPlugin({
//     filename: outputCssBasename // 样式文件名
// }));

// renderer.renderToString({}, (err, renderer) => {
//     fs.writeFileSync(path.join(__dirname,'../dist/index.html'), renderer, 'utf-8')
// })
const fs = require('fs')
const path = require('path');
// const ExtractTextPlugin=require('extract-text-webpack-plugin')
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer;
let bundle = fs.readFileSync(path.join(__dirname,'../dist/index.html'), 'utf-8');
// 创建 renderer
let renderer = createBundleRenderer(bundle);
// 渲染得到 html
renderer.renderToString({}, (err, skeletonHtml) => {
    console.log(skeletonHtml);
    // if (err) {
    //     reject(err);
    // }
    // else {
    //     resolve({skeletonHtml, skeletonCss});
    // }
});
