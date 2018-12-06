// const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');
module.exports = {
    lintOnSave:undefined,
    baseUrl:'/shop/',
    assetsDir: 'assets',
    filenameHashing: true,
    productionSourceMap: false,

    // configureWebpack:{
    //     plugins: [
    //         new SkeletonWebpackPlugin({ // 我们编写的插件
    //             webpackConfig: require('./webpack.skeleton.conf')
    //         })
    //     ]
    // }
    devServer: {
        proxy: 'http://dylan.wxyx.youban.com',
        // overlay: {
        //     warnings: true,
        //     errors: true
        // }
    },

    pwa: {
      name: '小伴龙优学',
      themeColor: '#f69f00',
      msTileColor: '#50E3C2'
    }
}
