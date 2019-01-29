// const path = require('path')
// const { SkeletonPlugin } = require('page-skeleton-webpack-plugin')


module.exports = {
    lintOnSave: undefined,
    publicPath: '/wxyx/shop/',
    assetsDir: 'assets',
    filenameHashing: true,
    productionSourceMap: false,
    // configureWebpack: () => {
    //     if (process.env.NODE_ENV !== 'production') return;
    //     return {
    //         plugins: [
    //             new SkeletonPlugin({
    //                 pathname: path.resolve(__dirname, './shell'), // the path to store shell file
    //                 staticDir: path.resolve(__dirname, './dist'), // the same as the `output.path`
    //                 routes: ['/shop'], // Which routes you want to generate skeleton screen
    //             })
    //         ]
    //     };
    // },
    devServer: {
        proxy: 'http://dylan.wxyx.youban.com',
    },

    pwa: {
        name: '小伴龙优学',
        themeColor: '#f69f00',
        msTileColor: '#50E3C2',
        appleMobileWebAppCapable: 'yes',

    }
}
