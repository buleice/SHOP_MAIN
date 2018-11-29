// const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');
module.exports = {
    lintOnSave: false,
    assetsDir: 'wxyx-entry',
    filenameHashing: false,
    productionSourceMap: false,
    devServer: {
        proxy: 'http://ben.wxyx.youban.com'
    },
    // configureWebpack:{
    //     plugins: [
    //         new SkeletonWebpackPlugin({ // 我们编写的插件
    //             webpackConfig: require('./webpack.skeleton.conf')
    //         })
    //     ]
    // }
}
