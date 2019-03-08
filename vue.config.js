
module.exports = {
    assetsDir: 'assets',
    filenameHashing: true,
    productionSourceMap: undefined,
    devServer: {
        proxy: 'http://dylan.wxyx.youban.com',
    },
    pwa: {
        name: '小伴龙优学',
        themeColor: '#f69f00',
        msTileColor: '#50E3C2',
        appleMobileWebAppCapable: 'yes',

    },
    baseUrl: process.env.NODE_ENV === 'production' ?'/wxyx/shop':'',
    outputDir: undefined,
    runtimeCompiler: undefined,
    parallel: undefined,
    css: undefined,
    lintOnSave: undefined
}
