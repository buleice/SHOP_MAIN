// const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');
module.exports = {
    baseUrl:'/wxyx-market/',
    assetsDir: 'assets',
    filenameHashing: false,
    productionSourceMap: false,
    devServer: {
        proxy: 'http://dylan.wxyx.youban.com',
        // overlay: {
        //     warnings: true,
        //     errors: true
        // }
    },
    // configureWebpack:{
    //     plugins: [
    //         new SkeletonWebpackPlugin({ // 我们编写的插件
    //             webpackConfig: require('./webpack.skeleton.conf')
    //         })
    //     ]
    // }
}
