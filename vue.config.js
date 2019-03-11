const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    assetsDir: 'assets',
    filenameHashing: true,
    productionSourceMap: undefined,
    configureWebpack(config) {
        if (process.env.NODE_ENV === 'production') {
            config.plugins.push(new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            }))
        }

    },
    chainWebpack(config) {
        config.resolve.alias
            .set('components', resolve('src/components'))
            .set('common', resolve('src/common'))
            .set('api', resolve('src/api'))
            .set('assets', resolve('src/assets'))
            .set('base', resolve('src/base'))
    },
    devServer: {
        proxy: 'http://dylan.wxyx.youban.com',
    }
    ,
    pwa: {
        name: '小伴龙优学',
        themeColor:
            '#f69f00',
        msTileColor:
            '#50E3C2',
        appleMobileWebAppCapable:
            'yes',

    }
    ,
    // publicPath: process.env.NODE_ENV === 'production' ? '/wxyx/shop' : '',
    outputDir:
    undefined,
    runtimeCompiler:
    undefined,
    parallel:
    undefined,
    css:
    undefined,
    lintOnSave:
    undefined
}
