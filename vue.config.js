const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const SkeletonPlugin = require('page-skeleton-webpack-plugin').SkeletonPlugin
module.exports = {
  lintOnSave: undefined,
  baseUrl: '/wxyx/shop/',
  assetsDir: 'assets',
  filenameHashing: true,
  productionSourceMap: false,
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new SkeletonPlugin({
            pathname: path.resolve(__dirname, './shell'), // 用来存储 shell 文件的地址
            staticDir: path.resolve(__dirname, './dist'), // 最好和 `output.path` 相同
            routes: ['/shop', '/shop/default'], // 将需要生成骨架屏的路由添加到数组中
          }),
        ]
      }
    } else {
      return {
        plugins: [
          new SkeletonPlugin({
            pathname: path.resolve(__dirname,'./shell'), // 用来存储 shell 文件的地址
            staticDir: path.resolve(__dirname, './dist'), // 最好和 `output.path` 相同
            routes: ['/', '/shop', '/shop/default', '/shop/classify/cid', '/course', '/bonus/center', '/mine'],
          }),
        ]
      };
    }
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
    msTileColor: '#50E3C2'
  }
}
