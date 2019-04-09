const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const PrerenderSPAPlugin = require('prerender-spa-plugin')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    assetsDir: 'assets',
    filenameHashing: true,
    productionSourceMap: false,
    devServer: {
        proxy: 'http://wxyx.youban.com',
    },
    pwa: {
        name: '小伴龙优学',
        themeColor: '#f69f00',
        msTileColor: '#50E3C2',
        appleMobileWebAppCapable: 'yes',

    },
    baseUrl: process.env.NODE_ENV === 'production' ? '/wxyx/shop' : '/',
    configureWebpack(config) {
        if (process.env.NODE_ENV === 'production') {
            config.plugins.push(new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            }), new PrerenderSPAPlugin({
                // Required - The path to the webpack-outputted app to prerender.
                staticDir: path.join(__dirname, 'dist'),
                outputDir: path.join(__dirname, 'prerendered'),
                indexPath: path.join(__dirname, 'dist', 'index.html'),
                // Required - Routes to render.
                routes: ['/shop/default', '/course', '/bonus/center', '/mine'],
                minify: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    decodeEntities: true,
                    keepClosingSlash: true,
                    sortAttributes: true
                  },
            }))
        }

    },
    chainWebpack(config) {
        config.resolve.alias
            .set('components', resolve('src/components'))
            .set('common', resolve('src/common'))
            .set('api', resolve('src/api'))
            .set('assets', resolve('src/assets'))
            .set('base', resolve('src/base'));
    },
}