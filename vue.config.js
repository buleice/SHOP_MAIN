const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')

module.exports = {
    lintOnSave: undefined,
    baseUrl: '/wxyx/shop/',
    assetsDir: 'assets',
    filenameHashing: true,
    productionSourceMap: false,
    configureWebpack: {
        plugins: [
            new PrerenderSPAPlugin({
                // Required - The path to the webpack-outputted app to prerender.
                staticDir: path.join(__dirname, 'dist'),
                // Required - Routes to render.
                routes: ['/', '/shop/default', '/bonus', '/course', '/mine'],
            })
        ],
    },
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
        msTileColor: '#50E3C2',
        appleMobileWebAppCapable: 'yes',

    }
}
